from django.db import models
from django.utils import timezone
from meals_and_dishes.models import MealsAndDishes


class Order(models.Model):
    # order_items = models.ManyToManyField(MealsAndDishes)
    table_no = models.IntegerField()
    customer_name = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    amount = models.FloatField(default=0.0)
    payment_method = models.CharField(
        max_length=10, choices=[("CASH", "Cash"), ("MPESA", "M-Pesa")])
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"


class OrderItem(models.Model):
    meal = models.ForeignKey(
        MealsAndDishes, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=100, null=True, unique=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.IntegerField(default=0)
    media_url = models.CharField(
        max_length=255)

    def __str__(self):
        return str(self.title)
