from django.urls import path
from mpesa.views import TokenGeneratorView, PaymentView, handle_mpesa_callback

urlpatterns = [
    path('token/', TokenGeneratorView.as_view()),
    path('stk-push/', PaymentView.as_view()),
    path('mpesa-callback/<str:client_id>/', handle_mpesa_callback)
]
