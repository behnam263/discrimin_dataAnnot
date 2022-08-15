import os
import pandas as pd


class FileMGM:
    def __init__(self):
        pass

    def getUploadFolder(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\uploads\\'

    def getFormulaFolder(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\'

    def get_output_component_folder(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\Components\\'

    def getFormulaFileAddress(self):
        return self.getFormulaFolder() + 'fileList.csv'

    def getListOfUpload(self):
        # uploadPath=self.getUploadFolder()
        files = os.listdir('./uploads')
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
