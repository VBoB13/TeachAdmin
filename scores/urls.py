from django.urls import path
from . import views

urlpatterns = [
    path('scores/', views.SchoolListCreate.as_view(), name='list_create'),
]
