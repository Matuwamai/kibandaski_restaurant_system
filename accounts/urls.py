from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import CustomerRegistrationView, AdminRegistrationView, AdminListView, AdminDetailView, AdminUpdateView, UserDeleteView, CustomerListView, CustomerDetailView, CustomerUpdateView, StaffRegistrationView, StaffListView, StaffDetailView, StaffUpdateView

urlpatterns = [
    path('login', views.login),
    path('register', views.register),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customers/register/', CustomerRegistrationView.as_view()),
    path('customers/', CustomerListView.as_view()),
    path('customers/<int:pk>/', CustomerDetailView.as_view()),
    path('customers/<int:pk>/update/', CustomerUpdateView.as_view()),
    path('admins/register/', AdminRegistrationView.as_view()),
    path('admins/', AdminListView.as_view()),
    path('admins/<int:pk>/', AdminDetailView.as_view()),
    path('admins/<int:pk>/update/', AdminUpdateView.as_view()),
    path('staff/register/', StaffRegistrationView.as_view()),
    path('staff/', StaffListView.as_view()),
    path('staff/<int:pk>/', StaffDetailView.as_view()),
    path('staff/<int:pk>/update/', StaffUpdateView.as_view()),
    path('<int:pk>/delete/', UserDeleteView.as_view()),
]
