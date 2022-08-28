import json


class TypeFile:
    name = ''
    description = ''

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
