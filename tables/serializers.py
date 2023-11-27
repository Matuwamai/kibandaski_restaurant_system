from rest_framework import serializers
from tables.models import RestaurantTable


class RestaurantTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantTable
        fields = ['table_no', 'qr_code']
