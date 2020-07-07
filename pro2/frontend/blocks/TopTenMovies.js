import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import useFetchMovies from '../hooks/useFetchMovies'

function TopTenMovies() {
  const [data, loading, error] = useFetchMovies()
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

      `}</style>
    </div>
  );
}
export default TopTenMovies