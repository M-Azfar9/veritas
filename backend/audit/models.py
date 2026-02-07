import uuid
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class AuditLog(models.Model):
    log_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_type = models.CharField(max_length=50) # 'TRUST_SCORE_CALCULATED', etc.
    rumor_id = models.UUIDField(null=True, blank=True) # Storing UUID directly to allow soft deletes/detached logs? Or FK?
    # PRD says UUID. Let's start with UUID to avoid constraint issues if rumor is hard deleted (though we use soft delete).
    # Actually, FK is better for integrity, but PRD says "rumor_id UUID". I'll use UUIDField for maximum decoupling as "audit log".
    user_id = models.UUIDField(null=True, blank=True)
    calculation_data = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_type} - {self.timestamp}"

class ReputationEvent(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reputation_events')
    
    EVENT_TYPES = [
        ('CORRECT_VOTE', 'Correct Vote'),
        ('INCORRECT_VOTE', 'Incorrect Vote'),
        ('HELPFUL_PROOF', 'Helpful Proof'),
        ('MISLEADING_PROOF', 'Misleading Proof'),
        ('AUTHOR_BONUS', 'Author Bonus'),
        ('AUTHOR_PENALTY', 'Author Penalty')
    ]
    event_type = models.CharField(max_length=30, choices=EVENT_TYPES)
    delta = models.DecimalField(max_digits=5, decimal_places=2)
    
    rumor_id = models.UUIDField(null=True, blank=True)
    proof_id = models.UUIDField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
