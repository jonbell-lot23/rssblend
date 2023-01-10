import { NextApiRequest, NextApiResponse } from "next";
import rss from "rss";

const importAll = (context) =>
  context.keys().map((key) => context(key).default);
const photos = importAll(
  require.context("../../public/gallery/", false, /\.png$/)
);

console.log(photos);

const feed = new rss({
  title: "Picadilly",
  feed_url: "http://picadilly.vercel.app/api/rss",
  site_url: "http://picadilly.vercel.app",
});

photos.forEach((photo) => {
  const item = {
    title: photo.src,
    description: `<img src="http://picadilly-jonbell-lot23.vercel.app${photo.src}" />`,
    url: photo.src, // Link to the photo
  };
  feed.item(item);
  console.log(item);
});

const xml = feed.xml();

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
};
