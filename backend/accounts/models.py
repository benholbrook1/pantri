from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    """
    Custom User model for the project. 
    Currently identical to default User, but ready for future expansion.
    """
    uuid = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    def __str__(self):
        return self.username