import { useState, useEffect } from "react";
import Head from "next/head";
import TopTenRateMovies from "../blocks/TopTenRateMovies";
import TopTenSimilarMovies from "../blocks/TopTenSimilarMovies";
import TopTenMovies from "../blocks/TopTenMovies";
import SwitchUserForm from "../blocks/SwitchUserForm";

export default function Home(props) {
  const latedMovieId = process.browser
    ? localStorage.getItem("latedMovieId")
    : null;
  return (
    <div className="container">
      <Head>
        <title>Machine Learning Netflix</title>
      </Head>

      <main>
        <div className="movie-list">
          <TopTenRateMovies userId={props.userId} />
        </div>
        <div className="movie-list">
          <TopTenMovies userId={props.userId} />
        </div>
        {latedMovieId != null && !isNaN(latedMovieId) ? (
          <TopTenSimilarMovies
            userId={props.userId}
            movieId={latedMovieId}
            label={"BASED ON YOUR BROWSING HISTORY"}
          ></TopTenSimilarMovies>
        ) : null}
      </main>

      <footer></footer>

      <style jsx>{`
        .movie-list {
          margin: 30px 0;
        }
        main > h1 {
          text-align: center;
          padding: 10px;
        }
        footer {
          margin-top: 80px;
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        `}</style>
    </div>
  );
}
