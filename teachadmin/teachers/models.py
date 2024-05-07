from datetime import date

from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

from schools.models import School

# Create your models here.

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    alias = models.CharField(max_length=50, blank=True, default="")
    schools = models.ManyToManyField(
        School,
        through="Employment",
        through_fields=("teacher", "school"),
    )


class Employment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    start = models.DateField(auto_now_add=True, default=date.today)
    end = models.DateField(default=models.SET_NULL, null=True)
    ratio = models.FloatField(default=1.0)
    confirmed = models.BooleanField(default=False)


class Course(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    assistants = models.ManyToManyField(
        Teacher,
        on_delete=models.CASCADE,
        through="Assistance",
        through_fields=("teacher", "course")
    )


class Assistance(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    desc = models.TextField(
        verbose_name='description',
        max_length=500
    )
    start = models.DateField(auto_now_add=True)


