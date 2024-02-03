# channels_app/consumers.py
import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer


class SSEConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        # Send initial message to the client
        await self.send_message("Connection established")

        # Simulate periodic updates every 10 seconds
        while True:
            await asyncio.sleep(10)
            await self.send_message("Update message")

    async def send_message(self, message):
        await self.send(text_data=json.dumps({"message": message}))
