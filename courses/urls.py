from django.urls import include, path

from . import views

app_name = 'courses'

urlpatterns = [
    path('', views.CoursesListCreateView.as_view(), name='courses-list-create'),
]
