"use client";

// Force Vercel rebuild - clear cache
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Weight, Compass, Search, X, Users, Loader2, Heart, Trophy, Backpack } from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { HeaderGradient } from "@/components/layout/HeaderGradient";
import { ULScore } from "@/components/ULScore";
import { CopyPackageButton } from "@/components/CopyPackageButton";
import { ReactionButton } from "@/components/ReactionButton";
import { cn } from "@/lib/utils";
import { MOUNTAIN_TYPES } from "@/lib/mountain-types";
import { BRANDS, toKatakana } from "@/lib/brands";
import { GEAR_SUGGESTIONS } from "@/lib/gear-suggestions";

const PAGE_SIZE = 24;
/** 重量プログレスバーの最大値（g） */
const WEIGHT_BAR_MAX = 12000;

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

type GearItem = {
  id: string;
  name: string;
  brand: string;
  weight_g: number;
  category_id: string | null;
  image_url?: string | null;
};

type PublicPackage = {
  id: string;
  name: string;
  description: string | null;
  mountain_type: string | null;
  total_weight_g: number;
  like_count: number;
  user_id: string;
  created_at: string;
  users: { display_name: string | null; avatar_url: string | null } | null;
  gear_package_items: { count: number }[];
  items?: GearItem[];
  item_count?: number;
};

