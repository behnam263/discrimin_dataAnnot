import os.path
import pandas as pd
import matplotlib.pyplot as plt
import base64
from .filemgm import FileMGM
from io import BytesIO


class Evals:
    upload_path = ""

    def __init__(self):
        file_mgm = FileMGM()
        self.upload_path = file_mgm.getUploadFolder()

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

    def get_plot(self,x, y):
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

    def get_plot_dataframe(self, df, chart_type):
        df.plot(kind=chart_type)  # bar can be replaced by
        graph = self.get_graph()
        return graph

    def pearsonr(self, x, y):
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
