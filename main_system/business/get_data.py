from .filemgm import FileMGM
from .type_file import TypeFile
import json


class GetData:
    fileList = []

    def __init__(self, file_list):
        self.fileList = file_list

    def get_output_component_file(self, path):
        file_manager = FileMGM()
        if file_manager.isFileExists(file_manager.get_output_component_folder() + path.strip()):
            component_file = file_manager.gettextFile(file_manager.get_output_component_folder() + path.strip())
            return component_file
        else:
            return None
        return

    def get_file_list(self):
        file_manager = FileMGM().getListOfUpload()
        for file in file_manager:
            self.fileList.append(TypeFile(file, file))
        return self.fileList

    def get_eval_list(self):
        file_manager = FileMGM()
        if file_manager.isFileExists(file_manager.getFormulaFileAddress()):
            evaluator_file = file_manager.getdataFrameofFile(file_manager.getFormulaFileAddress(), ',', None)
            return evaluator_file
        else:
            return None

    def get_eval_entity(self, eval_name):
        eval_list = self.get_eval_list()
        for i in range(1, eval_list[1].count()):
            if eval_list[1][i] == eval_name:
                return eval_list.iloc[i]
        return None

    def get_eval_code_file(self, eval_name):
        eval_entity = self.get_eval_entity(eval_name)
        return eval_entity[2], eval_entity[3]

    def get_eval_controller_file(self, eval_name):
        eval_entity = self.get_eval_entity(eval_name)
        return eval_entity[3]

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def get_data_list(self, path):
        file_manager = FileMGM()
        if file_manager.isFileExists(file_manager.getUploadFolder() + path.strip()):
            data_file = file_manager.getdataFrameofFile(file_manager.getUploadFolder() + path.strip(), None, None)
            return data_file
        else:
            return None

    def get_text_file(self, path):
        file_manager = FileMGM()
        if file_manager.isFileExists(FileMGM().getFormulaFolder() + path.strip()):
            txt_file = file_manager.gettextFile(FileMGM().getFormulaFolder() + path.strip())
            return txt_file
        else:
            return None
