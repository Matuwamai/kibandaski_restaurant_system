# channels_app/consumers.py
import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer


class SSEConsumer(AsyncWebsocketConsumer):
    clients = {}
    async def connect(self):
        await self.accept()

        # Send initial message to the client
        await self.send_message("Connection established")

        # Add the connected client to the "order_group" group
        await self.channel_layer.group_add("order_group", self.channel_name)
        user_id = self.scope['query_string'].decode().split('=')[1]
        # Add this client to the clients dictionary
        self.clients[user_id] = self

    async def disconnect(self, close_code):
        # Remove the connected client from the "order_group" group
        await self.channel_layer.group_discard("order_group", self.channel_name)
        user_id = self.scope['query_string'].decode().split('=')[1]

        # Remove this client from the clients dictionary
        del self.clients[user_id]
    
    async def send_order(self, event):
        # Send the "send_order" message to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def complete_order(self, event):
        # Send the "send_order" message to the WebSocket
        await self.send(text_data=json.dumps(event))

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message_type = data.get("type")

            if message_type == "send_order":
                await self.send(text_data=json.dumps(data["data"]))

            if message_type == "initiate_payment":
                await self.send_message_to_client(self.channel_name, {"status": "success"})
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)

    async def send_message(self, message):
        await self.send(text_data=json.dumps({"data": message}))
    
    @classmethod
    async def send_message_to_client(cls, client_channel_name, message):
        # Send a message to a specific client identified by the channel name
        if client_channel_name in cls.clients:
            await cls.clients[client_channel_name].send_message(message)
