from xml.dom.expatbuilder import parseString

from rest_framework.decorators import api_view

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
import pandas as pd
from io import StringIO
import os.path
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from main_system.business.evals import Evals

from main_system.business.get_data import GetData
from main_system.business.custom_eval import Custom_Eval
from django.views.decorators.csrf import csrf_exempt

import json

from main_system import views


def getFileList(request):
    getData = GetData([])
    getData.get_file_list()
    datajson = getData.to_json()
    return HttpResponse(datajson, content_type="application/json")


def getEvalList(request):
    getData = GetData([])
    datacl = getData.get_eval_list()
    datajson = datacl.to_json(orient="records")
    return HttpResponse(datajson, content_type="application/json")


def getDataList(request):
    if 'filename' in request.GET:
        filename = request.GET['filename']
        if filename is not None and filename != '':
            getData = GetData([])
            datacl = getData.get_data_list(filename)
            datajson = datacl.head().to_json(orient="records")
            # datajson = json.dumps(datacl)
            # datajson = datacl.toJSON()
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


@csrf_exempt
@api_view(['POST'])
def eval_custom_code(request):
    get_data = GetData([])
    return_value = ''
    if 'evalCode' in request.data:
        eval_code = request.data['evalCode']
        columns = request.data['columns']
        file_name = request.data['fileName']
        if eval_code is not None and eval_code != '':
            code = ""
            if eval_code.find("def f():") == -1:
                (eval_file, eval_component) = get_data.get_eval_code_file(eval_code)
                code = get_data.get_text_file(eval_file)
                components_file_content = get_data.get_output_component_file(eval_component)
            else:
                (eval_file, eval_component) = get_data.get_eval_code_file("other")
                components_file_content = get_data.get_output_component_file(eval_component)
                code = eval_code

            try:
                custom_eval = Custom_Eval()
                return_value = custom_eval.custom_code_run(code, columns, file_name)
                result = None
                error_string = None
                if len(return_value[1]) > 0:
                    error_string = return_value[1]
                else:
                    result = return_value[0]
            except Exception as exc2:
                error_string = f"error:\n{exc2}\n"
            if result is not None or error_string is None:
                result = replace_code_with_template(components_file_content, request,result)
            else:
                result = error_string
    return HttpResponse(result, content_type="text/plain")


def replace_code_with_template(template_data, request,input_data):
    template = ""
    try:
        d_list = json.loads(template_data)
        for d in d_list:
            current_template = ""
            data = next(iter(d))
            if data == "button":
                button_dictionary = d.get('button')
                button_name = button_dictionary.get('name')
                button_text = button_dictionary.get('text')
                current_template = str(render(request, "output_controls/button.html").content)[2:-1]
                if button_name is not None:
                    current_template = current_template.replace("{name}", "name=\""+str(button_name)+"\"")
                if button_text is not None:
                    current_template = current_template.replace("{text}", str(button_text))
            if data == "table":
                current_template = input_data.to_html()
                current_template = current_template.replace("text-align: right", "text-align: center")
                current_template = current_template.replace("class=\"dataframe\"", "class=\"table table-hover\"")
                current_template = current_template.replace("<tr>", "<tr style=\"text-align: center;\">")
            template += current_template

    except Exception:
        node = None

    return template


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
