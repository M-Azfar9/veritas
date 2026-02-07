from celery import shared_task
from .services import calculate_trust_score, update_proof_trust_score

@shared_task
def update_trust_score_task(rumor_id):
    """
    Background task to recalculate trust score for a rumor.
    """
    return calculate_trust_score(rumor_id)

@shared_task
def update_proof_trust_score_task(proof_id):
    """
    Background task to recalculate trust score for a proof.
    """
    return update_proof_trust_score(proof_id)
