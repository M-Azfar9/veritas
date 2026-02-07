from users.models import User
from rumors.models import Rumor, Vote, Proof, ProofVote
from rumors.services import calculate_trust_score, update_proof_trust_score
from decimal import Decimal

# 1. Setup Users
user1, _ = User.objects.get_or_create(username='verifier_1', email='v1@nust.edu.pk')
user1.profile_trust_score = Decimal('80.00') # High Rep
user1.save()

user2, _ = User.objects.get_or_create(username='skeptic_1', email='s1@nust.edu.pk')
user2.profile_trust_score = Decimal('20.00') # Low Rep
user2.save()

# 2. Create Rumor
rumor = Rumor.objects.create(content="Test Rumor for Trust Score Logic")
print(f"Initial Score: {rumor.trust_score}")

# 3. Vote Logic Test
# User 1 votes VERIFY (Weight = sqrt(80)/10 = 0.89)
v1 = Vote.objects.create(
    rumor=rumor, 
    voter=user1, 
    vote_type='VERIFY',
    vote_value=Decimal('1.0'),
    weight_snapshot=Decimal('0.894'),
    voter_reputation_snapshot=Decimal('80.00')
)

# User 2 votes DISPUTE (Weight = sqrt(20)/10 = 0.45)
v2 = Vote.objects.create(
    rumor=rumor, 
    voter=user2, 
    vote_type='DISPUTE',
    vote_value=Decimal('0.0'),
    weight_snapshot=Decimal('0.447'),
    voter_reputation_snapshot=Decimal('20.00')
)

# Calculate
score = calculate_trust_score(rumor.rumor_id)
print(f"Score after voting: {score}")

# Expected V:
# S1 = 1.0 * 0.894 = 0.894
# S2 = 0.0 * 0.447 = 0.0
# Total Weight = 1.341
# V = 0.894 / 1.341 = 0.666
# P = 0.50 (No proofs)
# M = 0.50 (Low momentum)
# Trust = 0.5(0.666) + 0.3(0.5) + 0.2(0.5) 
#       = 0.333 + 0.15 + 0.10 = 0.583
print(f"Expected ~0.583. Actual: {score}")

# 4. Proof Logic Test
proof = Proof.objects.create(
    rumor=rumor,
    proof_type='text',
    content="This is a proof",
    trust_score=Decimal('0.00')
)

# Determine maturity (needs 10 votes, let's force strict test or mock? 
# We'll mock maturity for test or add 10 votes
for i in range(10):
    u, _ = User.objects.get_or_create(username=f'dummy_{i}')
    ProofVote.objects.create(
        proof=proof,
        voter=u,
        vote_type='SUPPORTS',
        vote_value=Decimal('1.0'),
        weight_snapshot=Decimal('0.5')
    )

update_proof_trust_score(proof.proof_id)
proof.refresh_from_db()
print(f"Proof Mature? {proof.is_mature}. Score: {proof.trust_score}")

# Recalculate Rumor
final_score = calculate_trust_score(rumor.rumor_id)
print(f"Final Rumor Score with Proof: {final_score}")
