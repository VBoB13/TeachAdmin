from django.shortcuts import render
from django.http import Http404

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django_countries import countries

from accounts.models import Teacher
from students.models import Student
from .serializers import StudentSerializer, TeacherStudentSerializer

# Create your views here.


class StudentList(APIView):
    """
    List all students of the current Teacher, or create a new Student.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_teacher(self, user):
        try:
            return Teacher.objects.get(user=user)
        except:
            raise Http404

    def get(self, request, format=None):
        teacher = self.get_teacher(request.user)
        serializer = TeacherStudentSerializer(instance=teacher)
        countries_opt = dict(countries)
        return Response(data={"data": serializer.data, "countries": countries_opt})

    def post(self, request, format=None):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        teacher = self.get_teacher(self.request.user)
        serializer.save(teacher=teacher)


class StudentDetail(APIView):
    """
    Retrieve, update or delete a student instance.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def get_teacher(self, user):
        try:
            return Teacher.objects.get(user=user)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        student = self.get_object(pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        student = self.get_object(pk)
        serializer = StudentSerializer(data=request.data, instance=student)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        student = self.get_object(pk)
        current_teacher = self.get_teacher(request.user)
        if current_teacher == student.teacher:
            student.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(data={"message": "ERROR: Can't delete other teachers' students."}, status=status.HTTP_403_FORBIDDEN)
