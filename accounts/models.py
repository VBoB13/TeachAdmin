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

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
        return "/accounts/{}/".format(self.pk)


class Organization(models.Model):
    """
    This Model will store information about organizations that the teacher enters as past of their experience.
    """
    name = models.CharField(
        verbose_name="Organization name",
        max_length=50,
        help_text="Within 50 characters. Please refer to the organization's full English name often found on their website."
    )
    country = CountryField(
        blank=True,
        blank_label='(Select Country)',
        help_text="Optional."
    )

    def __str__(self):
        return "{} ({})".format(self.name, self.country)

    def get_absolute_url(self):
        return "/accounts/orgs/{}/".format(self.pk)


class Experience(models.Model):
    """
    This Model is meant to store an individual teacher's experience(s).
    """
    teacher = models.ForeignKey(
        Teacher, 
        on_delete=models.CASCADE)
    start_date = models.DateField(
        verbose_name="Start date",
        default=datetime.date.today
    )
    end_date = models.DateField(verbose_name="End date")
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )
    position = models.CharField(
        max_length=50,
        help_text="Within 50 characters."
    )

    def __str__(self):
        return "{} at {}".format(self.position, self.organization)
