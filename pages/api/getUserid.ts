import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;
    const user = await prisma.User.findFirst({ where: { name: username } });
    res.json({ userid: user?.id });
  };
  
  export default getUser;
  