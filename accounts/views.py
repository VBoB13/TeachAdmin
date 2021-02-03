import json

from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.http import (HttpResponse,
                        HttpResponseRedirect,
                        JsonResponse)
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth import (authenticate,
                                login,
                                logout)
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

from . import forms

# Create your views here.


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

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse(
            {"detail": "Please provide a username and password."},
            status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse(
            {"detail": "Invalid credentials."},
            status=400
        )
    
    login(request, user)
    return JsonResponse({
        "detail": "Welcome, {}.".format(user.get_username())
    })

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"detail": "You're not logged in."},
            status=400)
    logout(request)
    return JsonResponse(
        {"detail": "You're amazing, {}. See you again soon.".format(request.user.get_username())}
    )

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    
    return JsonResponse({"isAuthenticated": True})

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    
    return JsonResponse({"username": request.user.username})
