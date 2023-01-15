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

        input_columns_names = column_values.columns

        ### Filter Columns By Selection
        df_list = pd.DataFrame.empty
        for cols_index in range(0, len(query_dataframe) - 1, 2):
            col1 = pd.DataFrame(query_dataframe[cols_index]["value"])
            col1 = col1.rename(columns={col1.columns[0]: input_columns_names[cols_index]})
            col1 = col1.astype(str(column_values[input_columns_names[cols_index]].dtype))
            col2 = pd.DataFrame(query_dataframe[cols_index + 1]["value"])
            col2 = col2.rename(columns={col2.columns[0]: input_columns_names[cols_index + 1]})
            col2 = col2.astype(str(column_values[input_columns_names[cols_index + 1]].dtype))
            col3 = pd.concat([col1, col2], axis=1)
            if df_list == pd.DataFrame.empty:
                df_list = col3
            else:
                df_list = pd.concat([df_list, col3], axis=1)
        filtered_columns = column_values
        if query_dataframe is not None:
            for column in column_values:
                filtered_columns = filtered_columns[filtered_columns[str(column)].isin(df_list[str(column)])]
        #### Filter Columns By Selection

        ### Prepare Parameters for script
        global_vars = {}
        input_values = {
            "column_values": column_values,
            "query": query_dataframe,
            "columns_count": len(column_values),
            "input_columns_names": input_columns_names,
            "filtered_columns": filtered_columns
        }
        ### Prepare Parameters for script

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
        data_column_names = []
        get_data = GetData([])
        data_column = get_data.get_data_list(file_name)
        int_values = list(map(int, column_values))
        data_column = data_column.iloc[:, int_values]
        column_array = list()
        for column in data_column.columns.tolist():
            column_array.append(data_column[column].unique())
            data_column_names.append(column)
        return data_column_names, column_array
