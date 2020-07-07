import { useState, useEffect } from "react";
import Head from "next/head";

import "../styles/global.scss";
import "../styles/Slider.scss";
import "../styles/Content.scss";
import "../styles/ShowDetailsButton.scss";
import "../styles/Item.scss";
import "../styles/Mark.scss";
import "../styles/SlideButton.scss";
import "../styles/SliderWrapper.scss";

import NavigationBar from "../components/NavigationBar";
import SwitchUserForm from "../blocks/SwitchUserForm";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState(1);
  const [openedSwitchUser, setOpenedSwitchUser] = useState(true);
  const openSwitchUser = () => setOpenedSwitchUser(true);
  const closeSwitchUser = () => setOpenedSwitchUser(false);
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        ></link>
      </Head>
      <NavigationBar
        userId={userId}
        openSwitchUser={openSwitchUser}
      ></NavigationBar>
      {openedSwitchUser ? (
        <SwitchUserForm
          setUserId={setUserId}
          userId={userId}
          closeSwitchUser={closeSwitchUser}
        ></SwitchUserForm>
      ) : null}

      <Component {...pageProps} userId={userId} />
    </div>
  );
}
