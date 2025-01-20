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
          backgroundColor: "#a23e48",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "40px",
          textAlign: "left",
          borderRadius: "20px",
        }}
      >
        <div style={{ fontSize: "100px", fontWeight: "bold" }}>●</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "36px", fontWeight: "bold" }}>
            Placeholder Title
          </p>
          <p style={{ fontSize: "24px", marginTop: "10px" }}>
            This is a placeholder quote for the image.
          </p>
        </div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          Placeholder Footer
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
