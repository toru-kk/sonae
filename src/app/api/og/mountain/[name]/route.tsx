import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: Request,
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
        display: "flex",
        background: "linear-gradient(155deg, #03080d 0%, #071a10 30%, #0f3322 65%, #185535 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 背景の山シルエット */}
        <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none"
          style={{ position: "absolute", bottom: "0", left: "0" }}>
          <path d="M0 400 L200 180 L320 260 L480 100 L600 220 L750 140 L900 260 L1050 180 L1200 400 Z"
            fill="rgba(52,211,153,0.04)" />
          <path d="M0 400 L150 280 L300 320 L450 200 L600 300 L750 240 L900 310 L1050 260 L1200 400 Z"
            fill="rgba(52,211,153,0.07)" />
        </svg>

        {/* 装飾ドット */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "22px", opacity: 0.1,
          width: "220px",
          position: "absolute", top: "50px", right: "50px",
        }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              display: "flex",
              width: "5px", height: "5px", borderRadius: "50%",
              background: "#6ee7b7",
            }} />
          ))}
        </div>

        {/* メインコンテンツ */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 56px 56px 64px",
          width: "100%",
        }}>
          {/* 上部: ブランド */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "14px",
                background: "rgba(52,211,153,0.15)", border: "1.5px solid rgba(52,211,153,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                  <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="#6ee7b7" />
                  <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
                </svg>
              </div>
              <span style={{ fontSize: "22px", fontWeight: "900", color: "white" }}>Sonae</span>
            </div>
            <span style={{
              padding: "7px 18px", borderRadius: "100px",
              background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)",
              color: "#6ee7b7", fontSize: "13px", fontWeight: "600",
            }}>sonae.vercel.app</span>
          </div>

          {/* 中央: 山名 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span style={{
              display: "flex", alignSelf: "flex-start",
              padding: "7px 20px", borderRadius: "100px",
              background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
              color: "#6ee7b7", fontSize: "15px", fontWeight: "600",
            }}>山別の装備パッケージ</span>
            <span style={{
              fontSize: mountainName.length > 10 ? "54px" : "72px",
              fontWeight: "900", color: "white",
              lineHeight: 1.1, letterSpacing: "-0.03em",
            }}>{mountainName}</span>
          </div>

          {/* 下部: 統計 */}
          <div style={{ display: "flex", gap: "44px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "40px", fontWeight: "800", color: "white" }}>{pkgCount}</span>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>公開パッケージ</span>
            </div>
            {avgWeight > 0 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "40px", fontWeight: "800", color: "white" }}>{weightStr}</span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>平均総重量</span>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
