from django.urls import include, path

from . import views

app_name = 'courses'

urlpatterns = [
    path('all/', views.CoursesListCreateView.as_view(),
         name='course-list-create'),
    path('<int:pk>/', views.CoursesDetailView.as_view(), name='course-detail'),
    path('<int:pk>/enroll', views.EnrollStudentsView.as_view(), name='enroll-students'),
    path('subjects/', views.SubjectListCreateView.as_view(), name='course-subjects'),
    path('subjects/<int:pk>/', views.SubjectDetailView.as_view(), name='subject-detail'),
]
