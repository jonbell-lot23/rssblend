import Head from "next/head";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getPost } from "../../lib/getPost";
import { Container } from "../../components/Container";

import { Prose } from "../../components/Prose";

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: { slug: string }[] =
    await prisma.$queryRaw`SELECT slug FROM "firehose";`;
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  // Log the paths
  console.log(paths);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug.toString());

  // Convert postdate to string
  let postdateString;
  if (post.postdate) {
    postdateString = post.postdate.toISOString();
  }

  return { props: { post: { ...post, postdate: postdateString } } };
};

const Post = ({ post }) => {
  if (!post) {
    return <div>No post found</div>;
  }
  return (
    <div>
      <Head>
        <script
          defer
          data-domain="firehose.lot23.com"
          src="https://plausible.io/js/script.js"
        ></script>
        <title>{post.name} | Firehose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="max-w-2xl mx-auto">
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {post.title}
                </h1>
                <time
                  dateTime={post.date}
                  className="flex items-center order-first text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{post.date}</span>
                </time>
              </header>
              <Prose className="mt-8" data-mdx-content>
                <div className="py-4">
                  <div className="flex p-4 mb-2">
                    <div>
                      <a
                        href={post.link}
                        className="text-[#E9496F] text-decoration-none break-normal text-xl leading-none"
                      >
                        {post.title.replace(/<[^>]+>/g, "").trim() !==
                        post.description.replace(/<[^>]+>/g, "").trim()
                          ? post.title
                          : "•"}
                      </a>
                      <div className="my-0">
                        <div className="leading-none text-gray-400">
                          <span>{post.date}</span>
                        </div>
                        <div
                          className="text-gray-700 overflow-wrap: break-word;"
                          dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Prose>
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Post;
