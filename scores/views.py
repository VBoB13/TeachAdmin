from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework import generics

from .models import School
from .serializers import SchoolSerializer

# Create your views here.
class SchoolListCreate(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
