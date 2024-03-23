import React, { useEffect, useState } from "react";

interface ThumbProps {
  slug: string;
  description: string;
}

interface FirehoseItem {
  title: string;
  postdate: string;
  url: string;
  slug: string;
}

const Thumb: React.FC<ThumbProps> = ({ slug, description }) => {
  const [item, setItem] = useState<FirehoseItem | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/firehoseItem?slug=${slug}`);
      const firehoseItem: FirehoseItem = await res.json();
      setItem(firehoseItem);
    };

    fetchItem();
  }, [slug]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const formattedDate = item.postdate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(item.postdate))
    : "Invalid date";

  return (
    <div className="flex flex-col w-1/4 p-6 mt-8 mb-6 mr-1 space-y-1 transition-shadow duration-200 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl">
      <a href={`/post/${item.slug}`}>
        <div className="text-[#E9496F] text-decoration-none text-truncate break-normal text-lg font-medium leading-none">
          {" "}
          {item.title}
        </div>

        <div className="my-0">
          <div className="mb-0 leading-none text-gray-400">
            <span>{formattedDate}</span>
          </div>
          <p className="mt-4">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default Thumb;
