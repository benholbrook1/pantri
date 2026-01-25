# backend/core/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Prefix everything with /api/ to keep it separate from Admin/Media
    path('api/auth/', include('accounts.urls')),
    path('api/inventory/', include('inventory.urls')),
]