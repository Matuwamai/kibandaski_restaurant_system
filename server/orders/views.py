from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from orders.serializers import OrderSerializer
from orders.models import Order, OrderItem
from meals_and_dishes.models import MealsAndDishes
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

channel_layer = get_channel_layer()


async def send_order_update(type, order_data):
    group_name = "order_group"  # Group name for all connected OrderConsumers
    message = {"type": type, "data": order_data}
    await channel_layer.group_send(group_name, message)


def to_json(order):
    return json.dumps(order, default=lambda x: dict(x))


@api_view(['POST'])
def create_order(request):
    data = request.data
    orderItems = data['order_items']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        # (1) Create Order
        order = Order.objects.create(
            payment_method=data['payment_method'],
            customer_name=data['customer_name'],
            table_no=data['table_no'],
            amount=data['amount']
        )

        # (2) Create order items

        for i in orderItems:
            meal = MealsAndDishes.objects.get(id=i['id'])

            item = OrderItem.objects.create(
                meal=meal,
                order=order,
                title=meal.title,
                quantity=i['quantity'],
                price=i['price'],
                media_url=meal.media_url
            )

            # (4) Update Stock
            meal.save()
        
        order = Order.objects.get(id=order.id)
        order_serializer = OrderSerializer(order)
        print(order_serializer.data)
        async_to_sync(send_order_update)("send_order", to_json(order_serializer.data))

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

# Get all orders


@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
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
    serializer = OrderSerializer(order)
    async_to_sync(send_order_update)(
        "complete_order", to_json(serializer.data))
    return Response(serializer.data)


# UPDATE PAID ORDER
@api_view(['PUT'])
def update_order_to_paid(request, order_id):
    order = Order.objects.get(id=order_id)
    order.is_paid = True
    order.save()
    return Response('Order was paid')

# Delete Order


@api_view(['DELETE'])
def delete_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"message": "Order not found!"}, status=status.HTTP_404_NOT_FOUND)
    order.delete()
    return Response({"message": "Order deleted successfully!"})
