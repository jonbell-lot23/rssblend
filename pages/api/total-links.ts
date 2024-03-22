// pages/api/cool-links.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function coolLinksCount(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Count records where the source is 'globe'
    const linksCount = await prisma.firehose_Items.count({
      where: {
        source: '🌏' // Replace 'globe' with the exact value if different
      }
    });
    res.status(200).json({ count: linksCount });
  } catch (e) {
    console.error('Request error', e);
    res.status(500).json({ error: 'Error fetching cool links count', e });
  }
}
