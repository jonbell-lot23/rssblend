import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;
    const singleUsername = Array.isArray(username) ? username[0] : username;
    const user = await prisma.user.findFirst({ where: { name: singleUsername } });
    res.json({ userid: user?.id });
};
  
export default getUser;
