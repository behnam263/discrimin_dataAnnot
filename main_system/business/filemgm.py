import os
import pandas as pd
import platform


class FileMGM:
    def __init__(self):
        pass

    def getUploadFolder(self):
        system_name = platform.system()
        if system_name == "Linux":
            return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/uploads/'
        elif system_name == "Windows":
            return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\uploads\\'
        else:
            return "Something's wrong with OS name"

    def getFormulaFolder(self):
        system_name = platform.system()
        if system_name == "Linux":
            return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/Formulas/'
        elif system_name == "Windows":
            return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\'
        else:
            return "Something's wrong with OS name"

    @property
    def get_output_component_folder(self):
        system_name = platform.system()
        if system_name == "Linux":
            return os.path.dirname(
                os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/Formulas/Components/'
        elif system_name == "Windows":
            return os.path.dirname(
                os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\Components\\'
        else:
            return "Something's wrong with OS name"

    def getFormulaFileAddress(self):
        return self.getFormulaFolder() + 'fileList.csv'

    def getListOfUpload(self):
        files = os.listdir(self.getUploadFolder())
        return files
    def delete_uploaded_file(self,filename):
        os.remove(self.getUploadFolder()+filename )
        return None
    def getdataFrameofFile(self, path, separator, with_header):
        if separator is None and with_header is None:
            df = pd.read_csv(path)
        elif with_header is None:
            df = pd.read_csv(path, skiprows=1, header=None)
        elif separator is None:
            df = pd.read_csv(path, sep=separator)
        return df

    def gettextFile(self, path):
        with open(path, 'r') as file:
            data = file.read()
        return data

    def isFileExists(self, path):
        return os.path.exists(path)
