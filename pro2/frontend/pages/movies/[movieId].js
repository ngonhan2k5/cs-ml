import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import TopTenSimilarMovies from "../../blocks/TopTenSimilarMovies";
import useFetchMovie from "../../hooks/useFetchMovie";

export default function MovieDetail(props) {
  const router = useRouter();
  const { movieId } = router.query;
  const [data, loading, error] = useFetchMovie({ movieId });
  if (!movieId || !data) return null;
  console.log(data);
  const movie = data;
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

        <div className="container row">
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
              </div>
            </div>
          </div>
        </div>

        <TopTenSimilarMovies movieId={movieId}></TopTenSimilarMovies>
      </main>

      <style jsx>{`
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
      <style jsx>{``}</style>

      {/* <style jsx global>{`
        .movie-header {
          margin-bottom: 20px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        .movie-header p {
          margin-bottom: 3px;
        }
        .movie-header h1 {
          margin-bottom: 0px;
          margin-right: 0px;
        }
      `}</style> */}
    </div>
  );
}
