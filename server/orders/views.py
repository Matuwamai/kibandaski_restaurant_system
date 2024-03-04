from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from orders.serializers import OrderSerializer
from orders.models import Order, OrderItem
from meals_and_dishes.models import MealsAndDishes
from channels.layers import get_channel_layer
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from asgiref.sync import async_to_sync
import json
from math import ceil

channel_layer = get_channel_layer()


async def send_order_update(type, order_data):
    group_name = "order_group"  # Group name for all connected OrderConsumers
    message = {"type": type, "data": order_data}
    await channel_layer.group_send(group_name, message)


def to_json(order):
    return json.dumps(order, default=lambda x: dict(x))


@api_view(['GET'])
def order_statistics(request):
    # Total orders done
    total_orders = Order.objects.count()

    # Percentage change in orders compared to yesterday
    today_orders = Order.objects.filter(
        created_at__date=timezone.now()).count()
    yesterday_orders = Order.objects.filter(
        created_at__date=timezone.now() - timedelta(days=1)).count()
    if yesterday_orders != 0:
        order_percentage_change_yesterday = (
            today_orders / (today_orders + yesterday_orders)) * 100
    else:
        order_percentage_change_yesterday = 0

    # Percentage change in orders compared to last month
        
    current_month_orders = Order.objects.filter(
        created_at__year=timezone.now().year,
        created_at__month=timezone.now().month
    ).count()

    last_month_orders = Order.objects.filter(
        created_at__month=timezone.now().month - 1).count()
    if last_month_orders != 0:
        order_percentage_change_last_month = (
            current_month_orders / (current_month_orders + last_month_orders)) * 100
    else:
        order_percentage_change_last_month = 0

    # Total revenue generated from the total orders
    total_revenue = Order.objects.aggregate(
        total_revenue=Sum('amount'))['total_revenue']

    # Percentage change in revenue compared to yesterday
    today_revenue = Order.objects.filter(created_at__date=timezone.now(
    )).aggregate(total_revenue=Sum('amount'))['total_revenue']

    yesterday_revenue = Order.objects.filter(created_at__date=timezone.now(
    ) - timedelta(days=1)).aggregate(total_revenue=Sum('amount'))['total_revenue']

    if yesterday_revenue is not None and today_revenue is not None:
        revenue_percentage_change_yesterday = (
            today_revenue / (today_revenue + yesterday_revenue)) * 100
    else:
        revenue_percentage_change_yesterday = 0

    # Percentage change in revenue compared to last month
    current_month_revenue = Order.objects.filter(
        created_at__year=timezone.now().year,
        created_at__month=timezone.now().month
    ).aggregate(total_revenue=Sum('amount'))['total_revenue']

    last_month_revenue = Order.objects.filter(created_at__month=timezone.now(
    ).month - 1).aggregate(total_revenue=Sum('amount'))['total_revenue']
    if last_month_revenue is not None and current_month_revenue is not None:
        revenue_percentage_change_last_month = (
            current_month_revenue / (current_month_revenue + last_month_revenue)) * 100
    else:
        revenue_percentage_change_last_month = 0

    data = {
        'total_orders': total_orders,
        'today_orders': today_orders,
        'yesterday_orders': yesterday_orders,
        'order_percentage_change_yesterday': order_percentage_change_yesterday,
        'current_month_orders': current_month_orders,
        'last_month_orders': last_month_orders,
        'order_percentage_change_last_month': order_percentage_change_last_month,
        'total_revenue': total_revenue,
        'today_revenue': today_revenue,
        'yesterday_revenue': yesterday_revenue,
        'revenue_percentage_change_yesterday': revenue_percentage_change_yesterday,
        'current_month_revenue': current_month_revenue,
        'last_month_revenue': last_month_revenue,
        'revenue_percentage_change_last_month': revenue_percentage_change_last_month
    }

    return Response(data)


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
        async_to_sync(send_order_update)("send_order", to_json(order_serializer.data))

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

# Get all orders


@api_view(['GET'])
def list_orders(request):
    if request.method == 'GET':
        query_params = request.query_params
        print(query_params)

        page_number = int(query_params.get('pageNo', 1))

        page_size = 50

        # Get the total count of orders
        total_count = Order.objects.count()

        # Calculate the total number of pages
        total_pages = ceil(total_count / page_size)

        # Calculate the starting index for the queryset
        start_index = (page_number - 1) * page_size

        # Calculate the ending index for the queryset
        end_index = min(start_index + page_size, total_count)

        # Get orders for the specified page
        orders = Order.objects.all().order_by(
            '-created_at')[start_index:end_index]

        serializer = OrderSerializer(orders, many=True)

        # Construct response with pagination metadata
        response_data = {
            'offset': page_size,
            'total_pages': total_pages,
            'current_page': page_number,
            'orders': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
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
