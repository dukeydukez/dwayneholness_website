import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dwayne Holness | Speaker · Brand Architect · Strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111111",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "60px 80px",
          gap: "64px",
          position: "relative",
        }}
      >
        {/* Gold left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "#c9a84c",
            display: "flex",
          }}
        />

        {/* Portrait photo */}
        <img
          src="https://dwayneholness.com/images/DH1.png"
          width={300}
          height={450}
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "4px",
            flexShrink: 0,
          }}
        />

        {/* Text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.22em",
              color: "#c9a84c",
              textTransform: "uppercase",
              fontWeight: 500,
              display: "flex",
            }}
          >
            dwayneholness.com
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#f0ebe0",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Dwayne Holness
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#c9a84c",
              fontWeight: 500,
              display: "flex",
            }}
          >
            Speaker · Brand Architect · Strategist
          </div>

          <div
            style={{
              width: "48px",
              height: "1px",
              background: "rgba(201,168,76,0.4)",
              display: "flex",
              marginTop: "4px",
            }}
          />

          <div
            style={{
              fontSize: 18,
              color: "#c8c2b4",
              lineHeight: 1.65,
              display: "flex",
            }}
          >
            Helping founders and enterprise brands build media systems that
            compound authority and create category leadership over time.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
