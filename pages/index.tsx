import Head from "next/head";
import React from "react";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div>
      <Head>
        <title>My RSS Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div className="py-4">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;
