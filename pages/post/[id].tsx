import Head from "next/head";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getPost } from "../api/getPost";

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: { id: number }[] =
    await prisma.$queryRaw`SELECT id FROM "firehose_Items";`;
  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));

  // Log the paths
  console.log(paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id);
  return { props: { post } };
};

const Post = ({ post }) => {
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
      <main>
        <div className="mx-auto prose">
          <div className="py-4">
            <div className="flex p-4 mb-2">
              <div>
                <a
                  href={post.link}
                  className="text-[#E9496F] text-decoration-none text-truncate break-normal text-xl leading-none"
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
        </div>
      </main>
    </div>
  );
};

export default Post;
