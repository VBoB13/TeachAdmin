from django.shortcuts import render

# Create your views here.
def index(request, path=""):
    return render(request, 'frontend/index.html', {"path":path})