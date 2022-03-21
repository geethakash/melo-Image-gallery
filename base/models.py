from datetime import date
from email.policy import default
from pyexpat import model
import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.ImageField(null=False, default="image-not-available.png")
    caption = models.CharField(default="", null=False, max_length=200)
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    def __str__(self) -> str:
        return self.caption


class UserAvatar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    avatar = models.ImageField(null=False, default="default-user.png")
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True)
