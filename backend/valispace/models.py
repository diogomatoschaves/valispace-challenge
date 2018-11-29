from django.db import models


class Functions(models.Model):

    name = models.TextField(unique=True)
    expression = models.TextField(unique=True)
