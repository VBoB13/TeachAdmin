from rest_framework import serializers

from .models import Student
from accounts.models import Teacher


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class TeacherStudentSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)

    class Meta:
        model = Teacher
        fields = ('pk', 'students',)
