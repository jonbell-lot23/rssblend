import Head from "next/head";
import React from "react";
import Thumb from "../components/Thumb";

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
            Jon Bell's Firehose
          </h1>
        </div>
      </header>
      <div className="flex flex-wrap justify-around">
        <Thumb
          slug="o573-s7j0"
          description="I try to build an 'idea lab' with a new debate partner I found on the internet"
        />
        <Thumb
          slug="202d-93c8"
          description="Some people say anything that can exist does exist, into infinity. Maybe they're right, but..."
        />
        <Thumb
          slug="5b70-7e78"
          description="Either everything Meta does is wrong, or the world is complicated and nuanced."
        />
        <Thumb
          slug="1ce0-81d9"
          description="I don't read much, but more than zero."
        />
        <Thumb
          slug="b870-6f73"
          description="Everyone has their predictions, and here are mine."
        />
        <Thumb
          slug="2f07-02db"
          description="People say interesting things if you let them."
        />
      </div>
    </div>
  );
};

export default Home;
