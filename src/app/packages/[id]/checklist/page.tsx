"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronLeft, Weight, Package, AlertCircle, CheckCheck, RotateCcw, Save, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { usePackages } from "@/hooks/usePackages";
import { useGear } from "@/hooks/useGear";
import type { GearItem } from "@/types/gear";

const CATEGORY_META: Record<string, { name_ja: string; icon: string; sort_order: number }> = {
  shelter:    { name_ja: "シェルター",   icon: "Tent",        sort_order: 1 },
  sleeping:   { name_ja: "シュラフ",     icon: "BedDouble",   sort_order: 2 },
  clothing:   { name_ja: "衣類",         icon: "Shirt",       sort_order: 3 },
  footwear:   { name_ja: "靴・足回り",   icon: "Footprints",  sort_order: 4 },
  backpack:   { name_ja: "バックパック", icon: "Backpack",    sort_order: 5 },
  navigation: { name_ja: "ナビ",         icon: "Compass",     sort_order: 6 },
  safety:     { name_ja: "安全装備",     icon: "ShieldCheck", sort_order: 7 },
  cooking:    { name_ja: "調理",         icon: "Flame",       sort_order: 8 },
  food:       { name_ja: "食料",         icon: "Apple",       sort_order: 9 },
  tools:      { name_ja: "道具・他",     icon: "Wrench",      sort_order: 10 },
};

