import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchTopSimilarMovies from "../hooks/useFetchTopSimilarMovies";

function TopTenMovies(props) {
  const [data, loading, error] = useFetchTopSimilarMovies(props);
  return (
    <div className="container">
      <h4>TOP 10 SIMILAR MOVIES</h4>
      {loading ?? <span>Loading...</span>}
      <div className="container row">
        {data?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID}></Movie>
        ))}
      </div>

      <style jsx>{`
        h4 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
export default TopTenMovies;
