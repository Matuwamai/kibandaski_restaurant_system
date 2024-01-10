from rest_framework import generics
from accounts.serializers import CustomUserSerializer, AdminSerializer, AdminReadSerializer, CookSerializer, WaiterSerializer
from accounts.models import Admin, Cook, Waiter
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenRefreshView


class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"message": "Invalid credentials"}, status=status.HTTP_404_NOT_FOUND)
    # Generate access token using MyTokenObtainPairSerializer
    access_token = MyTokenObtainPairSerializer().get_token(user)

    # Generate refresh token using RefreshToken
    refresh_token = RefreshToken.for_user(user)

    # Return both tokens and user data with 201 Created status code
    return Response({'access': str(access_token.access_token), 'refresh': str(refresh_token), }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Create a new user and hash the password
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        # Generate access token using MyTokenObtainPairSerializer
        access_token = MyTokenObtainPairSerializer().get_token(user)

        # Generate refresh token using RefreshToken
        refresh_token = RefreshToken.for_user(user)

        # Return both tokens and user data with 201 Created status code
        return Response({
            'access': str(access_token.access_token),
            'refresh': str(refresh_token),
        }, status=status.HTTP_201_CREATED)

    # If the data is not valid, return errors with 400 Bad Request status code
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()


class CustomerRegistrationView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'detail': 'Registration successful'}, status=status.HTTP_201_CREATED)


class AdminRegistrationView(generics.CreateAPIView):
    serializer_class = AdminSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})
        user_serializer = CustomUserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        admin_data = {'user': user.id,
                      'id_number': request.data.get('id_number')}
        admin_serializer = AdminSerializer(data=admin_data)
        admin_serializer.is_valid(raise_exception=True)
        admin_serializer.save()

        return Response({'detail': 'Admin registration successful'}, status=status.HTTP_201_CREATED)


class AdminListView(generics.ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminReadSerializer

# Get admin details


class AdminDetailView(generics.RetrieveAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminReadSerializer

# Update admin


class AdminUpdateView(generics.UpdateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminReadSerializer


class CookRegistrationView(generics.CreateAPIView):
    serializer_class = CookSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})
        user_serializer = CustomUserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        cook_data = {'user': user.id,
                     'full_name': request.data.get('full_name')}
        cook_serializer = CookSerializer(data=cook_data)
        cook_serializer.is_valid(raise_exception=True)
        cook_serializer.save()

        return Response({'detail': 'Cook registration successful'}, status=status.HTTP_201_CREATED)


class WaiterRegistrationView(generics.CreateAPIView):
    serializer_class = WaiterSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data.get('user', {})
        user_serializer = CustomUserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        waiter_data = {'user': user.id,
                       'full_name': request.data.get('full_name')}
        waiter_serializer = WaiterSerializer(data=waiter_data)
        waiter_serializer.is_valid(raise_exception=True)
        waiter_serializer.save()

        return Response({'detail': 'Waiter registration successful'}, status=status.HTTP_201_CREATED)
