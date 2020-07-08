# from flask import request, jsonify
import pickle
from os import path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from surprise import Reader, Dataset, SVD
import numpy as np


def is_integer(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


def check_request_argument_format(user_id, movie_id):
    if not is_integer(user_id) or \
       not is_integer(movie_id):
        return False
    return True


def check_input_valid(user_id, movie_id, ratings):
    users = ratings.query('userId ==' + str(user_id))
    movies = ratings.query('movieId ==' + str(movie_id))
    if len(users) == 0 or len(movies) == 0:
        return False
    return True


def load_pickle(path):
    with open(path, 'rb') as f:
        return pickle.load(f)


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = 'error'
        return rv


# Chị Hạnh
def retrive_small_movie_metadata():
    pkl_filename = "ml_models/pickle_small_movie_metadata.pkl"
    links_small_file = 'ml_data/links_small.csv'
    moview_metadata_file = 'ml_data/movies_metadata.csv'

    if path.exists(pkl_filename):
        # Load smd from pickle file
        with open(pkl_filename, 'rb') as file:
            smd = pickle.load(file)
    else:
        # Link small
        links_small = pd.read_csv(links_small_file)
        links_small = links_small[links_small['tmdbId']
                                  .notnull()]['tmdbId'].astype('int')

        # Movie Metadata file
        md = pd.read_csv(moview_metadata_file)
        md = md.drop([19730, 29503, 35587])
        md['id'] = md['id'].astype('int')
        # md.shape #(45463, 24)

        # smd: small movies metadata
        smd = md[md['id'].isin(links_small)]
        # smd.shape #(9099, 24)

        # Save smd to file in the current working directory
        with open(pkl_filename, 'wb') as file:
            pickle.dump(smd, file)

    return smd


def compute_cosine_similarity(smd):
    pkl_filename = "ml_models/pickle_cosine_sim.pkl"
    if path.exists(pkl_filename):
        # Load cosine_sim from pickle file
        with open(pkl_filename, 'rb') as file:
            cosine_sim = pickle.load(file)
    else:
        # new feature: description= overview + tagline
        smd['tagline'] = smd['tagline'].fillna('')
        smd['description'] = smd['overview'] + smd['tagline']
        smd['description'] = smd['description'].fillna('')

        # TF-IDF Vectorizer to vectorize description feature
        # (removing stop_words)
        tf = TfidfVectorizer(analyzer='word', ngram_range=(
            1, 2), min_df=0, stop_words='english')
        tfidf_matrix = tf.fit_transform(smd['description'])

        # tfidf_matrix= tfidf_matrix[0:1000]
        # ############################### nhớ xóa

        # linear_kernel to calculate similarity between 2 movies
        # (linear_kernel is much faster than cosine)
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

        # Save cosine_sim to file in the current working directory
        with open(pkl_filename, 'wb') as file:
            pickle.dump(cosine_sim, file)

    return cosine_sim


def convert_int(x):
    try:
        return int(x)
    except ValueError:
        return np.nan


def train_model():
    pkl_filename = "ml_models/pickle_user_movie_rating_model.pkl"
    if path.exists(pkl_filename):
        # Load model from pickle file
        with open(pkl_filename, 'rb') as file:
            model = pickle.load(file)
    else:
        reader = Reader()
        rating_file = 'ml_data/ratings_small.csv'
        ratings = pd.read_csv(rating_file)
        data = Dataset.load_from_df(
            ratings[['userId', 'movieId', 'rating']], reader)

        # Use the famous SVD algorithm
        model = SVD()
        trainset = data.build_full_trainset()
        model.fit(trainset)

        # Save model to file in the current working directory
        with open(pkl_filename, 'wb') as file:
            pickle.dump(model, file)
    return model
