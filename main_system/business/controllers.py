import json
from django.shortcuts import render
from main_system.business.get_data import GetData
from django.http import HttpResponse


class Controllers:

    def get_file_list(self):
        get_data = GetData([])
        get_data.get_file_list()
        datajson = get_data.to_json()
        return HttpResponse(datajson, content_type="application/json")

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

    def replace_code_with_template(self, template_data, request, input_data, column_count):
        template = ""
        search_name = "{name}"
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
                    current_template = str(render(request, "output_controls/button.html").content)[2:-1]
                    if button_name is not None:
                        current_template = current_template.replace(search_name,
                                                                    search_name_value + str(button_name) + "\"")
                    if button_text is not None:
                        current_template = current_template.replace("{text}", str(button_text))
                if data == "table":
                    current_template = input_data.to_html()
                    current_template = current_template.replace("text-align: right", "text-align: center")
                    current_template = current_template.replace("class=\"dataframe\"", "class=\"table table-hover\"")
                    current_template = current_template.replace("<tr>", "<tr style=\"text-align: center;\">")
                if data == "dropdown":
                    dropdown_dictionary = d.get('dropdown')
                    button_name = dropdown_dictionary.get('name')
                    count = dropdown_dictionary.get('count')

                    if count == "columns_count":
                        for i in range(0, column_count):
                            current_template += str(render(request, "output_controls/dropdown.html").content)[2:-1]
                            if button_name is not None:
                                current_template = current_template.replace(search_name,
                                                                            search_name_value + str(button_name)
                                                                            + str(i) + "\"", 1)
                                dropdown_items = ""
                                for j in range(0, len(input_data[int(i)])):
                                    dropdown_items += "<option>" + str(input_data[i][j]) + "</option>"
                                current_template = current_template.replace("<option/>", dropdown_items, 1)
                    else:
                        for i in range(0, int(count)):
                            current_template += str(render(request, "output_controls/dropdown.html").content)[2:-1]
                            if button_name is not None:
                                current_template = current_template.replace(search_name,
                                                                            search_name_value + str(button_name) + str(
                                                                                i) + "\"", 1)
                                dropdown_items = ""
                                for j in range(0, len(input_data[int(i)])):
                                    dropdown_items += "<option>" + str(input_data[i][j]) + "</option>"
                                current_template = current_template.replace("<option/>", dropdown_items, 1)

                template += current_template

        except Exception as exc:
            node = None

        return template
