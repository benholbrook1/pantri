import uuid
from django.db import models
from django.conf import settings

class UUIDBaseModel(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True # so Django doesn't actually create a table for this class

class Category(UUIDBaseModel):
    name = models.CharField(max_length=100) # e.g., Produce, Dairy
    def __str__(self): return self.name

class Location(UUIDBaseModel):
    name = models.CharField(max_length=100) # e.g., Fridge, Pantry, Freezer
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    capacity = models.PositiveIntegerField(default=50)

    def __str__(self): return self.name

class GroceryList(UUIDBaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

class ListItem(UUIDBaseModel):
    list = models.ForeignKey(GroceryList, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    is_checked = models.BooleanField(default=False)


class BaseItem(UUIDBaseModel): # Base "catalog item"
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self): return self.name

class PantryItem(UUIDBaseModel): # associated with a given user
    class Status(models.TextChoices):
        FULL = 'FULL', 'Full'
        HALF = 'HALF', 'Half'
        LOW = 'LOW', 'Low'
        GONE = 'GONE', 'Gone'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    base_item = models.ForeignKey(BaseItem, on_delete=models.CASCADE) # Points to the catalog
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=10, 
        choices=Status.choices, 
        default=Status.FULL
    )

    def __str__(self):
        return f"{self.base_item.name} ({self.status})"