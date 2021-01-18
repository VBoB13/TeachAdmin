from django.shortcuts import render

from rest_framework import generics

from .models import School
from .serializers import SchoolSerializer

# Create your views here.
class SchoolListCreate(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
