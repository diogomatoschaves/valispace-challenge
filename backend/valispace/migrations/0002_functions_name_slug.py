# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2018-11-29 10:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('valispace', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='functions',
            name='name_slug',
            field=models.SlugField(default='', unique=True),
            preserve_default=False,
        ),
    ]