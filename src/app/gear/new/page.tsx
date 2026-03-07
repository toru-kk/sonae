"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, AlertCircle } from "lucide-react";
import {
  Tent, BedDouble, Shirt, Footprints, Backpack,
  Compass, ShieldCheck, Flame, Apple, Wrench,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryStyle } from "@/components/gear/CategoryIcon";
import { useGear } from "@/hooks/useGear";

const categories: { id: string; label: string; icon: React.ComponentType<LucideProps> }[] = [
  { id: "shelter",    label: "シェルター",    icon: Tent        },
  { id: "sleeping",   label: "シュラフ",      icon: BedDouble   },
  { id: "clothing",   label: "衣類",          icon: Shirt       },
  { id: "footwear",   label: "靴・足回り",    icon: Footprints  },
  { id: "backpack",   label: "バックパック",  icon: Backpack    },
  { id: "navigation", label: "ナビ",          icon: Compass     },
  { id: "safety",     label: "安全装備",      icon: ShieldCheck },
  { id: "cooking",    label: "調理",          icon: Flame       },
  { id: "food",       label: "食料",          icon: Apple       },
  { id: "tools",      label: "道具・他",      icon: Wrench      },
];

// { display: 表示名, search: 検索用（カタカナ・別名含む）}
const BRANDS: { display: string; search: string }[] = [
  // 日本ブランド
  { display: "mont-bell",     search: "mont-bell モンベル montbell" },
  { display: "finetrack",     search: "finetrack ファイントラック" },
  { display: "foxfire",       search: "foxfire フォックスファイヤー" },
  { display: "Phenix",        search: "Phenix フェニックス" },
  { display: "NANGA",         search: "NANGA ナンガ" },
  { display: "HILLEBERG",     search: "HILLEBERG ヒルバーグ" },
  { display: "ISUKA",         search: "ISUKA イスカ" },
  { display: "ZEROGRAM",      search: "ZEROGRAM ゼログラム" },
  { display: "SOTO",          search: "SOTO ソト 新富士バーナー" },
  { display: "PRIMUS",        search: "PRIMUS プリムス" },
  { display: "Snow Peak",     search: "Snow Peak スノーピーク" },
  { display: "CAPTAIN STAG", search: "CAPTAIN STAG キャプテンスタッグ" },
  { display: "LOGOS",         search: "LOGOS ロゴス" },
  // アパレル・レイヤリング
  { display: "THE NORTH FACE", search: "THE NORTH FACE ノースフェイス TNF" },
  { display: "patagonia",      search: "patagonia パタゴニア" },
  { display: "Arc'teryx",      search: "Arc'teryx アークテリクス" },
  { display: "MAMMUT",         search: "MAMMUT マムート" },
  { display: "Haglöfs",        search: "Haglöfs ホグロフス" },
  { display: "Rab",            search: "Rab ラブ" },
  { display: "Helly Hansen",   search: "Helly Hansen ヘリーハンセン" },
  { display: "Marmot",         search: "Marmot マーモット" },
  { display: "Outdoor Research", search: "Outdoor Research アウトドアリサーチ OR" },
  { display: "Fjällräven",     search: "Fjällräven フェールラーベン" },
  { display: "Norrøna",        search: "Norrøna ノローナ" },
  { display: "Salewa",         search: "Salewa サレワ" },
  { display: "CW-X",           search: "CW-X シーダブルエックス ワコール" },
  // バックパック
  { display: "OSPREY",         search: "OSPREY オスプレー" },
  { display: "Gregory",        search: "Gregory グレゴリー" },
  { display: "Deuter",         search: "Deuter ドイター" },
  { display: "Karrimor",       search: "Karrimor カリマー" },
  { display: "Granite Gear",   search: "Granite Gear グラナイトギア" },
  { display: "Hyperlite Mountain Gear", search: "Hyperlite Mountain Gear HMG ハイパーライト" },
  { display: "MYSTERY RANCH",  search: "MYSTERY RANCH ミステリーランチ" },
  { display: "ULA Equipment",  search: "ULA Equipment ユーエルエー" },
  // テント・シュラフ
  { display: "NEMO Equipment", search: "NEMO Equipment ニーモ" },
  { display: "Big Agnes",      search: "Big Agnes ビッグアグネス" },
  { display: "MSR",            search: "MSR Mountain Safety Research エムエスアール" },
  { display: "Sea to Summit",  search: "Sea to Summit シートゥサミット" },
  { display: "Therm-a-Rest",   search: "Therm-a-Rest サーマレスト" },
  { display: "Western Mountaineering", search: "Western Mountaineering ウェスタンマウンテニアリング" },
  // シューズ
  { display: "Salomon",        search: "Salomon サロモン" },
  { display: "LOWA",           search: "LOWA ローバー" },
  { display: "Scarpa",         search: "Scarpa スカルパ" },
  { display: "La Sportiva",    search: "La Sportiva スポルティバ" },
  { display: "Merrell",        search: "Merrell メレル" },
  { display: "Zamberlan",      search: "Zamberlan ザンバラン" },
  { display: "ASOLO",          search: "ASOLO アゾロ" },
  // ギア・安全装備
  { display: "Black Diamond",  search: "Black Diamond ブラックダイヤモンド BD" },
  { display: "PETZL",          search: "PETZL ペツル" },
  { display: "GRIVEL",         search: "GRIVEL グリベル" },
  { display: "CAMP",           search: "CAMP カンプ" },
  { display: "Garmin",         search: "Garmin ガーミン" },
  { display: "SUUNTO",         search: "SUUNTO スント" },
  { display: "Casio PRO TREK", search: "Casio PRO TREK カシオ プロトレック" },
  { display: "Coleman",        search: "Coleman コールマン" },
  // その他
  { display: "Leatherman",     search: "Leatherman レザーマン" },
  { display: "Victorinox",     search: "Victorinox ビクトリノックス" },
  { display: "Platypus",       search: "Platypus プラティパス" },
  { display: "KATADYN",        search: "KATADYN カタダイン" },
  { display: "EXPED",          search: "EXPED エクスペド" },
];

