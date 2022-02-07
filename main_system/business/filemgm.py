import os
import pandas as pd

class FileMGM:
    def __init__(self):
        pass

    def getUploadFolder(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\uploads\\'

    def getFormulaFolder(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '\\Formulas\\'

    def getListOfUpload(self):
        uploadPath=self.getUploadFolder()
        files = os.listdir('./uploads')
        return files

    def getdataFrameofFile(self,path):
        df = pd.read_csv(path)
        df["id"] = df.index + 1
        return df

    def gettextFile(self,path):
        with open(path, 'r') as file:
            data = file.read()
        return data

    def isFileExists(self,path):
        return os.path.exists(path)
