# channels_app/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Web socket connected...")
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def send_transaction(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
