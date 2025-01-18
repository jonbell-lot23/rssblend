"use client";

import { useRouter } from "next/router";

export default function PlaceholderPage() {
  const router = useRouter();
  const { username } = router.query;
  const displayName = Array.isArray(username)
    ? username[0].replace("@", "")
    : username?.replace("@", "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600 shadow-lg">
      <div className="bg-white p-8 shadow-md rounded-xl text-center w-96">
        <h1 className="text-3xl font-bold mb-4">{displayName}'s firehose</h1>
        <p className="text-gray-700">
          {displayName} is using firehose, a tool that pulls stuff into one
          place so creators can control their own content. It's coming soon.
        </p>
        <p className="mt-8">
          Email{" "}
          <a href="mailto:jb@lot23.com" className="underline">
            jb@lot23.com
          </a>{" "}
          with questions.
        </p>
      </div>
    </div>
  );
}
