from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from django_countries.fields import CountryField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

import datetime

from .core.models import TimeStampedModel

# Create your models here.

# Put in its own app called accounts?
"""
class Teacher(models.Model):
    # OneToOneField to Django's User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional Info
    country = CountryField(blank=True, blank_label='(Select Country)', help_text="Optional")

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return reverse("teacher_detail", kwargs={"pk": self.pk})
"""