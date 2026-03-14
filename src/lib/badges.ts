// ============================================================
// レベルバッジ（総いいね数ベース）
// ============================================================
export type LevelBadge = {
  key: string;
  label: string;
  minLikes: number;
  nextMilestone: number | null;
  ringClass: string;       // avatar ring
  chipBorder: string;
  chipBg: string;
  chipText: string;
};

export const LEVEL_BADGES: LevelBadge[] = [
  {
    key: "newbie",
    label: "新人ハイカー",
    minLikes: 0,
    nextMilestone: 10,
    ringClass: "ring-white/20",
    chipBorder: "border-white/20",
    chipBg: "bg-white/5",
    chipText: "text-white/70",
  },
  {
    key: "trail",
    label: "トレイルハイカー",
    minLikes: 10,
    nextMilestone: 50,
    ringClass: "ring-green-400/80",
    chipBorder: "border-green-400/60",
    chipBg: "bg-green-500/25",
    chipText: "text-green-200",
  },
  {
    key: "climber",
    label: "登山家",
    minLikes: 50,
    nextMilestone: 200,
    ringClass: "ring-emerald-400",
    chipBorder: "border-emerald-400/60",
    chipBg: "bg-emerald-500/25",
    chipText: "text-emerald-200",
  },
  {
    key: "alpinist",
    label: "山岳人",
    minLikes: 200,
    nextMilestone: 1000,
    ringClass: "ring-sky-400",
    chipBorder: "border-sky-400/60",
    chipBg: "bg-sky-500/25",
    chipText: "text-sky-200",
  },
  {
    key: "master",
    label: "山の達人",
    minLikes: 1000,
    nextMilestone: null,
    ringClass: "ring-amber-400",
    chipBorder: "border-amber-400/60",
    chipBg: "bg-amber-400/25",
    chipText: "text-amber-200",
  },
];

export function getLevelBadge(totalLikes: number): LevelBadge {
  return (
    [...LEVEL_BADGES].reverse().find((b) => totalLikes >= b.minLikes) ??
    LEVEL_BADGES[0]
  );
}

// ============================================================
// 専門・実績バッジ
// ============================================================
export type BadgeCategory = "specialty" | "action" | "community" | "mastery" | "style";

export const BADGE_CATEGORY_LABELS: Record<BadgeCategory, string> = {
  specialty: "専門バッジ",
  action: "行動バッジ",
  community: "コミュニティ",
  mastery: "装備マスタリー",
  style: "スタイル",
};

export type SpecialtyBadge = {
  key: string;
  label: string;
  category: BadgeCategory;
  chipBorder: string;
  chipBg: string;
  chipText: string;
  /** ライト背景用テキスト色（公開プロフィール等） */
  chipTextLight: string;
  /** 獲得時のグロー */
  glowClass: string;
  /** ライト背景用グロー */
  glowClassLight: string;
};

