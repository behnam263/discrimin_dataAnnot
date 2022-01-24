import sys
from io import StringIO


class Custom_Evals:
    def test(self):
        # create file-like string to capture output
        codeOut = StringIO.StringIO()
        codeErr = StringIO.StringIO()

        code = """
        def f(x):
            x = x + 1
            return x
        
        print 'This is my output.'
        """

        # capture output and errors
        sys.stdout = codeOut
        sys.stderr = codeErr

        exec code

        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        print f(4)

        s = codeErr.getvalue()

        print "error:\n%s\n" % s

        s = codeOut.getvalue()

        print "output:\n%s" % s

        codeOut.close()
        codeErr.close()