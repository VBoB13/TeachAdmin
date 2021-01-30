import time

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required

from .models import School

# Create your views here.
def index(request):
    return HttpResponse("Hello, World!")

@login_required
def schools(request):
    schools = School.objects.all()
    if schools.exists():
        data = [school for school in schools]
    else:
        data = []
    
    # Artificially delaying the response (for some reason?)
    # Saw this being used quite frequently so I use it too.
    # Probabaly a good practice :)
    # time.sleep(0.5)

    return JsonResponse(
        {
            "schools":data,
        }
    )


class IndexView(TemplateView, LoginRequiredMixin):
    login_url = "/accounts/login/"
    template_name = 'teachscores/index.html'

    redirect_field_name = template_name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'Scores'
        context["page_title"] = 'TeachAdmin - Scores'
        return context
    