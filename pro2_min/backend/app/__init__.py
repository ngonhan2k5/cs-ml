from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


app = Flask(__name__)

CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + \
    os.path.join(basedir, 'movies_metadata.db')
app.config.from_mapping(
    DEBUG=True,
    CSRF_ENABLED=True,
    SQLALCHEMY_DATABASE_URI='sqlite:///' +
    os.path.join(basedir, 'movies_metadata.db'),
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    # SQLALCHEMY_ECHO=True
)
db = SQLAlchemy(app)
ma = Marshmallow(app)


from app import routes, models, utils