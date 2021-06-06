from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from django.db.models.fields import CharField
from django.urls import reverse
from django.utils import timezone
from django_countries.fields import CountryField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

import datetime


class Teacher(models.Model):
    # OneToOneField to Django's User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional Info
    country = CountryField(
        blank=True,
        blank_label='(Select Country)',
        help_text="Optional"
    )
    career_profile = models.URLField(
        blank=True,
        help_text="URL to your career profile. E.g. LinkedIn, Indeed etc."
    )
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
        return "/teachers/{}/".format(self.pk)


class Subject(models.Model):
    name = models.CharField(
        max_length=25,
        unique=True)

    def __str__(self):
        return "{}".format(self.name)


class Address(models.Model):
    country = CountryField(
        blank_label='(Select Country)',
        help_text="Select a country."
    )
    zip_code = models.SmallIntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['country', 'zip_code'],
                name="country_zip_unique_together"
            )
        ]

    def __str__(self):
        return "{} {}".format(
            self.zip_code,
            self.country.name
        )

    def get_absolute_url(self):
        return "/addresses/{}/".format(self.pk)


class School(models.Model):
    CHAR_LIMITER = 50
    name = models.CharField(
        max_length=CHAR_LIMITER,
        help_text="Within {} characters.".format(CHAR_LIMITER))
    branch = models.CharField(
        max_length=CHAR_LIMITER,
        help_text="Within {} characters.".format(CHAR_LIMITER))
    address = models.ForeignKey(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'branch'],
                name="name_branch_unique_together"
            )
        ]

    def __str__(self):
        return "{} - {} (@{})".format(
            self.name, self.branch, self.address
        )

    def get_absolute_url(self):
        return "/schools/{}/".format(self.pk)


class Student(models.Model):
    name = models.CharField(max_length=25)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    country = CountryField(
        blank=True,
        blank_label='(Select Country)',
        help_text="Optional."
    )
    birthday = models.DateField(default=datetime.date.today)

    def __str__(self):
        return "{}".format(self.name)

    def get_absolute_url(self):
        return "/students/{}/".format(self.pk)

    
class Homeroom(models.Model):
    name = models.CharField(max_length=25)
    creator = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'creator'],
                name="name_teacher_unique_together"
            )
        ]

    def __str__(self):
        return "{}".format(self.name)

    def get_absolute_url(self):
        return "/homerooms/{}/".format(self.pk)


class Course(models.Model):
    name = models.CharField(max_length=20)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    students = models.ManyToManyField(
        Student,
        through='CourseEnroll',
        through_fields=('course', 'student')
    )
    min_grade = models.SmallIntegerField(default=0)
    max_grade = models.SmallIntegerField(default=100)

    def __str__(self):
        return "{}".format(self.name)

    def get_absolute_url(self):
        return "/courses/{}/".format(self.pk)


class CourseEnroll(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    enroll_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return "{} in course {}".format(self.student, self.course)
