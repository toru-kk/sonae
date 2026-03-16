import { ImageResponse } from "next/og";

export async function GET() {
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
        {/* 左側コンテンツ */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 0 60px 72px",
          width: "680px",
          position: "relative",
        }}>
          {/* ブランド */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "16px",
              background: "rgba(52,211,153,0.15)", border: "1.5px solid rgba(52,211,153,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
                <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="#6ee7b7" />
                <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "white", lineHeight: 1 }}>Sonae</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginTop: "4px" }}>登山装備管理</span>
            </div>
          </div>

          {/* キャッチコピー */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              display: "flex", flexDirection: "column",
              fontSize: "56px",
              fontWeight: "900", color: "white",
              lineHeight: 1.15, letterSpacing: "-0.03em",
            }}>
              <span>次の山、</span>
              <span>どの相棒といく？</span>
            </div>
            <span style={{
              fontSize: "22px",
              fontWeight: "500", color: "#6ee7b7",
              lineHeight: 1.5,
            }}>
              装備を記録し、比較し、共有する。
            </span>
          </div>

          {/* 機能タグ */}
          <div style={{ display: "flex", gap: "12px" }}>
            {["装備管理", "AI提案", "コミュニティ"].map((label) => (
              <div key={label} style={{
                display: "flex", alignItems: "center",
                padding: "10px 24px", borderRadius: "100px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.75)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右側：山のシルエット + 装飾パターン */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          width: "520px",
          position: "relative",
        }}>
          {/* 上部の装飾ドット */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            gap: "24px", opacity: 0.15,
            width: "280px",
            position: "absolute", top: "60px", right: "60px",
          }}>
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} style={{
                display: "flex",
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#6ee7b7",
              }} />
            ))}
          </div>

          {/* メイン山シルエット */}
          <svg width="440" height="320" viewBox="0 0 440 320" fill="none" style={{ position: "relative" }}>
            {/* 遠景の山（薄い） */}
            <path d="M0 320 L80 140 L120 180 L180 80 L240 160 L280 120 L340 200 L440 320 Z"
              fill="rgba(52,211,153,0.06)" />
            {/* 中景の山 */}
            <path d="M0 320 L60 200 L100 240 L160 140 L220 220 L260 180 L320 250 L440 320 Z"
              fill="rgba(52,211,153,0.1)" />
            {/* 前景の山 */}
            <path d="M0 320 L40 260 L100 280 L140 220 L200 270 L240 240 L300 280 L360 260 L440 320 Z"
              fill="rgba(52,211,153,0.15)" />
            {/* 月 */}
            <circle cx="340" cy="60" r="20" fill="rgba(251,191,36,0.2)" />
            <circle cx="346" cy="56" r="18" fill="rgba(3,8,13,0.8)" />
            {/* 星 */}
            <circle cx="100" cy="40" r="1.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="260" cy="30" r="1" fill="rgba(255,255,255,0.3)" />
            <circle cx="380" cy="100" r="1.2" fill="rgba(255,255,255,0.35)" />
            <circle cx="160" cy="70" r="1" fill="rgba(255,255,255,0.25)" />
            <circle cx="320" cy="50" r="0.8" fill="rgba(255,255,255,0.2)" />
          </svg>

          {/* 右下の装飾ライン */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "8px",
            position: "absolute", bottom: "80px", right: "60px",
            opacity: 0.2,
          }}>
            <div style={{ display: "flex", width: "60px", height: "2px", background: "#6ee7b7", borderRadius: "1px" }} />
            <div style={{ display: "flex", width: "40px", height: "2px", background: "#6ee7b7", borderRadius: "1px" }} />
            <div style={{ display: "flex", width: "20px", height: "2px", background: "#6ee7b7", borderRadius: "1px" }} />
          </div>
        </div>

        {/* sonae.app バッジ */}
        <div style={{
          position: "absolute", bottom: "60px", right: "72px",
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 22px", borderRadius: "100px",
          background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
        }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="#6ee7b7" />
            <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
          </svg>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#6ee7b7" }}>sonae.vercel.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
