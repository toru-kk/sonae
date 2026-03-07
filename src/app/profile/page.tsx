"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Check, Mail, User, Crown, Camera, Loader2, ExternalLink, Mountain, MapPin, FileText, Trash2 } from "lucide-react";

const EXPERIENCE_LEVELS = [
  { value: "under1",   label: "1年未満" },
  { value: "1to3",     label: "1〜3年" },
  { value: "3to10",    label: "3〜10年" },
  { value: "over10",   label: "10年以上" },
];

const HOME_AREAS = [
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
  const [homeArea, setHomeArea] = useState("");
  const [mountainInput, setMountainInput] = useState("");

  const [plan, setPlan] = useState<"free" | "standard" | "premium">("free");

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
      const { data: profile } = await (supabase as any)
        .from("users")
        .select("display_name, avatar_url, bio, experience_level, favorite_mountains, home_area, plan")
        .eq("id", uid)
        .single();

      setDisplayName(profile?.display_name ?? data.user.user_metadata?.full_name ?? data.user.email?.split("@")[0] ?? "");
      setAvatarUrl(profile?.avatar_url ?? data.user.user_metadata?.avatar_url ?? null);
      setBio(profile?.bio ?? "");
      setExperienceLevel(profile?.experience_level ?? "");
      setFavoriteMountains(profile?.favorite_mountains ?? []);
      setHomeArea(profile?.home_area ?? "");
      setPlan(profile?.plan ?? "free");
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      home_area: homeArea || null,
    }).eq("id", userId);
    setSaving(false);
    if (authErr || dbErr) {
      setSaveError("保存に失敗しました。もう一度お試しください。");
      console.error("save error:", authErr, dbErr);
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

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      console.error("upload error:", uploadError);
      setUploading(false);
      return;
    }

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

  const removeMountain = (m: string) => {
    setFavoriteMountains(favoriteMountains.filter((x) => x !== m));
  };

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
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
        <p className="mt-1 text-sm text-muted-foreground">アカウント情報の確認・変更</p>
      </div>

      {/* アバター */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={displayName} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-black text-primary-foreground select-none">
              {initials}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
            {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <p className="font-semibold text-foreground">{displayName}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
          <div className="mt-1 flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-xs text-primary hover:underline disabled:opacity-50">
              {uploading ? "アップロード中..." : "画像を変更"}
            </button>
            {userId && (
              <Link
                href={`/u/${userId}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-3 w-3" />公開ページを見る
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 基本情報 */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">基本情報</h2>

        {/* 表示名 */}
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

        {/* 自己紹介 */}
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

        {/* 経験レベル */}
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

        {/* 好きな山 */}
        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mountain className="h-4 w-4 text-muted-foreground" />
            好きな山ベスト3
            <span className="ml-auto text-xs font-normal text-muted-foreground">{favoriteMountains.length}/3</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {favoriteMountains.map((m) => (
              <span key={m} className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
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

        {/* 活動エリア */}
        <div className="rounded-xl border border-border bg-card p-5">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            活動エリア
          </label>
          <div className="flex flex-wrap gap-2">
            {HOME_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => setHomeArea(homeArea === area ? "" : area)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  homeArea === area
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
        {saveError && (
          <span className="text-sm text-red-500">{saveError}</span>
        )}
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
        </div>
      </div>

      {/* アカウント削除 */}
      <div className="mt-10 space-y-4">
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

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-base font-bold text-foreground mb-1">本当に削除しますか？</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              装備・パッケージを含む全データが完全に削除されます。この操作は取り消せません。
            </p>
            {deleteError && (
              <p className="mb-4 text-sm text-red-600">{deleteError}</p>
            )}
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
