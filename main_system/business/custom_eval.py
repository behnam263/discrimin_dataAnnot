import sys
from io import StringIO
from main_system.business.get_data import GetData
import pandas as pd

class Custom_Evals:
    def custom_code_run(self, code, values,fileName):
        getData = GetData([])
        # create file-like string to capture output
        codeOut = StringIO()
        codeErr = StringIO()

        # capture output and errors
        sys.stdout = codeOut
        sys.stderr = codeErr
        stringCode = str(code)
        datacl = getData.getDataList(fileName)
        intValues = list(map(int, values))
        datavalues=datacl.iloc[: , intValues]

        result = []
        for i in range(0, len(datavalues.columns)-1):
            tempvar=datavalues.iloc[:, int(i)]
            result.append(tempvar.value_counts() / len(tempvar))

        loc = {}
        inputloc = {"values": datavalues,"columnsCount":len(values)}

        exec(stringCode,inputloc, loc)
        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        outputError=""

        loc2 = {}
        return_workaround =[]
        try:
            exec('a=f()', loc, loc2)
            return_function = loc2['a']
            return_function=pd.concat(return_function, axis=1)

        except Exception as exc:
            outputError= f"error:\n{exc}\n"


        s = codeErr.getvalue()

        print("error:\n%s\n" % s)

        s = codeOut.getvalue()

        print("output:\n%s" % s)

        codeOut.close()
        codeErr.close()
        return_workaround.append(return_function)
        return_workaround.append(outputError)
        return return_workaround
