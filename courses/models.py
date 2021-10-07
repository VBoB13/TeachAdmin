import datetime
from django.db import models
from accounts.models import Teacher
from students.models import Student

# Create your models here.


class Subject(models.Model):
    name = models.CharField(max_length=50, unique=True,
                            help_text="Up to 50 characters.")

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return "/subjects/{}/".format(self.pk)

    def get_courses(self, teacher: Teacher):
        return self.objects.course_set.filter(teacher=teacher)


class Course(models.Model):
    name = models.CharField(max_length=50)
    grade = models.SmallIntegerField(null=True, default=None)
    subject = models.ForeignKey(Subject, null=True, on_delete=models.SET_NULL)
    start_date = models.DateField(default=datetime.date.today)
    end_date = models.DateField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(
        Student, through='CourseEnrollment')

    class Meta:
        ordering = ['start_date', 'name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return "/courses/{}/".format(self.pk)


class CourseEnrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today)
    comments = models.TextField(blank=True)

    class Meta:
        ordering = ['course', 'student']

    def __str__(self):
        return "{} enrolled in {} ({})".format(
            self.student, self.course, self.date
        )
