from django.contrib import admin
from .models import Category, Location, BaseItem, GroceryList, ListItem, PantryItem

# This allows you to edit list items directly inside the Grocery List page
class ListItemInline(admin.TabularInline):
    model = ListItem
    extra = 1  # Number of empty rows to show by default

@admin.register(GroceryList)
class GroceryListAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    inlines = [ListItemInline]

@admin.register(PantryItem)
class PantryItemAdmin(admin.ModelAdmin):
    list_display = ('base_item', 'user', 'location', 'status', 'expiry_date')
    autocomplete_fields = ['base_item', 'user']
    list_filter = ('status', 'location', 'user')
    search_fields = ('base_item__name',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """
        Filters the 'location' dropdown to only show locations 
        belonging to the user assigned to this PantryItem.
        """
        if db_field.name == "location":
            # Get the ID of the pantry item being edited from the URL
            object_id = request.resolver_match.kwargs.get('object_id')
            if object_id:
                pantry_item = self.get_object(request, object_id)
                if pantry_item and pantry_item.user:
                    # Filter locations by the owner of the pantry item
                    kwargs["queryset"] = Location.objects.filter(user=pantry_item.user)
                else:
                    # If it's a brand new item with no user yet, show nothing or all
                    kwargs["queryset"] = Location.objects.none()
            
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

@admin.register(BaseItem)
class BaseItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name',)

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    list_filter = ('user',)
    search_fields = ('name', 'user__username')

admin.site.register(Category)
