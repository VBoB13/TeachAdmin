from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index),
    path('auth/', views.index),
    path('whoami/', views.index),
]
