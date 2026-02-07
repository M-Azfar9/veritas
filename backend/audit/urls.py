from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReputationEventViewSet

router = DefaultRouter()
router.register(r'reputation', ReputationEventViewSet, basename='reputation')

urlpatterns = [
    path('', include(router.urls)),
]
