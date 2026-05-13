import { ImageResponse } from "next/og";
import { getGrowingTipBySlug } from "@/lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tip = await getGrowingTipBySlug(slug);

  const difficultyColor: Record<string, string> = {
    beginner: "#22c55e",
    intermediate: "#eab308",
    advanced: "#ef4444",
  };
  const accent = tip ? (difficultyColor[tip.difficulty] ?? "#4ade80") : "#4ade80";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a150a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: "100%", background: accent }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "60px 72px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#0a150a", fontSize: 20, fontWeight: 700 }}>G</span>
              </div>
              <span style={{ color: "#4ade80", fontSize: 20, fontWeight: 600 }}>GrowingWeed.com</span>
            </div>
            {tip?.difficulty && (
              <span style={{ background: accent + "33", border: `1px solid ${accent}55`, color: accent, borderRadius: 999, padding: "6px 16px", fontSize: 16, textTransform: "capitalize" }}>
                {tip.difficulty}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <div style={{ color: "#6b7280", fontSize: 20, marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>Growing Guide</div>
            <div style={{ color: "#f9fafb", fontSize: 58, fontWeight: 800, lineHeight: 1.15, marginBottom: 32, maxWidth: 900 }}>
              {tip?.title ?? slug.replace(/-/g, " ")}
            </div>
            {tip && (
              <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9ca3af", fontSize: 20 }}>
                <span>{tip.author_name}</span>
                <span>·</span>
                <span>{tip.category}</span>
                <span>·</span>
                <span>{tip.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
