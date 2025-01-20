import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url, `http://${req.headers["host"]}`);
  const title = searchParams.get("title") || "Default Title";
  const pullQuote = searchParams.get("quote") || "Default Pull Quote";

  // Load the font
  const loraRegular = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkqt8ndeY9Z6JTg.woff"
    )
  ).then((res) => res.arrayBuffer());

  const loraBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787z5uxJBkqt8ndeY9Z6JTg.woff"
    )
  ).then((res) => res.arrayBuffer());

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
          <p style={{ fontSize: "96px", fontWeight: "bold" }}>{title}</p>
          <p style={{ fontSize: "76px", marginTop: "10px" }}>{pullQuote}</p>
        </div>
        <div style={{ fontSize: "48px", fontWeight: "bold" }}>
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
