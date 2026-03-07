"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Plus } from "lucide-react";
import { useGear } from "@/hooks/useGear";

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

export default function GearPresetsPage() {
  const router = useRouter();
  const { addGear } = useGear();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = async () => {
    const items = PRESET_CATEGORIES.flatMap((c) => c.items).filter((i) => selected.has(i.id));
    if (items.length === 0) return;

    setSaving(true);
    await Promise.all(
      items.map((item) =>
        addGear({
          name: item.name,
          category_id: item.category_id,
          brand: item.brand ?? null,
          weight_g: item.weight_g,
          notes: null,
          is_essential: item.is_essential ?? false,
        })
      )
    );
    setSaving(false);
    setDone(true);
    setTimeout(() => router.push("/gear"), 1000);
  };

  const selectedCount = selected.size;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/gear"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">定番装備から追加</h1>
          <p className="text-xs text-muted-foreground mt-0.5">よく使われる装備をチェックしてまとめて登録</p>
        </div>
      </div>

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
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-border bg-background"
                    }`}>
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
                        {item.weight_g >= 1000 ? `${(item.weight_g / 1000).toFixed(1)} kg` : `${item.weight_g} g`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* スティッキーフッター */}
      <div className="sticky bottom-4 mt-8">
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
