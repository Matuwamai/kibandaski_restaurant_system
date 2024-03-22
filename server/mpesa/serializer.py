from rest_framework import serializers
from mpesa.models import MpesaTransaction


class CompletedTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaTransaction
        fields = ['id', 'amount', 'balance', 'receiptNumber', 'transactionDate',
                  'phoneNumber', 'fullName', 'order_id']
