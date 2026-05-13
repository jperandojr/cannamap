import { ImageResponse } from "next/og";
import { getDispensaryBySlug } from "@/lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dispensary = await getDispensaryBySlug(slug);

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
        <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: "100%", background: "#4ade80" }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "60px 72px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#0a150a", fontSize: 20, fontWeight: 700 }}>G</span>
              </div>
              <span style={{ color: "#4ade80", fontSize: 20, fontWeight: 600 }}>GrowingWeed.com</span>
            </div>
            {dispensary?.verified && (
              <span style={{ background: "#4ade8033", border: "1px solid #4ade8055", color: "#4ade80", borderRadius: 999, padding: "6px 16px", fontSize: 16 }}>
                ✓ Verified
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <div style={{ color: "#6b7280", fontSize: 20, marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>Cannabis Dispensary</div>
            <div style={{ color: "#f9fafb", fontSize: 68, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              {dispensary?.name ?? slug.replace(/-/g, " ")}
            </div>
            {dispensary && (
              <div style={{ display: "flex", gap: 24, color: "#9ca3af", fontSize: 22 }}>
                <span>📍 {dispensary.city}, {dispensary.state}</span>
                {dispensary.rating > 0 && (
                  <>
                    <span>·</span>
                    <span>★ {dispensary.rating.toFixed(1)} ({dispensary.review_count} reviews)</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
