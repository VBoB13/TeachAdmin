from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

class School(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=250)
    country = CountryField(default="SE") # As this project aims to implement into the Swedish education system first


class Department(models.Model):
    name = models.CharField(max_length=200)
    desc = models.TextField(max_length=1000)
    school = models.ForeignKey(School, on_delete=models.CASCADE)


class Subject(models.Model):
    name = models.CharField(max_length=200)
    desc = models.TextField(max_length=1000)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)


class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    alias = models.CharField(max_length=50, blank=True, default="")

