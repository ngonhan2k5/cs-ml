import base64
import numpy as np
import io
from PIL import Image
from keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS
import os
from model import Model
import time


app = Flask(__name__)
CORS(app)


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
                    'models/vgg16_model.h5',
                    'models/history_vgg16.json')

model_vgg19 = Model('fine-tuned-vgg19',
                    'models/vgg19_model.h5',
                    'models/history_vgg19.json')

model_densenet121 = Model('fine-tuned-densenet121',
                          'models/DENSENET121_model.h5',
                          'models/history_densenet121.json')

model_mobilenet = Model('fine-tuned-mobilenet',
                        'models/mobilenet_model.h5',
                        'models/history_mobilenet.json')

print(" * Model loaded!")


def get_image_from_message(message, image_name):
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    filename = image_name + '.jpg'
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
    image = get_image_from_message(message, model_vgg16.name)
    processed_image = preprocess_image(image, target_size=(224, 224))
    start_time = time.time()
    prediction = model_vgg16.model.predict(processed_image).tolist()
    execution_time = time.time() - start_time
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        },
        'execution_time': execution_time
    }
    return jsonify(response)


@app.route("/api/predict_densenet121", methods=["POST"])
def predict_densenet121():
    message = request.get_json(force=True)
    image = get_image_from_message(message,  model_densenet121.name)
    processed_image = preprocess_image(image, target_size=(224, 224))
    start_time = time.time()
    prediction = model_densenet121.model.predict(processed_image).tolist()
    execution_time = time.time() - start_time
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        },
        'execution_time': execution_time
    }
    return jsonify(response)


@app.route("/api/predict_vgg19", methods=["POST"])
def predict_vgg19():
    message = request.get_json(force=True)
    image = get_image_from_message(message, model_vgg19.name)
    processed_image = preprocess_image(image, target_size=(224, 224))
    start_time = time.time()
    prediction = model_vgg19.model.predict(processed_image).tolist()
    execution_time = time.time() - start_time
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        },
        'execution_time': execution_time
    }
    return jsonify(response)


@app.route("/api/predict_mobilenet", methods=["POST"])
def predict_mobilenet():
    message = request.get_json(force=True)
    image = get_image_from_message(message,  model_mobilenet.name)
    processed_image = preprocess_image(image, target_size=(224, 224))
    start_time = time.time()
    prediction = model_mobilenet.model.predict(processed_image).tolist()
    execution_time = time.time() - start_time
    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        },
        'execution_time': execution_time
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
