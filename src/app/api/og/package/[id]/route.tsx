import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

const CATEGORIES: Record<string, { name_ja: string; sort_order: number }> = {
  shelter:    { name_ja: "シェルター",    sort_order: 1 },
  sleeping:   { name_ja: "シュラフ",      sort_order: 2 },
  clothing:   { name_ja: "衣類",          sort_order: 3 },
  footwear:   { name_ja: "靴",            sort_order: 4 },
  backpack:   { name_ja: "バックパック",  sort_order: 5 },
  navigation: { name_ja: "ナビ",          sort_order: 6 },
  safety:     { name_ja: "安全装備",      sort_order: 7 },
  cooking:    { name_ja: "調理",          sort_order: 8 },
  food:       { name_ja: "食料",          sort_order: 9 },
  tools:      { name_ja: "道具",          sort_order: 10 },
};

const BAR_COLORS = [
  "#fb923c","#a78bfa","#38bdf8","#fbbf24","#22c55e",
  "#60a5fa","#f87171","#fb7185","#a3e635","#94a3b8",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await supabase
    .from("gear_packages")
    .select("*, gear_package_items(gear_item_id, gear_items(category_id, weight_g)), users(display_name, avatar_url)")
    .eq("id", id)
    .eq("is_public", true)
    .single() as { data: any };

  const name: string = data?.name ?? "装備パッケージ";
  const mountainType: string | null = data?.mountain_type ?? null;
  const itemCount: number = data?.gear_package_items?.length ?? 0;
  const totalWeightG: number = data?.total_weight_g ?? 0;

  const catWeights: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data?.gear_package_items ?? []).forEach((pi: any) => {
    const item = pi.gear_items;
    if (!item) return;
    const cat = item.category_id ?? "tools";
    catWeights[cat] = (catWeights[cat] ?? 0) + (item.weight_g ?? 0);
  });
  const categoryGroups = Object.entries(catWeights)
    .filter(([catId]) => CATEGORIES[catId])
    .sort((a, b) => (CATEGORIES[a[0]]?.sort_order ?? 99) - (CATEGORIES[b[0]]?.sort_order ?? 99));
  const weightStr = totalWeightG >= 1000
    ? `${(totalWeightG / 1000).toFixed(1)} kg`
    : `${totalWeightG} g`;

  const creatorName: string = data?.users?.display_name ?? "Sonaeユーザー";
  const avatarUrl: string | null = data?.users?.avatar_url ?? null;
  const avatarInitial = creatorName.slice(0, 1).toUpperCase();

  let avatarData: string | null = null;
  if (avatarUrl) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(avatarUrl, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const base64 = Buffer.from(buf).toString("base64");
        const mime = res.headers.get("content-type") ?? "image/jpeg";
        avatarData = `data:${mime};base64,${base64}`;
      }
    } catch { /* fallback */ }
  }

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
        {/* 背景の山シルエット（右下） */}
        <svg width="600" height="300" viewBox="0 0 600 300" fill="none"
          style={{ position: "absolute", bottom: "0", right: "0" }}>
          <path d="M100 300 L200 120 L260 180 L340 60 L420 160 L500 100 L600 300 Z"
            fill="rgba(52,211,153,0.04)" />
          <path d="M0 300 L120 200 L200 240 L300 140 L380 220 L500 180 L600 300 Z"
            fill="rgba(52,211,153,0.07)" />
        </svg>

        {/* 装飾ドット（右上） */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "20px", opacity: 0.1,
          width: "200px",
          position: "absolute", top: "50px", right: "50px",
        }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              display: "flex",
              width: "4px", height: "4px", borderRadius: "50%",
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
          {/* 上部: ブランド + 山タイプ */}
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
            <div style={{ display: "flex", gap: "10px" }}>
              {mountainType && (
                <span style={{
                  padding: "7px 18px", borderRadius: "100px",
                  background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
                  color: "#6ee7b7", fontSize: "14px", fontWeight: "600",
                }}>{mountainType}</span>
              )}
              <span style={{
                padding: "7px 18px", borderRadius: "100px",
                background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)",
                color: "#6ee7b7", fontSize: "13px", fontWeight: "600",
              }}>sonae.vercel.app</span>
            </div>
          </div>

          {/* 中央: パッケージ名 + 重量バー */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span style={{
              fontSize: name.length > 15 ? "48px" : "58px",
              fontWeight: "900", color: "white",
              lineHeight: 1.1, letterSpacing: "-0.03em",
            }}>{name}</span>

            {totalWeightG > 0 && categoryGroups.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden", background: "rgba(255,255,255,0.06)", width: "70%" }}>
                  {categoryGroups.map(([catId, weight], idx) => {
                    const pct = (weight / totalWeightG) * 100;
                    if (pct < 1) return null;
                    return (
                      <div key={catId} style={{ display: "flex", width: `${pct}%`, height: "100%", background: BAR_COLORS[CATEGORIES[catId]?.sort_order ? CATEGORIES[catId].sort_order - 1 : idx] }} />
                    );
                  })}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                  {categoryGroups.filter(([, w]) => w > 0).slice(0, 6).map(([catId], idx) => (
                    <div key={catId} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ display: "flex", width: "8px", height: "8px", borderRadius: "50%", background: BAR_COLORS[CATEGORIES[catId]?.sort_order ? CATEGORIES[catId].sort_order - 1 : idx] }} />
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{CATEGORIES[catId]?.name_ja}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 下部: 統計 + クリエイター */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "38px", fontWeight: "800", color: "white" }}>{weightStr}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>総重量</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span style={{ fontSize: "38px", fontWeight: "800", color: "white" }}>{itemCount}</span>
                  <span style={{ fontSize: "18px", fontWeight: "400", color: "rgba(255,255,255,0.5)", marginLeft: "4px" }}>点</span>
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>装備アイテム</span>
              </div>
            </div>

            {/* クリエイター */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px", padding: "8px 20px 8px 8px",
            }}>
              {avatarData ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarData}
                  width={38} height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt=""
                />
              ) : (
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #14532d, #22c55e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: "900", color: "white",
                }}>{avatarInitial}</div>
              )}
              <span style={{ fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.8)" }}>{creatorName}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
