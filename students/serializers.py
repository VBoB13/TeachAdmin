from rest_framework import serializers
from django_countries.serializers import CountryFieldMixin
from django_countries.serializer_fields import CountryField

from .models import Student
from accounts.models import Teacher


class StudentSerializer(serializers.ModelSerializer, CountryFieldMixin):
    country = CountryField()

    class Meta:
        model = Student
        fields = '__all__'


class TeacherStudentSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)

    class Meta:
        model = Teacher
        fields = ('id', 'students',)
