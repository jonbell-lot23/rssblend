import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFeedData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the userid from the query parameters
    const { userid } = req.query;

    const feedData = await prisma.firehose.findMany({
      where: {
        userid: Number(userid),
      },
      orderBy: {
        postdate: "desc",
      },
    });

    res.status(200).json(feedData);
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    res.status(500).json({ error: "Error fetching data from database" });
  }
};

export default getFeedData;