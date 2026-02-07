from decimal import Decimal
import math
from django.utils import timezone
from datetime import timedelta
from .models import Rumor, Vote, Proof, ProofVote
from audit.models import AuditLog, ReputationEvent
from django.db import transaction

def calculate_trust_score(rumor_id):
    try:
        rumor = Rumor.objects.get(pk=rumor_id)
    except Rumor.DoesNotExist:
        return

    # --- 1. Weighted Vote Score (V) - 50% Weight ---
    # Formula: Weighted Average of all votes.
    # Weight = sqrt(voter_reputation) / 10
    
    votes = Vote.objects.filter(rumor=rumor)
    if not votes.exists():
        V = Decimal('0.50') # Default neutral if no votes
    else:
        total_weight = Decimal('0.00')
        weighted_sum = Decimal('0.00')
        
        for vote in votes:
            # vote.vote_value is 1.0 (Verify), 0.5 (Uncertain), or 0.0 (Dispute)
            # vote.weight_snapshot is calculated at time of voting
            weight = vote.weight_snapshot
            val = vote.vote_value
            
            weighted_sum += val * weight
            total_weight += weight
        
        if total_weight > 0:
            V = weighted_sum / total_weight
        else:
            V = Decimal('0.50')

    # --- 2. Mature Proofs Score (P) - 30% Weight ---
    # Formula: Average trust score of MATURE proofs (>10 votes).
    
    mature_proofs = Proof.objects.filter(rumor=rumor, is_mature=True)
    if not mature_proofs.exists():
        P = Decimal('0.50') # Neutral if no mature proofs
    else:
        # Calculate score from mature proofs
        # We average the trust_score of all mature proofs
        
        proof_scores_sum = Decimal('0.00')
        for proof in mature_proofs:
            proof_scores_sum += proof.trust_score
            
        avg_proof_score = proof_scores_sum / len(mature_proofs)
        P = avg_proof_score

    # --- 3. Momentum Score (M) - 20% Weight ---
    # Formula: Rewards organic consensus building.
    # Logic: Analyzes voting patterns in 6-hour windows.
    # MVP Implementation: 
    # If vote rate is high (>10 votes/6h) AND consensus is high (>0.7 or <0.3), M = 0.8 (High Confidence)
    # Else M = 0.5 (Normal)
    
    # Check count of votes in last 6 hours
    six_hours_ago = timezone.now() - timedelta(hours=6)
    recent_vote_count = votes.filter(voted_at__gte=six_hours_ago).count()
    
    if recent_vote_count > 10:
        # High activity. Check consensus of purely recent votes.
        # Simplification: Use overall V as proxy for consensus direction
        if V > Decimal('0.70') or V < Decimal('0.30'):
             # Strong momentum in one direction
             M = Decimal('0.80') # Boosted confidence
        else:
             # High activity but controversial/uncertain
             M = Decimal('0.50')
    else:
        M = Decimal('0.50') # Low momentum

    # --- Final Calculation ---
    # TrustScore = 0.50(V) + 0.30(P) + 0.20(M)
    
    final_trust_score = (Decimal('0.50') * V) + (Decimal('0.30') * P) + (Decimal('0.20') * M)

    # Update Rumor
    rumor.trust_score = final_trust_score
    rumor.vote_score = V
    rumor.proof_score = P
    rumor.momentum_score = M
    rumor.save()

    # Log to Audit
    AuditLog.objects.create(
        event_type='TRUST_SCORE_CALCULATED',
        rumor_id=rumor_id,
        calculation_data={
            'V': float(V),
            'P': float(P),
            'M': float(M),
            'final_score': float(final_trust_score),
            'vote_count': votes.count(),
            'mature_proof_count': mature_proofs.count()
        }
    )

    return final_trust_score

