"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Globe, Trash2, Share2, Check, ExternalLink } from "lucide-react";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { useGear } from "@/hooks/useGear";
import { usePackages } from "@/hooks/usePackages";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CATEGORY_META: Record<string, { name_ja: string; icon: string; sort_order: number }> = {
  shelter:    { name_ja: "シェルター",   icon: "⛺", sort_order: 1 },
  sleeping:   { name_ja: "シュラフ",     icon: "🛏",  sort_order: 2 },
  clothing:   { name_ja: "衣類",         icon: "👕",  sort_order: 3 },
  footwear:   { name_ja: "靴・足回り",   icon: "👟",  sort_order: 4 },
  backpack:   { name_ja: "バックパック", icon: "🎒",  sort_order: 5 },
  navigation: { name_ja: "ナビ",         icon: "🗺️",  sort_order: 6 },
  safety:     { name_ja: "安全装備",     icon: "🦺",  sort_order: 7 },
  cooking:    { name_ja: "調理",         icon: "🍳",  sort_order: 8 },
  food:       { name_ja: "食料",         icon: "🍫",  sort_order: 9 },
  tools:      { name_ja: "道具・他",     icon: "🔧",  sort_order: 10 },
};

function formatWeight(g: number | null) {
  if (!g) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { packages, loading: pkgLoading, deletePackage, updatePackage } = usePackages();
  const { gearItems, loading: gearLoading } = useGear();
  const [confirming, setConfirming] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null }>({ display_name: null, avatar_url: null });

  useEffect(() => {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row } = await (supabase as any).from("users").select("display_name, avatar_url").eq("id", data.user.id).single();
      setProfile({
        display_name: row?.display_name ?? data.user.user_metadata?.display_name ?? null,
        avatar_url: row?.avatar_url ?? null,
      });
    });
  }, []);

  const pkg = packages.find((p) => p.id === id);
  const gearMap = Object.fromEntries(gearItems.map((g) => [g.id, g]));

  // localStorageから荷造り進捗を読み込む
  useEffect(() => {
    if (!pkg) return;
    try {
      const saved = localStorage.getItem(`checklist-${id}`);
      if (!saved) { setChecklistProgress(null); return; }
      const checkedIds: string[] = JSON.parse(saved);
      const total = pkg.item_ids.length;
      if (total === 0) { setChecklistProgress(null); return; }
      setChecklistProgress(Math.round((checkedIds.length / total) * 100));
    } catch { setChecklistProgress(null); }
  }, [id, pkg]);

  if (pkgLoading || gearLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />パッケージ
        </Link>
        <p className="mt-8 text-center text-muted-foreground">パッケージが見つかりません</p>
      </div>
    );
  }

  const items = pkg.item_ids.map((iid) => gearMap[iid]).filter(Boolean);
  const totalWeight = items.reduce((sum, i) => sum + (i.weight_g ?? 0), 0);

  const categoryGroups = (() => {
    const groups: Record<string, typeof items> = {};
    items.forEach((item) => {
      if (!groups[item.category_id]) groups[item.category_id] = [];
      groups[item.category_id].push(item);
    });
    return Object.entries(groups)
      .map(([catId, catItems]) => ({ cat: CATEGORY_META[catId], catId, items: catItems }))
      .filter((x) => x.cat)
      .sort((a, b) => (a.cat?.sort_order ?? 0) - (b.cat?.sort_order ?? 0));
  })();

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/packages/${pkg?.id}/public`
    : "";

  const doShare = async () => {
    const url = `${window.location.origin}/packages/${pkg.id}/public`;
    if (navigator.share) {
      await navigator.share({ title: pkg.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!pkg.is_public) {
      setShowPublishConfirm(true);
      return;
    }
    await doShare();
  };

  const handlePublishAndShare = async () => {
    await updatePackage(pkg.id, { is_public: true });
    setShowPublishConfirm(false);
    await doShare();
  };

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    await deletePackage(pkg.id);
    router.push("/packages");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />パッケージ
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground">{pkg.name}</h1>
          {pkg.description && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
          )}
          {pkg.mountain_type && (
            <div className="mt-2">
              <span className="rounded-full bg-accent/50 px-3 py-1 text-xs font-medium text-primary">{pkg.mountain_type}</span>
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="text-3xl font-bold text-foreground tabular-nums">{formatWeight(totalWeight)}</span>
          <p className="mt-0.5 text-sm text-muted-foreground">{items.length} 点</p>
        </div>
      </div>

      {/* 公開確認ダイアログ */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-base font-bold text-foreground mb-1">このパッケージを公開しますか？</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              公開すると「みんなの装備」に表示され、リンクを知っている人なら誰でも閲覧できます。後から非公開に戻すことも可能です。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishConfirm(false)}
                className="flex-1 rounded-xl border border-border bg-background py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                キャンセル
              </button>
              <button
                onClick={handlePublishAndShare}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                公開してシェア
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 共有ボックス */}
      {pkg.is_public ? (
        <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
          {/* シェアカードプレビュー（HTMLレンダリング） */}
          <div className="p-4 pb-3">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              XやLINEでシェアするとこのカードが表示されます
            </p>
            <Link href={`/packages/${pkg.id}/public`} target="_blank" className="block group">
              <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] px-5 py-4 group-hover:opacity-90 transition-opacity">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                    <SonaeLogoIcon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Sonae · 備え・登山装備管理</p>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {pkg.mountain_type && (
                      <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-300 mb-2">
                        {pkg.mountain_type}
                      </span>
                    )}
                    <p className="text-lg font-black text-white leading-tight line-clamp-2">{pkg.name}</p>
                    {pkg.description && (
                      <p className="mt-1 text-[11px] text-white/50 line-clamp-1">{pkg.description}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-black text-white tabular-nums">{formatWeight(totalWeight)}</p>
                    <p className="text-[11px] text-white/40">{items.length} 点</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (totalWeight / 12000) * 100)}%` }} />
                  </div>
                  {profile.display_name && (
                    <div className="shrink-0 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 pl-1 pr-2.5 py-1">
                      {profile.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={profile.avatar_url} alt="" className="h-4 w-4 rounded-full object-cover" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] flex items-center justify-center text-[8px] font-black text-white">
                          {profile.display_name.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <span className="text-[10px] font-semibold text-white/60">{profile.display_name}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* SNSシェアボタン群 */}
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            <button onClick={handleShare}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 border",
                copied
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
              )}>
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? "リンクをコピーしました！" : "リンクをコピー"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(publicUrl)}&text=${encodeURIComponent(`${pkg.name}の装備セット（${formatWeight(totalWeight)}） | Sonae`)}`}
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors">
              𝕏 でシェア
            </a>
            <a
              href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(publicUrl)}`}
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-green-300 bg-[#06C755] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#05a848] transition-colors">
              LINE
            </a>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-dashed border-border bg-secondary/20 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Share2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">このセットを他の登山者にシェアしよう</p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                公開リンクを作成すると、XやLINEでシェアできる専用カードが生成されます。ログイン不要で誰でも閲覧できます。
              </p>
              <button onClick={handleShare}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                <Globe className="h-4 w-4" />
                公開リンクを作成してシェア
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6 mb-8">
        {categoryGroups.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-10 text-center">
            <p className="text-sm text-muted-foreground">装備が登録されていません</p>
          </div>
        )}
        {categoryGroups.map(({ cat, catId, items: catItems }) => (
          <div key={catId}>
            <div className="mb-2 flex items-center gap-2">
              <CategoryIcon categoryId={catId} iconName={cat.icon} size="sm" className="h-5 w-5 rounded-md" />
              <h2 className="text-sm font-semibold text-foreground">{cat.name_ja}</h2>
              <span className="text-xs text-muted-foreground">{catItems.length} 点</span>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {catItems.map((item, idx) => (
                <Link key={item.id} href={`/gear/${item.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors",
                    idx < catItems.length - 1 && "border-b border-border"
                  )}>
                  <CategoryIcon categoryId={item.category_id} iconName={CATEGORY_META[item.category_id]?.icon} size="md" variant="gradient" className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    {item.brand && <p className="text-xs text-muted-foreground">{item.brand}</p>}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground tabular-nums">{formatWeight(item.weight_g)}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Link href={`/packages/${pkg.id}/checklist`}
          className="block w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors overflow-hidden">
          {checklistProgress !== null && checklistProgress > 0 ? (
            <div className="relative px-4 py-3.5">
              <div
                className="absolute inset-0 bg-white/15 transition-all duration-500"
                style={{ width: `${checklistProgress}%` }}
              />
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-sm font-semibold">荷造りチェック</span>
                <span className="text-xs font-bold opacity-90 tabular-nums">{checklistProgress}%</span>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3.5 flex items-center justify-center text-sm font-semibold">
              荷造りチェック
            </div>
          )}
        </Link>
        <div className="flex gap-2">
          <Link href={`/packages/${pkg.id}/edit`}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            パッケージを編集
          </Link>
          <button onClick={handleShare}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200",
              copied
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
            )}>
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? "コピー済" : "シェア"}
          </button>
          <button onClick={handleDelete}
            className={cn(
              "inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition-colors",
              confirming ? "border-destructive bg-destructive text-white" : "border-border bg-card text-destructive hover:border-destructive/40 hover:bg-destructive/5"
            )}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {confirming && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          もう一度押すと削除されます
          <button onClick={() => setConfirming(false)} className="ml-2 text-primary hover:underline">キャンセル</button>
        </p>
      )}
    </div>
  );
}
