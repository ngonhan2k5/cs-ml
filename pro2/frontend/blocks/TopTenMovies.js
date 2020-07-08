import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import Movie from "../components/Movie";
import { Loading, Error } from "../components/LoadingStatus";

import useFetchTop from "../hooks/useFetchTop";
import Slider from "../components/NetflixSlider";

function TopTenMoviesTitle() {
  return (
    <>
      <a data-tip data-for="TopTenMoviesTitle">
        <h4 className="movie-list-label">TOP 10 RATED MOVIES</h4>
      </a>
      <ReactTooltip
        id="TopTenMoviesTitle"
        place="top"
        type="dark"
        effect="float"
      >
        <span>
          We use demographic filtering and IMDB's weighted rating (wr)
          <br /> to select top 10 highest rating movies
        </span>
      </ReactTooltip>
    </>
  );
}
function TopTenMovies(props) {
  const [data, loading, error] = useFetchTop();

  if (!data) {
    if (loading == true)
      return (
        <div className="container">
          <TopTenMoviesTitle />
          <Loading></Loading>
        </div>
      );
    else if (error)
      return (
        <div className="container">
          <TopTenMoviesTitle />
          <Error></Error>
        </div>
      );
    return null;
  }
  return (
    <div className="container">
      <TopTenMoviesTitle />
      <div className="container">
      <Slider userId={props.userId}>
          {data.map((movie) => (
            <Slider.Item movie={movie} key={movie.id}>
              item1
            </Slider.Item>
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default TopTenMovies;
