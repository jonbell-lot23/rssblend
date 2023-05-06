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

      <header className="bg-[#E9496F] text-white top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 py-3 shadow-b-md">
          <h1 className="text-xl font-medium text-center"></h1>
        </div>
      </header>
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex items-center justify-start">
            <img className="h-8 w-8" src="/favicon.ico" alt="Your Icon" />
            <h2 className="ml-4 text-xl font-bold text-gray-700">
              Jon Bell's Firehose
            </h2>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 text-lg">
              Firehose is down for maintenance. If you haven't read it, check
              out my essay{" "}
              <a
                href="https://jonbell.medium.com/hey-creators-please-make-firehoses-8d0c48c075e4"
                className="underline text-[#E9496F]"
              >
                Hey Creators, Please Make Firehoses!
              </a>{" "}
            </p>
            <p className="text-gray-600 text-lg mt-4">
              Better yet, please make your own!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
