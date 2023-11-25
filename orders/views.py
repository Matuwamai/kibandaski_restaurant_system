from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from orders.serializers import OrderSerializer
from meals_and_dishes.models import MealsAndDishes


@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        order = serializer.save()
        return Response({"message": "Order created successfully", "order_id": order.id})

    return Response(serializer.errors, status=400)
