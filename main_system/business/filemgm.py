import os


class FileMGM:
    def __init__(self):
        pass

    def getUploadFolder(self):
        return os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '\\uploads\\'

    def getListOfUpload(self):
        uploadPath=self.getUploadFolder()
        files = os.listdir('./uploads')
        return files
