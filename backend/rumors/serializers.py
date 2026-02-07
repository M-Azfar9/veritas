from rest_framework import serializers
from .models import Rumor, Vote, Proof, ProofVote
from users.serializers import UserSerializer

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['vote_type', 'vote_value']
    
    def validate(self, data):
        # Map vote_type to vote_value if not provided?
        vote_map = {'VERIFY': 1.0, 'UNCERTAIN': 0.5, 'DISPUTE': 0.0}
        if 'vote_type' in data:
            data['vote_value'] = vote_map.get(data['vote_type'])
        return data

class RumorSerializer(serializers.ModelSerializer):
    vote_count = serializers.IntegerField(read_only=True)
    proof_count = serializers.IntegerField(read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = Rumor
        fields = [
            'rumor_id', 'content', 'evidence_type', 'evidence_url',
            'trust_score', 'vote_score', 'proof_score', 'momentum_score',
            'classification', 'is_frozen', 'created_at',
            'vote_count', 'proof_count', 'author_username', 'user_vote'
        ]
        read_only_fields = [
            'rumor_id', 'trust_score', 'vote_score', 'proof_score', 'momentum_score',
            'classification', 'is_frozen', 'created_at', 'vote_count', 'proof_count', 'author_username', 'user_vote'
        ]

    def get_user_vote(self, obj):
        # Optimized: prefetch user_vote in ViewSet
        # Or simple query for MVP
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                vote = Vote.objects.get(rumor=obj, voter=request.user)
                return vote.vote_type
            except Vote.DoesNotExist:
                return None
        return None

class ProofSerializer(serializers.ModelSerializer):
    poster_username = serializers.CharField(source='poster.username', read_only=True)
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = Proof
        fields = '__all__'
        read_only_fields = ['proof_id', 'trust_score', 'vote_count', 'is_mature', 'is_classified', 'created_at']

    def get_user_vote(self, obj):
         request = self.context.get('request')
         if request and request.user.is_authenticated:
             try:
                 vote = ProofVote.objects.get(proof=obj, voter=request.user)
                 return vote.vote_type
             except ProofVote.DoesNotExist:
                 return None
         return None
