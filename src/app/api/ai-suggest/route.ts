import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const categoryNames: Record<string, string> = {
  shelter:    "シェルター",
  sleeping:   "シュラフ・寝具",
  clothing:   "衣類",
  footwear:   "靴・足回り",
  backpack:   "バックパック",
  navigation: "ナビゲーション",
  safety:     "安全装備",
  cooking:    "調理器具",
  food:       "食料・行動食",
  tools:      "道具・その他",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

function buildCacheKey(userId: string, mountain: string, month: number, nights: number) {
  const normalizedMountain = mountain.trim().replace(/\s+/g, "");
  return `${userId}:${normalizedMountain}:${month}:${nights}`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { mountain, month, nights } = await req.json();
  if (!mountain || !month) {
    return NextResponse.json({ error: "mountain and month are required" }, { status: 400 });
  }

  const cacheKey = buildCacheKey(user.id, mountain, month, nights);

  // キャッシュチェック（72時間以内）
  const { data: cached } = await (supabase as AnyClient)
    .from("ai_suggest_cache")
    .select("result")
    .eq("cache_key", cacheKey)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (cached?.result) {
    return NextResponse.json({ ...cached.result, mountain, month, nights, cached: true });
  }

  // 月間利用制限チェック（Free: 3回/月）
  const FREE_LIMIT = 3;
  const currentMonth = new Date().toISOString().slice(0, 7); // 'YYYY-MM'
  const { data: usage } = await (supabase as AnyClient)
    .from("ai_suggest_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("month", currentMonth)
    .maybeSingle();

  const currentCount = usage?.count ?? 0;
  if (currentCount >= FREE_LIMIT) {
    return NextResponse.json(
      { error: "月間AI提案の上限（3回）に達しました。来月またご利用ください。", limit_reached: true },
      { status: 429 }
    );
  }

  // ユーザーの装備一覧を取得（idを含む）
  const { data: gearItems } = await (supabase as AnyClient)
    .from("gear_items")
    .select("id, name, category_id, weight_g, is_essential, brand, notes")
    .eq("user_id", user.id);

  const nightsLabel = nights === 0 ? "日帰り" : `${nights}泊${nights + 1}日`;
  const gearList = (gearItems ?? []).map((g: { name: string; category_id: string; weight_g?: number | null; is_essential?: boolean; brand?: string | null; notes?: string | null }) =>
    `- ${g.name}${g.brand ? ` (${g.brand})` : ""}｜カテゴリ: ${categoryNames[g.category_id] ?? g.category_id}｜重量: ${g.weight_g ? `${g.weight_g}g` : "不明"}${g.is_essential ? "｜必須装備" : ""}${g.notes ? `｜メモ: ${g.notes}` : ""}`
  ).join("\n");

  const prompt = `あなたは経験豊富な日本の登山ガイドです。ユーザーの登山計画と所持装備を分析し、最適な装備提案をJSON形式で回答してください。

## 登山計画
- 山名: ${mountain}
- 時期: ${month}月
- 行程: ${nightsLabel}

## ユーザーの所持装備（${(gearItems ?? []).length}点）
${gearList || "（装備が登録されていません）"}

## 回答形式
以下のJSON形式で回答してください。余分なテキストは含めないでください。

{
  "reasoning": "全体的な分析コメント（2〜3文、日本語）",
  "total_weight_estimate_g": 推定総重量（数値、グラム単位）,
  "recommended_items": [
    {
      "name": "装備名（所持装備の正確な名前）",
      "category": "カテゴリ名（日本語）",
      "reason": "この装備を選んだ理由（1文）",
      "from_user_gear": true
    }
  ],
  "missing_items": [
    {
      "name": "不足している装備名",
      "priority": "必須" | "推奨" | "あると便利",
      "reason": "なぜ必要か（1〜2文）"
    }
  ],
  "warnings": [
    "注意事項（文字列）"
  ]
}

## 注意
- recommended_itemsはユーザーの所持装備の中から今回の登山に適したものだけを選ぶ
- missing_itemsはユーザーが持っていない装備で必要なもの（3〜6点）
- warningsは安全上重要な情報（1〜3件）
- すべての文章は日本語で`;

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }
    const result = JSON.parse(jsonMatch[0]);

    // recommended_itemsにgear_idを付与（名前で一致）
    const gearByName = new Map(
      (gearItems ?? []).map((g: { id: string; name: string }) => [g.name, g.id])
    );
    const enriched = {
      ...result,
      recommended_items: (result.recommended_items ?? []).map(
        (item: { name: string; [key: string]: unknown }) => ({
          ...item,
          gear_id: gearByName.get(item.name) ?? null,
        })
      ),
    };

    // キャッシュに保存（既存があればupsert）
    await (supabase as AnyClient)
      .from("ai_suggest_cache")
      .upsert(
        { cache_key: cacheKey, result: enriched, expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() },
        { onConflict: "cache_key" }
      );

    // 月間利用カウントを更新
    await (supabase as AnyClient)
      .from("ai_suggest_usage")
      .upsert(
        { user_id: user.id, month: currentMonth, count: currentCount + 1 },
        { onConflict: "user_id,month" }
      );

    return NextResponse.json({ ...enriched, mountain, month, nights, remaining: FREE_LIMIT - currentCount - 1 });
  } catch (err) {
    console.error("AI suggest error:", err);
    return NextResponse.json({ error: "AI service error" }, { status: 500 });
  }
}
