import Head from "next/head";
import React from "react";
import Update from "../components/Update";

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
          <h1 className="text-xl font-medium text-center">
            Jon Bell&apos;s Firehose (update)
          </h1>
        </div>
      </header>
      <Update />
    </div>
  );
};

export default Home;
