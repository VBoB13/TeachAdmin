from django.urls import include, path

from . import views

app_name = 'students'

urlpatterns = [
    path('', views.StudentList.as_view(), name='list'),
]
