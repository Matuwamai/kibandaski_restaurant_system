# your_app/routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from channels_app.consumers import SSEConsumer


websocket_urlpatterns = [
    path('ws/sse/', SSEConsumer.as_asgi()),
    # Add more URL patterns for other consumers as needed
]


application = ProtocolTypeRouter({
    "websocket": URLRouter(
        websocket_urlpatterns
    ),
})
