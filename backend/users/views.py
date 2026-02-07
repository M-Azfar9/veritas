
# ... imports ...
from .serializers import OTPSerializer, UserSerializer, EmailSerializer
from .custom_auth import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserDevice

# ... existing views ...

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RequestDeviceOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        
        if not username or not email:
            return Response({'error': 'Username and Email required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # Security: Don't reveal user existence? 
            # mimic success or generic error.
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Verify Email Hash
        input_hash = hash_email(email)
        if input_hash != user.email_hash:
             return Response({'error': 'Email does not match our records'}, status=status.HTTP_400_BAD_REQUEST)
             
        # Generate OTP (Reuse logic)
        otp = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=10)
        
        EmailVerification.objects.create(
            email=email,
            otp=otp,
            expires_at=expires_at
        )
        
        # Send Email
        print(f"Device Verification OTP for {username} ({email}): {otp}")
        try:
            send_mail(
                'Veritas Device Verification',
                f'Your device verification code is: {otp}',
                None,
                [email],
                fail_silently=False,
            )
        except Exception:
             if not settings.DEBUG:
                return Response({'error': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)

class VerifyDeviceView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        otp = request.data.get('otp')
        device_fingerprint = request.data.get('device_fingerprint')
        
        if not all([username, email, otp, device_fingerprint]):
             return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
             
        # 1. Verify OTP
        try:
            verification = EmailVerification.objects.filter(
                email=email, 
                otp=otp, 
                is_used=False,
                expires_at__gt=timezone.now()
            ).latest('created_at')
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
            
        # 2. Verify User
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
             return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
             
        if hash_email(email) != user.email_hash:
             return Response({'error': 'Email mismatch'}, status=status.HTTP_400_BAD_REQUEST)
             
        # 3. Approve Device
        # Find the device record created during failed login attempt (or create new)
        try:
            device = UserDevice.objects.get(user=user, fingerprint_hash=device_fingerprint)
            device.is_verified = True
            device.save()
        except UserDevice.DoesNotExist:
            UserDevice.objects.create(user=user, fingerprint_hash=device_fingerprint, is_verified=True, device_uuid=uuid.uuid4())
            
        # Mark OTP used
        verification.is_used = True
        verification.save()
        
        return Response({'message': 'Device verified. Please login again.'}, status=status.HTTP_200_OK)
