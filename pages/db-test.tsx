import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "styles/bouquet.module.css";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  try {
    const posts = await prisma.$queryRaw`
      SELECT b.id, b.date, b.name, b.detail, b.url, b.username, lookup.emoji
      FROM bouquet b
      LEFT JOIN bouquet_emoji_lookup lookup ON b.name = lookup.name
      ORDER BY b.date ASC limit 4
    ;`;

    return {
      props: {
        posts,
      },
      revalidate: 1201,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [],
      },
      revalidate: 1200,
    };
  }
};

const Home = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <span className={styles.emoji}>
            <Link href={`/category/${post.name}`}>
              {post.emoji ? post.emoji : post.name}
            </Link>
          </span>
          <div className={styles.details}>
            <span className={styles.detail}>{post.detail}</span>

            <div className={styles.metadata}>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.username}>
                <Link href={`/user/${post.username}`}>{post.username}</Link>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
