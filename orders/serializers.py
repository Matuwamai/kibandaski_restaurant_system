from rest_framework import serializers
from meals_and_dishes.models import MealsAndDishes
from meals_and_dishes.serializers import MealsAndDishesSerializer
from orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_items', 'table_no', 'customer_name',
                  'amount', 'is_completed', 'created_at', 'payment_method']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealsAndDishes
        fields = ['id', 'details', 'qty', 'price', 'media_url', 'is_ready']


class ListOrdersSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'order_items', 'table_no', 'customer_name',
                  'amount', 'is_completed', 'created_at', 'payment_method']

    def get_order_items(self, obj):
        order_items = obj.order_items.all()
        return OrderItemSerializer(order_items, many=True).data
