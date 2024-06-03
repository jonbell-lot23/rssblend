import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Feed from "../../components/Feed";

const SourcePage = () => {
  const router = useRouter();
  const { username, sourceId } = router.query;
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const cleanUsername = Array.isArray(username)
      ? username[0].replace("@", "")
      : username?.replace("@", "");
    if (cleanUsername) {
      const url = `/api/getUserid?username=${cleanUsername}`;
      console.log(`Fetching user ID from: ${url}`); // Log the URL being fetched
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data.userid) {
            throw new Error("No userid returned from API");
          }
          setUserid(data.userid);
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    }
  }, [username]);

  // Ensure sourceId is parsed as an integer
  const sourceIdInt = parseInt(sourceId, 10);

  // Render the Feed component with the userid and sourceId
  // Assuming Feed component can accept a sourceId prop to filter the content
  return userid && !isNaN(sourceIdInt) ? (
    <Feed userid={userid} username={username} sourceId={sourceIdInt} />
  ) : (
    <div>Loading...</div>
  );
};

export default SourcePage;
