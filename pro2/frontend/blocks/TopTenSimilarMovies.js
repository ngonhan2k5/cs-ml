import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Movie from "../components/Movie";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchTopSimilarMovies from "../hooks/useFetchTopSimilarMovies";
import { Loading, Error } from "../components/LoadingStatus";
import Slider from "../components/NetflixSlider";

function TopTenSimilarMoviesTitle(props) {
  return (
    <>
      <a data-tip data-for="TopTenSimilarMoviesTitle">
        <h4 className="movie-list-label">{props.label}</h4>
      </a>
      <ReactTooltip
        id="TopTenSimilarMoviesTitle"
        place="top"
        type="dark"
        effect="float"
      >
        <span>
          We use content based recommender (Cosine Similarity) with your last
          <br /> or current browsing to a movie detail to select top 10 movies
          for you
        </span>
      </ReactTooltip>
    </>
  );
}

function TopTenSimilarMovies(props) {
  const [data, loading, error] = useFetchTopSimilarMovies(props);
  if (!data) {
    if (loading == true)
      return (
        <div className="container">
          <TopTenSimilarMoviesTitle label={props.label} />
          <Loading></Loading>
        </div>
      );
    else if (error)
      return (
        <div className="container">
          <TopTenSimilarMoviesTitle label={props.label} />
          <Error></Error>
        </div>
      );
    return null;
  }
  return (
    <div className="top-ten-similar">
      <div className="container">
        <TopTenSimilarMoviesTitle label={props.label} />
        {/* {loading ?? <span>Loading...</span>}
        <div className="container row">
          {data?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}></Movie>
          ))}
        </div> */}
        <div className="container">
          <Slider userId={props.userId}>
            {data.map((movie) => (
              <Slider.Item movie={movie} key={movie.id}></Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
export default TopTenSimilarMovies;
