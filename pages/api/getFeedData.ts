import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const feedData = await prisma.firehose_Items.findMany({
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