export default function GearNewPage() {
  const router = useRouter();
  const { addGear, error } = useGear();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [showBrandList, setShowBrandList] = useState(false);
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState<"g" | "kg">("g");
  const [notes, setNotes] = useState("");
  const [isEssential, setIsEssential] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const selected = categories.find((c) => c.id === selectedCategory);
  const style = selectedCategory ? categoryStyle[selectedCategory] : null;

  const filteredBrands = BRANDS.filter((b) =>
    brandInput.length > 0 &&
    b.search.toLowerCase().includes(brandInput.toLowerCase())
  );

  const handleBrandSelect = (b: string) => {
    setBrand(b);
    setBrandInput(b);
    setShowBrandList(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !name.trim()) return;
    setSaving(true);

    const weight_g = weightValue
      ? weightUnit === "kg"
        ? Math.round(parseFloat(weightValue) * 1000)
        : parseInt(weightValue, 10)
      : null;

    const id = await addGear({
      name: name.trim(),
      category_id: selectedCategory,
      brand: brand.trim() || null,
      weight_g: isNaN(weight_g as number) ? null : weight_g,
      notes: notes.trim() || null,
      is_essential: isEssential,
    });

    setSaving(false);
    if (id) {
      setSaved(true);
      setTimeout(() => router.push("/gear"), 800);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">

      {/* ヘッダー */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/gear"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">装備を追加</h1>
          <p className="text-xs text-muted-foreground mt-0.5">新しい装備を登録します</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />{error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">

        {/* カテゴリ選択 */}
        <div className={cn(
          "rounded-xl border bg-card p-5 transition-colors",
          !selectedCategory ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
        )}>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
            カテゴリ <span className="text-red-500">*</span>
          </p>
          {!selectedCategory && (
            <p className="text-[11px] text-primary mb-3">↓ まずカテゴリを選んでください</p>
          )}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {categories.map(({ id, label, icon: Icon }) => {
              const s = categoryStyle[id];
              const isSelected = selectedCategory === id;
              return (
                <button key={id} type="button" onClick={() => setSelectedCategory(id)}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 sm:p-3 transition-all",
                    isSelected ? "border-primary bg-accent/40 shadow-sm" : "border-border bg-background hover:border-primary/30"
                  )}>
                  <div className={cn(
                    "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
                    isSelected ? s.gradient : `${s.bg} shadow-none`
                  )}>
                    <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isSelected ? "text-white" : s.text)} strokeWidth={1.75} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-medium text-foreground leading-tight text-center">
                    {label}
                  </span>
                  {isSelected && (
                    <div className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 基本情報 */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">基本情報</p>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              装備名 <span className="text-red-500">*</span>
            </label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="例：モンベル レインダンサー ジャケット"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* ブランド（サジェスト付き） */}
          <div className="relative">
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">ブランド</label>
            <input
              type="text"
              value={brandInput}
              onChange={(e) => {
                setBrandInput(e.target.value);
                setBrand(e.target.value);
                setShowBrandList(true);
              }}
              onFocus={() => setShowBrandList(true)}
              onBlur={() => setTimeout(() => setShowBrandList(false), 150)}
              placeholder="例：mont-bell、THE NORTH FACE..."
              autoComplete="off"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {showBrandList && filteredBrands.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                {filteredBrands.slice(0, 6).map((b) => (
                  <li key={b.display}>
                    <button
                      type="button"
                      onMouseDown={() => handleBrandSelect(b.display)}
                      className="w-full px-3.5 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                      {b.display}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/* よく使うブランドのクイック選択 */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["mont-bell", "THE NORTH FACE", "OSPREY", "Arc'teryx", "PETZL", "MSR"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => handleBrandSelect(b)}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                    brand === b
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">重量</label>
            <div className="flex gap-2">
              <input type="number" min={0} step={weightUnit === "g" ? 1 : 0.001}
                value={weightValue} onChange={(e) => setWeightValue(e.target.value)}
                placeholder={weightUnit === "g" ? "285" : "0.285"}
                className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <button type="button" onClick={() => setWeightUnit(weightUnit === "g" ? "kg" : "g")}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm font-semibold hover:bg-secondary transition-colors min-w-[60px]">
                {weightUnit}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">メモ</label>
            <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="例：Mサイズ / 購入日：2024-05"
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* 必須トグル */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm font-medium text-foreground">必須装備としてマーク</p>
              <p className="text-xs text-muted-foreground">AI提案時に優先的に選ばれます</p>
            </div>
            <button type="button" onClick={() => setIsEssential(!isEssential)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors duration-200",
                isEssential ? "bg-primary" : "bg-secondary border border-border"
              )}>
              <span className={cn(
                "absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-200",
                isEssential ? "left-6" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* プレビュー */}
        {selected && style && (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">プレビュー</p>
            <div className="flex items-center gap-3.5 rounded-xl border border-border bg-background p-3.5">
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm",
                style.gradient
              )}>
                <selected.icon className="h-7 w-7 text-white" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{name || "（装備名）"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {brand ? `${brand} · ` : ""}{selected.label}
                </p>
              </div>
              {isEssential && (
                <span className="shrink-0 rounded border border-red-200 bg-red-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-red-600">
                  必須
                </span>
              )}
            </div>
          </div>
        )}

        {/* 送信 */}
        <div className="flex gap-3 pt-1 pb-8">
          <Link href="/gear"
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-border bg-card py-3 text-sm font-medium hover:bg-secondary transition-colors">
            キャンセル
          </Link>
          <button type="submit" disabled={!selectedCategory || !name.trim() || saved || saving}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all duration-200",
              saved
                ? "bg-emerald-600 text-white"
                : !selectedCategory || !name.trim()
                ? "bg-primary/40 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}>
            {saved ? <><Check className="h-4 w-4" />保存しました</> : saving ? "保存中..." : "装備を登録する"}
          </button>
        </div>

      </form>
    </div>
  );
}
