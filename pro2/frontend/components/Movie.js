import React from "react";

function Movie({ movie }) {
  return (
    <div className="col-12 col-md-3 movie-wrapper">
      <div className="img">
      </div>
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <style jsx>{`
     .img {
       width: 100%;
       height: 300px;
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