export const SPECIALTY_BADGE_DEFS: SpecialtyBadge[] = [
  // ── 専門バッジ ──
  {
    key: "lowmountain",
    label: "低山探検家",
    category: "specialty",
    chipBorder: "border-lime-400/60",
    chipBg: "bg-lime-500/25",
    chipText: "text-lime-200",
    chipTextLight: "text-lime-700",
    glowClass: "shadow-[0_0_12px_rgba(163,230,53,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(101,163,13,0.25)]",
  },
  {
    key: "alpine",
    label: "縦走マスター",
    category: "specialty",
    chipBorder: "border-blue-400/60",
    chipBg: "bg-blue-500/25",
    chipText: "text-blue-200",
    chipTextLight: "text-blue-700",
    glowClass: "shadow-[0_0_12px_rgba(96,165,250,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(59,130,246,0.25)]",
  },
  {
    key: "tent",
    label: "テント職人",
    category: "specialty",
    chipBorder: "border-orange-400/60",
    chipBg: "bg-orange-500/25",
    chipText: "text-orange-200",
    chipTextLight: "text-orange-700",
    glowClass: "shadow-[0_0_12px_rgba(251,146,60,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(234,88,12,0.25)]",
  },
  {
    key: "winter",
    label: "冬山戦士",
    category: "specialty",
    chipBorder: "border-cyan-400/60",
    chipBg: "bg-cyan-500/25",
    chipText: "text-cyan-200",
    chipTextLight: "text-cyan-700",
    glowClass: "shadow-[0_0_12px_rgba(34,211,238,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(6,182,212,0.25)]",
  },
  {
    key: "fuji",
    label: "富士山ファン",
    category: "specialty",
    chipBorder: "border-red-400/60",
    chipBg: "bg-red-500/25",
    chipText: "text-red-200",
    chipTextLight: "text-red-700",
    glowClass: "shadow-[0_0_12px_rgba(248,113,113,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(220,38,38,0.25)]",
  },
  {
    key: "ul",
    label: "ウルトラライト",
    category: "specialty",
    chipBorder: "border-violet-400/60",
    chipBg: "bg-violet-500/25",
    chipText: "text-violet-200",
    chipTextLight: "text-violet-700",
    glowClass: "shadow-[0_0_12px_rgba(167,139,250,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(124,58,237,0.25)]",
  },
  // ── 行動バッジ ──
  {
    key: "first_package",
    label: "初めの一歩",
    category: "action",
    chipBorder: "border-teal-400/60",
    chipBg: "bg-teal-500/25",
    chipText: "text-teal-200",
    chipTextLight: "text-teal-700",
    glowClass: "shadow-[0_0_12px_rgba(45,212,191,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(20,184,166,0.25)]",
  },
  {
    key: "gear_10",
    label: "装備マニア",
    category: "action",
    chipBorder: "border-rose-400/60",
    chipBg: "bg-rose-500/25",
    chipText: "text-rose-200",
    chipTextLight: "text-rose-700",
    glowClass: "shadow-[0_0_12px_rgba(251,113,133,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(225,29,72,0.25)]",
  },
  {
    key: "first_comment",
    label: "議論好き",
    category: "action",
    chipBorder: "border-fuchsia-400/60",
    chipBg: "bg-fuchsia-500/25",
    chipText: "text-fuchsia-200",
    chipTextLight: "text-fuchsia-700",
    glowClass: "shadow-[0_0_12px_rgba(232,121,249,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(192,38,211,0.25)]",
  },
  {
    key: "first_like_given",
    label: "いいね上手",
    category: "action",
    chipBorder: "border-indigo-400/60",
    chipBg: "bg-indigo-500/25",
    chipText: "text-indigo-200",
    chipTextLight: "text-indigo-700",
    glowClass: "shadow-[0_0_12px_rgba(129,140,248,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(99,102,241,0.25)]",
  },
  // ── コミュニティバッジ ──
  {
    key: "followers_10",
    label: "人気者",
    category: "community",
    chipBorder: "border-pink-400/60",
    chipBg: "bg-pink-500/25",
    chipText: "text-pink-200",
    chipTextLight: "text-pink-700",
    glowClass: "shadow-[0_0_12px_rgba(244,114,182,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(219,39,119,0.25)]",
  },
  {
    key: "likes_50",
    label: "愛されハイカー",
    category: "community",
    chipBorder: "border-yellow-400/60",
    chipBg: "bg-yellow-500/25",
    chipText: "text-yellow-200",
    chipTextLight: "text-yellow-700",
    glowClass: "shadow-[0_0_12px_rgba(250,204,21,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(202,138,4,0.25)]",
  },
  // ── 装備マスタリーバッジ ──
  {
    key: "all_categories",
    label: "カテゴリ制覇",
    category: "mastery",
    chipBorder: "border-emerald-400/60",
    chipBg: "bg-emerald-500/25",
    chipText: "text-emerald-200",
    chipTextLight: "text-emerald-700",
    glowClass: "shadow-[0_0_12px_rgba(52,211,153,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(16,185,129,0.25)]",
  },
  {
    key: "heavy_pack",
    label: "重量級",
    category: "mastery",
    chipBorder: "border-stone-400/60",
    chipBg: "bg-stone-500/25",
    chipText: "text-stone-200",
    chipTextLight: "text-stone-700",
    glowClass: "shadow-[0_0_12px_rgba(168,162,158,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(120,113,108,0.25)]",
  },
  {
    key: "gear_collector",
    label: "ギアコレクター",
    category: "mastery",
    chipBorder: "border-amber-400/60",
    chipBg: "bg-amber-500/25",
    chipText: "text-amber-200",
    chipTextLight: "text-amber-700",
    glowClass: "shadow-[0_0_12px_rgba(251,191,36,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(217,119,6,0.25)]",
  },
  // ── スタイルバッジ ──
  {
    key: "dayhike",
    label: "日帰りマスター",
    category: "style",
    chipBorder: "border-sky-400/60",
    chipBg: "bg-sky-500/25",
    chipText: "text-sky-200",
    chipTextLight: "text-sky-700",
    glowClass: "shadow-[0_0_12px_rgba(56,189,248,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(14,165,233,0.25)]",
  },
  {
    key: "sawanobori",
    label: "沢ヤ",
    category: "style",
    chipBorder: "border-blue-300/60",
    chipBg: "bg-blue-400/25",
    chipText: "text-blue-100",
    chipTextLight: "text-blue-600",
    glowClass: "shadow-[0_0_12px_rgba(147,197,253,0.35)]",
    glowClassLight: "shadow-[0_0_10px_rgba(37,99,235,0.25)]",
  },
];

