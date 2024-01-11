from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission, Group
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15)

    objects = CustomUserManager()

    # Add unique related_name for groups and user_permissions
    groups = models.ManyToManyField(
        Group, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(
        Permission, related_name='custom_user_permissions')

    class Meta:
        ordering = ['username']

    def __str__(self):
        return self.username


class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    id_number = models.CharField(max_length=20)


class Customer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class Staff(models.Model):
    CHEF = 'Chef'
    WAITER = 'Waiter'

    ROLE_CHOICES = [
        (CHEF, 'Chef'),
        (WAITER, 'Waiter'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES)
