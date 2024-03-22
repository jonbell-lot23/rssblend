import Head from "next/head";
import React, { useEffect, useState } from "react";
import PostsPerWeekChart from "./charts/posts-per-week.js";
import Widget from "../components/widget";

const Home = () => {
  const [totalWords, setTotalWords] = useState("Loading...");
  const [wordsPerDay, setWordsPerDay] = useState("Loading...");
  const [coolLinks, setCoolLinks] = useState("Loading...");
  const [differentSources, setDifferentSources] = useState("Loading...");
  // Assume "Another number" is a placeholder for an actual statistic you'll implement

  useEffect(() => {
    // Fetch Total Words
    fetch("/api/total-words")
      .then((res) => res.json())
      .then((data) => setTotalWords(data.totalWords));

    // Fetch Words Per Day
    fetch("/api/words-per-day")
      .then((res) => res.json())
      .then((data) => setWordsPerDay("204"));

    // Fetch links count
    fetch("/api/total-links")
      .then((res) => res.json())
      .then((data) => setCoolLinks(data.count));

    // Fetch Different Sources Count
    fetch("/api/total-sources")
      .then((res) => res.json())
      .then((data) => setDifferentSources(data.distinctSourcesCount));
  }, []);

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
          <Widget
            number={totalWords?.toString() ?? "Loading..."}
            description="Total words"
          />
          <Widget
            number={wordsPerDay?.toString() ?? "Loading..."}
            description="Words per day"
          />
          <Widget
            number={coolLinks?.toString() ?? "Loading..."}
            description="Cool links"
          />
          <Widget
            number={differentSources?.toString() ?? "Loading..."}
            description="Different sources"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
