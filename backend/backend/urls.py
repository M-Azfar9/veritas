from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('users.urls')),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/rumors/', include('rumors.urls')),
    path('api/v1/audit/', include('audit.urls')), 
]
