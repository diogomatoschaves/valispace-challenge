"""valispace_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
# from .valispace.views import *
import os, sys
parentPath = os.path.abspath("..")
if parentPath not in sys.path:
    sys.path.insert(0, parentPath)

from valispace.views import *

urlpatterns = [
    url(r'^$', index),
    url(r'^fetch_functions$', return_functions),
    url(r'^new_function$', add_function),
    url(r'^delete_function$', delete_function),
    url(r'^edit_function$', edit_function),
    url(r'^match_functions$', type_ahead),
    url(r'^new_calculation$', calculate)
]
