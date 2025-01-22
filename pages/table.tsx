import { DataTable } from "@/components/data-table";
import prisma from "@/lib/prisma";

async function getFirehoseData() {
  const posts = await prisma.firehose.findMany({
    orderBy: {
      postdate: "desc",
    },
    include: {
      Source: true,
    },
  });

  return posts.map((post) => ({
    ...post,
    postdate: post.postdate.toISOString(),
  }));
}

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getFirehoseData();
  return {
    props: {
      posts,
    },
  };
};

export default function TablePage({ posts }) {
  return (
    <div className="container mx-auto py-10">
      <DataTable posts={posts} />
    </div>
  );
}
