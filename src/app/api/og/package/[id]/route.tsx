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
  _request: Request,
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

  // カテゴリ別重量計算
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

  // アバター画像をfetchして埋め込み（2秒タイムアウト、失敗したらイニシャル表示）
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
    } catch { /* fallback to initials */ }
  }

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

        {/* パッケージ名 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {mountainType && (
            <span style={{
              display: "inline-flex", alignSelf: "flex-start",
              padding: "6px 16px", borderRadius: "100px",
              background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)",
              color: "#6ee7b7", fontSize: "16px", fontWeight: "600",
            }}>{mountainType}</span>
          )}
          <div style={{
            fontSize: name.length > 15 ? "52px" : "64px",
            fontWeight: "900", color: "white",
            lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>{name}</div>
        </div>

        {/* 重量バー */}
        {totalWeightG > 0 && categoryGroups.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden", background: "rgba(255,255,255,0.08)" }}>
              {categoryGroups.map(([catId, weight], idx) => {
                const pct = (weight / totalWeightG) * 100;
                if (pct < 1) return null;
                return (
                  <div key={catId} style={{ width: `${pct}%`, height: "100%", background: BAR_COLORS[CATEGORIES[catId]?.sort_order ? CATEGORIES[catId].sort_order - 1 : idx] }} />
                );
              })}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {categoryGroups.filter(([, w]) => w > 0).slice(0, 6).map(([catId], idx) => (
                <div key={catId} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: BAR_COLORS[CATEGORIES[catId]?.sort_order ? CATEGORIES[catId].sort_order - 1 : idx] }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{CATEGORIES[catId]?.name_ja}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* フッター：統計 + クリエイター */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {/* 統計 */}
          <div style={{ display: "flex", gap: "32px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "white" }}>{weightStr}</span>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>推定総重量</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "white" }}>
                {itemCount}<span style={{ fontSize: "18px", fontWeight: "400", marginLeft: "4px" }}>点</span>
              </span>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>装備アイテム</span>
            </div>
          </div>

          {/* クリエイター + sonae.appバッジ */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
            {/* sonae.appバッジ */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: "100px", padding: "6px 16px 6px 10px",
            }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="#6ee7b7" />
                <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
              </svg>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "0.03em" }}>sonae.app で作成</span>
            </div>

            {/* クリエイター */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "100px", padding: "10px 20px 10px 10px",
            }}>
              {avatarData ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarData}
                  width={44} height={44}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt=""
                />
              ) : (
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #14532d, #22c55e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", fontWeight: "900", color: "white",
                }}>{avatarInitial}</div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>作成者</span>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "white" }}>{creatorName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
