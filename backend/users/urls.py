from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, GenerateOTPView, VerifyOTPView, UserProfileView,
    CustomTokenObtainPairView, RequestDeviceOTPView, VerifyDeviceView
)

urlpatterns = [
    # Auth
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('otp/generate/', GenerateOTPView.as_view(), name='generate_otp'),
    path('otp/verify/', VerifyOTPView.as_view(), name='verify_otp'),
    
    # Device Verification
    path('device/request-otp/', RequestDeviceOTPView.as_view(), name='request_device_otp'),
    path('device/verify/', VerifyDeviceView.as_view(), name='verify_device'),
    
    # User Profile
    path('profile/', UserProfileView.as_view(), name='profile'),
]
