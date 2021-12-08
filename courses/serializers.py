from django.contrib.auth.models import User
from rest_framework import serializers

from students.serializers import StudentSerializer
from accounts.models import Teacher
from students.models import Student
from courses.models import Subject, Course, CourseEnrollment




class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class SubjectToCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id',)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseEnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    comment = serializers.CharField(required=False)
    class Meta:
        model = CourseEnrollment
        fields = ('student', 'date', 'comment')


class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('courses',)


class TeacherCoursesSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)

    class Meta:
        model = Teacher
        fields = ('courses',)
