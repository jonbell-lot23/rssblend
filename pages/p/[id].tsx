import Head from "next/head";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = parseInt(params?.id as string, 10);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return {
    props: post,
  };

  console.log(postId);
  console.log(post);
};

const Home = ({ post }) => {
  return (
    <div>
      <Head>
        <title>Author {post?.author}</title>
      </Head>
      <p>Content {post?.content}</p>
    </div>
  );
};

export default Home;
