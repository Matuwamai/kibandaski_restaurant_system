from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from meals_and_dishes.serializers import MealsAndDishesSerializer


@api_view()
def hello_world(request):
    return Response({"message": "Hello, world!"})
