from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.throttling import ScopedRateThrottle, UserRateThrottle, AnonRateThrottle
from django.db.models import F
from .models import Rumor, Vote, Proof, ProofVote
from .serializers import RumorSerializer, VoteSerializer, ProofSerializer, ProofVoteSerializer
from .tasks import update_trust_score_task, update_proof_trust_score_task

class RumorViewSet(viewsets.ModelViewSet):
    queryset = Rumor.objects.all().order_by('-created_at')
    serializer_class = RumorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'rumor_creation'
            return [ScopedRateThrottle()]
        if self.action == 'vote':
            self.throttle_scope = 'voting'
            return [ScopedRateThrottle()]
        return [UserRateThrottle(), AnonRateThrottle()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        rumor = self.get_object()
        user = request.user
        
        # Validate input
        serializer = VoteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        vote_type = serializer.validated_data['vote_type']
        
        # Check existing vote
        existing_vote = Vote.objects.filter(rumor=rumor, voter=user).first()
        if existing_vote:
            if existing_vote.change_count >= 3:
                 return Response({'error': 'Max vote changes reached'}, status=status.HTTP_400_BAD_REQUEST)
            existing_vote.vote_type = vote_type
            existing_vote.change_count += 1
            existing_vote.save()
        else:
            Vote.objects.create(rumor=rumor, voter=user, vote_type=vote_type)
            
        # Trigger Async Update
        update_trust_score_task.delay(rumor.rumor_id)
        
        return Response({'status': 'vote recorded'}, status=status.HTTP_200_OK)

class ProofViewSet(viewsets.ModelViewSet):
    queryset = Proof.objects.all().order_by('-trust_score')
    serializer_class = ProofSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['rumor']

    def get_queryset(self):
        queryset = super().get_queryset()
        rumor_id = self.request.query_params.get('rumor')
        if rumor_id:
            queryset = queryset.filter(rumor_id=rumor_id)
        return queryset

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'proof_submission'
            return [ScopedRateThrottle()]
        if self.action == 'vote':
            self.throttle_scope = 'voting'
            return [ScopedRateThrottle()]
        return [UserRateThrottle(), AnonRateThrottle()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # Trigger update (Proof added -> Impact on P score?)
        # Only mature proofs count, but we might want to recalc anyway or wait for votes?
        # Let's trigger it.
        # But wait, we need rumor_id.
        proof = serializer.instance
        if proof:
             # Logic to update Rumor score? 
             # P score is based on Mature proofs. New proof is not mature.
             # So no immediate impact on Rumor Score. 
             pass

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        proof = self.get_object()
        user = request.user
        
        serializer = ProofVoteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        vote_type = serializer.validated_data['vote_type']
        
        existing_vote = ProofVote.objects.filter(proof=proof, voter=user).first()
        if existing_vote:
            existing_vote.vote_type = vote_type
            existing_vote.save()
        else:
            ProofVote.objects.create(proof=proof, voter=user, vote_type=vote_type)
            
        # Trigger Update
        update_proof_trust_score_task.delay(proof.proof_id)
        
        return Response({'status': 'vote recorded'}, status=status.HTTP_200_OK)
