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

    def __init__(self, poster_path, imdb_id, title, overview, vote_average,
                 vote_count, runtime, release_date):
        self.poster_path = poster_path
        self.imdb_id = imdb_id
        self.title = title
        self.overview = overview
        self.vote_average = vote_average
        self.vote_count = vote_count
        self.runtime = runtime
        self.release_date = release_date


class MovieSchema(ma.Schema):
    class Meta:
        fields = ('poster_path', 'imdb_id', 'title', 'overview',
                  'vote_average', 'vote_count', 'runtime', 'release_date')
