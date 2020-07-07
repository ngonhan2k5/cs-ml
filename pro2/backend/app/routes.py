from app import app
from app.models import MovieSchema, Movie
from app.utils import check_input_valid
from flask import abort, g, jsonify, request
import pickle
import pandas as pd
from surprise import Reader, Dataset, SVD
from os import path

movie_schema = MovieSchema()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/api/top-ten')
def get_top_ten():
    # return top 10 movies' movie_ids
    top_ten = ['tt0114709', 'tt0113497']
    return jsonify(top_ten)


@app.route('/api/top-ten-similar/<movie_id>')
def get_top_ten_similar(movie_id):
    # return top 10 movies' movie_ids
    top_ten_similar = ['tt0114709', 'tt0113497']
    return jsonify(top_ten_similar)


@app.route('/api/rate', methods=['GET'])
def get_rate():
    rating_filename = 'ml_data/ratings_small.csv'
    reader = Reader()
    ratings = pd.read_csv(rating_filename)
    user_id = int(request.args['user_id'])
    movie_id = int(request.args['movie_id'])

    if not check_input_valid(user_id, movie_id, ratings):
        return "Error: The value of arguments user_id or movie_id is not valid"

    pkl_filename = "ml_models/pickle_user_movie_rating_model.pkl"
    if path.exists(pkl_filename):
        # Load model from pickle file
        with open(pkl_filename, 'rb') as file:
            model = pickle.load(file)
    else:
        data = Dataset.load_from_df(
            ratings[['userId', 'movieId', 'rating']], reader)

        # Use the famous SVD algorithm
        model = SVD()
        trainset = data.build_full_trainset()
        model.fit(trainset)

        # Save model to file in the current working directory
        with open(pkl_filename, 'wb') as file:
            pickle.dump(model, file)

    predict = model.predict(user_id, movie_id)
    return jsonify(predict)


@app.route('/api/top-ten-rate/<movie_id>')
def get_top_ten_rate(Movie_id):
    # return top 10 movies' movie_ids
    top_ten_rate = ['tt0114709', 'tt0113497']
    return jsonify(top_ten_rate)


@app.route('/api/movies/<movie_id>')
def get_movie_by_id(movie_id):
    movie = Movie.query.get(movie_id)
    if movie is None:
        abort(404, description="Resource not found")
    else:
        return movie_schema.dump(movie)


@app.route('/api/movies')
def get_movies_by_ids():
    movieIds = request.args.getlist('movieIds')
    movies = Movie.query.filter(Movie.id.in_(movieIds)).all()
    if len(movies) is None:
        abort(404, description="Resource not found")
    else:
        return movie_schema.jsonify(movies, many=True)


@app.route('/api-example/create-pickle-file')
def create_pickle_file():
    data_dict = [862, 122036]
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
    return jsonify(new_dict)