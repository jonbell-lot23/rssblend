import Head from "next/head";
import React from "react";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Firehose!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  );
};

export default Home;
