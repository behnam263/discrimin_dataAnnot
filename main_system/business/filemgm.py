import os
import pandas as pd
import platform

class FileMGM:
    def __init__(self):
        pass

    def getUploadFolder(self):
        match platform.system():
            case "Linux":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/uploads/'
            case "Windows":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\uploads\\'
            case _:
                return "Something's wrong with OS name"
        return

    def getFormulaFolder(self):
        match platform.system():
            case "Linux":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/Formulas/'
            case "Windows":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\'
            case _:
                return "Something's wrong with OS name"

    def get_output_component_folder(self):
        match platform.system():
            case "Linux":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/Formulas/Components/'
            case "Windows":
                return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\Components\\'
            case _:
                return "Something's wrong with OS name"

    def getFormulaFileAddress(self):
        return self.getFormulaFolder() + 'fileList.csv'

    def getListOfUpload(self):
        # uploadPath=self.getUploadFolder()
        files = os.listdir(self.getUploadFolder())
        return files

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
