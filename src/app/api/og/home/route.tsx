import { ImageResponse } from "next/og";

export async function GET() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
              <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="white" />
              <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: "900", color: "white", lineHeight: 1 }}>Sonae</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginTop: "3px" }}>備え・登山装備管理</span>
          </div>
        </div>

        {/* キャッチコピー */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{
            fontSize: "56px",
            fontWeight: "900", color: "white",
            lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            次の山、<br />どの相棒といく？
          </div>
          <div style={{
            fontSize: "28px",
            fontWeight: "600", color: "#6ee7b7",
            lineHeight: 1.3,
          }}>
            sonaeで見つける、自分だけの正解。
          </div>
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)" }}>
            装備に迷う夜を、終わらせよう。
          </div>
        </div>

        {/* フッター */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              { label: "装備管理", sub: "重量も自動計算" },
              { label: "AI提案", sub: "山名を入れるだけ" },
              { label: "シェア", sub: "装備セットを公開" },
            ].map(({ label, sub }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "20px", fontWeight: "800", color: "white" }}>{label}</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{sub}</span>
              </div>
            ))}
          </div>
          <div style={{
            padding: "12px 24px", borderRadius: "12px",
            background: "rgba(20,67,42,0.6)", border: "1px solid rgba(52,211,153,0.3)",
            color: "#6ee7b7", fontSize: "16px", fontWeight: "700",
          }}>sonae.app</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
