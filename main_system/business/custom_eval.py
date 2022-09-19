import sys
from io import StringIO
from main_system.business.get_data import GetData
import pandas as pd
import numpy as np


class Custom_Eval:
    def custom_code_run(self, code, values, file_name):
        get_data = GetData([])
        # create file-like string to capture output
        code_out = StringIO()
        code_err = StringIO()

        # capture output and errors
        sys.stdout = code_out
        sys.stderr = code_err
        string_code = str(code)
        data_column = get_data.get_data_list(file_name)
        int_values = list(map(int, values))
        data_values = data_column.iloc[:, int_values]

        values = data_values
        cols = data_values.columns

        global_vars = {}
        input_values = {"values": data_values, "columns_count": len(values), "cols": cols}

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
            if len(local_vars)>0:
                return_function = pd.concat(local_vars, axis=1)

        except Exception as exc:
            output_error = f"error:\n{exc}\n"
        code_out.close()
        code_err.close()
        ## end running function to be run

        return_workaround.append(return_function)
        return_workaround.append(output_error)
        return return_workaround
