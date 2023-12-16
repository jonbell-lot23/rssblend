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

      <header className="bg-[#d73d61] text-white top-0 left-0 w-full z-10">
        <div className="container px-6 py-3 mx-auto shadow-b-md">
          <h1 className="text-xl font-medium text-center">
            Jon Bell's Firehose
          </h1>
        </div>
      </header>
      <Feed />
    </div>
  );
};

export default Home;
