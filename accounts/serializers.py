from accounts.models import CustomUser, Admin, Customer, Staff
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
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
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'contact', 'password']

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super().update(instance, validated_data)


# Same as CustomUserSerializer but must take first and last names
class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name',
                  'email', 'contact', 'password']
        extra_kwargs = {'password': {'write_only': True}}

# Admin


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

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        # update the Admin fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # update the User fields
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

# Staff serializers


class StaffSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all())

    class Meta:
        model = Staff
        fields = ['id', 'user', 'id_number']


class StaffReadSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Admin
        fields = ['id', 'role']

    # Flatten serializer data to be one dictionary
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_representation = representation.pop('user')
        for key in user_representation:
            if key != 'id':
                representation[key] = user_representation[key]
            representation['user_id'] = user_representation['id']
        return representation

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        # update the Admin fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # update the User fields
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance


class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all())

    class Meta:
        model = Customer
        fields = ['id', 'user']

# Serializer to read Customers


class CustomerReadSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Admin
        fields = ['id', 'user']

    # Flatten serializer data to be one dictionary
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_representation = representation.pop('user')
        for key in user_representation:
            if key != 'id':
                representation[key] = user_representation[key]
            representation['user_id'] = user_representation['id']
        return representation

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        # update the Admin fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # update the User fields
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance
