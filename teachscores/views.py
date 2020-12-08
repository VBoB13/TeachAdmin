from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.
def index(request):
    return HttpResponse("Hello, World!")

class IndexView(TemplateView):
    template_name = 'teachscores/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'Scores'
        context["page_title"] = 'TeachAdmin - Scores'
        return context
    