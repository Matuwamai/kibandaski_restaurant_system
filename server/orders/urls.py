from django.urls import path
from orders import views

urlpatterns = [
    path('create', views.create_order, name='create_order'),
    path('list', views.list_orders, name='list_all_orders'),
    path('edit-status/<int:order_id>', views.update_order_status,
         name='update_order_status'),
    path('delete/<int:order_id>', views.delete_order, name='delete_order')
]
