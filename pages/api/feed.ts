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
  "https://mastodon.nz/@jon.rss": "🐘",
  "https://www.lexaloffle.com/bbs/feed.php?uid=17302": "👾",
  "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom":
    "🏞️",
  "https://picadilly.vercel.app/api/rss": "🌅",
  "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/":
    "🌏",
};

/* 
"http://me.dm/@jbell.rss": "🐘", */

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    "https://mastodon.nz/@jon.rss",
    "https://www.lexaloffle.com/bbs/feed.php?uid=17302",
    "https://jonbell.micro.blog/feed.xml",
    "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/",
  ];

  /* "http://me.dm/@jbell.rss", */

  const feedPromises = rssFeedUrls.map((url) =>
    fetch(url).then((res) => res.text())
  );

  const results = await Promise.all(feedPromises);

  const feedItems = await Promise.all(
    results.map(async (rssString, index) => {
      const parser = new RssParser();
      try {
        const parsedFeed = await parser.parseString(rssString);
        parsedFeed.items.forEach((item) => {
          let description;
          if ("content:encoded" in item) {
            description = item["content:encoded"];
          } else if ("content" in item) {
            description = item.content;
          }
          const url = item.link;
          const feedUrl = rssFeedUrls[index];
          const emoji = urlToEmoji[feedUrl];

          if (emoji === "🌏") {
            description += "<p><a href='" + url + "'>Link</p>";
          }

          const newItem = {
            title: item.title ? `${emoji} ${item.title}` : `${emoji} •`,
            url,
            description,
            date: item.pubDate ? item.pubDate : item.date,
            guid: item.guid,
          };
          feed.item(newItem);

          console.log("-- ITEM --");
          console.log(item);
        });
      } catch (err) {
        console.error("Error parsing RSS feed:", err.message);
      }
    })
  );

  await Promise.all(
    results.map(async (rssString, index) => {
      const parser = new RssParser();
      try {
        const parsedFeed = await parser.parseString(rssString);

        await Promise.all(
          parsedFeed.items.slice(0, 15).map(async (item) => {
            // Check if item exists in database
            const existingItem = await prisma.firehose_Items.findUnique({
              where: { url: item.link },
            });

            if (!existingItem) {
              // Item not in database, add it
              const description = item["content:encoded"] || item.content;
              const url = item.link;
              const feedUrl = rssFeedUrls[index];
              const emoji = urlToEmoji[feedUrl];

              const newItem = await prisma.firehose_Items.create({
                data: {
                  title: item.title ? item.title : "•",
                  source: emoji,
                  url,
                  description,
                  postdate: new Date(item.pubDate || item.date),
                },
              });

              // Add item to RSS feed
              feed.item({
                title: newItem.title,
                url: newItem.url,
                description: newItem.description,
                date: newItem.postdate,
              });
            } else {
              // Add item to RSS feed using existing item's properties
            }
          })
        );
      } catch (err) {
        console.error(`Error processing feed: ${err}`);
      }
    })
  );

  res.setHeader("Content-Type", "application/rss+xml");
  res.send(feed.xml());
};
