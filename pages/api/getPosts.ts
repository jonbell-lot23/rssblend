import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { offset = 0, limit = 25, authorid } = req.query;

  try {
    const whereClause = {
      where: authorid ? { userid: parseInt(authorid as string, 10) } : {},
    };
    const [posts, total] = await Promise.all([
      prisma.firehose.findMany({
        orderBy: {
          postdate: "desc",
        },
        include: {
          Source: true,
        },
        skip: parseInt(offset as string, 10),
        take: parseInt(limit as string, 10),
        ...whereClause,
      }),
      prisma.firehose.count(whereClause),
    ]);

    res.status(200).json({
      posts: posts.map((post) => ({
        ...post,
        postdate: post.postdate.toISOString(),
      })),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
