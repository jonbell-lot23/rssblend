import Head from "next/head";
import React, { useEffect, useState } from "react";
import PostsPerWeekChart from "./charts/posts-per-week.js";
import Widget from "../components/Widget";

const Home = () => {
  const [totalWords, setTotalWords] = useState("Loading...");
  const [wordsPerDay, setWordsPerDay] = useState("Loading...");
  const [totalLinks, setTotalLinks] = useState("Loading...");
  const [differentSources, setDifferentSources] = useState("Loading...");

  useEffect(() => {
    // Define a generic fetch function
    const fetchData = async (apiUrl, setter, dataKey) => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setter(data?.[dataKey] ?? "No result");
      } catch (error) {
        console.error("Fetching error:", error);
        setter("No result");
      }
    };

    // Fetch Total Words
    fetchData("/api/total-words", setTotalWords, "totalWords");

    // Fetch Words Per Day
    fetchData("/api/words-per-day", setWordsPerDay, "words_per_day");

    // Fetch Cool Links Count
    fetchData("/api/total-links", setTotalLinks, "count");

    // Fetch Different Sources Count
    fetchData(
      "/api/total-sources",
      setDifferentSources,
      "distinctSourcesCount"
    );
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
            number={totalLinks?.toString() ?? "Loading..."}
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
