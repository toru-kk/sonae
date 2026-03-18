"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Plus, Search } from "lucide-react";
import { useGear } from "@/hooks/useGear";
import { GEAR_SUGGESTIONS, type GearSuggestion } from "@/lib/gear-suggestions";
import { toKatakana } from "@/lib/brands";
import { cn } from "@/lib/utils";

type PresetItem = {
  id: string;
  name: string;
  category_id: string;
  weight_g: number | null;
  brand?: string;
  is_essential?: boolean;
};

const PRESET_CATEGORIES: { id: string; label: string; items: PresetItem[] }[] = [
  {
    id: "shelter",
    label: "シェルター",
    items: [
      { id: "tent-1p", name: "テント（1人用）", category_id: "shelter", weight_g: 1500 },
      { id: "tent-2p", name: "テント（2人用）", category_id: "shelter", weight_g: 2200 },
      { id: "tarp", name: "タープ", category_id: "shelter", weight_g: 600 },
      { id: "bivy", name: "ビビィサック", category_id: "shelter", weight_g: 400 },
    ],
  },
  {
    id: "sleeping",
    label: "シュラフ・寝具",
    items: [
      { id: "sleeping-bag", name: "シュラフ（ダウン）", category_id: "sleeping", weight_g: 800 },
      { id: "sleeping-mat", name: "スリーピングマット", category_id: "sleeping", weight_g: 400 },
      { id: "pillow", name: "エアーピロー", category_id: "sleeping", weight_g: 70 },
    ],
  },
  {
    id: "clothing",
    label: "衣類",
    items: [
      { id: "rain-jacket", name: "レインジャケット", category_id: "clothing", weight_g: 350 },
      { id: "rain-pants", name: "レインパンツ", category_id: "clothing", weight_g: 250 },
      { id: "down-jacket", name: "ダウンジャケット", category_id: "clothing", weight_g: 320 },
      { id: "fleece", name: "フリース", category_id: "clothing", weight_g: 400 },
      { id: "baselayer-top", name: "ベースレイヤー（上）", category_id: "clothing", weight_g: 150 },
      { id: "baselayer-bottom", name: "ベースレイヤー（下）", category_id: "clothing", weight_g: 120 },
      { id: "gloves", name: "グローブ", category_id: "clothing", weight_g: 100 },
      { id: "hat", name: "帽子", category_id: "clothing", weight_g: 80 },
    ],
  },
  {
    id: "footwear",
    label: "靴・足回り",
    items: [
      { id: "boots", name: "登山靴", category_id: "footwear", weight_g: 900 },
      { id: "trail-runners", name: "トレイルランシューズ", category_id: "footwear", weight_g: 600 },
      { id: "gaiters", name: "スパッツ（ゲイター）", category_id: "footwear", weight_g: 150 },
      { id: "trekking-poles", name: "トレッキングポール", category_id: "footwear", weight_g: 280 },
      { id: "camp-sandals", name: "キャンプサンダル", category_id: "footwear", weight_g: 200 },
    ],
  },
  {
    id: "backpack",
    label: "バックパック",
    items: [
      { id: "pack-20", name: "バックパック（20L）日帰り用", category_id: "backpack", weight_g: 700 },
      { id: "pack-35", name: "バックパック（35L）1〜2泊用", category_id: "backpack", weight_g: 1100 },
      { id: "pack-50", name: "バックパック（50L）テント泊用", category_id: "backpack", weight_g: 1500 },
      { id: "rain-cover", name: "レインカバー", category_id: "backpack", weight_g: 100 },
    ],
  },
  {
    id: "navigation",
    label: "ナビゲーション",
    items: [
      { id: "compass", name: "コンパス", category_id: "navigation", weight_g: 30 },
      { id: "map", name: "地形図", category_id: "navigation", weight_g: 50 },
      { id: "gps", name: "GPSデバイス", category_id: "navigation", weight_g: 180 },
    ],
  },
  {
    id: "safety",
    label: "安全装備",
    items: [
      { id: "headlamp", name: "ヘッドランプ", category_id: "safety", weight_g: 90, is_essential: true },
      { id: "first-aid", name: "ファーストエイドキット", category_id: "safety", weight_g: 150, is_essential: true },
      { id: "emergency-sheet", name: "エマージェンシーシート", category_id: "safety", weight_g: 50, is_essential: true },
      { id: "whistle", name: "ホイッスル", category_id: "safety", weight_g: 15, is_essential: true },
      { id: "bear-spray", name: "熊スプレー", category_id: "safety", weight_g: 400 },
      { id: "helmet", name: "ヘルメット", category_id: "safety", weight_g: 350 },
    ],
  },
  {
    id: "cooking",
    label: "調理器具",
    items: [
      { id: "burner", name: "バーナー", category_id: "cooking", weight_g: 180 },
      { id: "gas", name: "ガスカートリッジ（110g）", category_id: "cooking", weight_g: 195 },
      { id: "cooker", name: "クッカー（鍋）", category_id: "cooking", weight_g: 250 },
      { id: "spork", name: "スプーン・フォーク", category_id: "cooking", weight_g: 20 },
      { id: "mug", name: "マグカップ", category_id: "cooking", weight_g: 100 },
    ],
  },
  {
    id: "food",
    label: "食料・行動食",
    items: [
      { id: "action-food", name: "行動食（1日分）", category_id: "food", weight_g: 400 },
      { id: "emergency-food", name: "非常食", category_id: "food", weight_g: 200, is_essential: true },
      { id: "water", name: "水（1L）", category_id: "food", weight_g: 1000 },
    ],
  },
  {
    id: "tools",
    label: "道具・その他",
    items: [
      { id: "hydration", name: "ハイドレーション（プラティパス）", category_id: "tools", weight_g: 130 },
      { id: "trowel", name: "トレックスコップ", category_id: "tools", weight_g: 60 },
      { id: "sunglasses", name: "サングラス", category_id: "tools", weight_g: 30 },
      { id: "sunscreen", name: "日焼け止め", category_id: "tools", weight_g: 100 },
      { id: "insect-repellent", name: "虫除けスプレー", category_id: "tools", weight_g: 90 },
      { id: "trash-bag", name: "ゴミ袋", category_id: "tools", weight_g: 10 },
      { id: "knife", name: "ナイフ・マルチツール", category_id: "tools", weight_g: 100 },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  shelter: "シェルター",
  sleeping: "シュラフ",
  clothing: "衣類",
  footwear: "靴・足回り",
  backpack: "バックパック",
  navigation: "ナビ",
  safety: "安全装備",
  cooking: "調理",
  food: "食料",
  tools: "道具・他",
};

const CATEGORY_IDS = Object.keys(CATEGORY_LABELS);

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

function gearKey(g: GearSuggestion) {
  return `brand:${g.category_id}:${g.brand}:${g.name}`;
}

export default function GearPresetsPage() {
  const router = useRouter();
  const { addGear } = useGear();
  const composingRef = useRef(false);

  const [tab, setTab] = useState<"preset" | "brand">("brand");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  // Brand tab state
  const [brandQuery, setBrandQuery] = useState("");
  const [brandCategory, setBrandCategory] = useState<string | null>(null);

  const togglePreset = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBrand = (g: GearSuggestion) => {
    const key = gearKey(g);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredBrandGear = useMemo(() => {
    let items = GEAR_SUGGESTIONS;
    if (brandCategory) {
      items = items.filter((g) => g.category_id === brandCategory);
    }
    if (brandQuery.length >= 1) {
      const q = brandQuery.toLowerCase();
      const qk = toKatakana(q);
      items = items.filter((g) => {
        const s = g.search.toLowerCase();
        const n = g.name.toLowerCase();
        const b = g.brand.toLowerCase();
        return s.includes(q) || s.includes(qk) || n.includes(q) || b.includes(q);
      });
    }
    return items.slice(0, 50);
  }, [brandQuery, brandCategory]);

  const handleAdd = async () => {
    const presetItems = PRESET_CATEGORIES.flatMap((c) => c.items).filter((i) => selected.has(i.id));
    const brandItems = GEAR_SUGGESTIONS.filter((g) => selected.has(gearKey(g)));

    const total = presetItems.length + brandItems.length;
    if (total === 0) return;

    setSaving(true);
    await Promise.all([
      ...presetItems.map((item) =>
        addGear({
          name: item.name,
          category_id: item.category_id,
          brand: item.brand ?? null,
          weight_g: item.weight_g,
          notes: null,
          is_essential: item.is_essential ?? false,
        })
      ),
      ...brandItems.map((item) =>
        addGear({
          name: item.name,
          category_id: item.category_id,
          brand: item.brand,
          weight_g: item.weight_g,
          notes: null,
          is_essential: false,
        })
      ),
    ]);
    setSaving(false);
    setDone(true);
    setTimeout(() => router.push("/gear"), 1000);
  };

  const selectedCount = selected.size;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 pb-24">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/gear"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">装備をまとめて追加</h1>
          <p className="text-xs text-muted-foreground mt-0.5">チェックを入れて一括登録</p>
        </div>
      </div>

      {/* タブ切り替え */}
      <div className="flex gap-1 rounded-lg bg-secondary p-1 mb-6">
        <button
          onClick={() => setTab("brand")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "brand" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          ブランド装備
        </button>
        <button
          onClick={() => setTab("preset")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "preset" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          定番セット
        </button>
      </div>

      {/* ブランド装備タブ */}
      {tab === "brand" && (
        <div className="space-y-4">
          {/* 検索 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              onCompositionStart={() => { composingRef.current = true; }}
              onCompositionEnd={(e) => { composingRef.current = false; setBrandQuery((e.target as HTMLInputElement).value); }}
              placeholder="装備名・ブランドで検索..."
              autoComplete="off"
              className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* カテゴリチップ */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setBrandCategory(null)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                !brandCategory
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              すべて
            </button>
            {CATEGORY_IDS.map((catId) => (
              <button
                key={catId}
                onClick={() => setBrandCategory(brandCategory === catId ? null : catId)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                  brandCategory === catId
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50"
                )}
              >
                {CATEGORY_LABELS[catId]}
              </button>
            ))}
          </div>

          {/* 装備リスト */}
          {filteredBrandGear.length > 0 ? (
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              {filteredBrandGear.map((g) => {
                const key = gearKey(g);
                const isSelected = selected.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleBrand(g)}
                    className="flex w-full items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                  >
                    <div className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                      isSelected ? "border-primary bg-primary" : "border-border bg-background"
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{g.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{g.brand}</span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                      {formatWeight(g.weight_g)}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                {brandQuery ? "該当する装備が見つかりません" : "カテゴリを選択するか、検索してください"}
              </p>
            </div>
          )}

          {filteredBrandGear.length === 50 && (
            <p className="text-center text-xs text-muted-foreground">
              最初の50件を表示中。検索で絞り込んでください。
            </p>
          )}
        </div>
      )}

      {/* 定番セットタブ */}
      {tab === "preset" && (
        <div className="space-y-6">
          {PRESET_CATEGORIES.map(({ id: catId, label, items }) => (
            <div key={catId}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{label}</h2>
              <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
                {items.map((item) => {
                  const isSelected = selected.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePreset(item.id)}
                      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                    >
                      <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                        isSelected ? "border-primary bg-primary" : "border-border bg-background"
                      )}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                        {item.is_essential && (
                          <span className="ml-2 rounded border border-red-200 bg-red-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-red-600">
                            必須
                          </span>
                        )}
                      </div>
                      {item.weight_g && (
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                          {formatWeight(item.weight_g)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* スティッキーフッター */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-2xl px-4 sm:px-6 z-10">
        <button
          onClick={handleAdd}
          disabled={selectedCount === 0 || saving || done}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {done ? (
            <><Check className="h-4 w-4" />追加しました！</>
          ) : saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" />追加中...</>
          ) : (
            <><Plus className="h-4 w-4" />{selectedCount > 0 ? `${selectedCount} 件を追加する` : "装備を選んでください"}</>
          )}
        </button>
      </div>
    </div>
  );
}
