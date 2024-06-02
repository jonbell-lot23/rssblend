import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = (req.query.userid as string).replace('@', '');

  try {
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: "Invalid username" });
    }

    // Fetch the user first
    const user = await prisma.user.findFirst({
      where: { name: username },
    });
    console.log("getting username: ");
    console.log(username);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Then fetch the sources for the user
    const sources = await prisma.source.findMany({
      where: { userid: user.id },
    });

    res.status(200).json(sources);
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    res.status(500).json({ error: "Error fetching data from database" });
  }
};