from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from django_countries.fields import CountryField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

import datetime

# Create your models here.


class Teacher(models.Model):
    # OneToOneField to Django's User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional Info
    country = CountryField(
        blank=True,
        blank_label='(Select Country)',
        help_text="Optional")
    career_profile = models.URLField(
        blank=True,
        help_text="URL to your career profile. E.g. LinkedIn, Indeed etc."
    )
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
        return "/teachers/{}/".format(self.pk)
    
