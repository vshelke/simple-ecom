from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class BaseUser(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        db_table = "base_user"
        verbose_name = "Base User"
        verbose_name_plural = "Base Users"

    def __str__(self):
        return self.username

    @property
    def name(self):
        return self.get_full_name()
