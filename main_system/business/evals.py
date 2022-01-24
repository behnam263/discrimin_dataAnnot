import os.path
import pandas as pd

from .filemgm import FileMGM

import matplotlib.pyplot as plt
import base64
from io import BytesIO


class Evals:
    upload_path = ""

    def __init__(self):
        file_mgm = FileMGM()
        self.upload_path = file_mgm.getUploadFolder()

    def baysian(request, self):
        file_path = self.uploadpath + request
        if os.path.exists(file_path):
            dataset = pd.read_csv(file_path)
            X = dataset.iloc[:, 1].values
            Y = dataset.iloc[:, 1].values
            return X[0:20], Y[0:20],
        else:
            return None

    def get_graph(self):
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_png = buffer.getvalue()
        # print(image_png)
        graph = base64.b64encode(image_png)
        graph = graph.decode('utf_8')
        buffer.close()
        return graph

    def get_plot(x, y, self):
        plt.switch_backend('AGG')
        plt.figure(figsize=(10, 5))
        plt.title('sale of items')
        plt.plot(x, y)
        plt.xticks(rotation=45)
        plt.xlabel('item')
        plt.ylabel('price')
        plt.tight_layout()
        graph = self.get_graph()
        return graph

    def pearsonr(x, y, self):
        # Assume len(x) == len(y)
        n = len(x)
        sum_x = float(sum(x))
        sum_y = float(sum(y))
        sum_x_sq = sum(xi * xi for xi in x)
        sum_y_sq = sum(yi * yi for yi in y)
        psum = sum(xi * yi for xi, yi in zip(x, y))
        num = psum - (sum_x * sum_y / n)
        den = pow((sum_x_sq - pow(sum_x, 2) / n) * (sum_y_sq - pow(sum_y, 2) / n), 0.5)
        if den == 0: return 0
        return num / den
