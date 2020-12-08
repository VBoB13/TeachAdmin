from django.urls import include, path

from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]
