from django.contrib.auth.models import User
from rest_framework import serializers

from students.serializers import StudentSerializer
from accounts.models import Teacher
from students.models import Student
from courses.models import Subject, Course, CourseEnrollment


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)

    class Meta:
        model = Subject
        fields = '__all__'


class CourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseEnrollment
        fields = '__all__'


class StudentCourseSerializer(serializers.ModelSerializer):
    enrollments = CourseEnrollmentSerializer(many=True)

    class Meta:
        model = Student
        fields = 'enrollments'


class TeacherCoursesSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)

    class Meta:
        model = Teacher
        fields = ('courses',)


# class CourseDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'
