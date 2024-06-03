import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const Sidebar: React.FC = () => {
  const [sources, setSources] = useState([]);
  const router = useRouter();

  console.log("Router query:", router.query); // This will log the entire query string object

  useEffect(() => {
    const fetchSources = async () => {
      const username = router.query.username;
      console.log(username);

      // Check if username is available
      if (!username) {
        console.error("Username not found in the query string.");
        return;
      }

      try {
        const response = await fetch(`/api/get-sources?userid=${username}`);
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

    // Call fetchSources only if username is available
    if (router.query.username) {
      fetchSources();
    }
  }, [router]); // Added router as a dependency

  const extractSubdomain = (url) => {
    const match = url.match(/https?:\/\/([^\/]+)/);
    return match ? match[1] : url;
  };

  return (
    <div className="w-64 border-r border-[#f4f4f4] p-5 h-screen sticky top-1 flex flex-col justify-start hidden sm:block pt-20">
      <h2 className="text-xl font-light mb-4">Sources</h2>
      <nav>
        <ul>
          {sources.map((source) => (
            <li key={source.id}>
              <a href={`/@jon/${source.id}`}>{extractSubdomain(source.url)}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
