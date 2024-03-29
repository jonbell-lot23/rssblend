import Head from "next/head";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getPost } from "../../lib/getPost";

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: { id: number }[] =
    await prisma.$queryRaw`SELECT id FROM "firehose";`;
  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));

  // Log the paths
  console.log(paths);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id);
  return { props: { post } };
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

      <header className="bg-[#E9496F] text-white top-0 left-0 w-full z-10">
        <div className="container px-6 py-3 mx-auto shadow-b-md">
          <h1 className="text-xl font-medium text-center">{post.name}</h1>
        </div>
      </header>

      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="max-w-2xl mx-auto">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              >
                <ArrowLeftIcon className="w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {post.title}!!!!
                </h1>
                <time
                  dateTime={post.date}
                  className="flex items-center order-first text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(post.date)}</span>
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
