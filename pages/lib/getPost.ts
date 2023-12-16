import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPost = async (id: string | string[]) => {
  try {
    const postData = await prisma.firehose_Items.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postData) {
      throw new Error("Post not found");
    }

    // Convert postdate to string
    postData.postdate = postData.postdate.toISOString();

    return postData;
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    throw error;
  }
};