function formatWeight(g: number | null): string {
  if (g === null) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

export default function ChecklistPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { packages, loading: pkgLoading } = usePackages();
  const { gearItems, loading: gearLoading } = useGear();

  // localStorage から復元
  const storageKey = `checklist-${id}`;
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const pkg = packages.find((p) => p.id === id);
  const gearMap = Object.fromEntries(gearItems.map((g) => [g.id, g]));
  const items: GearItem[] = (pkg?.item_ids ?? []).map((iid) => gearMap[iid]).filter(Boolean);

  // チェック変更時に自動保存
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds, storageKey]);

  const toggleCheck = (itemId: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId); else next.add(itemId);
      return next;
    });
  };

  const checkAll = () => setCheckedIds(new Set(items.map((i) => i.id)));
  const resetAll = () => {
    setCheckedIds(new Set());
    localStorage.removeItem(storageKey);
  };

  // 出発日
  const departureDateKey = `checklist-departure-${id}`;
  const [departureDate, setDepartureDate] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(departureDateKey) ?? "";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (departureDate) localStorage.setItem(departureDateKey, departureDate);
    else localStorage.removeItem(departureDateKey);
  }, [departureDate, departureDateKey]);

  const daysUntilDeparture = useMemo(() => {
    if (!departureDate) return null;
    const diff = new Date(departureDate).setHours(0,0,0,0) - new Date().setHours(0,0,0,0);
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }, [departureDate]);

  // 折りたたみ
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const toggleCat = (catId: string) => {
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId); else next.add(catId);
      return next;
    });
  };

  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.push(`/packages/${id}`), 800);
  };

  const [celebrating, setCelebrating] = useState(false);
  const handleComplete = () => {
    setCelebrating(true);
    setTimeout(() => {
      localStorage.removeItem(storageKey);
      router.push(`/packages/${id}`);
    }, 2600);
  };

  const totalCount = items.length;
  const checkedCount = checkedIds.size;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  const isAllChecked = totalCount > 0 && checkedCount === totalCount;
  const totalWeight = items.reduce((sum, item) => sum + (item.weight_g ?? 0), 0);
  const checkedWeight = items.filter((item) => checkedIds.has(item.id)).reduce((sum, item) => sum + (item.weight_g ?? 0), 0);
  const uncheckedEssentials = items.filter((item) => item.is_essential && !checkedIds.has(item.id));

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, { catMeta: typeof CATEGORY_META[string]; essential: GearItem[]; regular: GearItem[] }> = {};
    for (const item of items) {
      const catMeta = CATEGORY_META[item.category_id];
      if (!catMeta) continue;
      if (!groups[item.category_id]) groups[item.category_id] = { catMeta, essential: [], regular: [] };
      if (item.is_essential) groups[item.category_id].essential.push(item);
      else groups[item.category_id].regular.push(item);
    }
    return Object.entries(groups)
      .map(([catId, g]) => ({ catId, ...g }))
      .sort((a, b) => a.catMeta.sort_order - b.catMeta.sort_order);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, pkg?.id]);

  if (pkgLoading || gearLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-400 text-sm animate-pulse">読み込み中...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <AlertCircle className="mx-auto h-10 w-10 text-stone-300" />
          <p className="text-stone-500 text-sm">パッケージが見つかりません</p>
          <Link href="/packages" className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            <ChevronLeft className="h-4 w-4" />パッケージ一覧へ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    {celebrating && (
      <>
        <style>{`
          @keyframes cl-in   { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
          @keyframes cl-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes cl-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
          @keyframes cl-spark { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 40% { opacity: 1; } 100% { opacity: 0; transform: scale(1.8) rotate(200deg); } }
          @keyframes cl-fade-out { 0%,70% { opacity: 1; } 100% { opacity: 0; } }
        `}</style>
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #03080d 0%, #071d13 45%, #185535 100%)",
            animation: "cl-in 0.35s ease-out both, cl-fade-out 2.6s ease-in-out both",
          }}
        >
          {/* パーティクル */}
          {[
            { top: "15%", left: "12%", size: 6,  delay: "0.3s",  dur: "1.4s" },
            { top: "20%", left: "80%", size: 8,  delay: "0.5s",  dur: "1.2s" },
            { top: "70%", left: "8%",  size: 5,  delay: "0.7s",  dur: "1.6s" },
            { top: "65%", left: "85%", size: 7,  delay: "0.4s",  dur: "1.3s" },
            { top: "40%", left: "5%",  size: 4,  delay: "0.9s",  dur: "1.5s" },
            { top: "35%", left: "90%", size: 5,  delay: "0.2s",  dur: "1.4s" },
            { top: "80%", left: "50%", size: 6,  delay: "0.6s",  dur: "1.2s" },
            { top: "10%", left: "50%", size: 4,  delay: "0.8s",  dur: "1.6s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400/70"
              style={{
                top: p.top, left: p.left,
                width: p.size, height: p.size,
                animation: `cl-spark ${p.dur} ${p.delay} ease-out both`,
              }}
            />
          ))}

          {/* 山アイコン */}
          <div style={{ animation: "cl-rise 0.5s 0.15s ease-out both, cl-float 3s 0.7s ease-in-out infinite" }}>
            <svg width="96" height="72" viewBox="0 0 96 72" fill="none">
              <path d="M6 66 Q16 66 28 36 Q36 54 42 52 Q50 32 58 8 Q66 32 88 66 Z" fill="white" opacity="0.15" />
              <path d="M6 66 Q16 66 28 36 Q36 54 42 52 Q50 32 58 8 Q66 32 88 66 Z" fill="white" opacity="0.85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <circle cx="58" cy="8" r="5" fill="#f59e0b" opacity="0.9" />
              <circle cx="58" cy="8" r="9" fill="#f59e0b" opacity="0.25" />
            </svg>
          </div>

          {/* メッセージ */}
          <div className="mt-8 text-center px-8" style={{ animation: "cl-rise 0.5s 0.35s ease-out both" }}>
            <p className="text-4xl font-black tracking-tight text-white leading-none">
              よい登山を！
            </p>
            <p className="mt-3 text-emerald-300 text-sm font-medium">
              {pkg.name}の荷造り完了
            </p>
            <p className="mt-1 text-white/40 text-xs tabular-nums">
              全{totalCount}点 · {formatWeight(totalWeight)}
            </p>
          </div>

          {/* ブランド */}
          <div
            className="absolute bottom-10 flex items-center gap-2 opacity-40"
            style={{ animation: "cl-rise 0.5s 0.55s ease-out both" }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z" fill="white" />
              <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
            </svg>
            <span className="text-white text-xs font-bold tracking-widest">Sonae</span>
          </div>
        </div>
      </>
    )}
    <div className="min-h-screen bg-stone-50">
      {/* スティッキーヘッダー */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href={`/packages/${id}`} className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 transition-colors">
              <ChevronLeft className="h-4 w-4" />戻る
            </Link>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm font-semibold text-stone-800 truncate max-w-[160px]">{pkg.name}</span>
            </div>
            <span className="text-sm font-medium tabular-nums">
              <span className="text-primary">{checkedCount}</span>
              <span className="text-stone-400"> / {totalCount}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-40 space-y-4">

        {/* 進捗カード */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {/* プログレスバー */}
          <div className="h-1.5 bg-stone-100">
            <div
              className={cn("h-full transition-all duration-700 ease-out", isAllChecked ? "bg-emerald-500" : "bg-primary")}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-stone-800 tabular-nums">{progressPercent}<span className="text-base font-medium text-stone-400">%</span></p>
                <p className="text-xs text-stone-400 mt-0.5">
                  {formatWeight(checkedWeight)} / {formatWeight(totalWeight)}
                </p>
              </div>
              <div className="flex gap-2">
                {!isAllChecked && (
                  <button onClick={checkAll}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                    <CheckCheck className="h-3.5 w-3.5" />すべてチェック
                  </button>
                )}
                <button onClick={resetAll} disabled={checkedCount === 0}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                    checkedCount > 0
                      ? "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                      : "border-stone-100 text-stone-300 cursor-not-allowed"
                  )}>
                  <RotateCcw className="h-3.5 w-3.5" />リセット
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 出発日カード */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-stone-700">出発日</span>
            {daysUntilDeparture !== null && (
              <span className={cn(
                "ml-auto text-sm font-bold tabular-nums",
                daysUntilDeparture < 0 ? "text-stone-400" :
                daysUntilDeparture === 0 ? "text-emerald-600" :
                daysUntilDeparture <= 3 ? "text-amber-600" : "text-primary"
              )}>
                {daysUntilDeparture < 0 ? "出発済み" :
                 daysUntilDeparture === 0 ? "今日出発！" :
                 `あと ${daysUntilDeparture} 日`}
              </span>
            )}
          </div>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* 未チェック必須アイテム警告 */}
        {uncheckedEssentials.length > 0 && !isAllChecked && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-700">
                  必須装備 {uncheckedEssentials.length} 点が未確認
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {uncheckedEssentials.slice(0, 4).map((item) => (
                    <li key={item.id} className="text-xs text-amber-600">· {item.name}</li>
                  ))}
                  {uncheckedEssentials.length > 4 && (
                    <li className="text-xs text-amber-500">他 {uncheckedEssentials.length - 4} 点</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* チェックリスト本体 */}
        <div className="space-y-4">
          {groupedByCategory.map(({ catId, catMeta, essential, regular }) => {
            const allItems = [...essential, ...regular];
            const catChecked = allItems.filter((i) => checkedIds.has(i.id)).length;
            const catDone = catChecked === allItems.length;
            const isCollapsed = collapsedCats.has(catId);
            return (
              <section key={catId}>
                <button
                  onClick={() => toggleCat(catId)}
                  className="w-full flex items-center gap-2 mb-2 px-1 text-left"
                >
                  <CategoryIcon categoryId={catId} iconName={catMeta.icon} size="sm" />
                  <h2 className={cn("text-sm font-semibold transition-colors", catDone ? "text-emerald-600" : "text-stone-600")}>
                    {catMeta.name_ja}
                  </h2>
                  {catDone && <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} />}
                  <span className="text-xs text-stone-400 ml-auto tabular-nums">{catChecked} / {allItems.length}</span>
                  {isCollapsed
                    ? <ChevronDown className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                    : <ChevronUp className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                  }
                </button>
                {!isCollapsed && (
                <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-sm">
                  {allItems.map((item) => {
                    const checked = checkedIds.has(item.id);
                    return (
                      <button key={item.id} onClick={() => toggleCheck(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all",
                          checked ? "bg-emerald-50/60" : "hover:bg-stone-50 active:bg-stone-100"
                        )}>
                        {/* チェックボックス */}
                        <div className={cn(
                          "shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                          checked ? "bg-emerald-500 border-emerald-500" : "bg-white border-stone-300"
                        )}>
                          {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </div>

                        {/* アイテム情報 */}
                        <div className={cn("flex-1 min-w-0 transition-opacity", checked && "opacity-50")}>
                          <div className="flex items-center gap-2">
                            <span className={cn("text-sm font-medium text-stone-800 transition-all", checked && "line-through text-stone-400")}>
                              {item.name}
                            </span>
                            {item.is_essential && !checked && (
                              <span className="inline-flex items-center shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-500 border border-red-100">必須</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.brand && <span className="text-xs text-stone-400 truncate">{item.brand}</span>}
                            {item.weight_g != null && item.brand && <span className="text-stone-300 text-xs">·</span>}
                            {item.weight_g != null && (
                              <span className="text-xs text-stone-400">{formatWeight(item.weight_g)}</span>
                            )}
                          </div>
                        </div>

                        {/* チェック済みアイコン */}
                        {checked && <Check className="shrink-0 h-4 w-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* フッター */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {isAllChecked ? (
            /* 全完了 → 出発OKバナー */
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-700">準備完了！</p>
                  <p className="text-xs text-emerald-600">全 {totalCount} 点 · {formatWeight(totalWeight)} を確認しました</p>
                </div>
              </div>
              <button onClick={handleComplete}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">
                出発準備OK ✓ パッケージへ戻る
              </button>
            </div>
          ) : (
            /* 進行中 → 重量 + 一時保存ボタン */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-400">チェック済み重量</p>
                  <p className="text-sm font-semibold text-stone-700 tabular-nums">
                    {formatWeight(checkedWeight)}
                    <span className="text-xs font-normal text-stone-400 ml-1">/ {formatWeight(totalWeight)}</span>
                  </p>
                </div>
                <p className="text-xs text-stone-400">
                  残り <span className="font-semibold text-stone-600">{totalCount - checkedCount}</span> 点
                </p>
              </div>
              <button onClick={handleSave} disabled={saved}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                  saved
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-stone-800 text-white hover:bg-stone-900"
                )}>
                {saved ? (
                  <><Check className="h-4 w-4" strokeWidth={2.5} />保存しました</>
                ) : (
                  <><Save className="h-4 w-4" />一時保存して戻る</>
                )}
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
    </>
  );
}
