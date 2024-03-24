import styles from "../styles/v0.module.css";
import React, { useState, useEffect } from "react";

export default function Component() {
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
    <>
      <section>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            <img src="/masthead.png" />
          </h1>
          <p className={styles.blurb}>
            Firehose is a way to pull a bunch of different writing projects into
            a single feed. Check out{" "}
            <a href="https://jonbell.medium.com/hey-creators-please-make-firehoses-8d0c48c075e4">
              Hey Creators, Please Make Firehoses!
            </a>{" "}
            to learn more.
          </p>
          <section className={styles.stats}>
            <div className={styles.header}>Fun statistics</div>
            <div>
              <b>Total words:</b> {totalWords}
            </div>
            <div>
              <b>Words per day:</b> {wordsPerDay}
            </div>
            <div>
              <b>Cool links:</b> {totalLinks}
            </div>
            <div>
              <b>Sources:</b> {differentSources}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
