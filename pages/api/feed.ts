import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import rss from "rss";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const feedData = await prisma.firehose_Items.findMany({
      orderBy: {
        postdate: "desc",
      },
      take: 25, // Limit the number of items you want to fetch
    });

    const feed = new rss({
      title: "Jon Bell's Firehose",
      feed_url: "http://firehose.lot23.com/api/rss",
      site_url: "http://firehose.lot23.com",
    });

    feedData.forEach((item) => {
      feed.item({
        title: `${item.source} ${item.title}`,
        url: `https://firehose.lot23.com/post/${item.slug}`,
        description: item.description,
        date: new Date(item.postdate),
      });
    });

    res.setHeader("Content-Type", "application/rss+xml");
    res.send(feed.xml());
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    res.status(500).json({ error: "Error fetching data from database" });
  }
};
