from django.urls import include, path

from . import views

app_name = 'students'

urlpatterns = [
    path('all/', views.StudentList.as_view(), name='list'),
    path('<pk>/', views.StudentDetail.as_view(), name='detail'),
]
