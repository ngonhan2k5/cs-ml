import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import Movie from "../components/Movie";
import { Loading, Error } from "../components/LoadingStatus";

import useFetchSuggested from "../hooks/useFetchSuggested";
import Slider from "../components/NetflixSlider";

function SuggestedMoviesTitle() {
  return (
    <>
      <a data-tip data-for="SuggestedMoviesTitle">
        <h4 className="movie-list-label">YOU MAY ALSO LIKE</h4>
      </a>
      <ReactTooltip
        id="SuggestedMoviesTitle"
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
function SuggestedMovies(props) {
  const [data, loading, error] = useFetchSuggested(props);

  if (!data) {
    if (loading == true)
      return (
        <div className="container">
          <SuggestedMoviesTitle />
          <Loading></Loading>
        </div>
      );
    else if (error)
      return (
        <div className="container">
          <SuggestedMoviesTitle />
          <Error></Error>
        </div>
      );
    return null;
  }
  return (
    <div className="container">
      <SuggestedMoviesTitle />
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
export default SuggestedMovies;
