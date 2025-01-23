import { DataTable } from "@/components/data-table";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TablePage() {
  const router = useRouter();
  const { page } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/getPosts?limit=100`);
      const data = await response.json();
      setPosts(data.posts || []);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-10 flex flex-col justify-between min-h-screen">
      <DataTable posts={posts} /> {/* Render DataTable once */}
    </div>
  );
}
