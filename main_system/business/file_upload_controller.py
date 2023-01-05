from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
import os.path
from rest_framework.views import APIView




class FileUploadView(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        media_root = os.path.join(base_dir, 'uploads')
        fs = FileSystemStorage(location=media_root)
        fs.save(filename, file_obj)
        print(filename)
        return Response(status=204)