// カテゴリ別にグループ化
export function getBadgesByCategory(): Record<BadgeCategory, SpecialtyBadge[]> {
  const groups: Record<BadgeCategory, SpecialtyBadge[]> = {
    specialty: [], action: [], community: [], mastery: [], style: [],
  };
  for (const b of SPECIALTY_BADGE_DEFS) {
    groups[b.category].push(b);
  }
  return groups;
}

type PackageForBadge = {
  mountain_type?: string | null;
  total_weight_g?: number | null;
};

// 後方互換: パッケージのみからバッジ計算
export function getSpecialtyBadges(packages: PackageForBadge[]): SpecialtyBadge[] {
  return getAllBadges({ packages, gearCount: 0, usedCategoryCount: 0, commentCount: 0, likeGivenCount: 0, followerCount: 0, totalLikesReceived: 0 });
}

// 全バッジ計算
export type BadgeContext = {
  packages: PackageForBadge[];
  gearCount: number;
  usedCategoryCount: number;
  commentCount: number;
  likeGivenCount: number;
  followerCount: number;
  totalLikesReceived: number;
};

const TOTAL_CATEGORIES = 10; // mockCategories の数

export function getAllBadges(ctx: BadgeContext): SpecialtyBadge[] {
  const find = (key: string) => SPECIALTY_BADGE_DEFS.find((b) => b.key === key)!;
  const types = new Set(ctx.packages.map((p) => p.mountain_type ?? ""));
  const earned: SpecialtyBadge[] = [];

  // 専門バッジ
  if (types.has("低山・ハイキング")) earned.push(find("lowmountain"));
  if (types.has("高山・縦走"))       earned.push(find("alpine"));
  if (types.has("テント泊"))         earned.push(find("tent"));
  if (types.has("冬山"))             earned.push(find("winter"));
  if (types.has("富士山"))           earned.push(find("fuji"));
  if (ctx.packages.some((p) => (p.total_weight_g ?? Infinity) < 5000))
    earned.push(find("ul"));

  // 行動バッジ
  if (ctx.packages.length >= 1)   earned.push(find("first_package"));
  if (ctx.gearCount >= 10)        earned.push(find("gear_10"));
  if (ctx.commentCount >= 1)      earned.push(find("first_comment"));
  if (ctx.likeGivenCount >= 1)    earned.push(find("first_like_given"));

  // コミュニティバッジ
  if (ctx.followerCount >= 10)       earned.push(find("followers_10"));
  if (ctx.totalLikesReceived >= 50)  earned.push(find("likes_50"));

  // 装備マスタリーバッジ
  if (ctx.usedCategoryCount >= TOTAL_CATEGORIES) earned.push(find("all_categories"));
  if (ctx.packages.some((p) => (p.total_weight_g ?? 0) >= 15000))
    earned.push(find("heavy_pack"));
  if (ctx.gearCount >= 30)        earned.push(find("gear_collector"));

  // スタイルバッジ
  if (types.has("日帰りハイク")) earned.push(find("dayhike"));
  if (types.has("沢登り"))       earned.push(find("sawanobori"));

  return earned;
}
