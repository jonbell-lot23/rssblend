import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";
import { PrismaClient } from "@prisma/client";

const urlToEmoji = {
  "https://bouquet.lot23.com/api/rss?user=jon": "💐",
  "http://academia.lot23.com/api/feed": "🎓",
  "http://me.dm/@jbell.rss": "🐘",
  "https://medium.com/feed/@jonbell": "📝",
  "https://a-blog-about-jon-bell.ghost.io/rss/": "💬",
  "https://jbell.status.lol/feed": "⬜️",
  "http://cooking.lot23.com/api/feed": "👨‍🍳",
  "https://mastodon.nz/@jon.rss": "🐘",
  "https://jonb.tumblr.com/rss": "💻",
  "https://www.lexaloffle.com/bbs/feed.php?uid=17302": "👾",
  "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom":
    "🏞️",
  "https://picadilly.vercel.app/api/rss": "🌅",
  "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/":
    "🌏",
};

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
    "https://cooking.lot23.com/api/feed",
    "https://mastodon.nz/@jon.rss",
    "http://me.dm/@jbell.rss",
    "https://www.lexaloffle.com/bbs/feed.php?uid=17302",
    "https://jonbell.micro.blog/feed.xml",
    "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/",
  ];

  const feedPromises = rssFeedUrls.map((url) =>
    fetch(url).then((res) => res.text())
  );

  const results = await Promise.all(feedPromises);

  const feedItems = await Promise.all(
    results.map(async (rssString, index) => {
      const parser = new RssParser();
      try {
        const parsedFeed = await parser.parseString(rssString);

        console.log(`Processing feed ${index}: ${rssFeedUrls[index]}`);

        await Promise.all(
          parsedFeed.items.slice(0, 15).map(async (item) => {
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
              title: item.title ? `${item.title}` : `${emoji} •`,
              url,
              description,
              date: item.pubDate ? item.pubDate : item.date,
              guid: item.guid,
            };

            console.log(`New item: ${JSON.stringify(newItem)}`);

            try {
              // Check if item exists in database
              const existingItem = await prisma.firehose_Items.findUnique({
                where: { url: newItem.url },
              });
            
              if (!existingItem) {
                console.log(`Item not in database, adding: ${JSON.stringify(newItem)}`);
            
                const addedItem = await prisma.firehose_Items.create({
                  data: {
                    title: newItem.title,
                    source: emoji,
                    url: newItem.url,
                    description: newItem.description,
                    postdate: new Date(newItem.date),
                  },
                });
            
                console.log("Item added successfully:", addedItem);
              } else {
                console.log(`Item already in database: ${JSON.stringify(existingItem)}`);
              }
            } catch (err) {
              console.error("Error while interacting with the database:", err.message);
              console.error("Error details:", err);
            }

            // Add item to RSS feed
            feed.item({
              title: newItem.title,
              url: newItem.url,
              description: newItem.description,
              date: newItem.date,
            });
          })
        );
      } catch (err) {
        console.error("Error parsing RSS feed:", err.message);
      }
    })
  );

  res.setHeader("Content-Type", "application/rss+xml");
  res.send(feed.xml());
};
