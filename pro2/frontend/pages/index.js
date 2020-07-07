import { useState, useEffect } from "react";
import Head from "next/head";
import TopTenRateMovies from "../blocks/TopTenRateMovies";
import SwitchUserForm from "../blocks/SwitchUserForm";

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Movie Recommendator System</title>
      </Head>

      <main>
        <TopTenRateMovies userId={props.userId}></TopTenRateMovies>
      </main>

      <footer></footer>

      <style jsx>{`
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

      <style jsx global>{``}</style>
    </div>
  );
}
