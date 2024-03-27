import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = () => {
  return Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4);
}

const processFeed = async (url, emoji) => {
  console.log(`Processing feed: ${url}`);
  const rssString = await fetch(url).then((res) => res.text());
  const parser = new RssParser();
  let parsedFeed;
  try {
    parsedFeed = await parser.parseString(rssString);
  } catch (err) {
    console.error(`Error parsing feed ${url}: ${err.message}`);
    return [];
  }
  const feedItems = parsedFeed.items.slice(0, 15).map((item) => {
    let description;
    if ("content:encoded" in item) {
      description = item["content:encoded"];
    } else if ("content" in item) {
      description = item.content;
    }

    if (emoji === "🌏") {
      description += "<p><a href='" + url + "'>Link</p>";
    }

    const newItem = {
      title: item.title ? `${item.title}` : `${emoji} •`,
      url: item.link,
      description,
      date: item.pubDate ? item.pubDate : item.date,
      guid: item.guid,
      feedUrl: url,
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

  // Fetch sources from the database
  const sources = await prisma.source.findMany({
    select: { url: true, emoji: true, userid: true },
  });

  console.log("Fetching existing items from the database.");
  const existingItems = await prisma.firehose.findMany({
    select: { url: true },
  });

  const existingUrls = new Set(existingItems.map((item) => item.url));

  console.log("Processing RSS feeds.");
  const feedPromises = sources.map(source => processFeed(source.url, source.emoji));

  const allFeedItems = (await Promise.all(feedPromises)).flat();
  const newFeedItems = allFeedItems.filter((item) => !existingUrls.has(item.url));

  console.log(`Found ${newFeedItems.length} new feed items.`);

  for (let item of newFeedItems) {
    if (existingUrls.has(item.url)) {
      console.log(`Skipping duplicate item: ${item.url}`);
      continue;
    }

    try {
      await prisma.firehose.create({
        data: {
          title: item.title,
          source: item.emoji,
          url: item.url,
          description: item.description,
          postdate: new Date(item.date),
          slug: generateSlug(),
          // Add the userid to the data being saved
          userid: sources.find(source => source.url === item.feedUrl)?.userid,
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
      console.error("Data causing the error:", item);
      console.error("Error details:", err);
    }
  }

  console.log("All items processed. Sending response.");
  res.setHeader("Content-Type", "application/rss+xml");
  res.send(feed.xml());
};