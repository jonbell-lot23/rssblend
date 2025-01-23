import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { authorid } = req.query;

  try {
    const whereClause = {
      where: { userid: 1 },
    };
    const [posts, total] = await Promise.all([
      prisma.firehose.findMany({
        orderBy: {
          postdate: "desc",
        },
        include: {
          Source: true,
        },
        take: 100,
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
