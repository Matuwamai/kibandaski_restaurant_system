from django.urls import path
from mpesa.views import TokenGeneratorView, PaymentView

urlpatterns = [
    path('token/', TokenGeneratorView.as_view()),
    path('stk-push/', PaymentView.as_view()),
]
