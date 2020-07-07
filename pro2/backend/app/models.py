from app import db, ma


class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    poster_path = db.Column(db.String(80), unique=True)
    title = db.Column(db.String(120), unique=True)

    def __init__(self, poster_path, title):
        self.poster_path = poster_path
        self.title = title


class MovieSchema(ma.Schema):
    class Meta:
        fields = ('poster_path', 'title')
