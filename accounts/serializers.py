from accounts.models import CustomUser, Admin, Cook, Waiter
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        custom_claims = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        token.payload.update(custom_claims)

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

# New accounts


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'contact', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class AdminSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all())

    class Meta:
        model = Admin
        fields = ['id', 'user', 'id_number']


class AdminReadSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Admin
        fields = ['id', 'user', 'id_number']

    # Flatten serializer data to be one dictionary
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_representation = representation.pop('user')
        for key in user_representation:
            if key != 'id':
                representation[key] = user_representation[key]
            representation['user_id'] = user_representation['id']
        return representation


class CookSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Cook
        fields = ['id', 'user', 'full_name']


class WaiterSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Waiter
        fields = ['id', 'user', 'full_name']
