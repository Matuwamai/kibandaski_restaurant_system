# channels_app/consumers.py
import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer


class SSEConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        # Send initial message to the client
        await self.send_message("Connection established")

        # Add the connected client to the "order_group" group
        await self.channel_layer.group_add("order_group", self.channel_name)

    async def disconnect(self, close_code):
        # Remove the connected client from the "order_group" group
        await self.channel_layer.group_discard("order_group", self.channel_name)
    
    async def send_order(self, event):
        # Send the "send_order" message to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def complete_order(self, event):
        # Send the "send_order" message to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type")

        if message_type == "send_order":
            await self.send(text_data=json.dumps(data["data"]))

    async def send_message(self, message):
        await self.send(text_data=json.dumps({"message": message}))
