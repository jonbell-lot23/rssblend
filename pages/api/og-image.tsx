import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: Request, res: any) {
  const { searchParams } = new URL(req.url, `http://${req.headers["host"]}`);
  const title = searchParams.get("title") || "Default Title";
  const pullQuote = searchParams.get("quote") || "Default Pull Quote";

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>{title}</h1>
        <p style={{ fontSize: "24px", fontStyle: "italic" }}>{pullQuote}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  res.status(200).send(imageResponse);
}
