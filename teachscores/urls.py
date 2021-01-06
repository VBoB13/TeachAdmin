from django.urls import include, path

from . import views

app_name = 'teachscores'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('schools/', views.schools, name='schools'),
]
