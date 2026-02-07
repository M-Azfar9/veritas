from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from decimal import Decimal
import math

from .models import Rumor, Vote, Proof, ProofVote
from .serializers import RumorSerializer, VoteSerializer, ProofSerializer
from .services import calculate_trust_score, update_proof_trust_score
from .tasks import update_trust_score_task

class RumorViewSet(viewsets.ModelViewSet):
    queryset = Rumor.objects.all()
    serializer_class = RumorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['content']
    ordering_fields = ['created_at', 'trust_score', 'vote_count']
    ordering = ['-created_at'] # Default list is 'Latest'

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Count('votes', distinct=True),
            proof_count=Count('proofs', distinct=True)
        )
        
        # Filtering
        filter_type = self.request.query_params.get('filter', 'all')
        if filter_type == 'frozen':
            queryset = queryset.filter(is_frozen=True)
        elif filter_type == 'active':
            queryset = queryset.filter(is_frozen=False)
        
        # Sorting
        sort_by = self.request.query_params.get('sort', 'latest')
        if sort_by == 'trending':
            queryset = queryset.order_by('-vote_count', '-created_at')
        elif sort_by == 'trusted':
            queryset = queryset.filter(is_frozen=True).order_by('-trust_score')
        elif sort_by == 'controversial':
             pass 
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        print(f"DEBUG: Vote Request Data: {request.data}")
        print(f"DEBUG: User: {request.user}")
        
        rumor = self.get_object()
        user = request.user
        
        try:
            vote = Vote.objects.get(rumor=rumor, voter=user)
            if vote.change_count >= 3:
                 print("DEBUG: Max vote changes reached")
                 return Response({'error': 'Max vote changes reached'}, status=status.HTTP_400_BAD_REQUEST)
            vote.change_count += 1
        except Vote.DoesNotExist:
            vote = Vote(rumor=rumor, voter=user)
        
        vote_type = request.data.get('vote_type')
        if not vote_type:
            print("DEBUG: vote_type missing")
            return Response({'error': 'vote_type required'}, status=status.HTTP_400_BAD_REQUEST)
        
        vote.vote_type = vote_type
        # Map type to value
        vote_map = {'VERIFY': 1.0, 'UNCERTAIN': 0.5, 'DISPUTE': 0.0}
        vote.vote_value = vote_map.get(vote_type, 0.5)
        
        # Snapshot weight
        rep = user.profile_trust_score
        weight = Decimal(math.sqrt(rep)) / Decimal('10.0')
        vote.weight_snapshot = weight
        vote.voter_reputation_snapshot = rep
        
        vote.save()
        
        # Trigger Async Task
        try:
            update_trust_score_task.delay(rumor.rumor_id)
            message = 'Vote cast. Trust score updating in background.'
        except Exception as e:
             print(f"DEBUG: Async task failed: {e}")
             calculate_trust_score(rumor.rumor_id)
             message = 'Vote cast. Trust score updated.'
        
        return Response({
            'status': 'vote cast',
            'vote_weight': float(weight),
            'message': message
        })

class ProofViewSet(viewsets.ModelViewSet):
    queryset = Proof.objects.all()
    serializer_class = ProofSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        rumor_id = self.request.query_params.get('rumor')
        if rumor_id:
            queryset = queryset.filter(rumor_id=rumor_id)
        return queryset.order_by('-trust_score', '-created_at')

    def perform_create(self, serializer):
        proof = serializer.save(poster=self.request.user)
        try:
            update_trust_score_task.delay(proof.rumor.rumor_id)
        except Exception:
            calculate_trust_score(proof.rumor.rumor_id)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        proof = self.get_object()
        user = request.user
        
        try:
            vote = ProofVote.objects.get(proof=proof, voter=user)
        except ProofVote.DoesNotExist:
            vote = ProofVote(proof=proof, voter=user)
        
        vote_type = request.data.get('vote_type') 
        
        if not vote_type:
             return Response({'error': 'vote_type required'}, status=status.HTTP_400_BAD_REQUEST)

        vote.vote_type = vote_type
        if vote_type == 'SUPPORTS': val = Decimal('1.0')
        elif vote_type == 'REFUTES': val = Decimal('0.0')
        else: val = Decimal('0.5')
        
        vote.vote_value = val
        
        rep = user.profile_trust_score
        weight = Decimal(math.sqrt(rep)) / Decimal('10.0')
        vote.weight_snapshot = weight
        
        vote.save()
        
        update_proof_trust_score(proof.proof_id)
        
        return Response({'status': 'vote cast on proof'})
