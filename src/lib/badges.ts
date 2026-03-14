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
// 専門バッジ（パッケージの山タイプ・重量ベース）
// ============================================================
export type SpecialtyBadge = {
  key: string;
  label: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
  /** ライト背景用テキスト色（公開プロフィール等） */
  chipTextLight: string;
};

export const SPECIALTY_BADGE_DEFS: SpecialtyBadge[] = [
  {
    key: "lowmountain",
    label: "低山探検家",
    chipBorder: "border-lime-400/60",
    chipBg: "bg-lime-500/25",
    chipText: "text-lime-200",
    chipTextLight: "text-lime-700",
  },
  {
    key: "alpine",
    label: "縦走マスター",
    chipBorder: "border-blue-400/60",
    chipBg: "bg-blue-500/25",
    chipText: "text-blue-200",
    chipTextLight: "text-blue-700",
  },
  {
    key: "tent",
    label: "テント職人",
    chipBorder: "border-orange-400/60",
    chipBg: "bg-orange-500/25",
    chipText: "text-orange-200",
    chipTextLight: "text-orange-700",
  },
  {
    key: "winter",
    label: "冬山戦士",
    chipBorder: "border-cyan-400/60",
    chipBg: "bg-cyan-500/25",
    chipText: "text-cyan-200",
    chipTextLight: "text-cyan-700",
  },
  {
    key: "fuji",
    label: "富士山ファン",
    chipBorder: "border-red-400/60",
    chipBg: "bg-red-500/25",
    chipText: "text-red-200",
    chipTextLight: "text-red-700",
  },
  {
    key: "ul",
    label: "ウルトラライト",
    chipBorder: "border-violet-400/60",
    chipBg: "bg-violet-500/25",
    chipText: "text-violet-200",
    chipTextLight: "text-violet-700",
  },
];

type PackageForBadge = {
  mountain_type?: string | null;
  total_weight_g?: number | null;
};

export function getSpecialtyBadges(packages: PackageForBadge[]): SpecialtyBadge[] {
  const find = (key: string) => SPECIALTY_BADGE_DEFS.find((b) => b.key === key)!;
  const types = new Set(packages.map((p) => p.mountain_type ?? ""));
  const earned: SpecialtyBadge[] = [];

  if (types.has("低山・ハイキング")) earned.push(find("lowmountain"));
  if (types.has("高山・縦走"))       earned.push(find("alpine"));
  if (types.has("テント泊"))         earned.push(find("tent"));
  if (types.has("冬山"))             earned.push(find("winter"));
  if (types.has("富士山"))           earned.push(find("fuji"));
  if (packages.some((p) => (p.total_weight_g ?? Infinity) < 5000))
    earned.push(find("ul"));

  return earned;
}
