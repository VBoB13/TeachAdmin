from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from django_countries.fields import CountryField

import datetime

from .core.models import TimeStampedModel

from accounts.models import Teacher

# Create your models here.

class School(models.Model):
    name = models.CharField(
        max_length=100,
        help_text="Up to 100 characters"
    )
    country = CountryField(
        blank=True,
        blank_label="(Select Country)",
        help_text="Optional."
    )
    city = models.CharField(
        max_length=50,
        blank=True,
        help_text="Up to 50 characters."
    )
    
    def __str__(self):
        return self.name

        
"""
class Homeroom(models.Model):
    name = models.CharField(
        max_length=30,
        help_text="Up to 30 characters."
    )
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE
    )
    school = models.ForeignKey(
        School,
        on_delete=models.CASCADE
    )
 


class Student(models.Model):
    pass"""