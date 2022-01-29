from .serializers import FileSerializer

from django.http import HttpResponse

from django.http import HttpResponse
# for baysian
import numpy as np

import sklearn
from rest_framework import status
from django.views.decorators.csrf import csrf_protect

from scipy.stats.stats import pearsonr

# Create your views here.

from django.http import HttpResponse

import os.path
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from main_system.business.evals import Evals
from main_system.business.get_data import GetData
import json
from main_system import views


def getFileList(request):
    getData = GetData([])
    getData.getFileList()
    datajson = getData.toJSON()
    return HttpResponse(datajson, content_type="application/json")


def getDataList(request):
    if 'filename' in request.GET:
        filename = request.GET['filename']
        if filename is not None and filename != '':
            getData = GetData([])
            datacl= getData.getDataList(filename)
            datajson = json.dumps(datacl)
            #datajson = datacl.toJSON()
            return HttpResponse(datajson, content_type="application/json")
    else:
        return render(request, 'graph.html', {'chart': None})


def sayhello(request):
    evals = Evals()
    if 'filename' in request.GET:
        filename = request.GET['filename']
        if filename is not None and filename != '':
            (x, y) = evals.baysian(filename)
            chart = evals.get_plot(x, y)
            #   return HttpResponse('Hello world')
            evals.baysian()
            return render(request, 'graph.html', {'chart': chart})
    else:
        return render(request, 'graph.html', {'chart': None})


class FileUploadView(views.APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        Media_Root = os.path.join(BASE_DIR, 'uploads')
        fs = FileSystemStorage(location=Media_Root)
        fs.save(filename, file_obj)
        print(filename)
        return Response(status=204)
