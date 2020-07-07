import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import TopTenSimilarMovies from "../../blocks/TopTenSimilarMovies";
import useFetchMovie from "../../hooks/useFetchMovie";

export default function MovieDetail(props) {
  const router = useRouter();
  const { movieId } = router.query;
  const [data, loading, error] = useFetchMovie({movieId});
  console.log('movieId' + movieId)
  return (
    <div className="container">
      <Head>
        <title>Movie Recommendator System</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <main>
        <h1>Movie detail</h1>
        {/* <h1>{data ?? data?.Title}</h1> */}
        <TopTenSimilarMovies movieId={movieId}></TopTenSimilarMovies>
      </main>

      <footer></footer>

      <style jsx>{`
        main > h1 {
          text-align: center;
          padding: 10px;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
