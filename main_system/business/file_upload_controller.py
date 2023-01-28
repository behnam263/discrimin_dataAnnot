from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .filemgm import FileMGM



class FileUploadView(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        filemanagement = FileMGM()
        file_obj = request.data['file']
        media_root = filemanagement.getUploadFolder()
        fs = FileSystemStorage(location=media_root)
        fs.save(filename, file_obj)
        print(filename)
        return Response(status=204)
