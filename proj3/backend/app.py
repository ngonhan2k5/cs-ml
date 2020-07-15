import base64
import numpy as np
import io
from PIL import Image
# import keras
# from keras import backend as K
# from keras.models import Sequential
# from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS
import os
from model import Model

app = Flask(__name__)
CORS(app)


# def get_model():
#     global model
#     model = load_model('../models/fine_tuned_vgg.h5')
#     print(" * Model loaded!")


def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image


print(" * Loading Keras model...")
# get_model()
model_vgg16 = Model('fine-tuned-vgg16',
                    '../models/vgg16_model.h5',
                    '../models/history_vgg16.json')

model_vgg19 = Model('fine-tuned-vgg19',
                    '../models/vgg19_model.h5',
                    '../models/history_vgg19.json')

model_densenet121 = Model('fine-tuned-densenet121',
                          '../models/densenet121_model.h5',
                          '../models/history_densenet121.json')
                          
model_mobilenet = Model('fine-tuned-mobilenet',
                        '../models/mobilenet_model.h5',
                        '../models/history_mobilenet.json')

print(" * Model loaded!")


def get_image_from_message(message):
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    filename = 'some_image.jpg'
    with open(filename, 'wb') as f:
        f.write(decoded)
    f = open(filename, 'rb')
    f.seek(15, 0)
    b = io.BytesIO()
    b.write(f.read())
    image = Image.open(b)
    os.remove(filename)
    return image


@app.route("/api/predict_vgg16", methods=["POST"])
def predict_vgg16():
    message = request.get_json(force=True)
    image = get_image_from_message(message)
    processed_image = preprocess_image(image, target_size=(224, 224))
    prediction = model_vgg16.predict(processed_image).tolist()
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        }
    }
    return jsonify(response)


@app.route("/api/predict_densenet121", methods=["POST"])
def predict_densenet121():
    message = request.get_json(force=True)
    image = get_image_from_message(message)
    processed_image = preprocess_image(image, target_size=(224, 224))
    prediction = model_densenet121.model.predict(processed_image).tolist()
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        }
    }
    return jsonify(response)


@app.route("/api/predict_vgg19", methods=["POST"])
def predict_vgg19():
    message = request.get_json(force=True)
    image = get_image_from_message(message)
    processed_image = preprocess_image(image, target_size=(224, 224))
    prediction = model_vgg19.model.predict(processed_image).tolist()
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        }
    }
    return jsonify(response)


@app.route("/api/predict_mobilenet", methods=["POST"])
def predict_mobilenet():
    message = request.get_json(force=True)
    image = get_image_from_message(message)
    processed_image = preprocess_image(image, target_size=(224, 224))
    prediction = model_mobilenet.model.predict(processed_image).tolist()
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        }
    }
    return jsonify(response)


@app.route("/api/models", methods=["GET"])
def get_models():
    response = [
        {
            'name': model_vgg16.name,
            'summary': model_vgg16.summary,
            'history': model_vgg16.history,
            'size': model_vgg16.size
        },
        {
            'name': model_vgg19.name,
            'summary': model_vgg19.summary,
            'history': model_vgg19.history,
            'size': model_vgg19.size
        },
        {
            'name': model_densenet121.name,
            'summary': model_densenet121.summary,
            'history': model_densenet121.history,
            'size': model_densenet121.size
        },
        {
            'name': model_mobilenet.name,
            'summary': model_mobilenet.summary,
            'history': model_mobilenet.history,
            'size': model_mobilenet.size
        },
    ]
    return jsonify(response)
