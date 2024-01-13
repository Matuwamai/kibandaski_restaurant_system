from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import CustomerRegistrationView, AdminRegistrationView, AdminListView, AdminDetailView, AdminUpdateView, AdminDeleteView, UserDeleteView, CustomerListView, CustomerDetailView, CustomerUpdateView, CustomerDeleteView, StaffRegistrationView

urlpatterns = [
    path('login', views.login),
    path('register', views.register),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customers/register/', CustomerRegistrationView.as_view()),
    path('customers/', CustomerListView.as_view()),
    path('customers/<int:pk>/', CustomerDetailView.as_view()),
    path('customers/<int:pk>/update/', CustomerUpdateView.as_view()),
    path('customers/<int:pk>/delete/', CustomerDeleteView.as_view()),
    path('admins/register/', AdminRegistrationView.as_view()),
    path('admins/', AdminListView.as_view(), name='admin-list'),
    path('admins/<int:pk>/', AdminDetailView.as_view(), name='admin-detail'),
    path('admins/<int:pk>/update/', AdminUpdateView.as_view(), name='admin-update'),
    path('admins/<int:pk>/delete/', AdminDeleteView.as_view(), name='admin-delete'),
    path('delete/', UserDeleteView.as_view(), name='users-delete'),
    path('staff/register/', StaffRegistrationView.as_view()),
]
