import datetime
from django.db import models
from django_countries.fields import CountryField
from accounts.models import Teacher

# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=25)
    teacher = models.ForeignKey(
        Teacher, related_name="students", on_delete=models.CASCADE)
    student_number = models.CharField(
        max_length=10, blank=True, help_text="(almost) Anything within 10 characters.", default="")
    country = CountryField(
        blank=True,
        blank_label='(Select Country)',
        help_text="Optional."
    )
    birthday = models.DateField(null=True)

    def __str__(self):
        return "{}".format(self.name)

    def get_absolute_url(self):
        return "/students/{}/".format(self.pk)

    @property
    def b_day(self):
        return datetime.date.strftime(self.birthday, "%b %d")
