import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Feed from "../components/Feed";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const cleanUsername = username?.replace("@", "");
    if (cleanUsername) {
      fetch(`api/getUserid?username=${cleanUsername}`)
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
        .catch((error) => console.error("Error:", error));
    }
  }, [username]);

  return userid ? <Feed userid={userid} /> : <div>Loading...</div>;
};

export default UserPage;
