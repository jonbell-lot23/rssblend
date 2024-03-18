import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const data = await prisma.$queryRaw`
      SELECT date_trunc('week', postdate) AS week, COUNT(*) AS post_count
      FROM "firehose_Items"
      WHERE postdate >= CURRENT_DATE - INTERVAL '100 weeks'
      GROUP BY week
      ORDER BY week;
    `;
  const dataWithBigIntHandled = JSON.parse(
    JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v))
  );
  res.status(200).json(dataWithBigIntHandled);
}