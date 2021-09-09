from django.contrib.auth.models import User
from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from django_countries.serializer_fields import CountryField
from .models import Teacher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password')


class TeacherSerializer(CountryFieldMixin, serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    country = CountryField(country_dict=True)
    career_profile = serializers.URLField(required=False)

    class Meta:
        model = Teacher
        fields = (
            'id',
            'user',
            'country',
            'career_profile',
            'date_joined')


class RegisterTeacherSerializer(CountryFieldMixin, serializers.ModelSerializer):
    country = CountryField(country_dict=True)
    career_profile = serializers.URLField(required=False)

    class Meta:
        model = Teacher
        fields = (
            'country',
            'career_profile')


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    teacher = RegisterTeacherSerializer(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name',
                  'last_name', 'password', 'teacher')
        depth = 0

    def create(self, validated_data, instance=None):
        teacher_data = validated_data.pop('teacher')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Teacher.objects.update_or_create(user=user, **teacher_data)
        return user
