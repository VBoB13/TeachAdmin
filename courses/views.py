from pprint import pprint

from django.shortcuts import render
from django.http import Http404

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import Teacher
from students.models import Student
from .models import Subject, Course

from .serializers import CourseSerializer, TeacherCoursesSerializer, SubjectSerializer

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
        return Response(data=serializer.data, status=status.HTTP_200_OK)

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


class CoursesDetailView(APIView):
    """
    Retrieve, update or delete a course instance.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(data=request.data, instance=course)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            course = self.get_object(pk)
        except Course.DoesNotExist:
            print("Could not delete course!")
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            course.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class SubjectListCreateView(APIView):
    """
    List all Subjects available OR create a new Subject.
    """
    queryset = Subject.objects.all()

    def get(self, request, format=None):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        pprint(serializer.data)
        for value in serializer.data:
            print(value)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
