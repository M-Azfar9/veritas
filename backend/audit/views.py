from rest_framework import viewsets, permissions
from .models import ReputationEvent
from .serializers import ReputationEventSerializer

class ReputationEventViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReputationEventSerializer

    def get_queryset(self):
        # Return only events for the current user
        return ReputationEvent.objects.filter(user=self.request.user).order_by('-created_at')
