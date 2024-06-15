// pages/create.tsx

import React, { useState } from "react";
import RssParser from "rss-parser";

const CreatePage: React.FC = () => {
  const [rssUrl, setRssUrl] = useState<string>("");
  const [feedItems, setFeedItems] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRssUrl(event.target.value);
  };

  const handleFetchFeed = async () => {
    if (!rssUrl) return;

    const parser = new RssParser();
    try {
      const feed = await parser.parseURL(rssUrl);
      setFeedItems(feed.items);
    } catch (error) {
      console.error("Error fetching feed data:", error);
      setFeedItems([]);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl">Enter RSS Feed URL</h1>
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
      <div className="mt-4">
        <h2 className="text-xl">Feed Items</h2>
        {feedItems.map((item, index) => (
          <div key={index} className="p-2 border-b">
            <h3>{item.title}</h3>
            <p>{item.contentSnippet || item.content}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePage;
