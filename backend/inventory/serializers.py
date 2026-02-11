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
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Location
        fields = ['uuid', 'name', 'capacity', 'item_count']
        read_only_fields = ['uuid']


class PantryItemSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source='base_item.name', read_only=True)
    category = serializers.CharField(source ='base_item.category', read_only=True)
    location = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = PantryItem
        fields = [
            'uuid', 
            'name', 
            'category', 
            'location',
            'expiry_date',
            'status',
        ]
        read_only_fields = ['uuid']