from django.urls import path
from tables import views

urlpatterns = [
    path('create', views.create_table, name='create_table'),
    path('list', views.list_tables, name='list_all_tables'),
    path('delete/<int:table_id>', views.delete_table, name='delete_table')
]
