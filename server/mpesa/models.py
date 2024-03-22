from django.db import models
from orders.models import Order


class MpesaTransaction(models.Model):
    amount = models.IntegerField()
    receiptNumber = models.CharField(max_length=150)
    balance = models.IntegerField()
    transactionDate = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    fullName = models.CharField(max_length=150, null=True, blank=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, default=21)


