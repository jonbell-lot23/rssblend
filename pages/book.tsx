import Head from "next/head";
import React from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";

import { PrismaClient, Post } from "@prisma/client";

export const getStaticProps: GetStaticProps = async () => {
  console.log("Fetching posts...");
  const posts = await prisma.post.findMany();
  console.log("Posts:", posts);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

const Home = ({ posts }: { posts: Post[] }) => {
  console.log("Posts prop:", posts);

  return (
    <div>
      <Head>
        <title>My Blog</title>
      </Head>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
