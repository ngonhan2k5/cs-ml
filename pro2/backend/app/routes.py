from app import app
from app.models import MovieSchema, Movie
from app.top_rate_for_user import TopRateMovieForUser
from app.utils import check_input_valid, load_pickle, InvalidUsage
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
    if movie_id.isdigit():
        try:
            model2 = load_pickle('ml_models/model2.pickle')
            return jsonify(model2.get_recommendations(int(movie_id)).index.tolist())
        except Exception as e:
            raise InvalidUsage(
                'Have error when get top similars: ' + str(e), status_code=502)
    else:
        raise InvalidUsage('Need movie id', status_code=400)


@app.route('/api/rate/<user_id>/<movie_id>')
def get_rate(user_id, movie_id):
    rating_filename = 'ml_data/ratings_small.csv'
    reader = Reader()
    ratings = pd.read_csv(rating_filename)

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


@app.route('/api/top-ten-rate', methods=['GET'])
def get_top_ten_rate_of_user():
    # return top 10 movies' with user_id
    user_id = int(request.args['user_id'])
    print(user_id)
    topRateMovieForUser = TopRateMovieForUser(
        'ml_data/', 'ratings_small.csv', 'ml_models/',
        'top-user-movie-ratings-small.pkl')
    # top_ten_rate = ['tt0114709', 'tt0113497']
    return jsonify(topRateMovieForUser.get_top_ten_rate_of_user(user_id))


@app.route('/api/movies/<movie_id>')
def get_movie_by_id(movie_id):
    movie = Movie.query.filter(Movie.id == movie_id).one_or_none()
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


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
