from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from meals_and_dishes.serializers import MealsAndDishesSerializer
from meals_and_dishes.models import MealsAndDishes
from django.http import Http404

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
        query_params = request.query_params

        # Check if search_id is provided in the query parameters
        search_name = query_params.get('search_name')
        if search_name:
            try:
                mealsList = []
                meal = MealsAndDishes.objects.get(title__iexact=search_name)
                serializer = MealsAndDishesSerializer(meal)
                mealsList.append(serializer.data)
                
                return Response(mealsList, status=status.HTTP_200_OK)
            except MealsAndDishes.DoesNotExist:
                raise Http404("Order does not exist")
            
        meals_and_dishes = MealsAndDishes.objects.all()

        serializer = MealsAndDishesSerializer(meals_and_dishes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

# Get single meal and dishes


@api_view(['GET'])
def get_meal_and_dishes(request, meal_id):
    if request.method == 'GET':
        meal = MealsAndDishes.objects.get(id=meal_id)

        serializer = MealsAndDishesSerializer(meal)

        return Response(serializer.data, status=status.HTTP_200_OK)

# Update meal status


@api_view(['PUT'])
def update_meal_status(request, meal_id):
    try:
        meal = MealsAndDishes.objects.get(id=meal_id)
    except MealsAndDishes.DoesNotExist:
        return Response({"message": "Meal or Dishes not found!"}, status=status.HTTP_404_NOT_FOUND)

    # Update the is_ready field depending on the previous state
    if meal.is_ready == True:
        meal.is_ready = False
    else:
        meal.is_ready = True
    meal.save()

    # Serialize the updated meal
    serializer = MealsAndDishesSerializer(meal)
    return Response(serializer.data)


# Update meal
@api_view(['PUT'])
def update_meal(request, meal_id):
    try:
        meal = MealsAndDishes.objects.get(id=meal_id)
    except MealsAndDishes.DoesNotExist:
        return Response({"message": "Meal or Dishes not found!"}, status=status.HTTP_404_NOT_FOUND)
    meal.title = request.data.get('title')
    meal.details = request.data.get('details')
    meal.qty = request.data.get('qty')
    meal.media_url = request.data.get('media_url')
    meal.price = request.data.get('price')
    meal.save()

    # Serialize the updated meal
    serializer = MealsAndDishesSerializer(meal)
    return Response(serializer.data)

# Delete meal & Dishes


@api_view(['DELETE'])
def delete_meal(request, meal_id):
    try:
        meal = MealsAndDishes.objects.get(id=meal_id)
    except MealsAndDishes.DoesNotExist:
        return Response({"message": "Meal or Dishes not found!"}, status=status.HTTP_404_NOT_FOUND)
    meal.delete()
    return Response({"message": "Item deleted successfully!"})
