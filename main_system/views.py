import os

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


def baysian():
    dataset = pd.read_csv(
        'C:/Users/Behnam/Google Drive/MyClass/thesis/resourcers/data/COMPAS Recidivism Racial Bias kaggle/cox-violent-parsed.csv')
    X = dataset.iloc[:, 1].values
    Y = dataset.iloc[:, 43].values
    return X[0:20], Y[0:20],


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
    (x, y) = baysian()
    chart = get_plot(x, y)
    #   return HttpResponse('Hello world')
    baysian()
    return render(request, 'graph.html', {'chart': chart})


def upload(request):
    if request.method == 'POST':
        upload_file = request.FILES['document']
        BASE_DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        Media_Root=os.path.join(BASE_DIR,'uploads')
        fs=FileSystemStorage(location=Media_Root)
        fs.save(upload_file.name,upload_file)
        print(upload_file.name)
    return render(request, "upload.html")
