import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';


const getFeedData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userid, sourceId } = req.query;

    // Ensure sourceId is defined and is a number
    const numericSourceId = Array.isArray(sourceId) ? parseInt(sourceId[0], 10) : parseInt(sourceId, 10);

    // If sourceId is provided but is not a valid number, return an error
    if (sourceId && isNaN(numericSourceId)) {
      return res.status(400).json({ error: "Invalid sourceId provided" });
    }

    let feedData;

    if (numericSourceId) {
      
      console.log(`numericSourceId: ${numericSourceId}`);
      
      const source = await prisma.source.findUnique({
        where: { id: numericSourceId },
      });

      console.log(`source:`, source);

      // If no source is found with the given sourceId, return an error
      if (!source) {
        return res.status(404).json({ error: "Source not found" });
      }

      // Fetch firehose data for the given userid and sourceId
      feedData = await prisma.firehose.findMany({
        where: {
          userid: Number(userid),
          sourceId: numericSourceId,
        },
        orderBy: {
          postdate: "desc",
        },
      });

      console.log(`feedData:`, feedData); 
      
    } else {
      // Fetch firehose data for the given userid without filtering by sourceId
      feedData = await prisma.firehose.findMany({
        where: {
          userid: Number(userid),
        },
        orderBy: {
          postdate: "desc",
        },
      });
    }

    res.status(200).json(feedData);
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    res.status(500).json({ error: "Error fetching data from database" });
  }
};

export default getFeedData;