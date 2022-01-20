import os.path
from os import path

from django.http import HttpResponse

from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

import matplotlib.pyplot as plt
import base64
from io import BytesIO

# for baysian
import numpy as np
import pandas as pd
import sklearn

from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_protect

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import status

from main_system import views
from .serializers import FileSerializer


def baysian(request):
    file_path=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'\\uploads\\'+request
    if path.exists(file_path):
        dataset = pd.read_csv(file_path)
        X = dataset.iloc[:, 1].values
        Y = dataset.iloc[:, 1].values
        return X[0:20], Y[0:20],
    else:
        return None


def get_graph():
    print('hi')
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    # print(image_png)
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf_8')
    buffer.close()
    return graph


def get_plot(x, y):
    plt.switch_backend('AGG')
    plt.figure(figsize=(10, 5))
    plt.title('sale of items')
    plt.plot(x, y)
    plt.xticks(rotation=45)
    plt.xlabel('item')
    plt.ylabel('price')
    plt.tight_layout()
    graph = get_graph()
    return graph

def sayhello(request):
    (x, y) = baysian(request.GET['filename'])
    chart = get_plot(x, y)
    #   return HttpResponse('Hello world')
    baysian()
    return render(request, 'graph.html', {'chart': chart})

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
