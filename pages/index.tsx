import Head from "next/head";
import React from "react";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div>
      <Head>
        <script
          defer
          data-domain="firehose.lot23.com"
          src="https://plausible.io/js/script.js"
        ></script>
        <title>Firehose!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  );
};

export default Home;
