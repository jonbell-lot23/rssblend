import { DataTable } from "@/components/data-table";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const offset = currentPage * 25;
      const response = await fetch(`/api/getPosts?offset=${offset}&limit=25`);
      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPosts(data.total || 0);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const postsPerPage = 10; // Show 10 items per page
  const offset = currentPage * postsPerPage;
  const currentPosts = posts ? posts.slice(offset, offset + postsPerPage) : [];

  return (
    <div className="container mx-auto py-10 flex flex-col justify-between min-h-screen">
      <DataTable posts={currentPosts} /> {/* Render DataTable once */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(totalPosts / 25)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
