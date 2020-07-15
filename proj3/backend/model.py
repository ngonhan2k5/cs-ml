from tensorflow.keras.models import load_model
import json
import os


def loadHistory(filename):
    with open(filename) as history:
        data = json.load(history)
        return data


class Model:
    def __init__(self, name, model_path, history_path):
        self.name = name
        self.model_path = model_path
        self.history_path = history_path
        self.model = load_model(model_path)
        self.history = loadHistory(history_path)
        self.summary = json.loads(self.model.to_json())
        self.size = os.path.getsize(model_path)
