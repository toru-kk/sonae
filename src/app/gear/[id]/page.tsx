"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Package, Trash2, Plus, Weight, Tag, FileText } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { useGear } from "@/hooks/useGear";
import { useState } from "react";

function formatWeight(g: number | null | undefined): string {
  if (!g) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(2).replace(/\.?0+$/, "")} kg` : `${g} g`;
}

const gradientMap: Record<string, string> = {
  shelter:    "from-orange-600 to-orange-400",
  sleeping:   "from-indigo-600 to-indigo-400",
  clothing:   "from-sky-600 to-sky-400",
  footwear:   "from-amber-600 to-amber-400",
  backpack:   "from-green-700 to-green-500",
  navigation: "from-blue-600 to-blue-400",
  safety:     "from-red-600 to-red-400",
  cooking:    "from-rose-600 to-rose-400",
  food:       "from-lime-600 to-lime-400",
  tools:      "from-slate-600 to-slate-400",
};

const categoryMap = Object.fromEntries(mockCategories.map((c) => [c.id, c]));

export default function GearDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { gearItems, deleteGear, loading } = useGear();
  const item = gearItems.find((g) => g.id === id);

  const [confirming, setConfirming] = useState(false);

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

  const category = categoryMap[item.category_id];
  const gradient = gradientMap[item.category_id] ?? "from-green-800 to-green-600";

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    await deleteGear(item.id);
    router.push("/gear");
  };

  return (
    <div className="mx-auto max-w-2xl">

      {/* ヒーローエリア */}
      <div className={`relative h-48 bg-gradient-to-br ${gradient}`}>
        <div className="absolute left-4 top-4">
          <Link
            href="/gear"
            className="inline-flex items-center gap-1.5 rounded-lg bg-black/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            マイ装備
          </Link>
        </div>
        <div className="absolute right-4 top-4">
          <Link
            href={`/gear/${item.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-black/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
          >
            <Edit className="h-4 w-4" />
            編集
          </Link>
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">
            {category && (
              <CategoryIcon
                categoryId={item.category_id}
                iconName={category.icon}
                size="lg"
                className="h-20 w-20 rounded-2xl bg-white/30"
              />
            )}
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="space-y-4 px-4 py-6 sm:px-6">

        {/* 基本情報カード */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold leading-tight text-foreground">{item.name}</h1>
              {item.brand && (
                <p className="mt-1 text-sm font-semibold text-primary">{item.brand}</p>
              )}
            </div>
            {item.is_essential && (
              <span className="shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                必須装備
              </span>
            )}
          </div>
          {category && (
            <div className="mt-4 flex items-center gap-2">
              <CategoryIcon categoryId={item.category_id} iconName={category.icon} size="sm" />
              <span className="text-sm font-medium text-foreground">{category.name_ja}</span>
            </div>
          )}
        </div>

        {/* スペックカード */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-foreground">スペック</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Weight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">重量</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{formatWeight(item.weight_g)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Tag className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">カテゴリ</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{category?.name_ja ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ブランド</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{item.brand || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">メモ</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{item.notes || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* パッケージに追加 */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-1 text-sm font-bold text-foreground">パッケージ</h2>
          <p className="mb-4 text-xs text-muted-foreground">この装備をパッケージに追加できます</p>
          <Link
            href="/packages/new"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-secondary/70 transition-all"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-4 w-4 text-primary" />
            </div>
            新しいパッケージを作成
          </Link>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3 pb-8">
          <Link
            href="/packages/new"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            パッケージに追加
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
              confirming
                ? "border-destructive bg-destructive text-white"
                : "border-border bg-card text-destructive hover:border-destructive/40 hover:bg-destructive/5"
            }`}
          >
            <Trash2 className="h-4 w-4" />
            {confirming ? "本当に削除" : "削除"}
          </button>
        </div>

        {confirming && (
          <p className="text-center text-xs text-muted-foreground -mt-4 pb-4">
            もう一度「本当に削除」を押すと削除されます
            <button onClick={() => setConfirming(false)} className="ml-2 text-primary hover:underline">キャンセル</button>
          </p>
        )}

      </div>
    </div>
  );
}
