import React from "react";
import Link from "next/link";
function Movie({ movie }) {
  return (
    <Link href="/movies/[movieId]"as={`/movies/${movie.id}`}>
      <div className="col-12 col-md-2 movie-wrapper">
        <div className="img"></div>
        <p>
          {movie.Title} ({movie.Year})
        </p>
        {/* http://image.tmdb.org/t/p/w185/rhIRbceoE9lR4veEXuwCC2wARtG.jpg */}
        <style jsx>{`
          .img {
            width: 100%;
            height: 200px;
            background-image: url(${movie.Poster});
            background-position: center;
            background-size: cover;
          }
          .movie-wrapper {
            padding-top: 20px;
            cursor: pointer;
          }
          .movie-wrapper .img {
            margin-bottom: 10px;
          }
          .movie-wrapper:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
    </Link>
  );
}
export default Movie;
