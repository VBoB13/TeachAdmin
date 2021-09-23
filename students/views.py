from django.shortcuts import render
from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import Teacher
from students.models import Student
from .serializers import StudentSerializer

# Create your views here.


class StudentList(APIView):
    """
    List all students of the current Teacher.
    """

    def get_teacher(self, user):
        try:
            return Teacher.objects.get(user=user)
        except:
            raise Http404

    def get(self, request, format=None):
        teacher = self.get_teacher(request.user)
        students = Student.objects.filter(teacher=teacher)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        teacher = self.get_teacher(self.request.user)
        serializer.save(teacher=teacher)
