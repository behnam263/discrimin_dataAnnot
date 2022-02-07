from django.urls import path, re_path


from main_system import views
from .views import  FileUploadView

urlpatterns=[
    path('getFileList/', views.getFileList ),
    path('getDataList/', views.getDataList),
    path('customCode', views.eval_custom_code),
    path('hello/', views.sayhello ),
    re_path(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view())
]

