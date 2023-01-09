import { NextPage, NextPageContext } from "next";
import { parseFeed } from "rss-parser";
import Feed from "feed";

interface Props {
  combinedFeed: string;
}

const CombinedRSSFeed: NextPage<Props> = ({ combinedFeed }) => {
  return null;
};

CombinedRSSFeed.getInitialProps = async (ctx: NextPageContext) => {
  // Replace feedURLs with an array of the URLs of the RSS feeds you want to combine
  const feedURLs = [
    "https://a.wholelottanothing.org/feed/",
    "http://feeds.kottke.org/main",
  ];

  const feeds = [];
  feedURLs.forEach(async (url) => {
    const feed = await parseFeed(url);
    feeds.push(feed);
  });

  // Use the Feed module to create a new RSS feed from the combined feeds
  const feed = new Feed({
    title: "My Combined RSS Feed",
    description: "A combined RSS feed created using the Feed module",
    id: "http://mycombinedrssfeed.com",
    link: "http://mycombinedrssfeed.com",
    language: "en",
    feed: "http://mycombinedrssfeed.com/rss",
    copyright: "All rights reserved 2021, John Doe",
    pubDate: new Date(),
    ttl: "60",
  });

  // Add each feed's items to the new feed
  feeds.forEach((parsedFeed) => {
    parsedFeed.items.forEach((item) => {
      feed.addItem({
        title: item.title,
        id: item.link,
        link: item.link,
        description: item.content,
        content: item.content,
        author: [
          {
            name: item.author,
          },
        ],
        date: item.pubDate,
      });
    });
  });

  // Set the combined feed XML string as a prop so it can be served to the user
  return { combinedFeed: feed.rss2() };
};

export default CombinedRSSFeed;
