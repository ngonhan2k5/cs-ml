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