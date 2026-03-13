import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { Trophy, Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "週間人気ランキング | Sonae",
  description:
    "過去7日間でいいねが多かった装備パッケージのランキング。登山者のトレンド装備をチェックしよう。",
  openGraph: {
    title: "週間人気ランキング | Sonae",
    description: "過去7日間でいいねが多かった装備パッケージのランキング。",
    url: "https://sonae.app/ranking",
  },
};

export const revalidate = 3600; // ISR: 1時間ごとに再生成

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

const RANK_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  2: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" },
  3: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
};

type RankedPackage = {
  id: string;
  name: string;
  description: string | null;
  mountain_type: string | null;
  total_weight_g: number;
  like_count: number;
  weekly_like_count: number;
  user_id: string;
  created_at: string;
  display_name: string | null;
  avatar_url: string | null;
  item_count: number;
};

export default async function RankingPage() {
  const supabase = createAnonClient();
  const { data } = await supabase.rpc("get_weekly_ranking", {
    result_limit: 20,
  });

  const rankings: RankedPackage[] = (data as RankedPackage[]) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* ヒーロー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2.5 mb-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <SonaeLogoIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                Sonae
              </span>
            </Link>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              週間人気ランキング
            </h1>
            <Trophy className="h-5 w-5 text-green-400 shrink-0" />
          </div>
          <p className="text-sm text-white/60 max-w-lg">
            過去7日間でいいねが多かった装備パッケージ。毎週更新されるトレンドをチェックしよう。
          </p>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {rankings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-24 text-center">
            <Trophy className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-semibold text-foreground mb-1">
              今週はまだランキングデータがありません
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              パッケージにいいねしてランキングを盛り上げよう
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              みんなの装備を見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {rankings.map((pkg, index) => {
              const rank = index + 1;
              const w = pkg.total_weight_g ?? 0;
              const creatorName = pkg.display_name ?? "匿名ユーザー";
              const rankStyle = RANK_STYLES[rank];

              return (
                <Link
                  key={pkg.id}
                  href={`/packages/${pkg.id}/public`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 sm:px-5 py-4 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {/* 順位 */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg font-black ${
                      rankStyle
                        ? `${rankStyle.bg} ${rankStyle.text} ${rankStyle.border}`
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                  >
                    {rank}
                  </div>

                  {/* パッケージ情報 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {/* 作者 */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {pkg.avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={pkg.avatar_url}
                            alt={creatorName}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                            {creatorName.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                          {creatorName}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {pkg.name}
                    </h2>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {pkg.mountain_type && (
                        <span className="rounded-full border border-border bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {pkg.mountain_type}
                        </span>
                      )}
                      {w > 0 && <ULScore weightG={w} />}
                      {w > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {formatWeight(w)}
                        </span>
                      )}
                      {pkg.item_count > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {pkg.item_count} 点
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 週間いいね数 */}
                  <div className="flex shrink-0 flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1">
                      <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                      <span className="text-xs font-bold text-rose-600">
                        +{pkg.weekly_like_count}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      今週
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 探索への導線 */}
        {rankings.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              もっとパッケージを探す
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
