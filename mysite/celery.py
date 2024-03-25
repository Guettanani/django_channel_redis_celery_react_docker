from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from datetime import timedelta
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

app = Celery("mysite")

app.conf.timezone = 'Europe/Paris'


app.config_from_object("django.conf:settings",namespace='CELERY')

app.autodiscover_tasks()