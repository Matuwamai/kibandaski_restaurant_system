from django.db import models


class MpesaTransaction(models.Model):
    amount = models.IntegerField()
    receiptNumber = models.CharField(max_length=150)
    balance = models.IntegerField()
    transactionDate = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)