function Avatar({ name, avatarUrl, size = "sm" }: { name: string; avatarUrl?: string | null; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt={name} className={`${dim} rounded-full object-cover shrink-0`} />;
  }
  return (
    <div className={`${dim} rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground shrink-0`}>
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

type SortKey = "new" | "light" | "popular" | "follow" | "users" | "gear";

const EXPERIENCE_LABEL: Record<string, string> = {
  under1: "1年未満", "1to3": "1〜3年", "3to10": "3〜10年", over10: "10年以上",
};

type PublicUser = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  experience_level: string | null;
  home_area: string | null;
  packageCount: number;
};

export default function ExplorePage() {
  const router = useRouter();
  const composingRef = useRef(false);
  const [allPackages, setAllPackages] = useState<PublicPackage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [followedUserIds, setFollowedUserIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [sort, setSort] = useState<SortKey>("new");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [allUsers, setAllUsers] = useState<PublicUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);

  // フォローフィード用の状態
  const [feedPackages, setFeedPackages] = useState<PublicPackage[]>([]);
  const [feedPage, setFeedPage] = useState(0);
  const [feedHasMore, setFeedHasMore] = useState(true);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedFetched, setFeedFetched] = useState(false);
  const [feedLoadingMore, setFeedLoadingMore] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);

  // 装備で探す用の状態
  const [gearQuery, setGearQuery] = useState("");
  const [gearPackages, setGearPackages] = useState<PublicPackage[]>([]);
  const [gearSearchLoading, setGearSearchLoading] = useState(false);
  const [gearSearched, setGearSearched] = useState(false);
  const [gearPage, setGearPage] = useState(0);
  const [gearHasMore, setGearHasMore] = useState(false);
  const [gearError, setGearError] = useState<string | null>(null);
  const [showGearSuggest, setShowGearSuggest] = useState(false);

  // 装備サジェスト（ブランド + 装備名を統合）
  const gearSuggestions = useMemo(() => {
    if (gearQuery.length < 1) return [];
    const q = gearQuery.toLowerCase();
    const qKata = toKatakana(q);

    const brandHits = BRANDS
      .filter((b) => {
        const t = b.search.toLowerCase();
        return t.includes(q) || t.includes(qKata);
      })
      .map((b) => ({ label: b.display, sub: "ブランド", type: "brand" as const }));

    const gearHits = GEAR_SUGGESTIONS
      .filter((g) => {
        const t = g.search.toLowerCase();
        return t.includes(q) || t.includes(qKata);
      })
      .slice(0, 10)
      .map((g) => ({ label: g.name, sub: `${g.brand} · ${g.weight_g}g`, type: "gear" as const }));

    // ブランドを先に、装備名をあとに。合計最大15件
    return [...brandHits.slice(0, 5), ...gearHits].slice(0, 15);
  }, [gearQuery]);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      const uid = data.user?.id ?? null;
      setCurrentUserId(uid);

      if (uid) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: follows } = await (supabase as any)
          .from("follows")
          .select("following_id")
          .eq("follower_id", uid);
        setFollowedUserIds(new Set((follows ?? []).map((f: { following_id: string }) => f.following_id)));
      }
    });

    supabase
      .from("gear_packages")
      .select("id, name, description, mountain_type, total_weight_g, like_count, user_id, created_at, users(display_name, avatar_url), gear_package_items(gear_items(id, name, brand, weight_g, category_id, image_url))")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .range(0, PAGE_SIZE - 1)
      .then(({ data, error }) => {
        if (error) {
          setLoadError("パッケージの読み込みに失敗しました");
          setLoading(false);
          return;
        }
        const pkgs = (data ?? []).map((pkg: Record<string, unknown>) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const gpi = (pkg.gear_package_items ?? []) as any[];
          const items = gpi.map((pi) => pi.gear_items).filter(Boolean);
          return { ...pkg, items, item_count: items.length } as unknown as PublicPackage;
        });
        setAllPackages(pkgs);
        if (pkgs.length < PAGE_SIZE) setHasMore(false);
        setLoading(false);
      });
  }, []);

  // フォロータブ選択時にフィードを取得
  useEffect(() => {
    if (sort !== "follow" || feedFetched || !currentUserId) return;
    setFeedLoading(true);
    setFeedError(null);
    const params = new URLSearchParams({ page: "0" });
    fetch(`/api/feed?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedPackages(data.packages ?? []);
        setFeedHasMore(data.hasMore ?? false);
        setFeedPage(0);
        setFeedLoading(false);
        setFeedFetched(true);
      })
      .catch(() => {
        setFeedError("フォローフィードの読み込みに失敗しました");
        setFeedLoading(false);
        setFeedFetched(true);
      });
  }, [sort, feedFetched, currentUserId]);

  const loadMoreFeed = async () => {
    setFeedLoadingMore(true);
    const nextPage = feedPage + 1;
    const params = new URLSearchParams({ page: String(nextPage) });
    if (selectedType) params.set("mountain_type", selectedType);
    if (query.trim()) params.set("q", query.trim());
    try {
      const res = await fetch(`/api/feed?${params}`);
      const data = await res.json();
      setFeedPackages((prev) => [...prev, ...(data.packages ?? [])]);
      setFeedHasMore(data.hasMore ?? false);
      setFeedPage(nextPage);
    } catch { setFeedError("読み込みに失敗しました"); }
    setFeedLoadingMore(false);
  };

  // 装備で検索
  const searchByGear = async (q?: string, p = 0) => {
    const searchText = q ?? gearQuery;
    if (!searchText.trim()) return;
    if (p === 0) { setGearSearchLoading(true); setGearError(null); }
    const params = new URLSearchParams({ q: searchText.trim(), page: String(p) });
    if (selectedType) params.set("mountain_type", selectedType);
    try {
      const res = await fetch(`/api/gear-search?${params}`);
      const data = await res.json();
      if (p === 0) {
        setGearPackages(data.packages ?? []);
      } else {
        setGearPackages((prev) => [...prev, ...(data.packages ?? [])]);
      }
      setGearHasMore(data.hasMore ?? false);
      setGearPage(p);
      setGearSearched(true);
    } catch { setGearError("検索に失敗しました"); }
    setGearSearchLoading(false);
  };

  // ユーザータブ選択時にユーザー詳細を取得
  useEffect(() => {
    if (sort !== "users" || usersFetched || loading) return;
    setUsersLoading(true);
    const supabase = createClient();
    const userIds = [...new Set(allPackages.map((p) => p.user_id))];
    if (userIds.length === 0) { setUsersLoading(false); setUsersFetched(true); return; }

    const pkgCountMap = new Map<string, number>();
    allPackages.forEach((p) => pkgCountMap.set(p.user_id, (pkgCountMap.get(p.user_id) ?? 0) + 1));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("users")
      .select("id, display_name, avatar_url, bio, experience_level, home_area")
      .in("id", userIds)
      .then(({ data, error }: { data: Omit<PublicUser, "packageCount">[] | null; error: unknown }) => {
        if (error) { setUsersLoading(false); setUsersFetched(true); return; }
        const users: PublicUser[] = (data ?? []).map((u) => ({
          ...u,
          packageCount: pkgCountMap.get(u.id) ?? 0,
        })).sort((a, b) => b.packageCount - a.packageCount);
        setAllUsers(users);
        setUsersLoading(false);
        setUsersFetched(true);
      });
  }, [sort, usersFetched, loading, allPackages]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gear_packages")
        .select("id, name, description, mountain_type, total_weight_g, like_count, user_id, created_at, users(display_name, avatar_url), gear_package_items(gear_items(id, name, brand, weight_g, category_id, image_url))")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .range(nextPage * PAGE_SIZE, (nextPage + 1) * PAGE_SIZE - 1);
      if (error) { setLoadError("追加読み込みに失敗しました"); return; }
      if (!data || data.length < PAGE_SIZE) setHasMore(false);
      const morePkgs = (data ?? []).map((pkg: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gpi = (pkg.gear_package_items ?? []) as any[];
        const items = gpi.map((pi) => pi.gear_items).filter(Boolean);
        return { ...pkg, items, item_count: items.length } as unknown as PublicPackage;
      });
      setAllPackages(prev => [...prev, ...morePkgs]);
      setPage(nextPage);
    } catch { setLoadError("追加読み込みに失敗しました"); }
    setLoadingMore(false);
  };

  const filteredUsers = useMemo(() => {
    let list = [...allUsers];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((u) =>
        u.display_name?.toLowerCase().includes(q) ||
        u.bio?.toLowerCase().includes(q) ||
        u.home_area?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allUsers, query]);

  // フォロータブではfeedPackagesをフィルタ（山タイプ・検索はクライアント側で追加フィルタ）
  const feedFiltered = useMemo(() => {
    let list = [...feedPackages];
    if (selectedType) list = list.filter((p) => p.mountain_type === selectedType);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.users?.display_name?.toLowerCase().includes(q) ||
          p.items?.some((item) => item.name.toLowerCase().includes(q) || item.brand?.toLowerCase().includes(q))
      );
    }
    return list;
  }, [feedPackages, selectedType, query]);

  const packages = useMemo(() => {
    if (sort === "follow") return feedFiltered;

    let list = [...allPackages];

    // 山タイプフィルター
    if (selectedType) {
      list = list.filter((p) => p.mountain_type === selectedType);
    }

    // テキスト検索
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.users?.display_name?.toLowerCase().includes(q) ||
          p.items?.some((item) => item.name.toLowerCase().includes(q) || item.brand?.toLowerCase().includes(q))
      );
    }

    // ソート
    if (sort === "light") {
      list = list
        .filter((p) => p.total_weight_g > 0)
        .sort((a, b) => a.total_weight_g - b.total_weight_g);
    }
    if (sort === "popular") {
      list = list.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
    }

    return list;
  }, [allPackages, sort, selectedType, query, feedFiltered]);

  const tabs: { key: SortKey; label: string; loginRequired?: boolean; icon?: React.ReactNode }[] = [
    { key: "new", label: "新着" },
    { key: "light", label: "軽量順" },
    { key: "popular", label: "人気順", icon: <Heart className="h-3.5 w-3.5" /> },
    { key: "follow", label: "フォロー中", loginRequired: true },
    { key: "users", label: "ユーザー", icon: <Users className="h-3.5 w-3.5" /> },
    { key: "gear", label: "装備で探す", icon: <Backpack className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-background">

      {/* ヘッダー */}
      <HeaderGradient variant="explore">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 flex items-end justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <SonaeLogoIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-white/70">Sonae</span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">みんなの装備</h1>
              <Globe className="h-5 w-5 text-green-400 shrink-0" />
            </div>
            <p className="text-sm text-white/60 max-w-lg">
              登山者たちが公開した装備パッケージを参考にしよう。
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mascot.png" alt="雷鳥マスコット" className="h-24 sm:h-36 shrink-0 drop-shadow-lg" />
        </div>
      </HeaderGradient>

      {/* フィルターバー */}
      <div className="bg-background/95 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 space-y-3">

          {/* タブ */}
          <div className="flex gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map(({ key, label, loginRequired, icon }) => {
              const disabled = loginRequired && !currentUserId;
              return (
                <button
                  key={key}
                  onClick={() => { if (!disabled) { setSort(key); setQuery(""); setSelectedType(null); } }}
                  disabled={disabled}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors whitespace-nowrap",
                    sort === key
                      ? "bg-primary text-primary-foreground"
                      : disabled
                      ? "text-muted-foreground/40 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {icon}{label}
                  {loginRequired && !currentUserId && (
                    <span className="ml-1 text-[10px]">要ログイン</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 山タイプチップ + 検索 */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              {sort === "gear" ? (
                <>
                  <input
                    type="text"
                    value={gearQuery}
                    onChange={(e) => { setGearQuery(e.target.value); setShowGearSuggest(true); }}
                    onFocus={() => setShowGearSuggest(true)}
                    onBlur={() => { if (!composingRef.current) setTimeout(() => setShowGearSuggest(false), 150); }}
                    onCompositionStart={() => { composingRef.current = true; }}
                    onCompositionEnd={(e) => { composingRef.current = false; setGearQuery((e.target as HTMLInputElement).value); setShowGearSuggest(true); }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) { setShowGearSuggest(false); searchByGear(); } }}
                    placeholder="装備名・ブランドで検索"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-card pl-8 pr-20 py-1.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {gearQuery && (
                    <button onClick={() => { setGearQuery(""); setGearPackages([]); setGearSearched(false); setShowGearSuggest(false); }} className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => { setShowGearSuggest(false); searchByGear(); }}
                    disabled={!gearQuery.trim() || gearSearchLoading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                  >
                    検索
                  </button>
                  {/* サジェストドロップダウン */}
                  {showGearSuggest && gearSuggestions.length > 0 && (
                    <ul
                      className="absolute z-20 mt-1 top-full left-0 w-full max-h-64 overflow-y-auto rounded-lg border border-border bg-card shadow-lg overscroll-contain"
                      onPointerDown={(e) => e.preventDefault()}
                    >
                      {gearSuggestions.map((s, i) => (
                        <li key={`${s.type}-${s.label}-${i}`}>
                          <button
                            type="button"
                            onClick={() => {
                              setGearQuery(s.label);
                              setShowGearSuggest(false);
                              searchByGear(s.label);
                            }}
                            className="w-full px-3.5 py-2.5 text-left hover:bg-accent active:bg-accent/80 transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{s.label}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{s.sub}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={sort === "users" ? "ユーザー名・エリアで検索" : "パッケージ名・ユーザーで検索"}
                    className="w-full rounded-lg border border-border bg-card pl-8 pr-3 py-1.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>
            {sort !== "users" && (
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedType(null)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    selectedType === null
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  すべて
                </button>
                {MOUNTAIN_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      selectedType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">

        {/* 週間ランキングへの導線 */}
        <Link
          href="/ranking"
          className="mb-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 hover:bg-amber-50 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Trophy className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900">週間人気ランキング</span>
            <span className="text-xs text-amber-600/80">今週のトレンド装備をチェック</span>
          </div>
          <span className="text-xs font-medium text-amber-600 group-hover:underline">見る →</span>
        </Link>

        {/* 装備で探す */}
        {sort === "gear" && (
          <>
            {!gearSearched && !gearSearchLoading && (
              <div className="rounded-xl border border-dashed border-border py-24 text-center">
                <Backpack className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
                <p className="text-sm font-semibold text-foreground mb-1">装備名やブランドで検索</p>
                <p className="text-xs text-muted-foreground">例：「ダウンハガー」「ストームクルーザー」「mont-bell」</p>
              </div>
            )}
            {gearSearchLoading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 rounded-xl border border-border bg-card animate-pulse" />
                ))}
              </div>
            )}
            {gearError && (
              <div className="rounded-xl border border-red-200 bg-red-50 py-4 px-4 text-center mb-4">
                <p className="text-sm text-red-700">{gearError}</p>
              </div>
            )}
            {gearSearched && !gearSearchLoading && gearPackages.length === 0 && !gearError && (
              <div className="rounded-xl border border-dashed border-border py-24 text-center">
                <Search className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
                <p className="text-sm font-semibold text-foreground mb-1">「{gearQuery}」を含むパッケージが見つかりません</p>
                <p className="text-xs text-muted-foreground">別の装備名やブランド名で試してみてください</p>
              </div>
            )}
            {gearSearched && !gearSearchLoading && gearPackages.length > 0 && (
              <>
                <p className="text-xs text-muted-foreground mb-4">「{gearQuery}」を含むパッケージ {gearPackages.length} 件{gearHasMore ? "+" : ""}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gearPackages.map((pkg) => {
                    const w = pkg.total_weight_g ?? 0;
                    const itemCount = pkg.item_count ?? pkg.gear_package_items?.[0]?.count ?? 0;
                    const creator = pkg.users;
                    const creatorName = creator?.display_name ?? "匿名ユーザー";
                    const items = pkg.items ?? [];
                    return (
                      <div key={pkg.id} onClick={() => router.push(`/packages/${pkg.id}/public`)}
                        className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all overflow-hidden cursor-pointer">
                        <div className="flex-1 p-4 pb-3">
                          <Link
                            href={`/u/${pkg.user_id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 mb-3 hover:opacity-80 transition-opacity w-fit"
                          >
                            <Avatar name={creatorName} avatarUrl={creator?.avatar_url} size="sm" />
                            <span className="text-xs text-muted-foreground truncate">{creatorName}</span>
                          </Link>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-2 flex-1">{pkg.name}</h2>
                          </div>
                          {pkg.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{pkg.description}</p>
                          )}
                          {/* 装備アイテム一覧 */}
                          {items.length > 0 && (
                            <div className="mb-2">
                              <div className="flex flex-wrap gap-1">
                                {items.slice(0, 8).map((item, i) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-tight",
                                      item.name.toLowerCase().includes(gearQuery.toLowerCase()) || item.brand?.toLowerCase().includes(gearQuery.toLowerCase())
                                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                                        : "bg-secondary text-muted-foreground"
                                    )}
                                  >
                                    {item.image_url && (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={item.image_url} alt="" className="h-3.5 w-3.5 rounded-sm object-cover" />
                                    )}
                                    {item.name}
                                  </span>
                                ))}
                                {items.length > 8 && (
                                  <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground bg-secondary">
                                    +{items.length - 8}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {pkg.mountain_type && (
                              <span className="rounded-full border border-border bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-primary">
                                {pkg.mountain_type}
                              </span>
                            )}
                            {w > 0 && <ULScore weightG={w} />}
                          </div>
                        </div>
                        <div className="border-t border-border px-4 py-3 bg-secondary/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-foreground tabular-nums">
                                {w > 0 ? formatWeight(w) : "—"}
                              </span>
                              {itemCount > 0 && (
                                <span className="text-xs text-muted-foreground">{itemCount} 点</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <ReactionButton packageId={pkg.id} initialLikeCount={pkg.like_count} compact />
                              <CopyPackageButton packageId={pkg.id} creatorId={pkg.user_id} compact items={items} />
                            </div>
                          </div>
                          {w > 0 && (
                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (w / WEIGHT_BAR_MAX) * 100)}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {gearHasMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => searchByGear(undefined, gearPage + 1)}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      もっと見る
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ユーザー一覧 */}
        {sort === "users" && (
          <>
            {usersLoading && (
              <div className="grid gap-3 sm:grid-cols-2">
                {[1,2,3,4].map((i) => <div key={i} className="h-24 rounded-xl border border-border bg-card animate-pulse" />)}
              </div>
            )}
            {!usersLoading && filteredUsers.length === 0 && (
              <div className="rounded-xl border border-dashed border-border py-24 text-center">
                <Users className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
                <p className="text-sm font-semibold text-foreground mb-1">
                  {query ? "条件に合うユーザーが見つかりません" : "まだ公開ユーザーがいません"}
                </p>
                {query && (
                  <button onClick={() => setQuery("")} className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-3.5 w-3.5" />検索をリセット
                  </button>
                )}
              </div>
            )}
            {!usersLoading && filteredUsers.length > 0 && (
              <>
                <p className="text-xs text-muted-foreground mb-4">{filteredUsers.length} 人</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredUsers.map((user) => {
                    const name = user.display_name ?? "Sonaeユーザー";
                    const initial = name.slice(0, 1).toUpperCase();
                    return (
                      <Link key={user.id} href={`/u/${user.id}`}
                        className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/30 hover:shadow-sm transition-all group">
                        {user.avatar_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={user.avatar_url} alt={name} className="h-12 w-12 rounded-full object-cover shrink-0 ring-2 ring-border" />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] text-lg font-black text-white select-none">
                            {initial}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{name}</p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            {user.experience_level && (
                              <span className="text-xs text-muted-foreground">{EXPERIENCE_LABEL[user.experience_level]}</span>
                            )}
                            {user.home_area && (
                              <span className="text-xs text-muted-foreground">{user.home_area}</span>
                            )}
                            <span className="text-xs text-muted-foreground">{user.packageCount} 件のパッケージ</span>
                          </div>
                          {user.bio && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{user.bio}</p>
                          )}
                        </div>
                        <span className="shrink-0 text-[10px] font-semibold text-primary group-hover:underline whitespace-nowrap">見る →</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {sort !== "users" && sort !== "gear" && (sort === "follow" ? feedLoading : loading) && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        )}

        {loadError && sort !== "follow" && sort !== "gear" && (
          <div className="rounded-xl border border-red-200 bg-red-50 py-4 px-4 text-center mb-4">
            <p className="text-sm text-red-700">{loadError}</p>
          </div>
        )}

        {feedError && sort === "follow" && (
          <div className="rounded-xl border border-red-200 bg-red-50 py-4 px-4 text-center mb-4">
            <p className="text-sm text-red-700">{feedError}</p>
          </div>
        )}

        {sort !== "users" && sort !== "gear" && !(sort === "follow" ? feedLoading : loading) && packages.length === 0 && !feedError && !loadError && (
          <div className="rounded-xl border border-dashed border-border py-24 text-center">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
            {sort === "follow" ? (
              <>
                <p className="text-sm font-semibold text-foreground mb-1">フォロー中のユーザーの公開パッケージがありません</p>
                <p className="text-xs text-muted-foreground mb-6">「みんなの装備」からユーザーをフォローしよう</p>
                <button onClick={() => setSort("new")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  新着を見る
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {query || selectedType ? "条件に合うパッケージが見つかりません" : "まだ公開パッケージがありません"}
                </p>
                {(query || selectedType) && (
                  <button
                    onClick={() => { setQuery(""); setSelectedType(null); }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-3.5 w-3.5" />フィルターをリセット
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {sort !== "users" && sort !== "gear" && !(sort === "follow" ? feedLoading : loading) && packages.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground mb-4">{packages.length} 件</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => {
                const w = pkg.total_weight_g ?? 0;
                const itemCount = pkg.item_count ?? pkg.gear_package_items?.[0]?.count ?? 0;
                const creator = pkg.users;
                const creatorName = creator?.display_name ?? "匿名ユーザー";
                const items = pkg.items ?? [];
                return (
                  <div key={pkg.id} onClick={() => router.push(`/packages/${pkg.id}/public`)}
                    className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all overflow-hidden cursor-pointer">
                    <div className="flex-1 p-4 pb-3">
                      <Link
                        href={`/u/${pkg.user_id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 mb-3 hover:opacity-80 transition-opacity w-fit"
                      >
                        <Avatar name={creatorName} avatarUrl={creator?.avatar_url} size="sm" />
                        <span className="text-xs text-muted-foreground truncate">{creatorName}</span>
                      </Link>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-2 flex-1">{pkg.name}</h2>
                      </div>
                      {pkg.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{pkg.description}</p>
                      )}
                      {/* 装備アイテム一覧 */}
                      {items.length > 0 && (
                        <div className="mb-2">
                          <div className="flex flex-wrap gap-1">
                            {items.slice(0, 6).map((item, i) => (
                              <span key={i} className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] leading-tight text-muted-foreground">
                                {item.image_url && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={item.image_url} alt="" className="h-3.5 w-3.5 rounded-sm object-cover" />
                                )}
                                {item.name}
                              </span>
                            ))}
                            {items.length > 6 && (
                              <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground bg-secondary">
                                +{items.length - 6}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {pkg.mountain_type && (
                          <span className="rounded-full border border-border bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {pkg.mountain_type}
                          </span>
                        )}
                        {w > 0 && <ULScore weightG={w} />}
                      </div>
                    </div>
                    <div className="border-t border-border px-4 py-3 bg-secondary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground tabular-nums">
                            {w > 0 ? formatWeight(w) : "—"}
                          </span>
                          {itemCount > 0 && (
                            <span className="text-xs text-muted-foreground">{itemCount} 点</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <ReactionButton packageId={pkg.id} initialLikeCount={pkg.like_count} compact />
                          <CopyPackageButton packageId={pkg.id} creatorId={pkg.user_id} compact items={items} />
                        </div>
                      </div>
                      {w > 0 && (
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (w / WEIGHT_BAR_MAX) * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {((sort === "new" && hasMore) || (sort === "follow" && feedHasMore)) && (
              <div className="mt-6 text-center">
                <button
                  onClick={sort === "follow" ? loadMoreFeed : loadMore}
                  disabled={sort === "follow" ? feedLoadingMore : loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  {(sort === "follow" ? feedLoadingMore : loadingMore) ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />読み込み中...</>
                  ) : (
                    "もっと見る"
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <Weight className="mx-auto h-8 w-8 text-primary mb-3" />
          <h3 className="text-base font-bold text-foreground mb-1">自分の装備を管理しよう</h3>
          <p className="text-sm text-muted-foreground mb-4">AIが山に合わせた装備セットを提案。荷物忘れゼロを目指そう。</p>
          {currentUserId ? (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/packages" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
                マイパッケージを見る
              </Link>
              <Link href="/ai-suggest" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors whitespace-nowrap">
                AI提案を試す
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                無料で始める
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                ログインして使う
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
