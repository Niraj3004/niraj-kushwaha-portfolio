import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Niraj Kushwaha — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0C10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent gradient blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            marginBottom: "32px",
            color: "rgba(255,255,255,0.6)",
            fontSize: "18px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          Available for new projects
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          Niraj Kushwaha
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "32px",
            color: "#6B7280",
            fontWeight: 400,
            marginBottom: "48px",
          }}
        >
          Full-Stack Developer · Kathmandu, Nepal
        </div>

        {/* Tech stack pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Next.js", "React Native", "Node.js", "AI/Agents"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "18px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            top: "64px",
            right: "64px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "20px",
          }}
        >
          nirajkushwaha.com.np
        </div>
      </div>
    ),
    { ...size }
  );
}
