from .filemgm import FileMGM
from .type_file import TypeFile
import json

class GetData:
    fileList = []

    def __init__(self,fileList):
        self.fileList=fileList

    def getFileList(self):
        mfile = FileMGM().getListOfUpload()
        for file in mfile:
            self.fileList.append(TypeFile(file,file))

        return self.fileList
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,sort_keys=True, indent=4)
