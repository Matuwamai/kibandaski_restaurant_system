from django.urls import path
from mpesa.views import TokenGeneratorView, PaymentView, handle_mpesa_callback, list_completed_transactions

urlpatterns = [
    path('token/', TokenGeneratorView.as_view()),
    path('stk-push/<int:order_id>/<str:user_id>', PaymentView.as_view()),
    path('mpesa-callback/<str:client_id>/<str:order_id>', handle_mpesa_callback),
    path('transactions/completed', list_completed_transactions),
]
