from django.contrib.auth.models import User
from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from django_countries.serializer_fields import CountryField
from .models import Teacher

class TeacherSerializer(CountryFieldMixin, serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    country = CountryField(name_only=True)
    career_profile = serializers.URLField(required=False)
    
    class Meta:
        model = Teacher
        fields = ('id', 'user', 'country', 'career_profile')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    teacher = TeacherSerializer(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password', 'teacher')

    def create(self, validated_data, instance=None):
        teacher_data = validated_data.pop('teacher')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Teacher.objects.update_or_create(user=user, **teacher_data)
        return user