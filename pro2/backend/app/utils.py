# from flask import request, jsonify
import pickle


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
        return rv
