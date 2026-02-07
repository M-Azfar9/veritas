from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import uuid
from datetime import timedelta
from django.utils import timezone

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email_hash = models.CharField(max_length=64, unique=True, null=True, blank=True) # Following schema but allowing null for superuser/dev
    # We won't use the default email field for auth, but AbstractUser has it. 
    # We can ignore it or use it for "contact email" if strictly needed (but PRD says no).
    
    profile_trust_score = models.DecimalField(max_digits=5, decimal_places=2, default=50.00)
    is_probationary = models.BooleanField(default=True)
    probation_ends_at = models.DateTimeField(null=True, blank=True)
    flagged_as_suspicious = models.BooleanField(default=False)
    
    last_active = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self._state.adding and self.is_probationary and not self.probation_ends_at:
             self.probation_ends_at = timezone.now() + timedelta(days=7)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class UserDevice(models.Model):
    device_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='devices')
    device_uuid = models.UUIDField()
    fingerprint_hash = models.CharField(max_length=64, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    last_used = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'device_uuid')

class EmailVerification(models.Model):
    verification_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=255) # Store raw email temporarily for OTP? Or hash? 
    # PRD 5.1 says: "Input: user@... -> Store OTP... -> Send Email". 
    # Schema 8.2 says: "email VARCHAR(255) NOT NULL". 
    # So we DO store the email temporarily for verification.
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at
