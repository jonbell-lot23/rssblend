import prisma from "@/lib/prisma";

export const getFirstPost = async () => {
  try {
    const postData = await prisma.firehose.findFirst({
      orderBy: {
        postdate: "asc",
      },
    });
    return postData;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (slug: string | string[]) => {
  try {
    const postData = await prisma.firehose.findUnique({
      where: {
        slug: typeof slug === "string" ? slug : slug[0],
      },
    });
    return postData;
  } catch (error) {
    console.error(error);
  }
};
