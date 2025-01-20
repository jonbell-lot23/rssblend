import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url, `http://${req.headers["host"]}`);
  const title = searchParams.get("title") || "";
  const pullQuote = searchParams.get("quote") || "";

  // Load the font with error handling
  const fetchFont = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("font")) {
      throw new Error("Fetched resource is not a valid font file");
    }
    return response.arrayBuffer();
  };

  const loraRegular = await fetchFont(
    "https://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkqt8ndeY9Z6JTg.woff"
  );

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
      fonts: [
        {
          name: "Lora",
          data: loraRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );

  return imageResponse;
}
