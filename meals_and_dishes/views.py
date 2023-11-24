from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from meals_and_dishes.serializers import MealsAndDishesSerializer
from meals_and_dishes.models import MealsAndDishes


@api_view()
def hello_world(request):
    return Response({"message": "Hello, world!"})


@api_view(['POST'])
def create_meals_and_dishes(request):
    if request.method == 'POST':
        serializer = MealsAndDishesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Meal created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get all meals and dishes
@api_view(['GET'])
def list_meals_and_dishes(request):
    if request.method == 'GET':
        meals_and_dishes = MealsAndDishes.objects.all()

        serializer = MealsAndDishesSerializer(meals_and_dishes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
