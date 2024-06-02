import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Sidebar: React.FC = () => {
  const [sources, setSources] = useState([]);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const fetchSources = async () => {
      const userid = router.query.userid;

      // Check if userid is available
      if (!userid) {
        console.error("User ID not found in the query string.");
        return;
      }

      try {
        const response = await fetch(`/api/get-sources?userid=${userid}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setSources(data);
          } else {
            // Handle the case where data is not an array
            console.error("Data is not an array", data);
            setSources([]); // Set to an empty array as a fallback
          }
        } else {
          // Handle HTTP errors
          console.error("Network response was not ok.");
          setSources([]); // Set to an empty array as a fallback
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Fetch error:", error);
        setSources([]); // Set to an empty array as a fallback
      }
    };

    // Call fetchSources only if userid is available
    if (router.query.userid) {
      fetchSources();
    }
  }, [router]); // Added router as a dependency

  return (
    <div className="w-64 border-r border-[#f4f4f4] p-5 h-screen sticky top-0 flex flex-col justify-start hidden sm:block">
      <nav>
        <ul>
          {sources.map((source) => (
            <li key={source.id}>
              <a href={source.url}>{source.url}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
