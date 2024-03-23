// pages/api/total-words.ts
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function totalWords(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.$queryRaw`
      SELECT SUM(LENGTH(description) - LENGTH(REPLACE(description, ' ', '')) + 1) AS total_words
      FROM "firehose_Items";
    `;
    const totalWords = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
    res.status(200).json({ totalWords: totalWords[0].total_words });
  } catch (e) {
    console.error('Request error', e);
    res.status(500).json({ error: 'Error fetching total words count', e });
  }
}
