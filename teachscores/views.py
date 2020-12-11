from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
def index(request):
    return HttpResponse("Hello, World!")

class IndexView(TemplateView, LoginRequiredMixin):
    login_url = "/accounts/login/"
    template_name = 'teachscores/index.html'

    redirect_field_name = template_name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'Scores'
        context["page_title"] = 'TeachAdmin - Scores'
        return context
    