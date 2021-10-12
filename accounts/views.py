import json
import io
from pprint import pprint

from django.shortcuts import render, get_object_or_404
from django.urls import reverse, reverse_lazy
from django.http import (HttpResponse,
                         HttpResponseRedirect,
                         Http404,
                         JsonResponse)
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth import (authenticate,
                                 login,
                                 logout)
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import AnonymousUser, User

from rest_framework import generics, status, mixins, permissions
from rest_framework.parsers import JSONParser
from rest_framework.renderers import HTMLFormRenderer, JSONRenderer
from rest_framework.response import Response

from . import forms
from .models import Teacher
from .serializers import TeacherSerializer, UserRegisterSerializer, TeacherCareerUpdateSerializer
from .permissions import IsOwnerOrReadOnly

# Create your views here.


class TeacherView(generics.GenericAPIView,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin):
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    renderer_classes = [JSONRenderer]

    def get_object(self, user):
        """
        Method for simply getting the Teacher related to the auth.User
        PARAMS: user (request.user)
        """
        try:
            return Teacher.objects.get(user=user)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        """
        Standard implementation of DRF's Retrieve-mixin.
        """
        teacher = self.get_object(request.user)
        serializer = self.serializer_class(instance=teacher)
        pprint(serializer.data)
        return JsonResponse(data=serializer.data, safe=False)

    def put(self, request, *args, **kwargs):
        """
        Standard implementation of DRF's
        """
        teacher = self.get_object(user=request.user)
        serializer = TeacherCareerUpdateSerializer(
            instance=teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        """
        This method is used to help React render all fields for registering a user.
        """
        serializer = self.serializer_class()
        renderer = HTMLFormRenderer()
        serializerForm = renderer.render(serializer.data)
        return Response(data={"form": serializerForm})

    def post(self, request, format=None, *args, **kwargs):
        """
        Default implementation of DRFs 'GenericAPIView.post()' method
        """
        if(request.data):
            serialized = UserRegisterSerializer(data=request.data)
            if serialized.is_valid():
                # Actually save/register the Teacher
                serialized.save()
                pprint(serialized.data)
                return Response(serialized.data, status=status.HTTP_201_CREATED)
            else:
                print(
                    serialized.data,
                    "\n{}".format(serialized.error_messages),
                    "\n{}".format(serialized.errors))
                return Response(
                    data={"errors": serialized.errors},
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )
        return Response({
            'errors': {'form': 'Could not read form data.'}
        },
            status=status.HTTP_400_BAD_REQUEST)


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
    teacher = get_object_or_404(Teacher, user=user)
    return JsonResponse({
        "isAuthenticated": True,
        "user": TeacherSerializer(instance=teacher).data,
        "user_link": teacher.get_absolute_url(),
        "detail": "Welcome, {}.".format(user.get_username())
    })


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"detail": "You're not logged in."},
            status=400)
    user = request.user
    logout(request)
    return JsonResponse({
        "detail": "You're amazing, {}. See you again soon.".format(user)
    }
    )


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    teacher = get_object_or_404(Teacher, user=request.user)
    return JsonResponse({
        "isAuthenticated": True,
        "user": TeacherSerializer(instance=teacher).data,
        "user_link": teacher.get_absolute_url()
    })


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})

    teacher = get_object_or_404(Teacher, user=request.user)

    return JsonResponse({
        "user": f"{teacher}",
        "country": f"{teacher.country}",
        "career_profile": f"{teacher.career_profile}"
    })
