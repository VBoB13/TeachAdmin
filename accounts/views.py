from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import TemplateView
from django.contrib.auth import (authenticate,
                                login as django_login,
                                logout as django_logout)
from django.contrib.auth.mixins import LoginRequiredMixin

from . import forms

# Create your views here.


def index(request):
    return HttpResponse("Hello, World!")

def register(request):
    registered = False

    if request.method == "POST":
        user_form = forms.UserForm(request.POST)
        teacher_form = forms.TeacherForm(request.POST)

        if user_form.is_valid() and teacher_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            teacher = teacher_form.save(commit=False)
            teacher.user = user
            teacher.save()

            registered = True
        else:
            print(user_form.errors, teacher_form.errors)
    else:
        user_form = forms.UserForm()
        teacher_form = forms.TeacherForm()

    return render(request, "accounts/register.html", 
    {
        "title":"Register",
        "user_form":user_form,
        "teacher_form":teacher_form,
        "registered":registered
    })

def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                django_login(request, user)
                return HttpResponseRedirect(reverse('teachscores:index'))
            else:
                HttpResponse("Account Not Active")
        else:
            print("Someone tried to login and failed!")
            print("Username: {} \nPassword: {}".format(username, password))
            return HttpResponse("Invalid username and/or password.")
    else:
        return render(request, 'accounts/login.html')

def logout(request):
    django_logout(request)
    return HttpResponseRedirect(reverse('accounts:login'))


class IndexView(TemplateView, LoginRequiredMixin):
    login_url = "/accounts/login/"
    template_name = 'accounts/index.html'

    redirect_field_name = template_name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'Hello, World!'
        return context
