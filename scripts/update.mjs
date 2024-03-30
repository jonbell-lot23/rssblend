import dotenv from "dotenv";
dotenv.config();

import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = () => {
  return (
    Math.random().toString(36).substr(2, 4) +
    "-" +
    Math.random().toString(36).substr(2, 4)
  );
};

const processFeed = async (url, emoji) => {
  console.log(`Processing feed: ${url}`);
  let rssString;
  try {
    rssString = await fetch(url).then((res) => res.text());
  } catch (err) {
    console.error(`Error fetching feed ${url}: ${err.message}`);
    return [];
  }
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

const handler = async () => {
  try {
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

    for (let source of sources) {
      console.log("Fetching existing items from the database.");
      const existingItems = await prisma.firehose.findMany({
        where: { userid: source.userid },
        select: { url: true },
      });

      const existingUrls = new Set(existingItems.map((item) => item.url));

      console.log("Processing RSS feeds.");
      const feedItems = await processFeed(source.url, source.emoji);

      const newFeedItems = feedItems.filter(
        (item) => !existingUrls.has(item.url)
      );

      console.log(`Found ${newFeedItems.length} new feed items.`);

      for (let item of newFeedItems) {
        if (existingUrls.has(item.url)) {
          console.log(`Skipping duplicate item: ${item.url}`);
          continue;
        }

        try {
          // Add this check
          const existingItem = await prisma.firehose.findUnique({
            where: { url: item.url },
          });

          if (existingItem) {
            console.log(`Skipping duplicate item: ${item.url}`);
            continue;
          }

          // Get the maximum id from the firehose table
          const maxId = await prisma.firehose.aggregate({
            _max: {
              id: true,
            },
          });

          // Increment the maximum id by one
          const newId = maxId._max.id ? maxId._max.id + 1 : 1;

          await prisma.firehose.create({
            data: {
              id: newId,
              title: item.title,
              source: item.emoji,
              url: item.url,
              description: item.description,
              postdate: new Date(item.date),
              slug: generateSlug(),
              userid: source.userid,
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
          console.error(
            "Error while interacting with the database:",
            err.message
          );
          console.error("Data causing the error:", item);
          console.error("Error details:", err);
        }
      }
    }

    console.log("All items processed. Sending response.");
    console.log(feed.xml());
  } catch (err) {
    console.error("Error while processing RSS feeds:", err.message);
  }
};

handler();
