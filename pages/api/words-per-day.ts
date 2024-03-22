// pages/api/words-per-day.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function wordsPerDay(req: NextApiRequest, res: NextApiResponse) {
  try {
    const totalWordsPerDay = await prisma.$queryRaw`
      SELECT
        (SUM(LENGTH(description) - LENGTH(REPLACE(description, ' ', '')) + 1) / 
         (CURRENT_DATE - DATE '2023-01-01'))::FLOAT AS words_per_day
      FROM
        "firehose_Items";
    `;
    res.status(200).json(totalWordsPerDay[0]);
  } catch (e) {
    console.error('Request error', e);
    res.status(500).json({ error: 'Error fetching words per day', e });
  }
}
