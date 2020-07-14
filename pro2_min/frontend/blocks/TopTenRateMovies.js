import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import Movie from "../components/Movie";
import { Loading, Error } from "../components/LoadingStatus";

import useFetchTopRate from "../hooks/useFetchTopRate";
import Slider from "../components/NetflixSlider";

function TopTenRateMoviesTitle() {
  return (
    <>
      <a data-tip data-for="TopTenRateMoviesTitle">
        <h4 className="movie-list-label">RECOMMENDATIONS FOR YOU</h4>
      </a>
      <ReactTooltip
        id="TopTenRateMoviesTitle"
        place="top"
        type="dark"
        effect="float"
      >
        <span>
          We use collaborative filtering (SVD algorithm) with your
          <br />
          userId to select top 10 rated movies for you
        </span>
      </ReactTooltip>
    </>
  );
}
function TopTenRateMovies(props) {
  const [data, loading, error] = useFetchTopRate(props);

  if (!data) {
    if (loading == true)
      return (
        <div className="container">
          <TopTenRateMoviesTitle />
          <Loading></Loading>
        </div>
      );
    else if (error)
      return (
        <div className="container">
          <TopTenRateMoviesTitle />
          <Error></Error>
        </div>
      );
    return null;
  }
  return (
    <div className="container">
      <TopTenRateMoviesTitle />
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
export default TopTenRateMovies;
