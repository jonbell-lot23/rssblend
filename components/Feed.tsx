import React, { useEffect, useState } from "react";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch("api/feed")
      .then((response) => response.text())
      .then((str) => {
        // parse the XML
        const parser = new DOMParser();
        const data = parser.parseFromString(str, "application/xml");
        // extract the RSS items
        const items = data.querySelectorAll("item");
        // console.log(items);
        const feedData = Array.from(items).map((item) => {
          console.log(item);
          return {
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
            description: item.querySelector("description").textContent,
            date:
              item.querySelector("pubDate")?.textContent ||
              (item.querySelector("date")
                ? item.querySelector("date").textContent
                : "aaaaaaa"),
          };
        });

        feedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        console.log(feedData);
        setFeedData(feedData);
      });
  }, []);

  return (
    <div className="container mx-auto prose">
      <div className="py-4">
        {feedData.map((item, index) => (
          <>
            <div key={index} className="bg-white p-4  mb-2">
              <a
                href={item.link}
                className="text-pink-600 text-decoration-none hover:underline"
              >
                {item.title === item.description ? null : item.title}
              </a>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              <p className="text-gray-400">{item.date}</p>
            </div>
            <div className="border-t pb-6 w-1/2 mx-auto"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Feed;
