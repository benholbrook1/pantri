from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PantryItemViewSet, GroceryListViewSet, ListItemViewSet, LocationViewSet


router = DefaultRouter()
router.register(r'pantry-items', PantryItemViewSet, basename='pantryitem')
router.register(r'grocery-lists', GroceryListViewSet, basename='grocerylist')   
router.register(r'list-items', ListItemViewSet, basename='listitem')
router.register(r'locations', LocationViewSet, basename='locations')


urlpatterns = [
    path('', include(router.urls)),
]