from django.shortcuts import render
from django.http import Http404

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import Teacher
from students.models import Student

from .serializers import CourseSerializer, TeacherCoursesSerializer

# Create your views here.


class CoursesListCreateView(APIView):
    """
    List all the courses related to the current teacher/user OR Create a new course.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_teacher(self, user):
        try:
            return Teacher.objects.get(user=user)
        except:
            raise Http404

    def get(self, request, format=None):
        teacher = self.get_teacher(request.user)
        serializer = TeacherCoursesSerializer(instance=teacher)
        return Response(data=serializer.data, status=status.HTTP_200)

    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        teacher = self.get_teacher(self.request.user)
        serializer.save(teacher=teacher)
