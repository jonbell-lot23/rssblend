import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";
import fetch from "node-fetch";
import RssParser from "rss-parser";

const urlToEmoji = {
  "https://jonb.tumblr.com/rss": "💻",
  "https://medium.com/feed/@jonbell": "📝",
  "https://a-blog-about-jon-bell.ghost.io/fullrss/": "💬",
  "https://jbell.status.lol/feed": "",
  "https://mastodon.nz/@jon.rss": "🐘",
  "https://www.lexaloffle.com/bbs/feed.php?uid=17302": "👾",
  "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom":
    "🏞️",
  "https://picadilly.vercel.app/api/rss": "🌅",
  "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/":
    "🌏",
};

/*
"https://www.flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=rss": "🏞️",
"https://picadilly.vercel.app/api/rss": "🌅",
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = new rss({
    title: "Jon Bell's Firehose",
    feed_url: "http://firehose.lot23.com/api/firehose",
    site_url: "http://firehose.lot23.com",
  });

  const rssFeedUrls = [
    "https://flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=atom",
    "https://jonb.tumblr.com/rss",
    "https://medium.com/feed/@jonbell",
    "https://a-blog-about-jon-bell.ghost.io/fullrss/",
    "https://jbell.status.lol/feed",
    "https://mastodon.nz/@jon.rss",
    "https://www.lexaloffle.com/bbs/feed.php?uid=17302",
    "https://jonbell.micro.blog/feed.xml",
    "https://feeds.pinboard.in/rss/secret:9951275a502175fe617d/u:JonB/t:toshare/",
  ];

  /*
  "https://picadilly.vercel.app/api/rss",
  "https://www.flickr.com/services/feeds/photos_public.gne?id=36521984990@N01&lang=en-us&format=rss",
  */

  const feedPromises = rssFeedUrls.map((url) =>
    fetch(url).then((res) => res.text())
  );

  const results = await Promise.all(feedPromises);

  const feedItems = await Promise.all(
    results.map(async (rssString, index) => {
      let parser = new RssParser({
        customFields: {
          item: ["media", "media:content"],
        },
      });

      const parsedFeed = await parser.parseString(rssString);
      parsedFeed.items.forEach((item) => {
        // deal with description stuff
        let description;
        if ("content" in item) {
          description = item.content;
        } else if ("content:encoded" in item) {
          description = item["content:encoded"];
        }

        // deal with media enclosures
        let media;
        if (item["media:content"]) {
          let mediaUrl = item["media:content"].$.url;
          const mediaUrlWrapped = "<p>" + "<img src=" + mediaUrl + ">" + "</p>";
          description = description + mediaUrlWrapped;
        }

        let date;
        if ("date" in item) {
          date: item.pubDate ? item.pubDate : item.date;
        }

        // these are all pretty easy
        const url = item.link;
        const feedUrl = rssFeedUrls[index];
        const emoji = urlToEmoji[feedUrl];

        // bundle it all together
        const newItem = {
          title: item.title ? `${emoji} ${item.title}` : `${emoji}`,
          url,
          description,
          date,
          guid: item.guid,
        };
        feed.item(newItem);

        // console.log("-- ITEM --");
        // console.log(item);
        if (media) {
          // console.log(newItem);
          // console.log("%%%");
        }
      });
    })
  );

  const xml = feed.xml();

  // console.log("-- XML --");
  // console.log(xml);

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
};