def update_proof_trust_score(proof_id):
    """
    Calculates the trust score for a single proof and check maturity.
    """
    try:
        proof = Proof.objects.get(pk=proof_id)
    except Proof.DoesNotExist:
        return

    votes = ProofVote.objects.filter(proof=proof)
    vote_count = votes.count()
    
    # Update vote count
    proof.vote_count = vote_count
    
    # Check Maturity (Threshold > 10 votes)
    if vote_count >= 10:
        proof.is_mature = True
    else:
        proof.is_mature = False
    
    # Calculate Score: Weighted average of votes
    # Supports (1.0), Uncertain (0.5), Refutes (0.0)
    if vote_count == 0:
        proof.trust_score = Decimal('0.00') 
    else:
        total_weight = Decimal('0.00')
        weighted_sum = Decimal('0.00')
        
        for vote in votes:
            # voting logic similar to rumors
            weight = vote.weight_snapshot
            
            val = Decimal('0.5')
            if vote.vote_type == 'SUPPORTS': val = Decimal('1.0')
            elif vote.vote_type == 'REFUTES': val = Decimal('0.0')
            # UNCERTAIN remains 0.5
            
            weighted_sum += val * weight
            total_weight += weight
            
        if total_weight > 0:
            proof.trust_score = weighted_sum / total_weight
        else:
            proof.trust_score = Decimal('0.00')

    proof.save()
    
    # Trigger Rumor Score Recalculation since P component might change
    calculate_trust_score(proof.rumor_id)

def settle_rumor(rumor_id):
    """
    Finalizes a rumor, freezes it, and distributes reputation rewards/penalties.
    """
    rumor = Rumor.objects.get(rumor_id=rumor_id)
    if rumor.is_frozen:
        return "Already frozen"

    # 1. Determine Outcome
    # Trust Score > 0.80 -> TRUTH (VERIFY wins)
    # Trust Score < 0.20 -> FALSEHOOD (DISPUTE wins)
    # Else -> UNCERTAIN (No reputation change?)
    
    score = float(rumor.trust_score)
    outcome = 'UNCERTAIN'
    if score >= 0.80:
        outcome = 'TRUE'
    elif score <= 0.20:
        outcome = 'FALSE'
        
    rumor.is_frozen = True
    rumor.save()
    
    if outcome == 'UNCERTAIN':
        return "Settled as Uncertain. No reputation changes."

    # 2. Distribute Rewards/Penalties
    # Constants (Should be in settings or models)
    REWARD = Decimal('2.00')
    PENALTY = Decimal('5.00') # Higher penalty for being wrong? Or equal? PRD says "High Stakes".
    AUTHOR_BONUS = Decimal('5.00')
    AUTHOR_PENALTY = Decimal('10.00')
    
    with transaction.atomic():
        votes = Vote.objects.filter(rumor=rumor)
        
        for vote in votes:
            user = vote.voter
            delta = Decimal('0.00')
            event_type = None
            
            # If Outcome is TRUE (Content is Real)
            if outcome == 'TRUE':
                if vote.vote_type == 'VERIFY':
                    delta = REWARD
                    event_type = 'CORRECT_VOTE'
                elif vote.vote_type == 'DISPUTE':
                    delta = -PENALTY
                    event_type = 'INCORRECT_VOTE'
            
            # If Outcome is FALSE (Content is Fake)
            elif outcome == 'FALSE':
                if vote.vote_type == 'DISPUTE':
                    delta = REWARD
                    event_type = 'CORRECT_VOTE'
                elif vote.vote_type == 'VERIFY':
                    delta = -PENALTY
                    event_type = 'INCORRECT_VOTE'
            
            if delta != 0:
                user.profile_trust_score += delta
                # Clamp score 0-100?
                if user.profile_trust_score < 0: user.profile_trust_score = Decimal('0.00')
                if user.profile_trust_score > 100: user.profile_trust_score = Decimal('100.00')
                user.save()
                
                ReputationEvent.objects.create(
                    user=user,
                    event_type=event_type,
                    delta=delta,
                    rumor_id=rumor.rumor_id
                )
    
        # 3. Author Process
        author = rumor.author
        if author:
            delta = Decimal('0.00')
            event_type = None
            
            if outcome == 'TRUE':
                delta = AUTHOR_BONUS
                event_type = 'AUTHOR_BONUS'
            elif outcome == 'FALSE':
                delta = -AUTHOR_PENALTY
                event_type = 'AUTHOR_PENALTY'
            
            if delta != 0:
                author.profile_trust_score += delta
                if author.profile_trust_score < 0: author.profile_trust_score = Decimal('0.00')
                if author.profile_trust_score > 100: author.profile_trust_score = Decimal('100.00')
                author.save()
                
                ReputationEvent.objects.create(
                    user=author,
                    event_type=event_type,
                    delta=delta,
                    rumor_id=rumor.rumor_id
                )
    
    return f"Settled as {outcome}. Reputation distributed."
