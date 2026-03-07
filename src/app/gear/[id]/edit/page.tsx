"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, ChevronDown, Trash2 } from "lucide-react";
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

export default function GearEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { gearItems, updateGear, deleteGear, loading } = useGear();
  const item = gearItems.find((g) => g.id === id);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit] = useState<"g">("g");
  const [notes, setNotes] = useState("");
  const [isEssential, setIsEssential] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // データロード後にフォームを初期化（1回だけ）
  useEffect(() => {
    if (item && !initialized) {
      setSelectedCategory(item.category_id ?? "");
      setName(item.name ?? "");
      setBrand(item.brand ?? "");
      setWeightValue(item.weight_g ? String(item.weight_g) : "");
      setNotes(item.notes ?? "");
      setIsEssential(item.is_essential ?? false);
      setInitialized(true);
    }
  }, [item, initialized]);

  const selected = categories.find((c) => c.id === selectedCategory);
  const style = selectedCategory ? categoryStyle[selectedCategory] : null;

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-muted-foreground mb-4">装備が見つかりません</p>
        <Link href="/gear" className="text-sm text-primary hover:underline">マイ装備に戻る</Link>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !name.trim()) return;

    await updateGear(id, {
      name: name.trim(),
      category_id: selectedCategory,
      brand: brand.trim() || null,
      weight_g: weightValue ? parseInt(weightValue, 10) : null,
      notes: notes.trim() || null,
      is_essential: isEssential,
    });

    setSaved(true);
    setTimeout(() => router.push(`/gear/${id}`), 800);
  };

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    await deleteGear(id);
    router.push("/gear");
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">

      {/* ヘッダー */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/gear/${id}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">装備を編集</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{item.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
            confirming
              ? "border-destructive bg-destructive text-white"
              : "border-border bg-card text-destructive hover:border-destructive/40 hover:bg-destructive/5"
          )}
        >
          <Trash2 className="h-4 w-4" />
          {confirming ? "本当に削除" : "削除"}
        </button>
      </div>
      {confirming && (
        <p className="mb-4 text-center text-xs text-muted-foreground">
          もう一度押すと削除されます
          <button onClick={() => setConfirming(false)} className="ml-2 text-primary hover:underline">キャンセル</button>
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-5">

        {/* カテゴリ選択 */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            カテゴリ <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-5 gap-2">
            {categories.map(({ id: catId, label, icon: Icon }) => {
              const s = categoryStyle[catId];
              const isSelected = selectedCategory === catId;
              return (
                <button key={catId} type="button" onClick={() => setSelectedCategory(catId)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all",
                    isSelected ? "border-primary bg-accent/40 shadow-sm" : "border-border bg-background hover:border-primary/30"
                  )}>
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm",
                    isSelected ? s.gradient : `${s.bg} shadow-none`
                  )}>
                    <Icon className={cn("h-5 w-5", isSelected ? "text-white" : s.text)} strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] font-medium text-foreground leading-tight text-center">{label}</span>
                  {isSelected && (
                    <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
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
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">ブランド</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
              placeholder="例：mont-bell、OSPREY、PETZL"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">重量 (g)</label>
            <div className="flex gap-2">
              <input type="number" min={0} step={1}
                value={weightValue} onChange={(e) => setWeightValue(e.target.value)}
                placeholder="285"
                className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <div className="inline-flex items-center rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-muted-foreground">
                g
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">メモ</label>
            <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="例：Mサイズ / 購入日：2024-05"
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

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
              <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm", style.gradient)}>
                <selected.icon className="h-7 w-7 text-white" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{name || "（装備名）"}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{selected.label}</p>
              </div>
              {isEssential && (
                <span className="shrink-0 rounded border border-red-200 bg-red-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-red-600">必須</span>
              )}
            </div>
          </div>
        )}

        {/* 送信 */}
        <div className="flex gap-3 pt-1 pb-8">
          <Link href={`/gear/${id}`}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-border bg-card py-3 text-sm font-medium hover:bg-secondary transition-colors">
            キャンセル
          </Link>
          <button type="submit" disabled={!selectedCategory || !name.trim() || saved}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all duration-200",
              saved
                ? "bg-emerald-600 text-white"
                : !selectedCategory || !name.trim()
                ? "bg-primary/40 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}>
            {saved ? <><Check className="h-4 w-4" />保存しました</> : "変更を保存"}
          </button>
        </div>

      </form>
    </div>
  );
}
