from app import db, ma


class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    imdb_id = db.Column(db.Integer, primary_key=True)
    poster_path = db.Column(db.String(80))
    title = db.Column(db.String(120))
    overview = db.Column(db.String(120))
    vote_average = db.Column(db.Float)
    vote_count = db.Column(db.Integer)
    runtime = db.Column(db.Integer)
    release_date = db.Column(db.String(15))

    def __init__(self, id, imdb_id, poster_path, title, overview, vote_average,
                 vote_count, runtime, release_date):
        self.id = id
        self.imdb_id = imdb_id
        self.poster_path = poster_path
        self.title = title
        self.overview = overview
        self.vote_average = vote_average
        self.vote_count = vote_count
        self.runtime = runtime
        self.release_date = release_date


class MovieSchema(ma.Schema):
    class Meta:
        fields = ('id', 'imdb_id', 'poster_path', 'title', 'overview',
                  'vote_average', 'vote_count', 'runtime', 'release_date')
