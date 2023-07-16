from django.db import models

# Create your models here.

class UserInfo(models.Model):
    username = models.CharField(max_length=50, unique=True, db_index=True)
    password = models.CharField(max_length=100, db_index=True)
    info = models.CharField(max_length=200)