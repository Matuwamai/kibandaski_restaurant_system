from django.urls import path
from mpesa.views import TokenGeneratorView

urlpatterns = [
    path('token/', TokenGeneratorView.as_view()),
]
