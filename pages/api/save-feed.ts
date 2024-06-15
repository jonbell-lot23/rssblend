import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract the URLs from the request body
    const { urls } = req.body;

    // Generate a unique GUID
    const guid = uuidv4();

    try {
      // Save the new feed with the GUID and URLs to the database
      const savedFeed = await prisma.savedFeed.create({
        data: {
          guid,
          urls,
        },
      });

      // Respond with the GUID so the client can redirect to the new page
      res.status(200).json({ guid });
    } catch (error) {
      console.error('Failed to save feed:', error);
      res.status(500).json({ error: 'Failed to save feed' });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}