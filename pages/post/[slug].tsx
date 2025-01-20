import Head from "next/head";
import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import { getPost } from "../../lib/getPost";
import { Container } from "../../components/Container";
import { Prose } from "../../components/Prose";

const prisma = new PrismaClient();

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: { slug: string }[] =
    await prisma.$queryRaw`SELECT slug FROM "firehose";`;
  const paths = [];

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
  const [showAbout, setShowAbout] = useState(false);

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
        <title>{post.title} | Firehose</title>
        <meta
          property="og:image"
          content={`http://localhost:3002/api/og-image?title=${encodeURIComponent(
            post.title
          )}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-2 lg:mt-4">
        <div className="xl:relative">
          <div className="max-w-2xl mx-auto relative">
            {/* About Button */}
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-xs absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-900 py-2 px-4 rounded-full flex items-center gap-2  hover:bg-gray-900 hover:text-white transition-all"
            >
              Is this a blog?
            </button>

            {/* About Screen */}
            {showAbout && (
              <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 animate-slide-down">
                <p className="text-gray-800 text-center max-w-md">
                  This is a post posted on Firehose, a way to post one-off
                  content rather than everything being connected to a blog.
                </p>
                <p className="mt-4">
                  Check out{" "}
                  <a className="underline" href="http://firehose.lot23.com">
                    http://firehose.lot23.com
                  </a>{" "}
                  or email me at{" "}
                  <a className="underline" href="mailto:jb@lot23.com">
                    jb@lot23.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => setShowAbout(false)}
                  className="mt-4 text-white bg-black rounded-full text-sm px-3 py-1"
                >
                  Got it!
                </button>
              </div>
            )}

            <article>
              <Prose className="mt-2" data-mdx-content>
                <div className="py-4">
                  <div className="flex p-4 mb-2">
                    <div>
                      <header className="flex flex-col">
                        <div className="mt-12 text-3xl font-medium tracking-tight text-gray-900 sm:text-3xl dark:text-zinc-100 lora-unique">
                          <time
                            dateTime={post.postdate}
                            className="flex items-center font-light order-first text-base text-gray-500 dark:text-gray-500"
                          >
                            <span>
                              {new Date(post.postdate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </time>
                          {post.title}
                        </div>
                      </header>
                      <div className="my-0">
                        <div
                          className="text-gray-900 text-lg overflow-wrap: break-word;"
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

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Post;
