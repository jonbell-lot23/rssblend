import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RssParser from "rss-parser";

const CreatePage: React.FC = () => {
  const [rssUrl, setRssUrl] = useState<string>("");
  const [feedItems, setFeedItems] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRssUrl(event.target.value);
  };

  const handleFetchFeed = async () => {
    const urls = rssUrl
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url);

    if (urls.length === 0) return;

    try {
      const res = await fetch(
        `/api/fetch-rss?urls=${encodeURIComponent(urls.join(","))}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching feed: ${res.status}`);
      }
      const data = await res.json();
      setFeedItems(data.items);
    } catch (error) {
      console.error("Error fetching feed data:", error);
      setFeedItems([]);
    }
  };

  const handleSaveFeed = async () => {
    const urls = feedItems.map((item) => item.link); // Assuming each feed item has a 'link' property

    // Check if there are URLs to save
    if (urls.length === 0) {
      console.error("No URLs to save.");
      return;
    }

    try {
      const response = await fetch("/api/save-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error(`Error saving feed: ${response.status}`);
      }

      const { guid } = await response.json(); // Get the GUID from the server response
      window.location.href = `/f/${guid}`; // Redirect to the new page using the GUID
    } catch (error) {
      console.error("Error saving feed data:", error);
    }
  };

  return (
    <>
      <div className="controls">
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter RSS feed URL"
          value={rssUrl}
          onChange={handleInputChange}
        />
        <button onClick={handleFetchFeed} className="p-2 border rounded">
          Fetch Feed
        </button>

        <button onClick={handleSaveFeed} className="p-2 border rounded">
          Save Feed
        </button>
      </div>
      <div className="container p-4 mx-auto">
        <div className="mt-4 content">
          <h2 className="text-xl">Feed Items</h2>
          {feedItems.map((item, index) => (
            <div key={index} className="p-2 border-b">
              <h3>{item.title}</h3>
              <div className="hidden">
                <p>{item.contentSnippet || item.content}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreatePage;
