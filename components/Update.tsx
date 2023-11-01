import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import fireLottie from "../components/fire.json";
import moment from "moment";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state variable to keep track of loading status

  const LoadingAnimation = () => {
    return <Lottie animationData={fireLottie} />;
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("api/update")
      .then((response) => response.text())
      .then((str) => {
        // parse the XML
        const parser = new DOMParser();
        const data = parser.parseFromString(str, "application/xml");
        // extract the RSS items
        const items = data.querySelectorAll("item");
        // console.log(items);
        const feedData = Array.from(items).map((item) => {
          // console.log(item);

          let titleObjectFull = item.querySelector("title").textContent;
          const [precedingEmoji, ...titleObjectNoEmoji] =
            titleObjectFull.split(" ");
          titleObjectFull = titleObjectNoEmoji.join(" ");

          return {
            title: titleObjectFull,
            emoji: precedingEmoji,
            link: item.querySelector("link").textContent,
            description:
              item.querySelector("description")?.textContent ||
              "(no description)",
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
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <div>
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <LoadingAnimation />
          </div>
        </div>
      ) : (
        <>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Jon Bell's Firehose"
            href="http://firehose.lot23.com/api/feed"
          />
          <div className="mx-auto prose">
            <div className="py-4">
              {feedData.slice(0, 25).map((item, index) => (
                <React.Fragment key={index}>
                  <div key={index} className="flex p-4 mb-2">
                    <div className="mr-1">{item.emoji ? item.emoji : "❓"}</div>
                    <div>
                      <a
                        href={item.link}
                        className="text-[#E9496F] text-decoration-none text-truncate break-normal text-xl leading-none"
                      >
                        {item.title.replace(/<[^>]+>/g, "").trim() !==
                        item.description.replace(/<[^>]+>/g, "").trim()
                          ? item.title
                          : "•"}
                      </a>

                      <div className="my-0">
                        <div className="leading-none text-gray-400">
                          <span>{moment(item.date).fromNow()}</span>
                        </div>

                        <div
                          className="text-gray-700 overflow-wrap: break-word;"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pb-6 mx-auto border-t"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feed;
