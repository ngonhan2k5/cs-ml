import React from "react";

function Movie({ movie }) {
  return (
    <div className="col-12 col-md-2 movie-wrapper">
      <div className="img">
      </div>
      <p>{movie.Title} ({movie.Year})</p>
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

     }
   `}</style>
    </div>
    
  );
}
export default Movie;
