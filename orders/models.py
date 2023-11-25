from django.db import models
from django.utils import timezone
from meals_and_dishes.models import MealsAndDishes


class Order(models.Model):
    order_items = models.ManyToManyField(MealsAndDishes)
    table_no = models.IntegerField()
    customer_name = models.CharField(max_length=255)
    amount = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(
        max_length=10, choices=[("CASH", "Cash"), ("MPESA", "M-Pesa")])

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"
