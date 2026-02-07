import uuid
from django.db import models
from django.conf import settings
from decimal import Decimal
from django.core.validators import MinLengthValidator, MaxLengthValidator

User = settings.AUTH_USER_MODEL

class Rumor(models.Model):
    rumor_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='authored_rumors')
    content = models.TextField(validators=[MinLengthValidator(10), MaxLengthValidator(500)])
    
    # Trust scoring
    trust_score = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    vote_score = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    proof_score = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    momentum_score = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    
    # Lifecycle
    is_frozen = models.BooleanField(default=False)
    frozen_at = models.DateTimeField(null=True, blank=True)
    classification = models.CharField(
        max_length=20, 
        null=True, blank=True,
        choices=[
            ('VERIFIED_TRUE', 'Verified True'),
            ('LIKELY_TRUE', 'Likely True'),
            ('UNCERTAIN', 'Uncertain'),
            ('LIKELY_FALSE', 'Likely False'),
            ('VERIFIED_FALSE', 'Verified False')
        ]
    )
    
    # Metadata
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Evidence
    EVIDENCE_TYPES = [('photo', 'Photo'), ('link', 'Link'), ('document', 'Document')]
    evidence_type = models.CharField(max_length=20, choices=EVIDENCE_TYPES, null=True, blank=True)
    evidence_url = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.content[:50]}..."

class Vote(models.Model):
    vote_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rumor = models.ForeignKey(Rumor, on_delete=models.CASCADE, related_name='votes')
    voter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    
    VOTE_TYPES = [('VERIFY', 'Verify'), ('UNCERTAIN', 'Uncertain'), ('DISPUTE', 'Dispute')]
    vote_type = models.CharField(max_length=10, choices=VOTE_TYPES)
    vote_value = models.DecimalField(max_digits=2, decimal_places=1) # 1.0, 0.5, 0.0
    
    weight_snapshot = models.DecimalField(max_digits=6, decimal_places=4)
    voter_reputation_snapshot = models.DecimalField(max_digits=5, decimal_places=2)
    
    voted_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    change_count = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ('rumor', 'voter')

class Proof(models.Model):
    proof_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rumor = models.ForeignKey(Rumor, on_delete=models.CASCADE, related_name='proofs')
    poster = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='proofs')
    
    PROOF_TYPES = [('text', 'Text'), ('photo', 'Photo'), ('video', 'Video'), ('link', 'Link'), ('document', 'Document')]
    proof_type = models.CharField(max_length=20, choices=PROOF_TYPES)
    content = models.TextField(null=True, blank=True)
    file_url = models.TextField(null=True, blank=True)
    
    trust_score = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    vote_count = models.IntegerField(default=0)
    is_mature = models.BooleanField(default=False)
    
    is_classified = models.BooleanField(default=False)
    final_classification = models.CharField(max_length=20, null=True, blank=True)
    
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class ProofVote(models.Model):
    proof_vote_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    proof = models.ForeignKey(Proof, on_delete=models.CASCADE, related_name='votes')
    voter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='proof_votes')
    
    VOTE_TYPES = [('SUPPORTS', 'Supports'), ('UNCERTAIN', 'Uncertain'), ('REFUTES', 'Refutes')]
    vote_type = models.CharField(max_length=10, choices=VOTE_TYPES)
    vote_value = models.DecimalField(max_digits=2, decimal_places=1)
    
    weight_snapshot = models.DecimalField(max_digits=6, decimal_places=4)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('proof', 'voter')
