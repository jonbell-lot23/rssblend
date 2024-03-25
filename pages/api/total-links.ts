// pages/api/cool-links.ts
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function coolLinksCount(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Count records where the source is 'globe'
    const linksCount = await prisma.firehose.count({
      where: {
        source: '🌏'
      }
    });
    res.status(200).json({ count: linksCount });
  } catch (e) {
    console.error('Request error', e);
    res.status(500).json({ error: 'Error fetching cool links count', e });
  }
}
