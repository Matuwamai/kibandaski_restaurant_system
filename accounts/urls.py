from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import CustomerRegistrationView, AdminRegistrationView, AdminListView, AdminDetailView, AdminUpdateView, AdminDeleteView, UserDeleteView, CustomerListView

urlpatterns = [
    path('login', views.login),
    path('register', views.register),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/customer/', CustomerRegistrationView.as_view(),
         name='customer-registration'),
    path('customers/', CustomerListView.as_view()),
    path('register/admin/', AdminRegistrationView.as_view(),
         name='admin-registration'),
    path('admins/', AdminListView.as_view(), name='admin-list'),
    path('admins/<int:pk>/', AdminDetailView.as_view(), name='admin-detail'),
    path('admins/<int:pk>/update/', AdminUpdateView.as_view(), name='admin-update'),
    path('delete/', UserDeleteView.as_view(), name='users-delete'),
    path('admins/<int:pk>/delete/', AdminDeleteView.as_view(), name='admin-delete'),
]
