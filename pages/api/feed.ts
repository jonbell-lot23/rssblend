import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";

const urlToEmoji = {
  "https://jonb.tumblr.com/rss": "💻",
  "https://medium.com/feed/@jonbell": "📝",
  "https://a-blog-about-jon-bell.ghost.io/fullrss/": "💬",
  "https://jbell.status.lol/feed": "🌟",
  "https://mastodon.nz/@jon.rss": "🐘",
  "https://www.lexaloffle.com/bbs/feed.php?uid=17302": "👾",
};

/*
"https://www.flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=rss": "🏞️",
"https://picadilly.vercel.app/api/rss": "🌅",
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = new rss({
    title: "Jon Bell's Firehose",
    feed_url: "http://firehose.vercel.com/api/firehose",
    site_url: "http://firehose.vercel.com",
  });

  const rssFeedUrls = [
    "https://jonb.tumblr.com/rss",
    "https://medium.com/feed/@jonbell",
    "https://a-blog-about-jon-bell.ghost.io/fullrss/",
    "https://jbell.status.lol/feed",
    "https://mastodon.nz/@jon.rss",
    "https://picadilly.vercel.app/api/rss",
    "https://www.lexaloffle.com/bbs/feed.php?uid=17302",
    "https://jonbell.micro.blog/feed.xml",
    "https://www.flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=rss",
  ];

  const feedPromises = rssFeedUrls.map((url) =>
    fetch(url).then((res) => res.text())
  );

  const results = await Promise.all(feedPromises);

  const feedItems = await Promise.all(
    results.map(async (rssString, index) => {
      const parser = new RssParser();
      const parsedFeed = await parser.parseString(rssString);
      parsedFeed.items.forEach((item) => {
        let description;
        if ("content" in item) {
          description = item.content;
        } else if ("content:encoded" in item) {
          description = item["content:encoded"];
        }
        const url = item.link;
        const feedUrl = rssFeedUrls[index];
        const emoji = urlToEmoji[feedUrl];
        const newItem = {
          title: item.title ? `${emoji} ${item.title}` : `${emoji}`,
          url,
          description,
          date: item.pubDate,
          guid: item.guid,
        };
        feed.item(newItem);
        console.log("-- ITEM --");
        console.log(item);
      });
    })
  );

  const xml = feed.xml();

  console.log("-- XML --");
  console.log(xml);

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
};
