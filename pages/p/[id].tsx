import Head from "next/head";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany();
  return {
    props: {
      posts,
    },
  };
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
