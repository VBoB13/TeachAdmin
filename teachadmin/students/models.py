from django.db import models
from teachadmin.schools.models import School
from teachadmin.teachers.models import Teacher

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=50)
    alias = models.CharField(max_length=25)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)


