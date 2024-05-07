from django.db import models
from django.contrib.auth.models import User

from teachadmin.schools.models import School

# Create your models here.

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    alias = models.CharField(max_length=50, blank=True, default="")

