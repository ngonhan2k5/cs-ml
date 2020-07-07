import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchTopRate from "../hooks/useFetchTopRate";
import Slider from "../components/NetflixSlider";

function TopTenMovies(props) {
  const [data, loading, error] = useFetchTopRate(props);

  if (!data) {
    if (loading == true)
      return (
        <div className="container">
          <h4>RECOMMENDATIONS FOR YOU</h4>
          <h5>Loading...</h5>
        </div>
      );
    return null;
  }
  return (
    <div className="container">
      <h4>RECOMMENDATIONS FOR YOU</h4>
      {loading ?? <span>Loading...</span>}
      <div className="container">
        <Slider>
          {data.map((movie) => (
            <Slider.Item movie={movie} key={movie.id}>
              item1
            </Slider.Item>
          ))}
        </Slider>
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
