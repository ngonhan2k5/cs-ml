import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import TopTenSimilarMovies from "../../blocks/TopTenSimilarMovies";
import SuggestedMovies from "../../blocks/SuggestedMovies";
import Rates from "../../blocks/Rates";
import useFetchMovie from "../../hooks/useFetchMovie";

export default function MovieDetail(props) {
  const router = useRouter();
  const { movieId } = router.query;
  const [data, loading, error] = useFetchMovie({ movieId });

  if (!movieId || !data) return null;
  const movie = data;
  localStorage.setItem("latedMovieId", movieId);

  return (
    <div className="container">
      <Head>
        <title>{movie.Title}</title>
      </Head>

      <main>
        {/* <div className="container row movie-header">
          <h1>{data.Title}</h1>
          <p>({data.Year})</p>
        </div> */}

        <div className="movie-detail container row">
          <img src={data.Poster} className="col-12 col-md-3"></img>
          <div className="col-12 col-md-9">
            <div className="content__area">
              <div className="content__area__container">
                <div className="content__title">{movie.Title}</div>
                <div className="content__description">{movie.overview}</div>
                <div>
                  <span className="list-label">Starring</span>
                  <span className="list-item">{movie.Genre}</span>
                </div>
                <div>
                  <span className="list-label">Actors</span>
                  <span className="list-item">{movie.Actors}</span>
                </div>
                <div>
                  <span className="list-label">Languages</span>
                  <span className="list-item">{movie.Language}</span>
                </div>
                <Rates
                  userId={props.userId}
                  movie={data}
                  movieId={movieId}
                ></Rates>
              </div>
            </div>
          </div>
        </div>
        <SuggestedMovies
          movieTitle={movie.Title}
          userId={props.userId}
        ></SuggestedMovies>
        <TopTenSimilarMovies
          userId={props.userId}
          movieId={movieId}
          label={"TOP 10 SIMILAR MOVIES"}
        ></TopTenSimilarMovies>
      </main>

      <style jsx>{`
        .movie-detail {
          margin: 50px 0px 140px 0;
        }
        .list-label {
          color: #828282;
          font-weight: 700;
          margin-right: 5px;
          font-size: 15px;
        }
        .list-item {
          font-size: 0.9em;
          color: #828282;
        }
      `}</style>
    </div>
  );
}
