import sys
from io import StringIO
from main_system.business.get_data import GetData
import pandas as pd


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

        result = []
        for i in range(0, len(data_values.columns) - 1):
            temporary = data_values.iloc[:, int(i)]
            result.append(temporary.value_counts() / len(temporary))

        loc = {}
        input_values = {"values": data_values, "columns_count": len(values)}

        exec(string_code, input_values, loc)
        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        output_error = ""

        loc2 = {}
        return_workaround = []
        try:
            exec('a=f()', loc, loc2)
            return_function = loc2['a']
            return_function = pd.concat(return_function, axis=1)

        except Exception as exc:
            output_error = f"error:\n{exc}\n"

        s = code_err.getvalue()

        print("error:\n%s\n" % s)

        s = code_out.getvalue()

        print("output:\n%s" % s)

        code_out.close()
        code_err.close()
        return_workaround.append(return_function)
        return_workaround.append(output_error)
        return return_workaround
