import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPost = async (slug: string | string[]) => {
  try {
    const postData = await prisma.firehose.findUnique({
      where: {
        slug: typeof slug === 'string' ? slug : slug[0],
      },
    });
    return postData;
  } catch (error) {
    console.error(error);
  }
};