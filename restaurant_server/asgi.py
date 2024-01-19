# your_project/asgi.py
# from mpesa.urls import urlpatterns as mpesa_websocket_urlpatterns
# from channels_app.routing import websocket_urlpatterns as channels_app_websocket_urlpatterns
from channels_app.consumers import TransactionConsumer
from django.urls import path
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels_app.routing import websocket_urlpatterns  # Adjust the import

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_server.settings')


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        [
            path("ws/transactions/", TransactionConsumer.as_asgi()),
        ]
    ),
})
