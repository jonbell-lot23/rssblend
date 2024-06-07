import React, { useEffect, useState } from "react";
import moment from "moment";
import Lottie from "lottie-react";
import fireLottie from "../components/fire.json";
import he from "he";

interface FeedProps {
  userid: string | number; // or the type of your userid
  username: string | null; // added username to the interface
  sourceId?: number; // added sourceId to the interface
}

const Feed: React.FC<FeedProps> = ({ userid, username, sourceId }) => {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LoadingAnimation = () => {
    return (
      <div style={{ width: "140px", height: "140px" }}>
        <Lottie animationData={fireLottie} />
      </div>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const url = sourceId
      ? `../api/getFeedData?userid=${userid}&sourceId=${sourceId}`
      : `../api/getFeedData?userid=${userid}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const feedData = data.map((item) => {
          return {
            title: item.title,
            emoji: item.source,
            link: `https://firehose.lot23.com/post/${item.slug}`,
            description: item.description,
            date: item.postdate,
          };
        });

        console.log(feedData);
        setFeedData(feedData);
        setIsLoading(false);
      });
  }, [userid, sourceId]);

  return (
    <div className="container">
      <div className="main-content">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <div>
              <LoadingAnimation />
            </div>
          </div>
        ) : (
          <>
            <link
              rel="alternate"
              type="application/rss+xml"
              title="Firehose"
              href="http://firehose.lot23.com/api/feed"
            />
            <div className="mx-auto font-light prose">
              <div className="py-4 overflow-hidden break-words overflow-ellipsis">
                {feedData.slice(0, 25).map((item, index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="flex p-4 mb-2">
                      <div className="mr-1">
                        {item.emoji ? item.emoji : "❓"}
                      </div>
                      <div>
                        <a
                          href={item.link}
                          className="text-[#E9496D] text-decoration-none text-truncate break-normal text-xl leading-none font-light no-underline hover:underline"
                        >
                          {he.decode(
                            item.title.replace(/<[^>]+>/g, "").trim()
                          ) !==
                          he.decode(
                            item.description.replace(/<[^>]+>/g, "").trim()
                          )
                            ? he.decode(item.title)
                            : "•"}
                        </a>

                        <div className="my-0">
                          <div className="leading-none text-gray-400">
                            <span>{moment(item.date).fromNow()}</span>
                          </div>

                          <div
                            className="text-gray-700 overflow-wrap: break-word;"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
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
      </div>
    </div>
  );
};

export default Feed;
