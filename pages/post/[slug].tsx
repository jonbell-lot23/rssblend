import Head from "next/head";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getPost } from "../../lib/getPost";

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

      <main>
        <div className="mx-auto my-32 prose">
          <div className="py-4">
            <div className="flex p-4 mb-0 text-xl font-light">
              <div>
                <a
                  href={post.link}
                  className="text-[#E9496F] text-decoration-none text-truncate break-normal text-3xl font-light leading-none"
                >
                  {post.title.replace(/<[^>]+>/g, "").trim() !==
                  post.description.replace(/<[^>]+>/g, "").trim()
                    ? post.title
                    : "•"}
                </a>

                <div className="my-0">
                  <div className="mb-8 leading-none text-gray-400">
                    <span>{new Date(post.postdate).toLocaleDateString()}</span>
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
