import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || Array.isArray(slug)) {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const firehoseItem = await prisma.firehose.findUnique({
    where: { slug },
  });

  if (!firehoseItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(firehoseItem);
}