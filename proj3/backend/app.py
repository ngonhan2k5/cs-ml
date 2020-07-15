import base64
import numpy as np
import io
from PIL import Image, ImageFile
import keras
from keras import backend as K
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
from tensorflow.keras.models import load_model
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app)

def get_model():
    global model
    model = load_model('../models/fine_tuned_vgg.h5')
    print(" * Model loaded!")

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image

print(" * Loading Keras model...")
get_model()

@app.route("api/predict", methods=["POST"])
# @cross_origin()
def predict():
    message = request.get_json(force=True)
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

    processed_image = preprocess_image(image, target_size=(224, 224))
    
    prediction = model.predict(processed_image).tolist()

    response = {
        'prediction': {
            'dog': prediction[0][0],
            'cat': prediction[0][1]
        }
    }
    return jsonify(response)
