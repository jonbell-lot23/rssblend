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
    const guid = uuidv4(); // This generates a random GUID
    const urls = rssUrl
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url);

    // Here you would update your schema and save the GUID with the URLs
    // This is a placeholder for your database save logic
    try {
      const res = await fetch("/api/save-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guid, urls }),
      });

      if (!res.ok) {
        throw new Error(`Error saving feed: ${res.status}`);
      }

      // Redirect to the new page using the GUID
      window.location.href = `/f/${guid}`;
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
