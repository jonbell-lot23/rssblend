import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import rss from "rss";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  try {
    // Convert username to userid as needed, or use username directly if your database supports it
    const user = await prisma.user.findFirst({
      where: { name: String(username).replace('@', '') },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const feedData = await prisma.firehose.findMany({
      where: {
        userid: user.id, // Use the dynamic userid
      },
      orderBy: {
        postdate: "desc",
      },
      take: 25,
    });

    const feed = new rss({
      title: `${user.name}'s Firehose`,
      feed_url: `http://firehose.lot23.com/api/${username}/feed`,
      site_url: `http://firehose.lot23.com/@${username}`,
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
}