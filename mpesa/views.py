# views.py
from django.views import View
from django.http import JsonResponse
import requests
from requests.auth import HTTPBasicAuth
import json
import os


class TokenGeneratorView(View):
    def get(self, request, *args, **kwargs):
        consumer_key = os.environ.get('MPESA_CONSUMER_KEY')
        consumer_secret = os.environ.get('MPESA_CONSUMER_SECRET')
        api_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

        r = requests.get(api_URL, auth=HTTPBasicAuth(
            consumer_key, consumer_secret))

        if r.status_code == 200:
            mpesa_access_token = json.loads(r.text)
            validated_mpesa_access_token = mpesa_access_token["access_token"]

            return JsonResponse({"token": validated_mpesa_access_token})
        else:
            return JsonResponse({"error": "Failed to generate token"}, status=r.status_code)
