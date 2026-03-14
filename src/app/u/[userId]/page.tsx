import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient as createAnonClientRaw } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { UserProfileCTA } from "@/components/UserProfileCTA";
import { FollowButton } from "@/components/FollowButton";
import { Layers, Lock } from "lucide-react";
import { getLevelBadge, getAllBadges, SPECIALTY_BADGE_DEFS, BADGE_CATEGORY_LABELS, getBadgesByCategory, type BadgeCategory } from "@/lib/badges";
import { LevelBadgeIcon, SpecialtyBadgeIcon } from "@/components/BadgeIcons";
import { HeaderGradient } from "@/components/layout/HeaderGradient";

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

function createAnonClient() {
  return createAnonClientRaw(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchProfile(userId: string): Promise<{ user: any; packages: any[]; followerCount: number; totalLikes: number; gearCount: number; usedCategoryCount: number; commentCount: number; likeGivenCount: number } | null> {
  const supabase = createAnonClient();

  const [userRes, pkgRes, followCountRes, likesRes, gearCountRes, gearCatsRes, commentCountRes, likeGivenRes] = await Promise.all([
    supabase.from("users").select("id, display_name, avatar_url, bio, experience_level, favorite_mountains, home_area, featured_badges").eq("id", userId).single(),
    supabase
      .from("gear_packages")
      .select("id, name, description, mountain_type, total_weight_g, like_count, gear_package_items(count)")
      .eq("user_id", userId)
      .eq("is_public", true)
      .order("created_at", { ascending: false }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from("follows").select("id", { count: "exact", head: true }).eq("following_id", userId),
    supabase
      .from("gear_packages")
      .select("like_count")
      .eq("user_id", userId)
      .eq("is_public", true),
    supabase.from("gear_items").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("gear_items").select("category_id").eq("user_id", userId),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from("package_comments").select("id", { count: "exact", head: true }).eq("user_id", userId),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from("package_likes").select("id", { count: "exact", head: true }).eq("user_id", userId),
  ]);

  if (userRes.error || !userRes.data) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalLikes = (likesRes.data ?? []).reduce((sum: number, p: any) => sum + (p.like_count ?? 0), 0);
  const catIds = new Set((gearCatsRes.data ?? []).map((g: { category_id: string }) => g.category_id));

  return {
    user: userRes.data,
    packages: pkgRes.data ?? [],
    followerCount: followCountRes.count ?? 0,
    totalLikes,
    gearCount: gearCountRes.count ?? 0,
    usedCategoryCount: catIds.size,
    commentCount: commentCountRes.count ?? 0,
    likeGivenCount: likeGivenRes.count ?? 0,
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ userId: string }> }
): Promise<Metadata> {
  const { userId } = await params;
  const result = await fetchProfile(userId);
  if (!result) return { title: "ユーザー | Sonae" };
  const name = result.user.display_name ?? "Sonaeユーザー";
  return {
    title: `${name}の装備 | Sonae`,
    description: `${name}が公開している装備パッケージ一覧`,
  };
}

export default async function UserProfilePage(
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const result = await fetchProfile(userId);
  if (!result) notFound();

  const { user, packages, followerCount, totalLikes, gearCount, usedCategoryCount, commentCount, likeGivenCount } = result;
  const displayName = user.display_name ?? "Sonaeユーザー";
  const initial = displayName.slice(0, 1).toUpperCase();

  // バッジ計算
  const levelBadge = getLevelBadge(totalLikes);
  const earnedBadges = getAllBadges({
    packages,
    gearCount,
    usedCategoryCount,
    commentCount,
    likeGivenCount,
    followerCount,
    totalLikesReceived: totalLikes,
  });
  const earnedKeys = new Set(earnedBadges.map((b) => b.key));

  // お気に入りバッジ
  const featuredBadgeKeys: string[] = user.featured_badges ?? [];

  // 現在ログイン中のユーザーを取得（未ログインならnull）
  const serverSupabase = await createClient();
  const { data: { user: currentUser } } = await serverSupabase.auth.getUser();
  const isOwnProfile = currentUser?.id === userId;

  // フォロー済みかどうか
  let isFollowed = false;
  if (currentUser && !isOwnProfile) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (serverSupabase as any)
      .from("follows")
      .select("id")
      .eq("follower_id", currentUser.id)
      .eq("following_id", userId)
      .maybeSingle();
    isFollowed = !!data;
  }

  const EXPERIENCE_LABEL: Record<string, string> = {
    under1: "登山歴1年未満", "1to3": "登山歴1〜3年", "3to10": "登山歴3〜10年", over10: "登山歴10年以上",
  };

  const badgeGroups = getBadgesByCategory();

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: displayName,
            url: `https://sonae.vercel.app/u/${userId}`,
            ...(user.avatar_url ? { image: user.avatar_url } : {}),
            ...(user.bio ? { description: user.bio } : {}),
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/FollowAction",
                userInteractionCount: followerCount,
              },
            ],
          }),
        }}
      />

      {/* ヘッダー */}
      <HeaderGradient variant="profile">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          <Link href="/" className="mb-8 inline-flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Sonae</span>
          </Link>

          <div className="flex items-start gap-4">
            <div className="shrink-0">
              {user.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar_url}
                  alt={displayName}
                  className={`h-16 w-16 rounded-full object-cover ring-2 ${levelBadge.ringClass}`}
                />
              ) : (
                <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] ring-2 ${levelBadge.ringClass} text-2xl font-black text-white select-none`}>
                  {initial}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-white">{displayName}</h1>
                <span className={`inline-flex items-center gap-1 rounded-full border ${levelBadge.chipBorder} ${levelBadge.chipBg} px-2.5 py-0.5 text-xs font-semibold ${levelBadge.chipText}`}>
                  <LevelBadgeIcon badgeKey={levelBadge.key} className="h-3.5 w-3.5" />
                  {levelBadge.label}
                </span>
              </div>
              {/* お気に入りバッジ */}
              {featuredBadgeKeys.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {featuredBadgeKeys.map((key) => {
                    const badge = SPECIALTY_BADGE_DEFS.find((b) => b.key === key);
                    if (!badge || !earnedKeys.has(key)) return null;
                    return (
                      <span key={key} className={`inline-flex items-center gap-1 rounded-full border ${badge.chipBorder} ${badge.chipBg} px-2 py-0.5 text-[10px] font-semibold ${badge.chipText}`}>
                        <SpecialtyBadgeIcon badgeKey={key} className="h-3 w-3" />
                        {badge.label}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                {user.experience_level && (
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-300">
                    {EXPERIENCE_LABEL[user.experience_level] ?? user.experience_level}
                  </span>
                )}
                {user.home_area && (
                  <span className="text-xs text-white/50">{user.home_area}</span>
                )}
                <span className="text-xs text-white/40">{packages.length} 件の公開パッケージ</span>
              </div>
              {user.bio && (
                <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-md">{user.bio}</p>
              )}
              {user.favorite_mountains?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {user.favorite_mountains.map((m: string) => (
                    <span key={m} className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/8 px-2.5 py-0.5 text-xs font-medium text-white/80">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="inline-block h-3 w-3 shrink-0" aria-hidden>
                        <path d="M8 2L2 14H14L8 2Z" opacity="0.9" />
                        <path d="M8 2L6.5 6.5L8 8.5L9.5 6.5L8 2Z" fill="white" opacity="0.4" />
                      </svg>
                      {m}
                    </span>
                  ))}
                </div>
              )}
              {/* フォローボタン（他人のプロフィールのみ） */}
              {!isOwnProfile && (
                <div className="mt-4">
                  {currentUser ? (
                    <FollowButton
                      targetUserId={userId}
                      initialFollowed={isFollowed}
                      initialCount={followerCount}
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                      >
                        ログインしてフォロー
                      </Link>
                      {followerCount > 0 && (
                        <span className="text-sm text-white/50">
                          <span className="font-semibold text-white/80">{followerCount}</span> フォロワー
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
              {/* 自分のプロフィールの場合はフォロワー数のみ表示 */}
              {isOwnProfile && followerCount > 0 && (
                <p className="mt-3 text-sm text-white/50">
                  <span className="font-semibold text-white/80">{followerCount}</span> フォロワー
                </p>
              )}
            </div>
          </div>
        </div>
      </HeaderGradient>

      {/* バッジコレクション */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-bold text-foreground">バッジコレクション</h2>
          <span className="text-xs text-muted-foreground">{earnedBadges.length} / {SPECIALTY_BADGE_DEFS.length} 獲得</span>
        </div>
        {(["specialty", "action", "community", "mastery", "style"] as BadgeCategory[]).map((cat) => {
          const badges = badgeGroups[cat];
          if (badges.length === 0) return null;
          return (
            <div key={cat} className="mb-3">
              <p className="text-[10px] text-muted-foreground/60 mb-1.5">{BADGE_CATEGORY_LABELS[cat]}</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {badges.map((badge) => {
                  const earned = earnedKeys.has(badge.key);
                  return (
                    <div
                      key={badge.key}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all ${
                        earned
                          ? `${badge.chipBorder} ${badge.chipBg} ${badge.glowClassLight} badge-shimmer badge-shimmer-light scale-105`
                          : "border-border bg-muted/50 grayscale opacity-40"
                      }`}
                    >
                      <div className="relative">
                        <SpecialtyBadgeIcon
                          badgeKey={badge.key}
                          className={`h-6 w-6 ${earned ? badge.chipTextLight : "text-muted-foreground/50"}`}
                        />
                        {!earned && (
                          <Lock className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 text-muted-foreground/50" />
                        )}
                      </div>
                      <span className={`text-[10px] font-semibold leading-tight text-center ${
                        earned ? badge.chipTextLight : "text-muted-foreground/60"
                      }`}>
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* パッケージ一覧 */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {packages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground text-sm">公開パッケージはまだありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {packages.map((pkg: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const itemCount = pkg.gear_package_items?.[0]?.count ?? 0;
              const weight = pkg.total_weight_g ?? 0;
              return (
                <Link
                  key={pkg.id}
                  href={`/packages/${pkg.id}/public`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:bg-secondary transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {pkg.name}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      {pkg.mountain_type && (
                        <span className="text-xs text-muted-foreground">{pkg.mountain_type}</span>
                      )}
                      <span className="text-xs text-muted-foreground">{itemCount} 点</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {weight > 0 && (
                      <>
                        <p className="text-sm font-semibold text-foreground tabular-nums">{formatWeight(weight)}</p>
                        <ULScore weightG={weight} className="mt-1 justify-end" />
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <UserProfileCTA />
      </div>
    </div>
  );
}
