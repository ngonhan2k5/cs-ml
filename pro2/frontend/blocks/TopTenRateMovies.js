import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchTopRate from "../hooks/useFetchTopRate";

function TopTenMovies(props) {
  const [data, loading, error] = useFetchTopRate(props);
  return (
    <div className="container">
      <h4>TOP 10 RECOMMENDATIONS</h4>
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
