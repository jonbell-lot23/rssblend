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
                : "(no date)"),
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
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="http://firehose.lot23.com/api/feed"
      />
      <div className="mx-auto prose">
        <div className="py-4">
          {feedData.slice(0, 25).map((item, index) => (
            <>
              <div key={index} className="p-4 mb-2">
                <a
                  href={item.link}
                  className="text-pink-600 text-decoration-none text-truncate break-normal"
                >
                  {item.title.replace(/<[^>]+>/g, "").trim() ===
                  item.description.replace(/<[^>]+>/g, "").trim()
                    ? null
                    : item.title}
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
    </>
  );
};

export default Feed;
