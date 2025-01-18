import Link from "next/link";

export default function Component() {
  return (
    <div>
      <header className="w-full bg-gray-900 py-4 px-6 md:py-6 md:px-8 h-20">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" prefetch={false}>
            <BlenderIcon className="h-8 w-8 text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Firehose</h1>
        </div>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex items-center">
              <BlenderIcon className="mr-3 h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Blend</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Firehose allows you to easily aggregate content from various
              websites, social media platforms, and RSS feeds into a single,
              unified stream. This enables you to publish your content
              everywhere and then host it on your own site, embracing an
              IndieWeb approach.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex items-center">
              <VinylIcon className="mr-3 h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Mix</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              With Firehose, you can publish your content to multiple platforms
              simultaneously, including your own website, social media channels,
              and other online destinations. This ensures your message reaches a
              wider audience and helps you maintain a consistent online
              presence.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 flex items-center">
              <ArrowsIcon className="mr-3 h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Share</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Firehose enables you to host the aggregated content on your own
              website, giving you full control over your online presence and
              data. This aligns with the principles of the IndieWeb, where you
              own and manage your own content, rather than relying on
              third-party platforms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlenderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 3h14l-1 9H6z" />
      <path d="M8 18h8v3H8z" />
      <path d="M12 12v6" />
      <circle cx="12" cy="21" r="1" />
    </svg>
  );
}

function VinylIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11v2h18v-2z" />
      <path d="M7 22l-4-4 4-4" />
    </svg>
  );
}
