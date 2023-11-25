from rest_framework import serializers
from meals_and_dishes.models import MealsAndDishes
from meals_and_dishes.serializers import MealsAndDishesSerializer
from orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_items', 'table_no', 'customer_name',
                  'amount', 'is_completed', 'created_at', 'payment_method']
