from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.utils import timezone
import uuid
from .models import UserDevice

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # 1. Standard Validation (Check Username/Password)
        data = super().validate(attrs)
        
        request = self.context.get('request')
        device_fingerprint = request.data.get('device_fingerprint')
        
        if not device_fingerprint:
             # Strictly require fingerprint
             raise serializers.ValidationError({"detail": "Device fingerprint required. Please refresh or update app.", "code": "missing_fingerprint"})
        
        user = self.user
        
        # 2. Device Verification
        try:
            device = UserDevice.objects.get(user=user, fingerprint_hash=device_fingerprint)
            if not device.is_verified:
                 # Known but unverified (e.g., they started verification but didn't finish)
                 raise serializers.ValidationError({"detail": "Device verification required.", "code": "device_verification_required"}, code='device_verification_required')
        except UserDevice.DoesNotExist:
            # New device - Create unverified record
            UserDevice.objects.create(user=user, device_uuid=uuid.uuid4(), fingerprint_hash=device_fingerprint, is_verified=False)
            raise serializers.ValidationError({"detail": "New device detected. Verification required.", "code": "device_verification_required"}, code='device_verification_required')
            
        # 3. Success - Update Stats
        device.last_used = timezone.now()
        device.save()
        
        return data
