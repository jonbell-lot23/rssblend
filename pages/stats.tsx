import Head from "next/head";
import React from "react";
import PostsPerWeekChart from "./charts/posts-per-week.js";

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

      <header className="bg-[#E9496F] text-white top-0 left-0 w-full z-10">
        <div className="container px-6 py-3 mx-auto shadow-b-md">
          <h1 className="text-xl font-medium text-center">Firehose</h1>
        </div>
      </header>
      <div className="max-w-screen-lg mx-auto">
        <div className="w-full">
          <PostsPerWeekChart />
        </div>
        <div className="flex flex-wrap justify-around mt-4">
          {["92K", "212", "32", "13", "35"].map((stat, index) => {
            const descriptions = [
              "Total words",
              "Words per day",
              "Cool links",
              "Different sources",
              "Another number",
            ];
            return (
              <div
                key={index}
                className="w-100% px-4 py-8 text-center bg-white rounded"
              >
                <p className="text-6xl font-bold">{stat}</p>
                <p className="text-lg">{descriptions[index]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
