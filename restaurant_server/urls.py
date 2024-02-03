from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('meals-and-dishes/', include('meals_and_dishes.urls')),
    path('orders/', include('orders.urls')),
    path('tables/', include('tables.urls')),
    path('users/', include('accounts.urls')),
    path('mpesa/', include('mpesa.urls')),
    # path('', include('channels_app.routing')),
]
