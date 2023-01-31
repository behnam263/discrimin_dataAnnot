import pandas as pd
import os.path
from rest_framework.decorators import api_view
from django.http import HttpResponse
from django.shortcuts import render
from main_system.business.get_data import GetData
from main_system.business.evaluations import Evaluations
from main_system.business.controllers import Controllers
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
@api_view(['POST'])
def draw_query_chart(request):
    get_data = GetData([])
    if 'evalCode' in request.data:
        eval_code = request.data['evalCode']
        columns = request.data['columns']
        file_name = request.data['fileName']
        if request.data['query'] is None:
            return None
        query = request.data['query']
        query_dataframe = json.loads(query)
        evaluation_module = Evaluations()
        if eval_code is not None and eval_code != '':
            if eval_code.find("def f():") == -1:
                (eval_file, eval_component) = get_data.get_eval_code_file(eval_code)
                code = get_data.get_text_file(eval_file)
            else:
                code = eval_code

            try:
                return_value = evaluation_module.custom_code_run(code, columns, query_dataframe, file_name, eval_code)
                result = None
                error_string = None
                if len(return_value[1]) > 0:
                    error_string = return_value[1]
                else:
                    result = return_value[0]
            except Exception as exc2:
                error_string = f"error:\n{exc2}\n"
            if result is not None or error_string is None:
                if file_name is not None and file_name != '':
                    chart = evaluation_module.get_plot_dataframe(result, 'bar')
                    return render(request, 'graph.html', {'chart': chart})
            else:
                result = error_string


@csrf_exempt
@api_view(['POST'])
def query_in_results(request):
    get_data = GetData([])
    controllers = Controllers()
    if 'evalCode' in request.data:
        eval_code = request.data['evalCode']
        columns = request.data['columns']
        file_name = request.data['fileName']
        query = request.data['query']
        query_dataframe = json.loads(query)
        if eval_code is not None and eval_code != '':
            if eval_code.find("def f():") == -1:
                (eval_file, eval_component) = get_data.get_eval_code_file(eval_code)
                code = get_data.get_text_file(eval_file)
            else:
                code = eval_code
            try:
                evaluation_module = Evaluations()
                return_value = evaluation_module.custom_code_run(code, columns, query_dataframe, file_name, eval_code)
                result = None
                error_string = None
                if len(return_value[1]) > 0:
                    error_string = return_value[1]
                else:
                    result = return_value[0]
            except Exception as exc2:
                error_string = f"error:\n{exc2}\n"
            if result is not None or error_string is None:
                result = controllers.replace_code_with_specific_template_name("table", result)
            else:
                result = error_string
    return HttpResponse(result, content_type="text/plain")


@csrf_exempt
@api_view(['POST'])
def get_selected_columns_components(request):
    get_data = GetData([])
    controllers = Controllers()
    if 'evalCode' in request.data:
        eval_code = request.data['evalCode']
        columns = request.data['columns']
        file_name = request.data['fileName']
        if eval_code is not None and eval_code != '':
            if eval_code.find("def f():") == -1:
                (eval_file, eval_component) = get_data.get_eval_code_file(eval_code)
                components_file_content = get_data.get_output_component_file(eval_component)
            else:
                (eval_file, eval_component) = get_data.get_eval_code_file("other")
                components_file_content = get_data.get_output_component_file(eval_component)
            evaluation_module = Evaluations()
            data_column_names, result = evaluation_module.get_selected_columns(columns, file_name)
            result = controllers.replace_code_with_template_from_file(components_file_content, request, result,
                                                                      data_column_names)
            return HttpResponse(result, content_type="text/plain")
