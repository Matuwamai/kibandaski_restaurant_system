# your_project/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels_app.routing import websocket_urlpatterns  # Adjust the import

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_server.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        websocket_urlpatterns
    ),
})
