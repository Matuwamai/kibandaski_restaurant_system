from rest_framework import serializers
from meals_and_dishes.models import MealsAndDishes


class MealsAndDishesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealsAndDishes
        fields = ['details', 'qty', 'media_url', 'price', 'is_ready']
