import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient as createAnonClientRaw } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { UserProfileCTA } from "@/components/UserProfileCTA";
import { FollowButton } from "@/components/FollowButton";
import { Layers } from "lucide-react";

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
async function fetchProfile(userId: string): Promise<{ user: any; packages: any[]; followerCount: number } | null> {
  const supabase = createAnonClient();

  const [userRes, pkgRes, followCountRes] = await Promise.all([
    supabase.from("users").select("id, display_name, avatar_url, bio, experience_level, favorite_mountains, home_area").eq("id", userId).single(),
    supabase
      .from("gear_packages")
      .select("id, name, description, mountain_type, total_weight_g, gear_package_items(count)")
      .eq("user_id", userId)
      .eq("is_public", true)
      .order("created_at", { ascending: false }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any).from("follows").select("id", { count: "exact", head: true }).eq("following_id", userId),
  ]);

  if (userRes.error || !userRes.data) return null;

  return {
    user: userRes.data,
    packages: pkgRes.data ?? [],
    followerCount: followCountRes.count ?? 0,
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

  const { user, packages, followerCount } = result;
  const displayName = user.display_name ?? "Sonaeユーザー";
  const initial = displayName.slice(0, 1).toUpperCase();

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

  return (
    <div className="min-h-screen bg-background">

      {/* ヘッダー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10">

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
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-white/20"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] ring-2 ring-white/20 text-2xl font-black text-white select-none">
                  {initial}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{displayName}</h1>
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
