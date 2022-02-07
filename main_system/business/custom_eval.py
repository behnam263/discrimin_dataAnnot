import sys
from io import StringIO
from main_system.business.get_data import GetData

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
        loc = {}
        inputloc = {}
        inputloc["values"] = datavalues
        exec(stringCode,inputloc, loc)

        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
        loc2 = {}
        exec('a=f()', loc, loc2)
        return_workaround = loc2['a']

        s = codeErr.getvalue()

        print("error:\n%s\n" % s)

        s = codeOut.getvalue()

        print("output:\n%s" % s)

        codeOut.close()
        codeErr.close()

        return return_workaround
