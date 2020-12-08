from django import forms
from django.contrib.auth.models import User
from .models import Teacher

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class TeacherForm(forms.ModelForm):
    class Meta:
        model = Teacher
        # Excluding the User OneToOneField
        exclude = ['user',]