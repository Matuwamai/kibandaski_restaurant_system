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

# Get all orders


@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.all()
    serializer = ListOrdersSerializer(orders, many=True)
    return Response(serializer.data)

# Update order


@api_view(['PUT'])
def update_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"message": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update the is_completed field
    order.is_completed = True
    order.save()

    # Serialize the updated order
    serializer = ListOrdersSerializer(order)
    return Response(serializer.data)
