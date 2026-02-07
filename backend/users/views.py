from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta
import random
import uuid
from django.core.mail import send_mail
from django.conf import settings

from .models import User, EmailVerification
from .serializers import RegisterSerializer, UserSerializer
from .utils import hash_email

class GenerateOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # In production, check .nust.edu.pk here if strict
        # if not email.endswith('.nust.edu.pk'):
        #     return Response({'error': 'Only NUST emails allowed'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if email limit reached? (Rate limiting TODO)

        otp = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=10)

        # Remove previous pending verifications for this email to avoid clutter
        # logic: strictly one active otp per email?
        EmailVerification.objects.filter(email=email, is_used=False).delete()

        EmailVerification.objects.create(
            email=email,
            otp=otp,
            expires_at=expires_at
        )

        # Development: Print to console
        print(f"OTP for {email}: {otp}")

        # Send email
        try:
            send_mail(
                'Veritas Verification Code',
                f'Your verification code is: {otp}',
                None,  # Uses DEFAULT_FROM_EMAIL
                [email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
            # In production, you might want to return an error, 
            # but for MVP dev we allow it to proceed if printed to console.
            # Only return error if we are NOT in debug mode (production)
            if not settings.DEBUG:
                return Response({'error': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'error': 'Email and OTP required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            verification = EmailVerification.objects.filter(
                email=email, 
                otp=otp, 
                is_used=False,
                expires_at__gt=timezone.now()
            ).latest('created_at')
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Don't mark as used yet? Or do we? 
        # If we mark used, user might fail registration step and need new OTP.
        # Better strategy: Return verification_id. Mark used only when constructing User.
        # But we need to ensure this verification_id isn't reused.
        
        return Response({
            'message': 'OTP verified',
            'verification_id': verification.verification_id
        }, status=status.HTTP_200_OK)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        verification_id = request.data.get('verification_id')
        username = request.data.get('username')
        password = request.data.get('password')

        if not verification_id:
             return Response({'error': 'Verification ID required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            verification = EmailVerification.objects.get(verification_id=verification_id)
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Invalid verification ID'}, status=status.HTTP_400_BAD_REQUEST)

        if verification.is_used:
            return Response({'error': 'Verification ID already used'}, status=status.HTTP_400_BAD_REQUEST)
        
        if verification.expires_at < timezone.now():
            return Response({'error': 'Verification expired'}, status=status.HTTP_400_BAD_REQUEST)

        # Check existing user with this email hash
        email_hash = hash_email(verification.email)
        if User.objects.filter(email_hash=email_hash).exists():
             return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate username/password via serializer
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=username,
                password=password,
                email_hash=email_hash
            )
            
            # Mark verification used
            verification.is_used = True
            verification.save()

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
