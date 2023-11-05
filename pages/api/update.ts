import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";
import { PrismaClient } from "@prisma/client";

const urlToEmoji = {
  "https://bouquet.lot23.com/api/rss?user=jon": "💐",
  "http://academia.lot23.com/api/feed": "🎓",
  "https://medium.com/feed/@jonbell": "📝",
  "https://a-blog-about-jon-bell.ghost.io/rss/": "💬",
  "https://jbell.status.lol/feed": "⬜️",
  "http://cooking.lot23.com/api/feed": "👨‍🍳",
  "https://mastodon.nz/@jon.rss": "🐘",
  "https://jonb.tumblr.com/rss": "💻",
  "https://www.lexaloffle.com/bbs/feed.php?uid=17302": "👾",
  "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom": "🏞️",
  "https://picadilly.vercel.app/api/rss": "🌅",
  "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/": "🌏",
};

const prisma = new PrismaClient();

const processFeed = async (url) => {
  console.log(`Processing feed: ${url}`);
  const rssString = await fetch(url).then((res) => res.text());
  const parser = new RssParser();
  const parsedFeed = await parser.parseString(rssString);
  const feedItems = parsedFeed.items.slice(0, 15).map((item) => {
    let description;
    if ("content:encoded" in item) {
      description = item["content:encoded"];
    } else if ("content" in item) {
      description = item.content;
    }
    const feedUrl = url;
    const emoji = urlToEmoji[feedUrl];

    if (emoji === "🌏") {
      description += "<p><a href='" + url + "'>Link</p>";
    }

    const newItem = {
      title: item.title ? `${item.title}` : `${emoji} •`,
      url: item.link,
      description,
      date: item.pubDate ? item.pubDate : item.date,
      guid: item.guid,
      feedUrl: feedUrl,
      emoji: emoji,
    };
    return newItem;
  });
  console.log(`Processed ${feedItems.length} items from: ${url}`);
  return feedItems;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Starting RSS feed processing.");
  const feed = new rss({
    title: "Jon Bell's Firehose",
    feed_url: "http://firehose.lot23.com/api/firehose",
    site_url: "http://firehose.lot23.com",
  });

  const rssFeedUrls = [
    "https://bouquet.lot23.com/api/rss?user=jon",
    "http://academia.lot23.com/api/feed",
    "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom",
    "https://picadilly.vercel.app/api/rss",
    "https://jonb.tumblr.com/rss",
    "https://medium.com/feed/@jonbell",
    "https://a-blog-about-jon-bell.ghost.io/rss/",
    "https://jbell.status.lol/feed",
    "http://cooking.lot23.com/api/feed",
    "https://mastodon.nz/@jon.rss",
    "https://jonbell.micro.blog/feed.xml",
    "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/",
  ];

  console.log("Fetching existing items from the database.");
  const existingItems = await prisma.firehose_Items.findMany({
    select: { url: true },
  });

  const existingUrls = new Set(existingItems.map((item) => item.url));

  console.log("Processing RSS feeds.");
  const feedPromises = rssFeedUrls.map(processFeed);

  const allFeedItems = await Promise.all(feedPromises);
  const newFeedItems = allFeedItems
    .flat()
    .filter((item) => !existingUrls.has(item.url));

  console.log(`Found ${newFeedItems.length} new feed items.`);

  for (let item of newFeedItems) {
    try {
      await prisma.firehose_Items.create({
        data: {
          title: item.title,
          source: item.emoji,
          url: item.url,
          description: item.description,
          postdate: new Date(item.date),
        },
      });

      // Add item to RSS feed
      feed.item({
        title: item.title,
        url: item.url,
        description: item.description,
        date: item.date,
      });
      console.log(`Successfully processed item: ${item.url}`);
    } catch (err) {
      console.error("Error while interacting with the database:", err.message);
      console.error("Error details:", err);
    }
  }

  console.log("All items processed. Sending response.");
  res.setHeader("Content-Type", "application/rss+xml");
  res.send(feed.xml());
};
