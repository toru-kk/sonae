"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Plus, Weight, Search, ChevronRight, X, AlertTriangle, Layers } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { useGear } from "@/hooks/useGear";
import { cn } from "@/lib/utils";
import { SonaeLogoIcon } from "@/components/SonaeLogo";

function formatWeight(g: number | null) {
  if (!g) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

export default function GearPage() {
  const { gearItems, loading } = useGear();
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [nudgeDismissed, setNudgeDismissed] = useState(true);

  useEffect(() => {
    setNudgeDismissed(!!localStorage.getItem("nudge-gear-to-package-dismissed"));
  }, []);

  const categoryMap = Object.fromEntries(mockCategories.map((c) => [c.id, c]));
  const totalWeight = gearItems.reduce((s, g) => s + (g.weight_g ?? 0), 0);
  const essentialCount = gearItems.filter((g) => g.is_essential).length;

  const filtered = useMemo(() => {
    return gearItems.filter((g) => {
      const matchQuery = query === "" ||
        g.name.toLowerCase().includes(query.toLowerCase());
      const matchCat = filterCat === "" || g.category_id === filterCat;
      return matchQuery && matchCat;
    });
  }, [gearItems, query, filterCat]);

  const grouped = mockCategories
    .map((cat) => ({ ...cat, items: filtered.filter((g) => g.category_id === cat.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">

      {/* ブランドヘッダー */}
      <div className="sticky top-0 z-10 mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 pt-1 bg-background/80 backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] px-5 py-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg font-black text-white">マイ装備</h1>
                <span className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Sonae</span>
              </div>
              <p className="text-xs text-white/50">
                {loading ? "読み込み中..." : (
                  <>
                    <span className={gearItems.length >= 25 ? "text-amber-400 font-semibold" : ""}>
                      {gearItems.length}
                    </span>
                    <span className="text-white/30"> / 30点</span>
                    {` · 合計 ${formatWeight(totalWeight)} · 必須 ${essentialCount} 点`}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/gear/presets"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/15 transition-colors backdrop-blur-sm">
              <span className="hidden sm:inline">定番から追加</span>
              <span className="sm:hidden">定番</span>
            </Link>
            <Link href="/gear/new"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">装備を追加</span>
              <span className="sm:hidden">追加</span>
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* パッケージ誘導バナー */}
      {!loading && !nudgeDismissed && gearItems.length >= 1 && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <Layers className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-800">次はパッケージを作ろう</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              装備をまとめて「北アルプスセット」などのパッケージを作ると、荷造りチェックリストが使えます。
            </p>
            <Link href="/packages/new" className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
              <Layers className="h-3.5 w-3.5" />
              パッケージを作成
            </Link>
          </div>
          <button
            onClick={() => { localStorage.setItem("nudge-gear-to-package-dismissed", "1"); setNudgeDismissed(true); }}
            className="shrink-0 text-emerald-400 hover:text-emerald-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Freeプラン上限警告 */}
      {!loading && gearItems.length >= 30 ? (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-800">Freeプランの上限に達しました</p>
            <p className="text-xs text-red-700 mt-0.5">装備30点まで。Standardプランで200点まで登録できます。</p>
            <Link href="/pricing" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors">
              Standardプランへ →
            </Link>
          </div>
        </div>
      ) : !loading && gearItems.length >= 25 && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800">Freeプランの上限まで残り {30 - gearItems.length} 点</p>
            <p className="text-xs text-amber-700 mt-0.5">Freeプランは装備30点まで。Standardプランで200点まで登録できます。</p>
            <Link href="/pricing" className="mt-2 inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors">
              プランを確認する →
            </Link>
          </div>
        </div>
      )}

      {/* 検索 + カテゴリフィルター */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="装備名で検索..."
            className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* カテゴリタブ */}
      <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterCat("")}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            filterCat === ""
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          )}>
          すべて
        </button>
        {mockCategories.map((cat) => {
          const count = gearItems.filter((g) => g.category_id === cat.id).length;
          if (count === 0) return null;
          return (
            <button key={cat.id}
              onClick={() => setFilterCat(filterCat === cat.id ? "" : cat.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                filterCat === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}>
              {cat.name_ja}
              <span className={cn("rounded-full px-1.5 py-px text-[10px] font-bold",
                filterCat === cat.id ? "bg-white/20" : "bg-secondary")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 重量サマリー */}
      {filterCat === "" && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Weight className="h-4 w-4 text-primary" />
              総重量
            </span>
            <span className="text-sm font-bold text-foreground">{formatWeight(totalWeight)}</span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
            {mockCategories.map((cat, idx) => {
              const w = gearItems.filter((g) => g.category_id === cat.id).reduce((s, g) => s + (g.weight_g ?? 0), 0);
              const pct = totalWeight > 0 ? (w / totalWeight) * 100 : 0;
              const colors = ["bg-orange-400","bg-violet-400","bg-sky-400","bg-amber-400",
                "bg-emerald-500","bg-blue-400","bg-red-400","bg-rose-400","bg-lime-400","bg-slate-400"];
              if (pct === 0) return null;
              return <div key={cat.id} style={{ width: `${pct}%` }}
                className={`h-full ${colors[idx % colors.length]}`} title={`${cat.name_ja}: ${formatWeight(w)}`} />;
            })}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
            {mockCategories.map((cat) => {
              const w = gearItems.filter((g) => g.category_id === cat.id).reduce((s, g) => s + (g.weight_g ?? 0), 0);
              if (w === 0) return null;
              return (
                <span key={cat.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CategoryIcon categoryId={cat.id} iconName={cat.icon} size="xs" />
                  {cat.name_ja}
                  <span className="font-semibold text-foreground">{formatWeight(w)}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ローディング */}
      {loading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      )}

      {/* 結果なし */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          {query ? (
            <p className="text-muted-foreground">「{query}」に一致する装備が見つかりません</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground mb-1">装備を登録して始めよう</p>
              <p className="text-xs text-muted-foreground mb-5">テント・シュラフ・ウェアなど持っている装備を登録すると、AIが最適なセットを提案してくれます</p>
              <div className="flex flex-wrap justify-center gap-2 mb-5 text-xs text-muted-foreground">
                {["テント", "シュラフ", "レインウェア", "登山靴", "ヘッドランプ", "ファーストエイドキット"].map((ex) => (
                  <span key={ex} className="rounded-full border border-border bg-background px-3 py-1">{ex}</span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/gear/new"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  <Plus className="h-4 w-4" />
                  装備を追加
                </Link>
                <Link href="/gear/presets"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                  定番から一括追加
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* カテゴリ別リスト */}
      {!loading && (
        <div className="space-y-8">
          {grouped.map((cat) => (
            <div key={cat.id}>
              <div className="mb-3 flex items-center gap-3">
                <CategoryIcon categoryId={cat.id} iconName={cat.icon} size="sm" />
                <h2 className="text-sm font-bold text-foreground">{cat.name_ja}</h2>
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">{cat.items.length} 点</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <Link key={item.id} href={`/gear/${item.id}`}
                    className="group flex items-center gap-3.5 rounded-xl border border-border bg-card p-3.5 hover:border-primary/40 hover:shadow-sm transition-all">
                    <CategoryIcon
                      categoryId={item.category_id}
                      iconName={categoryMap[item.category_id]?.icon}
                      size="lg"
                      variant="gradient"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        <p className="text-sm font-semibold text-foreground leading-snug truncate">{item.name}</p>
                        {item.is_essential && (
                          <span className="shrink-0 mt-0.5 rounded border border-red-200 bg-red-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-red-600">必須</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {[item.brand, item.notes].filter(Boolean).join(" · ") || "—"}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm font-bold text-foreground tabular-nums">{formatWeight(item.weight_g)}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
