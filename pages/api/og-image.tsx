import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url, `http://${req.headers["host"]}`);
  const title = searchParams.get("title") || "Default Title";
  const pullQuote = searchParams.get("quote") || "Default Pull Quote";

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          backgroundColor: "#efefef",
          color: "#101010",
          padding: "40px",
          textAlign: "left",
          borderRadius: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "96px", fontWeight: "bold" }}>
            Placeholder Title
          </p>
          <p style={{ fontSize: "76px", marginTop: "10px" }}>
            This is a placeholder quote for the image.
          </p>
        </div>
        <div style={{ fontSize: "64px", fontWeight: "bold" }}>
          firehose.lot23.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  return imageResponse;
}
