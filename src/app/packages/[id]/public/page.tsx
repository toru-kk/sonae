import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Copy } from "lucide-react";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { PublicPackageCTA } from "@/components/PublicPackageCTA";
import { CopyPackageButton } from "@/components/CopyPackageButton";
import { LikeButton } from "@/components/LikeButton";

const CATEGORIES: Record<string, { name_ja: string; sort_order: number }> = {
  shelter:    { name_ja: "シェルター",    sort_order: 1 },
  sleeping:   { name_ja: "シュラフ・寝具", sort_order: 2 },
  clothing:   { name_ja: "衣類",          sort_order: 3 },
  footwear:   { name_ja: "靴・足回り",    sort_order: 4 },
  backpack:   { name_ja: "バックパック",  sort_order: 5 },
  navigation: { name_ja: "ナビゲーション", sort_order: 6 },
  safety:     { name_ja: "安全装備",      sort_order: 7 },
  cooking:    { name_ja: "調理器具",      sort_order: 8 },
  food:       { name_ja: "食料・行動食",  sort_order: 9 },
  tools:      { name_ja: "道具・その他",  sort_order: 10 },
};

const BAR_COLORS = [
  "bg-orange-400","bg-violet-400","bg-sky-400","bg-amber-400","bg-emerald-500",
  "bg-blue-400","bg-red-400","bg-rose-400","bg-lime-400","bg-slate-400",
];

function formatWeight(g: number | null) {
  if (!g) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchPackage(id: string): Promise<{ pkg: any; items: any[]; creator: { id: string | null; display_name: string | null; avatar_url: string | null } } | null> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("gear_packages")
    .select(`*, copy_count, gear_package_items(gear_item_id, gear_items(*)), users(id, display_name, avatar_url)`)
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !data) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (data.gear_package_items ?? []).map((pi: any) => pi.gear_items).filter(Boolean);
  const creator = {
    id: data.users?.id ?? null,
    display_name: data.users?.display_name ?? null,
    avatar_url: data.users?.avatar_url ?? null,
  };
  return { pkg: data, items, creator };
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const result = await fetchPackage(id);
  if (!result) return { title: "パッケージ | Sonae" };

  const { pkg, items } = result;
  const totalWeight = items.reduce((s: number, i: { weight_g: number | null }) => s + (i.weight_g ?? 0), 0);
  const desc = `${items.length}点 · ${formatWeight(totalWeight)} — Sonaeで管理された装備パッケージ`;

  return {
    title: `${pkg.name} | Sonae`,
    description: desc,
    openGraph: {
      title: `${pkg.name} | Sonae`,
      description: desc,
      images: [`/api/og/package/${id}`],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PublicPackagePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await fetchPackage(id);
  if (!result) notFound();

  const { pkg, items, creator } = result;
  const totalWeight: number = items.reduce((s: number, i: { weight_g: number | null }) => s + (i.weight_g ?? 0), 0);
  const creatorName = creator.display_name ?? "Sonaeユーザー";
  const creatorInitial = creatorName.slice(0, 1).toUpperCase();

  // カテゴリ別グループ化
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, any[]> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (items as any[]).forEach((item: { category_id: string }) => {
    if (!grouped[item.category_id]) grouped[item.category_id] = [];
    grouped[item.category_id].push(item);
  });
  const categoryGroups = Object.entries(grouped)
    .map(([catId, catItems], idx) => ({
      catId, catItems,
      cat: CATEGORIES[catId],
      color: BAR_COLORS[idx % BAR_COLORS.length],
    }))
    .filter((g) => g.cat)
    .sort((a, b) => (a.cat?.sort_order ?? 0) - (b.cat?.sort_order ?? 0));

  return (
    <div className="min-h-screen bg-background">

      {/* ヒーローヘッダー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10">

          {/* Sonaeロゴリンク */}
          <Link href="/" className="mb-8 inline-flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Sonae</span>
          </Link>

          {/* クリエイター */}
          {creator.id ? (
            <Link href={`/u/${creator.id}`} className="mb-5 flex items-center gap-3 group w-fit">
              {creator.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={creator.avatar_url}
                  alt={creatorName}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/50 transition-all"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] ring-2 ring-white/20 group-hover:ring-white/50 transition-all text-base font-black text-white select-none">
                  {creatorInitial}
                </div>
              )}
              <div>
                <p className="text-xs text-white/40 leading-none mb-1">装備パッケージを公開</p>
                <p className="text-sm font-semibold text-white leading-none group-hover:underline">{creatorName}</p>
              </div>
            </Link>
          ) : (
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] ring-2 ring-white/20 text-base font-black text-white select-none">
                {creatorInitial}
              </div>
              <div>
                <p className="text-xs text-white/40 leading-none mb-1">装備パッケージを公開</p>
                <p className="text-sm font-semibold text-white leading-none">{creatorName}</p>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {pkg.mountain_type && (
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                    {pkg.mountain_type}
                  </span>
                )}
                <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/60">
                  公開パッケージ
                </span>
                {(pkg.copy_count ?? 0) > 0 && (
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                    <Copy className="h-3 w-3" />
                    {pkg.copy_count} 人が参考にした
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{pkg.name}</h1>
              {pkg.description && (
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{pkg.description}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-bold text-white tabular-nums">{formatWeight(totalWeight)}</p>
              <p className="mt-1 text-sm text-white/50">{items.length} 点</p>
              {totalWeight > 0 && <ULScore weightG={totalWeight} className="mt-2" />}
            </div>
          </div>

          {/* 重量バー */}
          {totalWeight > 0 && (
            <div className="mt-6">
              <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
                {categoryGroups.map(({ catId, catItems, color }) => {
                  const w: number = (catItems as { weight_g: number | null }[]).reduce((s, i) => s + (i.weight_g ?? 0), 0);
                  const pct = (w / totalWeight) * 100;
                  if (pct < 0.5) return null;
                  return <div key={catId} style={{ width: `${pct}%` }} className={`h-full ${color}`} />;
                })}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {categoryGroups.map(({ catId, catItems, color, cat }) => {
                  const w: number = (catItems as { weight_g: number | null }[]).reduce((s, i) => s + (i.weight_g ?? 0), 0);
                  if (!w) return null;
                  return (
                    <span key={catId} className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className={`h-2 w-2 rounded-full ${color}`} />
                      {cat.name_ja}
                      <span className="text-white/70 font-medium">{formatWeight(w)}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 装備リスト */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
        {categoryGroups.map(({ catId, catItems, cat }) => (
          <div key={catId}>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">{cat.name_ja}</h2>
              <span className="text-xs text-muted-foreground">{catItems.length} 点</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              {(catItems as { id: string; name: string; brand?: string | null; weight_g: number | null; is_essential: boolean }[]).map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      {item.is_essential && (
                        <span className="shrink-0 inline-flex items-center gap-0.5 rounded border border-red-200 bg-red-50 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-red-600">
                          <CheckCircle className="h-2.5 w-2.5" />必須
                        </span>
                      )}
                    </div>
                    {item.brand && <p className="text-xs text-muted-foreground">{item.brand}</p>}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
                    {formatWeight(item.weight_g)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground text-sm">装備が登録されていません</p>
          </div>
        )}
      </div>

      <div className="mt-4 mx-auto max-w-3xl px-4 sm:px-6 pb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <LikeButton packageId={id} initialLikeCount={pkg.like_count ?? 0} />
          <CopyPackageButton packageId={id} creatorId={creator.id} />
        </div>
        <PublicPackageCTA packageId={id} ownerId={pkg.user_id} />
      </div>

    </div>
  );
}
