import sys
from io import StringIO
from main_system.business.get_data import GetData
import pandas as pd
import matplotlib.pyplot as plt
import base64
from io import BytesIO
import numpy as np


class Evaluations:
    def custom_code_run(self, code, column_values, query_dataframe, file_name):
        get_data = GetData([])
        # create file-like string to capture output
        code_out = StringIO()
        code_err = StringIO()

        # capture output and errors
        sys.stdout = code_out
        sys.stderr = code_err
        string_code = str(code)
        data_column = get_data.get_data_list(file_name)
        int_values = list(map(int, column_values))
        column_values = data_column.iloc[:, int_values]

        input_columns = column_values.columns

        global_vars = {}
        input_values = {
            "values": column_values,
            "query": query_dataframe,
            "columns_count": len(column_values),
            "columns": input_columns
        }
        ###test area####
        #if query_dataframe != None:
        if query_dataframe != None:
            query_dataframe1 = pd.read_json(query_dataframe, orient='records')
            filtered_columns = column_values
            for column in column_values:
                filtered_columns = filtered_columns[filtered_columns[str(column)].isin(query_dataframe1.T[str(column)])]
                return filtered_columns
        #######

        ## start preparing function to be run
        exec(string_code, input_values, global_vars)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
        ## end preparing function to be run

        ## start to run function to be run
        output_error = ""
        local_vars = {}
        return_workaround = []
        return_function = ""
        try:
            exec('a=f()', global_vars, local_vars)
            if len(local_vars) > 0:
                return_function = pd.concat(local_vars, axis=1)

        except Exception as exc:
            output_error = f"error:\n{exc}\n"
        code_out.close()
        code_err.close()
        ## end running function to be run

        return_workaround.append(return_function)
        return_workaround.append(output_error)
        return return_workaround

    def get_graph(self):
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_png = buffer.getvalue()
        # print(image_png)
        graph = base64.b64encode(image_png)
        graph = graph.decode('utf_8')
        buffer.close()
        return graph

    def get_plot(self, x, y):
        plt.switch_backend('AGG')
        plt.figure(figsize=(10, 5))
        plt.title('sale of items')
        plt.plot(x, y)
        plt.xticks(rotation=45)
        plt.xlabel('item')
        plt.ylabel('price')
        plt.tight_layout()
        graph = self.get_graph()
        return graph

    def get_plot_dataframe(self, df, chart_type):
        df.plot(kind=chart_type)  # bar can be replaced by
        graph = self.get_graph()
        return graph

    def get_selected_columns(self, column_values, file_name):
        get_data = GetData([])
        data_column = get_data.get_data_list(file_name)
        int_values = list(map(int, column_values))
        data_column = data_column.iloc[:, int_values]
        column_array = list()
        for column in data_column.columns.tolist():
            column_array.append(data_column[column].unique())

        #data_column= data_column.groupby(data_column.columns.tolist())
        return column_array


