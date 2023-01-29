from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .filemgm import FileMGM



class FileUploadView(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        try:
            file_management = FileMGM()
            file_obj = request.data['file']
            media_root = file_management.getUploadFolder()
            fs = FileSystemStorage(location=media_root)
            fs.save(filename, file_obj)
            return Response("File uploaded correctly", status=200)
        except Exception as exc:
            return Response("Upload failed:" + exc, status=500)
