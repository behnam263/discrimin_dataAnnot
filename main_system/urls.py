from django.urls import path
from . import views


urlpatterns=[
    path('hello/', views.sayhello ),
    path('upload/', views.upload, name='upload')
]