from flask import Flask
from datetime import datetime
import re
import pickle
from flask import jsonify

app = Flask(__name__)


@app.route('/api/top-ten')
def get_top_ten():
    # return top 10 movies' imdb_ids
    top_ten = ['tt0114709', 'tt0113497']
    return jsonify(top_ten)

@app.route('/api/top-ten-similar/<imdb_id>')
def get_top_ten_similar(imdb_id):
    # return top 10 movies' imdb_ids
    top_ten_similar = ['tt0114709', 'tt0113497']
    return jsonify(top_ten_similar)

@app.route('/api/rate/<user_id>/<imdb_id>')
def get_rate(user_id, imdb_id):
    # return top 10 movies' imdb_ids
    rate = 3
    return rate

@app.route('/api/top-ten-rate/<user_id>')
def get_top_ten_rate(user_id):
    # return top 10 movies' imdb_ids
    top_ten_rate = ['tt0114709', 'tt0113497']
    return jsonify(top_ten_rate)


@app.route('/api-example/create-pickle-file')
def create_pickle_file():
    data_dict = {'Ozzy': 3, 'Filou': 8, 'Luna': 5,
                 'Skippy': 10, 'Barco': 12, 'Balou': 9, 'Laika': 16}
    filename = 'example-pickle'
    outfile = open(filename, 'wb')
    pickle.dump(data_dict, outfile)
    outfile.close()
    return 'Create pickle file success'


@app.route('/api-example/load-pickle')
def load_pickle_file():
    filename = 'example-pickle'
    infile = open(filename, 'rb')
    new_dict = pickle.load(infile)
    infile.close()
    print(new_dict)
    print(type(new_dict))
    return jsonify(new_dict)

