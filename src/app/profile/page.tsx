"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Check, Mail, User, Crown, Camera, Loader2, ExternalLink, Mountain, MapPin, FileText, Trash2, Heart, Lock, Pencil, X as XIcon } from "lucide-react";
import { getLevelBadge, getAllBadges, SPECIALTY_BADGE_DEFS, BADGE_CATEGORY_LABELS, getBadgesByCategory, type SpecialtyBadge, type BadgeCategory } from "@/lib/badges";
import { LevelBadgeIcon, SpecialtyBadgeIcon } from "@/components/BadgeIcons";
import { PlanPortalButton } from "@/components/PlanPortalButton";
import { HeaderGradient } from "@/components/layout/HeaderGradient";

const EXPERIENCE_LEVELS = [
  { value: "under1",   label: "1年未満" },
  { value: "1to3",     label: "1〜3年" },
  { value: "3to10",    label: "3〜10年" },
  { value: "over10",   label: "10年以上" },
];

const EXPERIENCE_LABEL: Record<string, string> = {
  under1: "登山歴1年未満", "1to3": "登山歴1〜3年", "3to10": "登山歴3〜10年", over10: "登山歴10年以上",
};

const ACTIVITY_AREAS = [
  "北海道", "東北", "関東", "中部・北アルプス",
  "近畿", "中国・四国", "九州・沖縄", "海外",
];

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mountainInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [favoriteMountains, setFavoriteMountains] = useState<string[]>([]);
  const [activityAreas, setActivityAreas] = useState<string[]>([]);
  const [mountainInput, setMountainInput] = useState("");

  const [plan, setPlan] = useState<"free" | "standard" | "premium">("free");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);
  const [gearCount, setGearCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [specialtyBadges, setSpecialtyBadges] = useState<SpecialtyBadge[]>([]);
  const [featuredBadges, setFeaturedBadges] = useState<string[]>([]);
  const [showBadgePicker, setShowBadgePicker] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const uid = data.user.id;
      setUserId(uid);
      setEmail(data.user.email ?? "");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [profileRes, followerRes, followingRes, pkgRes, gearRes, packagesRes, commentCountRes, likeGivenRes, gearCatsRes] = await Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from("users").select("display_name, avatar_url, bio, experience_level, favorite_mountains, activity_areas, home_area, plan, featured_badges").eq("id", uid).single(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from("follows").select("id", { count: "exact", head: true }).eq("following_id", uid),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from("follows").select("id", { count: "exact", head: true }).eq("follower_id", uid),
        supabase.from("gear_packages").select("id", { count: "exact", head: true }).eq("user_id", uid),
        supabase.from("gear_items").select("id", { count: "exact", head: true }).eq("user_id", uid),
        supabase.from("gear_packages").select("mountain_type, total_weight_g, like_count").eq("user_id", uid),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from("package_comments").select("id", { count: "exact", head: true }).eq("user_id", uid),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from("package_likes").select("id", { count: "exact", head: true }).eq("user_id", uid),
        supabase.from("gear_items").select("category_id").eq("user_id", uid),
      ]);

      const profile = profileRes.data;
      setDisplayName(profile?.display_name ?? data.user.user_metadata?.full_name ?? data.user.email?.split("@")[0] ?? "");
      setAvatarUrl(profile?.avatar_url ?? data.user.user_metadata?.avatar_url ?? null);
      setBio(profile?.bio ?? "");
      setExperienceLevel(profile?.experience_level ?? "");
      setFavoriteMountains(profile?.favorite_mountains ?? []);
      // activity_areas が未移行の場合は home_area を単一要素配列として fallback
      setActivityAreas(profile?.activity_areas ?? (profile?.home_area ? [profile.home_area] : []));
      setPlan(profile?.plan ?? "free");
      setFeaturedBadges(profile?.featured_badges ?? []);
      setFollowerCount(followerRes.count ?? 0);
      setFollowingCount(followingRes.count ?? 0);
      setPackageCount(pkgRes.count ?? 0);
      const gc = gearRes.count ?? 0;
      setGearCount(gc);

      // 使用カテゴリ数
      const catIds = new Set((gearCatsRes.data ?? []).map((g: { category_id: string }) => g.category_id));

      // 総いいね・バッジ計算
      const pkgs = packagesRes.data ?? [];
      const likes = pkgs.reduce((sum: number, p: { like_count?: number | null }) => sum + (p.like_count ?? 0), 0);
      setTotalLikes(likes);
      setSpecialtyBadges(getAllBadges({
        packages: pkgs,
        gearCount: gc,
        usedCategoryCount: catIds.size,
        commentCount: commentCountRes.count ?? 0,
        likeGivenCount: likeGivenRes.count ?? 0,
        followerCount: followerRes.count ?? 0,
        totalLikesReceived: likes,
      }));

      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levelBadge = getLevelBadge(totalLikes);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    const { error: authErr } = await supabase.auth.updateUser({ data: { display_name: displayName } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dbErr } = await (supabase as any).from("users").update({
      display_name: displayName,
      bio: bio || null,
      experience_level: experienceLevel || null,
      favorite_mountains: favoriteMountains,
      activity_areas: activityAreas,
      featured_badges: featuredBadges,
    }).eq("id", userId);
    setSaving(false);
    if (authErr || dbErr) {
      setSaveError("保存に失敗しました。もう一度お試しください。");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${userId}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError) { setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const urlWithCacheBust = `${publicUrl}?t=${Date.now()}`;
    await supabase.auth.updateUser({ data: { avatar_url: urlWithCacheBust } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("users").update({ avatar_url: urlWithCacheBust }).eq("id", userId);
    setAvatarUrl(urlWithCacheBust);
    setUploading(false);
  };

  const addMountain = () => {
    const val = mountainInput.trim();
    if (!val || favoriteMountains.length >= 3 || favoriteMountains.includes(val)) return;
    setFavoriteMountains([...favoriteMountains, val]);
    setMountainInput("");
    mountainInputRef.current?.focus();
  };

  const removeMountain = (m: string) => setFavoriteMountains(favoriteMountains.filter((x) => x !== m));

  const toggleArea = (area: string) =>
    setActivityAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError(null);
    const res = await fetch("/api/account/delete", { method: "DELETE" });
    if (!res.ok) {
      setDeleteError("削除に失敗しました。しばらくしてからお試しください。");
      setDeleting(false);
      return;
    }
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initials = displayName.slice(0, 1).toUpperCase() || "?";

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6">

      {/* プロフィールカード（ヒーロー） */}
      <HeaderGradient variant="profile" className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 mb-8">
        <div>

          {/* アバター + 名前 */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative shrink-0">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className={`h-16 w-16 rounded-full object-cover ring-2 ${levelBadge.ringClass}`}
                />
              ) : (
                <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] ring-2 ${levelBadge.ringClass} text-2xl font-black text-white select-none`}>
                  {initials}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#071d13] bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50">
                {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} className="hidden" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white leading-tight">{displayName}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {/* レベルバッジ */}
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelBadge.chipBorder} ${levelBadge.chipBg} ${levelBadge.chipText}`}>
                  <LevelBadgeIcon badgeKey={levelBadge.key} className="h-3 w-3" />
                  {levelBadge.label}
                </span>
                {experienceLevel && (
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-300">
                    {EXPERIENCE_LABEL[experienceLevel] ?? experienceLevel}
                  </span>
                )}
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  plan === "premium" ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                  : plan === "standard" ? "border-green-400/40 bg-green-400/10 text-green-300"
                  : "border-white/20 bg-white/5 text-white/50"
                }`}>
                  {plan === "premium" ? "Premium" : plan === "standard" ? "Standard" : "Free"}
                </span>
              </div>
              {bio && <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">{bio}</p>}
            </div>
          </div>

          {/* 統計 */}
          <div className="flex gap-5 mb-4">
            {[
              { label: "フォロワー", value: followerCount },
              { label: "フォロー中", value: followingCount },
              { label: "パッケージ", value: packageCount },
              { label: "装備",       value: gearCount },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-lg font-bold text-white tabular-nums">{value}</p>
                <p className="text-[11px] text-white/50">{label}</p>
              </div>
            ))}
            {/* 総いいね — 強調 */}
            <div className="ml-auto flex flex-col items-end">
              <p className="flex items-center gap-1 text-lg font-bold text-rose-400 tabular-nums">
                <Heart className="h-4 w-4 fill-rose-400" />
                {totalLikes}
              </p>
              <p className="text-[11px] text-white/50">総いいね</p>
            </div>
          </div>

          {/* 次のバッジまでの進捗 */}
          {levelBadge.nextMilestone !== null && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] text-white/40">
                  次のバッジまであと <span className="text-white/60 font-semibold">{levelBadge.nextMilestone - totalLikes} いいね</span>
                </p>
                <p className="text-[11px] text-white/30">{totalLikes} / {levelBadge.nextMilestone}</p>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10">
                <div
                  className={`h-1 rounded-full transition-all ${levelBadge.chipBg.replace("bg-", "bg-").replace("/10", "/60")}`}
                  style={{ width: `${Math.min((totalLikes / levelBadge.nextMilestone) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* お気に入りバッジ */}
          {featuredBadges.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-[11px] text-white/40">お気に入りバッジ</p>
                <button onClick={() => setShowBadgePicker(true)} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
                  <Pencil className="h-3 w-3 inline" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {featuredBadges.map((key) => {
                  const badge = SPECIALTY_BADGE_DEFS.find((b) => b.key === key);
                  if (!badge) return null;
                  return (
                    <span key={key} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${badge.chipBorder} ${badge.chipBg} ${badge.chipText}`}>
                      <SpecialtyBadgeIcon badgeKey={key} className="h-3 w-3" />
                      {badge.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* バッジコレクション */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[11px] text-white/40">バッジコレクション</p>
              <span className="text-[10px] text-white/25">{specialtyBadges.length} / {SPECIALTY_BADGE_DEFS.length} 獲得</span>
              {featuredBadges.length === 0 && (
                <button onClick={() => setShowBadgePicker(true)} className="ml-auto text-[10px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
                  <Pencil className="h-3 w-3" />
                  お気に入り設定
                </button>
              )}
            </div>
            {(["specialty", "action", "community", "mastery", "style"] as BadgeCategory[]).map((cat) => {
              const badges = getBadgesByCategory()[cat];
              if (badges.length === 0) return null;
              return (
                <div key={cat} className="mb-2">
                  <p className="text-[9px] text-white/25 mb-1">{BADGE_CATEGORY_LABELS[cat]}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {badges.map((badge) => {
                      const earned = specialtyBadges.some((b) => b.key === badge.key);
                      return (
                        <div
                          key={badge.key}
                          className={`flex flex-col items-center gap-1 rounded-lg border px-1.5 py-2 transition-all ${
                            earned
                              ? `${badge.chipBorder} ${badge.chipBg} ${badge.glowClass} badge-shimmer scale-105`
                              : "border-white/10 bg-white/5 grayscale opacity-40"
                          }`}
                        >
                          <div className="relative">
                            <SpecialtyBadgeIcon
                              badgeKey={badge.key}
                              className={`h-5 w-5 ${earned ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]" : "text-white/40"}`}
                            />
                            {!earned && (
                              <Lock className="absolute -bottom-0.5 -right-0.5 h-2 w-2 text-white/30" />
                            )}
                          </div>
                          <span className={`text-[9px] font-semibold leading-tight text-center ${
                            earned ? "text-white" : "text-white/50"
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

          {/* アクション */}
          <div className="flex flex-wrap gap-2">
            {userId && (
              <Link
                href={`/u/${userId}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors whitespace-nowrap">
                <ExternalLink className="h-3.5 w-3.5" />
                公開ページを見る
              </Link>
            )}
          </div>
        </div>
      </HeaderGradient>

      {/* プロフィール設定 */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">プロフィール設定</h2>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="h-4 w-4 text-muted-foreground" />
            表示名
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="ユーザー名を入力"
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            自己紹介
            <span className="ml-auto text-xs font-normal text-muted-foreground">{bio.length}/200</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 200))}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="例：北アルプス中心に年20回登山。UL装備に移行中。"
          />
          <p className="mt-1 text-xs text-muted-foreground">公開ページに表示されます</p>
        </div>
      </div>

      {/* 山のスタイル */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">山のスタイル</h2>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mountain className="h-4 w-4 text-muted-foreground" />
            登山歴
          </label>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setExperienceLevel(experienceLevel === value ? "" : value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  experienceLevel === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mountain className="h-4 w-4 text-muted-foreground" />
            好きな山ベスト3
            <span className="ml-auto text-xs font-normal text-muted-foreground">{favoriteMountains.length}/3</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {favoriteMountains.map((m) => (
              <span key={m} className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <svg viewBox="0 0 16 16" fill="currentColor" className="inline-block h-3 w-3 shrink-0 opacity-70" aria-hidden>
                  <path d="M8 2L2 14H14L8 2Z" opacity="0.9" />
                  <path d="M8 2L6.5 6.5L8 8.5L9.5 6.5L8 2Z" fill="white" opacity="0.4" />
                </svg>
                {m}
                <button onClick={() => removeMountain(m)} className="hover:text-foreground transition-colors">×</button>
              </span>
            ))}
          </div>
          {favoriteMountains.length < 3 && (
            <div className="flex gap-2">
              <input
                ref={mountainInputRef}
                type="text"
                value={mountainInput}
                onChange={(e) => setMountainInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMountain(); } }}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="山名を入力"
              />
              <button
                onClick={addMountain}
                disabled={!mountainInput.trim()}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-30 transition-colors">
                追加
              </button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            活動エリア
            <span className="ml-auto text-xs font-normal text-muted-foreground">複数選択可</span>
          </label>
          <p className="text-xs text-muted-foreground mb-3">よく登るエリアを選んでください</p>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => toggleArea(area)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activityAreas.includes(area)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
          {saving ? "保存中..." : "変更を保存する"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" />保存しました
          </span>
        )}
        {saveError && <span className="text-sm text-red-500">{saveError}</span>}
      </div>

      {/* アカウント情報 */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">アカウント</h2>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mail className="h-4 w-4 text-muted-foreground" />
            メールアドレス
          </label>
          <p className="text-sm text-muted-foreground">{email}</p>
          <p className="mt-1 text-xs text-muted-foreground">メールアドレスの変更はサポートにお問い合わせください。</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Crown className="h-4 w-4 text-muted-foreground" />
            現在のプラン
          </label>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">
                {plan === "premium" ? "Premium プラン" : plan === "standard" ? "Standard プラン" : "Free プラン"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {plan === "premium"
                  ? "装備・パッケージ無制限・AI提案無制限・優先サポート"
                  : plan === "standard"
                  ? "装備200点・パッケージ20つ・AI提案30回/月"
                  : "装備30点・パッケージ3つ・AI提案3回/月"}
              </p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${
              plan === "premium"
                ? "border-amber-300 bg-amber-50 text-amber-700"
                : plan === "standard"
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-secondary text-muted-foreground"
            }`}>
              {plan === "premium" ? "Premium" : plan === "standard" ? "Standard" : "無料"}
            </span>
          </div>
          <div className="mt-3">
            {plan === "free" ? (
              <Link
                href="/plans"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                <Crown className="h-4 w-4" />
                プランをアップグレード
              </Link>
            ) : (
              <PlanPortalButton />
            )}
          </div>
        </div>
      </div>

      {/* アカウント削除 */}
      <div className="mt-10 mb-10 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">危険な操作</h2>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">アカウントを削除する</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                登録した装備・パッケージを含む全データが完全に削除されます。この操作は取り消せません。
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
              <Trash2 className="h-3.5 w-3.5" />
              削除
            </button>
          </div>
        </div>
      </div>

      {/* お気に入りバッジ選択モーダル */}
      {showBadgePicker && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">お気に入りバッジ</h3>
              <button onClick={() => setShowBadgePicker(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              獲得済みバッジから最大4つ選択。プロフィールに表示されます。
              <span className="ml-1 font-semibold">{featuredBadges.length}/4</span>
            </p>
            <div className="grid grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto">
              {SPECIALTY_BADGE_DEFS.map((badge) => {
                const earned = specialtyBadges.some((b) => b.key === badge.key);
                if (!earned) return null;
                const selected = featuredBadges.includes(badge.key);
                return (
                  <button
                    key={badge.key}
                    onClick={() => {
                      if (selected) {
                        setFeaturedBadges(featuredBadges.filter((k) => k !== badge.key));
                      } else if (featuredBadges.length < 4) {
                        setFeaturedBadges([...featuredBadges, badge.key]);
                      }
                    }}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition-all ${
                      selected
                        ? `${badge.chipBorder} bg-primary/10 ring-2 ring-primary`
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <SpecialtyBadgeIcon badgeKey={badge.key} className={`h-6 w-6 ${badge.chipTextLight}`} />
                    <span className="text-[10px] font-semibold text-foreground leading-tight text-center">{badge.label}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
            {specialtyBadges.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">まだ獲得したバッジがありません</p>
            )}
            <button
              onClick={() => setShowBadgePicker(false)}
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              完了
            </button>
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-base font-bold text-foreground mb-1">本当に削除しますか？</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              装備・パッケージを含む全データが完全に削除されます。この操作は取り消せません。
            </p>
            {deleteError && <p className="mb-4 text-sm text-red-600">{deleteError}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteError(null); }}
                disabled={deleting}
                className="flex-1 rounded-xl border border-border bg-background py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-50">
                キャンセル
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "削除する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
