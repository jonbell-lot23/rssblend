// pages/api/distinct-sources-count.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function distinctSourcesCount(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Count distinct non-null source values
    const result = await prisma.$queryRaw`SELECT COUNT(DISTINCT source) AS count FROM "firehose_Items" WHERE source IS NOT NULL;`;
    
    // Assuming the result is an array of objects, where each object has a 'count' property
    const countResult = result[0]?.count;

    // Ensuring the countResult is a number before sending it in the response
    const count = Number(countResult);

    res.status(200).json({ distinctSourcesCount: count });
  } catch (e) {
    console.error('Request error', e);
    res.status(500).json({ error: 'Error fetching distinct sources count', e });
  }
}
