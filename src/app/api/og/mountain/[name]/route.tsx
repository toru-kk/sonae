import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const mountainName = decodeURIComponent(name);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: pkgs } = await supabase
    .from("gear_packages")
    .select("id, total_weight_g, gear_package_items(count)")
    .eq("is_public", true)
    .eq("mountain_type", mountainName);

  const pkgCount = pkgs?.length ?? 0;
  const avgWeight = pkgCount > 0
    ? Math.round((pkgs ?? []).reduce((s, p) => s + (p.total_weight_g ?? 0), 0) / pkgCount)
    : 0;
  const weightStr = avgWeight >= 1000
    ? `${(avgWeight / 1000).toFixed(1)} kg`
    : `${avgWeight} g`;

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        background: "linear-gradient(135deg, #03080d 0%, #071d13 50%, #185535 100%)",
        fontFamily: "sans-serif",
      }}>
        {/* ブランド */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="white" />
              <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "20px", fontWeight: "900", color: "white", lineHeight: 1 }}>Sonae</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginTop: "2px" }}>備え・登山装備管理</span>
          </div>
        </div>

        {/* 山名 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{
            display: "inline-flex", alignSelf: "flex-start",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)",
            color: "#6ee7b7", fontSize: "16px", fontWeight: "600",
          }}>山別の装備パッケージ</span>
          <div style={{
            fontSize: mountainName.length > 10 ? "56px" : "72px",
            fontWeight: "900", color: "white",
            lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>{mountainName}</div>
        </div>

        {/* 統計フッター */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "800", color: "white" }}>{pkgCount}</span>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>公開パッケージ</span>
          </div>
          {avgWeight > 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "white" }}>{weightStr}</span>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>平均総重量</span>
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
