from rest_framework import serializers
from .models import ReputationEvent, AuditLog

class ReputationEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReputationEvent
        fields = ['event_id', 'event_type', 'delta', 'rumor_id', 'proof_id', 'created_at']
        read_only_fields = ['event_id', 'created_at']
