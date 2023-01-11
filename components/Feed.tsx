import React, { useEffect, useState } from "react";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch("http://firehose.lot23.com/api/feed")
      .then((response) => response.text())
      .then((str) => {
        // parse the XML
        const parser = new DOMParser();
        const data = parser.parseFromString(str, "application/xml");
        // extract the RSS items
        const items = data.querySelectorAll("item");
        const feedData = Array.from(items).map((item) => ({
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent,
          description: item.querySelector("description").textContent,
          date: item.querySelector("pubDate").textContent,
        }));

        setFeedData(feedData);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-4">
        {feedData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <a href={item.link} className="text-blue-500 hover:underline">
              {item.title}
            </a>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />

            <p className="text-gray-600">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
