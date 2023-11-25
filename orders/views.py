from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from orders.serializers import OrderSerializer, ListOrdersSerializer
from orders.models import Order


@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        order = serializer.save()
        return Response({"message": "Order created successfully", "order_id": order.id})

    return Response(serializer.errors, status=400)


@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.all()
    serializer = ListOrdersSerializer(orders, many=True)
    return Response(serializer.data)
