import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from main_system.business.get_data import GetData
from django.http import HttpResponse
import pandas as pd

class Controllers:

    def get_file_list(self):
        get_data = GetData([])
        get_data.get_file_list()
        datajson = get_data.to_json()
        return HttpResponse(datajson, content_type="application/json")

    @csrf_exempt
    @api_view(['DELETE'])
    def delete_file(request):
        body = str(request.stream.body)
        body = body[2:len(body) - 1]
        json_body = json.loads(body)
        file_name = json_body['filename']
        get_data = GetData([])
        get_data.delete_a_file(file_name)
        return HttpResponse("success", content_type="application/json")

    def get_eval_list(self):
        get_data = GetData([])
        data_columns = get_data.get_eval_list()
        datajson = data_columns.to_json(orient="records")
        return HttpResponse(datajson, content_type="application/json")

    def get_data_list(self):
        if 'filename' in self.GET:
            filename = self.GET['filename']
            if filename is not None and filename != '':
                get_data = GetData([])
                data_columns = get_data.get_data_list(filename)
                datajson = data_columns.head().to_json(orient="records")
                return HttpResponse(datajson, content_type="application/json")
        else:
            return render(self, 'graph.html', {'chart': None})

    def replace_code_with_template_from_file(self, template_data, request, input_data, columns):
        html_tag_start_length = 8
        column_count = 0
        if columns is not None:
            column_count = len(columns)
        template = ""
        search_name = "{name}"
        search_text = "{text}"
        search_value = "{value}"
        search_name_value = "name=\""
        try:
            d_list = json.loads(template_data)
            for d in d_list:
                current_template = ""
                data = str(next(iter(d)))
                if data == "button":
                    button_dictionary = d.get('button')
                    button_name = button_dictionary.get('name')
                    button_text = button_dictionary.get('text')
                    button_click = button_dictionary.get('onClick')
                    current_template = str(render(request, "output_controls/button.html").content)[2:-1]
                    if button_name is not None:
                        current_template = current_template.replace(search_name,
                                                                    search_name_value + str(button_name) + "\"")
                    if button_text is not None:
                        current_template = current_template.replace("{text}", str(button_text))
                    if button_click is not None:
                        current_template = current_template.replace("onclick", "onClick")
                        current_template = current_template.replace("{onClickFunction}", str(button_click))
                if data == "table":
                    try:
                        current_template = input_data.to_html()
                        current_template = current_template.replace("text-align: right", "text-align: center")
                        current_template = current_template.replace("class=\"dataframe\"",
                                                                    "class=\"table table-hover\"")
                        current_template = current_template.replace("<tr>", "<tr style=\"text-align: center;\">")
                    except:
                        continue
                if data == "dropdown":
                    dropdown_dictionary = d.get('dropdown')
                    button_name = dropdown_dictionary.get('name')
                    count = dropdown_dictionary.get('count')

                    select_template = ""
                    if count == "columns_count":
                        for i in range(0, column_count):
                            select_template = str(render(request, "output_controls/dropdown.html").content)[2:-1]
                            if button_name is not None:
                                select_template = select_template.replace(search_name,
                                                                          search_name_value + str(button_name)
                                                                          + str(i) + "\"", 1)
                                select_template = select_template[
                                                  :html_tag_start_length] + "data-column=\"" + columns[
                                                      i] + " " + " index, " + str(i) + "\" " + select_template[
                                                                                               html_tag_start_length:]
                                dropdown_items = ""
                                for j in range(0, len(input_data[int(i)])):
                                    dropdown_items += "<option>" + str(input_data[i][j]) + "</option>"
                                select_template = select_template.replace("<option/>", dropdown_items, 1)
                                current_template += select_template
                    else:
                        for i in range(0, int(count)):
                            select_template = str(render(request, "output_controls/dropdown.html").content)[2:-1]
                            if button_name is not None:
                                select_template = select_template.replace(search_name, search_name_value + str(
                                    button_name) + str(i) + "\"", 1)
                                select_template = select_template[
                                                  :html_tag_start_length] + "data-column=\"" + columns[
                                                      i] + " " + " index, " + str(i) + "\" " + select_template[
                                                                                               html_tag_start_length:]
                                dropdown_items = ""
                                for j in range(0, len(input_data[int(i)])):
                                    dropdown_items += "<option>" + str(input_data[i][j]) + "</option>"
                                select_template = select_template.replace("<option/>", dropdown_items, 1)
                                current_template += select_template
                if data == "checkbox":
                    dropdown_dictionary = d.get('checkbox')
                    checkbox_name = dropdown_dictionary.get('name')
                    checkbox_text = dropdown_dictionary.get('text')
                    checkbox_value = dropdown_dictionary.get('value')
                    count = dropdown_dictionary.get('count')

                    checkbox_template = ""
                    if count == "columns_count":
                        for i in range(0, column_count):
                            checkbox_template = str(render(request, "output_controls/checkbox.html").content)[2:-1]
                            if checkbox_name is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_name, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_name, str(checkbox_name)
                                                                                  + str(i))
                            if checkbox_text is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_text, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_text, str(checkbox_text)
                                                                                  + str(i))
                            if checkbox_value is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_value, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_value, str(checkbox_value)
                                                                                  + str(i))
                            checkbox_template = checkbox_template[
                                                :html_tag_start_length - 2] + " data-column=\"" + columns[
                                                    i] + " " + " index, " + str(i) + "\" " + checkbox_template[
                                                                                             html_tag_start_length - 2:]

                            current_template += checkbox_template
                    else:
                        for i in range(0, int(count)):
                            checkbox_template = str(render(request, "output_controls/dropdown.html").content)[2:-1]
                            if checkbox_name is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_name, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_name, str(checkbox_name)
                                                                                  + str(i))
                            if checkbox_text is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_text, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_text, str(checkbox_text)
                                                                                  + str(i))
                            if checkbox_value is not None:
                                if checkbox_text == "columns_name":
                                    checkbox_template = checkbox_template.replace(search_value, columns[i])
                                else:
                                    checkbox_template = checkbox_template.replace(search_value, str(checkbox_value)
                                                                                  + str(i))
                            checkbox_template = checkbox_template[
                                                :html_tag_start_length - 2] + " data-column=\"" + columns[
                                                    i] + " " + " index, " + str(i) + "\" " + checkbox_template[
                                                                                             html_tag_start_length - 2:]
                            current_template += checkbox_template
                if data == "script":
                    dropdown_dictionary = d.get('script')
                    script_content = dropdown_dictionary.get('text')
                    count = dropdown_dictionary.get('count')

                    script_template = ""
                    if count == "columns_count":
                        for i in range(0, column_count):
                            script_template = str(render(request, "output_controls/script.html").content)[2:-1]
                            if script_content is not None:
                                input_values = "let inputValues = ["
                                for j in range(0, len(input_data[int(i)])):
                                    input_values += "'" + str(input_data[i][j]) + "', "
                                input_values += "];"
                                script_template = script_template.replace("{text}", input_values, 1)
                    else:
                        for i in range(0, int(count)):
                            script_template = str(render(request, "output_controls/script.html").content)[2:-1]
                            if script_content is not None:
                                input_values = "let inputValues = ["
                                for j in range(0, len(input_data[int(i)])):
                                    input_values += "'" + str(input_data[i][j]) + "', "
                                input_values += "];"
                        script_template = script_template.replace("{text}", script_content, 1)
                    current_template += script_template
                template += current_template

        except Exception as exc:
            node = None
        return template

    def replace_code_with_specific_template_name(self, template_type, input_data):
        template = ""
        try:
            if template_type == "table":
                if input_data.columns.nlevels > 1:
                    input_data.columns = input_data.columns.droplevel()
                template = input_data.to_html()
                template = self.fix_table_header(isinstance(input_data.index, pd.MultiIndex),template)
                template = template.replace("text-align: right", "text-align: center")
                template = template.replace("class=\"dataframe\"", "class=\"table table-hover\"")
                template = template.replace("<tr>", "<tr style=\"text-align: center;\">")
                template = template.replace("<td colspan=", "<td colspan=")
        except Exception as exc:
            node = None
        return template

    def fix_table_header(self,multi_index, template):
        first_of_row1 = template.find("<th></th>")
        end_of_row1 = template[template.find("<th></th>"):].find("<tr>") + template.find("<th></th>")
        row1 = template[first_of_row1:end_of_row1]
        row1 = row1.replace("<th>", "<td colspan=\"1\" >")
        row1 = row1.replace("th", "td")
        if multi_index:
            template = template[:first_of_row1] + template[end_of_row1:]
        else:
            template = template[:first_of_row1] + row1 + template[end_of_row1:]
        return template
