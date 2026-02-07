from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RumorViewSet, ProofViewSet

router = DefaultRouter()
router.register(r'rumors', RumorViewSet, basename='rumor') # /api/v1/rumors/rumors/ ?? Check backend/urls.py
# In backend/urls.py: path('api/v1/rumors/', include('rumors.urls'))
# If we register(r'', RumorViewSet), it becomes /api/v1/rumors/ (list) and /api/v1/rumors/{id}/ (detail) matches nicely.
router.register(r'proofs', ProofViewSet, basename='proof')

urlpatterns = [
    path('', include(router.urls)),
]
