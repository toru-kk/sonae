"use client";

import Link from "next/link";
import { Plus, Sparkles, Weight, ChevronRight, Globe, Lock, Share2, Check, AlertTriangle, ClipboardCheck, X } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockCategories } from "@/lib/mock-data";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { usePackages } from "@/hooks/usePackages";
import { useGear } from "@/hooks/useGear";

const categoryMap = Object.fromEntries(mockCategories.map((c) => [c.id, c]));

export default function PackagesPage() {
  const router = useRouter();
  const { packages, loading, updatePackage } = usePackages();
  const { gearItems } = useGear();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(true);

  useEffect(() => {
    setNudgeDismissed(!!localStorage.getItem("nudge-pkg-to-checklist-dismissed"));
  }, []);

  const handleShare = useCallback(async (e: React.MouseEvent, pkgId: string, pkgName: string, isPublic: boolean) => {
    e.preventDefault();
    if (!isPublic) await updatePackage(pkgId, { is_public: true });
    const url = `${window.location.origin}/packages/${pkgId}/public`;
    if (navigator.share) {
      await navigator.share({ title: pkgName, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopiedId(pkgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, [updatePackage]);

  const gearMap = Object.fromEntries(gearItems.map((g) => [g.id, g]));

  function groupByCategory(itemIds: string[]) {
    const counts: Record<string, number> = {};
    itemIds.forEach((id) => {
      const g = gearMap[id];
      if (!g) return;
      counts[g.category_id] = (counts[g.category_id] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([catId, count]) => ({ cat: categoryMap[catId], count }))
      .filter((x) => x.cat)
      .sort((a, b) => (a.cat?.sort_order ?? 0) - (b.cat?.sort_order ?? 0));
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">

      {/* ブランドヘッダー */}
      <div className="mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 pt-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] px-5 py-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <SonaeLogoIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-lg font-black text-white whitespace-nowrap">パッケージ</h1>
                  <span className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Sonae</span>
                </div>
                <p className="text-xs text-white/50">
                  {loading ? "読み込み中..." : `${packages.length} セット`}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link href="/ai-suggest"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AIで作成</span>
                <span className="sm:hidden">AI</span>
              </Link>
              <Link href="/packages/new"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">新規作成</span>
                <span className="sm:hidden">新規</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* チェックリスト誘導バナー */}
      {!nudgeDismissed && packages.length >= 1 && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <ClipboardCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">荷造りチェックを試してみよう</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              パッケージを開いて「荷造りチェック」を押すと、出発前のチェックリストが使えます。装備の忘れものをゼロに。
            </p>
            <button
              onClick={() => { const pkg = packages[0]; if (pkg) window.location.href = `/packages/${pkg.id}/checklist`; }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <ClipboardCheck className="h-3.5 w-3.5" />
              チェックリストを開く
            </button>
          </div>
          <button
            onClick={() => { localStorage.setItem("nudge-pkg-to-checklist-dismissed", "1"); setNudgeDismissed(true); }}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Freeプラン上限警告 */}
      {packages.length >= 3 ? (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-800">Freeプランの上限に達しました</p>
            <p className="text-xs text-red-700 mt-0.5">パッケージ3つまで。Standardプランで20セットまで作成できます。</p>
            <Link href="/pricing" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors">
              Standardプランへ →
            </Link>
          </div>
        </div>
      ) : packages.length === 2 && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800">Freeプランの上限まで残り 1 セット</p>
            <p className="text-xs text-amber-700 mt-0.5">Freeプランはパッケージ3つまで。Standardプランで20セットまで作れます。</p>
            <Link href="/pricing" className="mt-2 inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors">
              プランを確認する →
            </Link>
          </div>
        </div>
      )}

      {/* 空状態 */}
      {packages.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground mb-4">パッケージがまだありません</p>
          <Link href="/packages/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            最初のパッケージを作成
          </Link>
        </div>
      )}

      {/* パッケージ一覧 */}
      <div className="space-y-4">
        {packages.map((pkg) => {
          const items = pkg.item_ids.map((id) => gearMap[id]).filter(Boolean);
          const essentialCount = items.filter((i) => i.is_essential).length;
          const totalWeight = items.reduce((sum, i) => sum + (i.weight_g ?? 0), 0);
          const catGroups = groupByCategory(pkg.item_ids);

          return (
            <Link key={pkg.id} href={`/packages/${pkg.id}`}
              className="block rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all overflow-hidden">

              {/* カードヘッダー */}
              <div className="flex items-start gap-5 p-5 pb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-bold text-foreground">{pkg.name}</h2>
                    {pkg.is_public
                      ? <span
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(`/packages/${pkg.id}/public`, "_blank"); }}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer">
                          <Globe className="h-2.5 w-2.5" />公開中 ↗
                        </span>
                      : <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          <Lock className="h-2.5 w-2.5" />非公開
                        </span>
                    }
                  </div>
                  {pkg.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                  )}
                  {pkg.mountain_type && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-border bg-accent/50 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {pkg.mountain_type}
                      </span>
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-2xl font-bold text-foreground tabular-nums">
                      {(totalWeight / 1000).toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">kg</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {items.length} 点 / 必須 {essentialCount} 点
                  </p>
                  {totalWeight > 0 && <ULScore weightG={totalWeight} className="mt-1 justify-end" />}
                </div>
              </div>

              {/* 重量バー */}
              <div className="px-5 pb-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, (totalWeight / 8000) * 100)}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>0 kg</span>
                  <span className="flex items-center gap-1">
                    <Weight className="h-3 w-3" />
                    目安 8 kg 以内
                  </span>
                </div>
              </div>

              {/* カテゴリ別件数 */}
              {catGroups.length > 0 && (
                <div className="border-t border-border px-5 py-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {catGroups.map(({ cat, count }) => (
                      <span key={cat!.id} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <CategoryIcon categoryId={cat!.id} iconName={cat!.icon} size="sm" className="h-4 w-4 rounded-md" />
                        {cat!.name_ja}
                        <span className="font-medium text-foreground">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* フッターアクション */}
              <div className="flex items-center justify-between border-t border-border px-5 py-3 bg-secondary/30">
                <button
                  onClick={(e) => handleShare(e, pkg.id, pkg.name, pkg.is_public)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground">
                  {copiedId === pkg.id
                    ? <><Check className="h-3.5 w-3.5 text-emerald-600" /><span className="text-emerald-600">リンクをコピーしました</span></>
                    : <><Share2 className="h-3.5 w-3.5" />シェアする</>
                  }
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/packages/${pkg.id}/edit`); }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                    編集
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/packages/${pkg.id}/checklist`); }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                    荷造りチェック
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
