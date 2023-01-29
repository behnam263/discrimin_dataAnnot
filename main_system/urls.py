from django.urls import path, re_path


from main_system import views
from main_system.business.controllers import Controllers
from main_system.business.file_upload_controller import FileUploadView

urlpatterns = [
    path('getFileList/', Controllers.get_file_list),
    path('getDataList/', Controllers.get_data_list),
    path('deleteFileRow/', Controllers.delete_file),
    path('getEvalList/', Controllers.get_eval_list),
    path('columnsComponents', views.get_selected_columns_components),
    path('resultQuery', views.query_in_results),
    path('drawChartQuery', views.draw_query_chart),
    re_path(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view())
]

