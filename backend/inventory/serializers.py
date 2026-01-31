from rest_framework import serializers
from .models import PantryItem, Category, Location, GroceryList, ListItem

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['uuid', 'list', 'name', 'is_checked']
        read_only_fields = ['uuid']

class GroceryListSerializer(serializers.ModelSerializer):
    items = ListItemSerializer(many=True, read_only=True)

    class Meta:
        model = GroceryList
        fields = ['uuid', 'name', 'created_at', 'items']
        read_only_fields = ['uuid', 'created_at']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['uuid', 'name']
        read_only_fields = ['uuid']


class PantryItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = PantryItem
        fields = [
            'uuid', 'name', 'status', 'quantity', 
            'category', 'category_name', 
            'location', 'location_name', 
            'expiry_date'
        ]
        read_only_fields = ['uuid']