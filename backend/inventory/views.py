from rest_framework import viewsets, permissions
from .models import PantryItem, GroceryList, ListItem, Location
from .serializers import PantryItemSerializer, GroceryListSerializer, ListItemSerializer, LocationSerializer
from django.db.models import Count


class PantryItemViewSet(viewsets.ModelViewSet):
    serializer_class = PantryItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    # This ensures users only see their OWN items
    def get_queryset(self):
        return PantryItem.objects.filter(user=self.request.user).order_by('expiry_date')

    # When creating an item, automatically attach the current user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GroceryListViewSet(viewsets.ModelViewSet):
    serializer_class = GroceryListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Show lists belonging to the logged-in user, newest first
        return GroceryList.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically attach the new list to the current user
        serializer.save(user=self.request.user)

class ListItemViewSet(viewsets.ModelViewSet):
    serializer_class = ListItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ListItem.objects.filter(list__user=self.request.user)
    

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Location.objects.filter(user=self.request.user).annotate(
            item_count=Count('pantryitem')
        )