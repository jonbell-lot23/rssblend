import { DataTable } from "@/components/data-table";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Avatar({ author }) {
  const colors = {
    jon: "#FF5733",
    kottke: "#33FF57",
    // Add more authors and colors as needed
  };
  const color = colors[author] || "#000";
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        cursor: "pointer",
      }}
      onClick={() => filterByAuthor(author)}
    >
      {typeof author === "string" && author.length > 0
        ? author.charAt(0).toUpperCase()
        : "?"}
    </div>
  );
}

function filterByAuthor(author) {
  // Implement filtering logic here
}

export default function TablePage() {
  const router = useRouter();
  const { page, authorid } = router.query;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page as string, 10) - 1);
    }
  }, [page]);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const offset = currentPage === 0 ? 0 : currentPage * 25;
      const limit = currentPage === 0 ? 100 : 25;
      const authorQuery = authorid ? `&authorid=${authorid}` : "";
      const response = await fetch(
        `/api/getPosts?offset=${offset}&limit=${limit}${authorQuery}`
      );
      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPosts(data.total || 0);
    };

    fetchPosts();
  }, [authorid, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    router.push(`/table/${data.selected + 1}`);
  };

  const postsPerPage = currentPage === 0 ? 100 : 10;
  const offset = currentPage * postsPerPage;
  const currentPosts = posts ? posts.slice(offset, offset + postsPerPage) : [];

  return (
    <div className="container mx-auto py-10 flex flex-col justify-between min-h-screen">
      <DataTable posts={currentPosts} />
    </div>
  );
}
