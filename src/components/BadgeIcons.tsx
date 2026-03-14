import { ReactElement } from "react";
import { cn } from "@/lib/utils";

type P = { className?: string };

// ─── Level Badge Icons ────────────────────────────────────────────────────────

/** 新人ハイカー: sprout */
export function IconNewbie({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("inline-block", className)} aria-hidden>
      <path d="M8 14.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9.5C8 7 10.5 5.5 13.5 6 13.5 9 11 10.5 8 9.5Z" fill="currentColor" />
      <path d="M8 11.5C8 9 5.5 7.5 2.5 8 2.5 11 5 12.5 8 11.5Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** トレイルハイカー: hiking boot profile */
export function IconTrail({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <rect x="1.5" y="12" width="13" height="2" rx="0.6" />
      <path d="M3.5 12V7.5C3.5 6 4.8 5 6.2 5H8V8.5H11.5V12H3.5Z" />
    </svg>
  );
}

/** 登山家: single peak with snow accent */
export function IconClimber({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M8 2L2 14H14L8 2Z" opacity="0.9" />
      <path d="M8 2L6.5 6.5L8 8.5L9.5 6.5L8 2Z" fill="white" opacity="0.4" />
    </svg>
  );
}

/** 山岳人: twin peaks */
export function IconAlpinist({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M1 14L6 4.5L11 14H1Z" opacity="0.75" />
      <path d="M6.5 14L11.5 3L16.5 14H6.5Z" />
    </svg>
  );
}

/** 山の達人: crown */
export function IconMaster({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M2 12.5H14V14.5H2Z" />
      <path d="M2 12.5L4.5 6L8 9.5L11.5 6L14 12.5H2Z" />
      <circle cx="2" cy="5.5" r="1.2" />
      <circle cx="8" cy="4" r="1.2" />
      <circle cx="14" cy="5.5" r="1.2" />
    </svg>
  );
}

// ─── Specialty Badge Icons ────────────────────────────────────────────────────

/** 低山探検家: gentle hill with pine tree */
export function IconLowMountain({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* hill */}
      <path d="M1 14Q5 7.5 9 10Q12.5 12.5 15 8.5V14H1Z" opacity="0.9" />
      {/* pine tree on hill */}
      <path d="M5 9.5L3.8 12H6.2L5 9.5Z" />
      <path d="M5 7.5L3.5 10.5H6.5L5 7.5Z" />
    </svg>
  );
}

/** 縦走マスター: multi-peak ridgeline traverse */
export function IconAlpine({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M0 14L3.5 7L6.5 11.5L10 4L13.5 8.5L16 6.5V14H0Z" />
    </svg>
  );
}

/** テント職人: A-frame tent with entrance */
export function IconTent({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* left panel */}
      <path d="M8 1.5L1 14H7L8 8.5L8 1.5Z" />
      {/* right panel */}
      <path d="M8 1.5L15 14H9L8 8.5L8 1.5Z" />
    </svg>
  );
}

/** 冬山戦士: ice axe */
export function IconWinter({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={cn("inline-block", className)} aria-hidden>
      {/* shaft */}
      <path d="M4.5 13.5L11.5 3.5" strokeWidth="1.8" />
      {/* axe head */}
      <path d="M9.5 3H13.5V5.5" strokeWidth="1.8" />
      {/* spike */}
      <path d="M4.5 13.5L3 15" strokeWidth="1.5" />
    </svg>
  );
}

/** 富士山ファン: Fuji silhouette with snow cap */
export function IconFuji({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* body — slightly asymmetric like real Fuji */}
      <path d="M8 2L3.5 9C2 11.5 1 14 1 14H15C15 14 14 11.5 12.5 9L8 2Z" opacity="0.9" />
      {/* snow cap */}
      <path d="M8 2L6.2 5.8H9.8L8 2Z" fill="white" opacity="0.5" />
    </svg>
  );
}

/** ウルトラライト: feather */
export function IconUL({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" className={cn("inline-block", className)} aria-hidden>
      {/* vane outline */}
      <path d="M12.5 2C14.5 5 14 10 9.5 12.5L4.5 15" strokeWidth="1.5" />
      {/* quill */}
      <path d="M12.5 2C11 4.5 9 9 9.5 12.5" strokeWidth="1" opacity="0.55" />
      {/* barbs */}
      <path d="M11.5 5.5L9.5 8M11 9L9.5 11" strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}

// ─── Action Badge Icons ──────────────────────────────────────────────────────

/** 初めの一歩: gift box / first package */
export function IconFirstPackage({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <rect x="2" y="7" width="12" height="8" rx="1" opacity="0.85" />
      <rect x="1" y="5.5" width="14" height="3" rx="0.8" />
      <rect x="7" y="5.5" width="2" height="9.5" opacity="0.4" />
      <path d="M8 5.5C8 3 6 1.5 4.5 2.5C3 3.5 4 5.5 8 5.5Z" />
      <path d="M8 5.5C8 3 10 1.5 11.5 2.5C13 3.5 12 5.5 8 5.5Z" opacity="0.8" />
    </svg>
  );
}

/** 装備マニア: backpack with star */
export function IconGear10({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <rect x="4" y="4" width="8" height="10" rx="2" />
      <rect x="5.5" y="2" width="5" height="3" rx="1" opacity="0.6" />
      <path d="M12.5 2.5L13 4L14.5 4L13.5 5L13.8 6.5L12.5 5.7L11.2 6.5L11.5 5L10.5 4L12 4Z" fill="currentColor" />
    </svg>
  );
}

/** 議論好き: speech bubble */
export function IconFirstComment({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M2 3C2 2 3 1 4 1H12C13 1 14 2 14 3V9C14 10 13 11 12 11H6L3.5 13.5C3 14 2 13.6 2 13V3Z" />
      <circle cx="5.5" cy="6" r="1" fill="white" opacity="0.5" />
      <circle cx="8" cy="6" r="1" fill="white" opacity="0.5" />
      <circle cx="10.5" cy="6" r="1" fill="white" opacity="0.5" />
    </svg>
  );
}

/** いいね上手: heart with sparkle */
export function IconFirstLikeGiven({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M8 14S1 9.5 1 5.5C1 3 3 1.5 5 2C6.5 2.3 7.5 3.5 8 4.5C8.5 3.5 9.5 2.3 11 2C13 1.5 15 3 15 5.5C15 9.5 8 14 8 14Z" />
      <path d="M12 1L12.5 2.5L14 3L12.5 3.5L12 5L11.5 3.5L10 3L11.5 2.5Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

// ─── Community Badge Icons ───────────────────────────────────────────────────

/** 人気者: group of people */
export function IconFollowers10({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <circle cx="8" cy="4.5" r="2.5" />
      <path d="M3.5 14C3.5 11 5.5 9 8 9C10.5 9 12.5 11 12.5 14H3.5Z" />
      <circle cx="3" cy="6" r="1.8" opacity="0.5" />
      <path d="M0 14C0 11.5 1 10 3 10C4 10 4.5 10.5 5 11C4 12 3.5 13 3.5 14H0Z" opacity="0.5" />
      <circle cx="13" cy="6" r="1.8" opacity="0.5" />
      <path d="M16 14C16 11.5 15 10 13 10C12 10 11.5 10.5 11 11C12 12 12.5 13 12.5 14H16Z" opacity="0.5" />
    </svg>
  );
}

/** 愛されハイカー: star with heart */
export function IconLikes50({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <path d="M8 1L9.8 5.8L15 6.2L11 9.5L12.2 14.5L8 11.8L3.8 14.5L5 9.5L1 6.2L6.2 5.8Z" />
      <path d="M8 8.5C8.3 7.8 8.8 7.3 9.5 7.2C10.5 7 11.3 7.8 11.3 8.8C11.3 10 8 11.5 8 11.5C8 11.5 4.7 10 4.7 8.8C4.7 7.8 5.5 7 6.5 7.2C7.2 7.3 7.7 7.8 8 8.5Z" fill="white" opacity="0.45" />
    </svg>
  );
}

// ─── Mastery Badge Icons ─────────────────────────────────────────────────────

/** カテゴリ制覇: completed checklist grid */
export function IconAllCategories({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* 3x3 grid of checkmarks */}
      <path d="M2 3L3 4.5L5 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 3L7.5 4.5L9.5 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3L12 4.5L14 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.5L3 9L5 6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 7.5L7.5 9L9.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7.5L12 9L14 6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L3 13.5L5 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 12L7.5 13.5L9.5 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 12L12 13.5L14 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 重量級: heavy backpack with weight indicator */
export function IconHeavyPack({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      <rect x="4" y="3" width="8" height="11" rx="2" />
      <rect x="5.5" y="1" width="5" height="3" rx="1" opacity="0.6" />
      <path d="M6 8H10V12H6Z" fill="white" opacity="0.3" rx="0.5" />
      <text x="8" y="11" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold" opacity="0.6">kg</text>
    </svg>
  );
}

/** ギアコレクター: treasure chest */
export function IconGearCollector({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* chest body */}
      <rect x="1.5" y="7.5" width="13" height="6.5" rx="1" />
      {/* chest lid */}
      <path d="M1.5 7.5C1.5 5 3.5 3 8 3C12.5 3 14.5 5 14.5 7.5H1.5Z" opacity="0.75" />
      {/* clasp */}
      <rect x="6.5" y="6.5" width="3" height="3" rx="0.5" fill="white" opacity="0.35" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

// ─── Style Badge Icons ───────────────────────────────────────────────────────

/** 日帰りマスター: sun with trail */
export function IconDayhike({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* sun */}
      <circle cx="8" cy="5" r="3" />
      {/* rays */}
      <path d="M8 0.5V1.5M8 8.5V9.5M3.5 5H2.5M13.5 5H12.5M4.9 2L5.6 2.7M10.4 2L9.7 2.7M4.9 8L5.6 7.3M10.4 8L9.7 7.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* trail path */}
      <path d="M3 14Q5 11 8 12Q11 13 13 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** 沢ヤ: water splash / stream */
export function IconSawanobori({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={cn("inline-block", className)} aria-hidden>
      {/* water waves */}
      <path d="M1 6Q3 4 5 6Q7 8 9 6Q11 4 13 6Q15 8 15 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 10Q3 8 5 10Q7 12 9 10Q11 8 13 10Q15 12 15 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* splash drops */}
      <circle cx="4" cy="3" r="0.8" opacity="0.6" />
      <circle cx="7" cy="2" r="0.6" opacity="0.5" />
      <circle cx="10" cy="3.5" r="0.7" opacity="0.5" />
      <circle cx="6" cy="13" r="0.7" opacity="0.5" />
      <circle cx="11" cy="13.5" r="0.6" opacity="0.4" />
    </svg>
  );
}

// ─── Lookup helpers ───────────────────────────────────────────────────────────

const LEVEL_ICON_MAP: Record<string, (p: P) => ReactElement> = {
  newbie:   IconNewbie,
  trail:    IconTrail,
  climber:  IconClimber,
  alpinist: IconAlpinist,
  master:   IconMaster,
};

const SPECIALTY_ICON_MAP: Record<string, (p: P) => ReactElement> = {
  lowmountain:     IconLowMountain,
  alpine:          IconAlpine,
  tent:            IconTent,
  winter:          IconWinter,
  fuji:            IconFuji,
  ul:              IconUL,
  first_package:   IconFirstPackage,
  gear_10:         IconGear10,
  first_comment:   IconFirstComment,
  first_like_given: IconFirstLikeGiven,
  followers_10:    IconFollowers10,
  likes_50:        IconLikes50,
  all_categories:  IconAllCategories,
  heavy_pack:      IconHeavyPack,
  gear_collector:  IconGearCollector,
  dayhike:         IconDayhike,
  sawanobori:      IconSawanobori,
};

export function LevelBadgeIcon({ badgeKey, className }: { badgeKey: string; className?: string }) {
  const Icon = LEVEL_ICON_MAP[badgeKey];
  return Icon ? <Icon className={className} /> : null;
}

export function SpecialtyBadgeIcon({ badgeKey, className }: { badgeKey: string; className?: string }) {
  const Icon = SPECIALTY_ICON_MAP[badgeKey];
  return Icon ? <Icon className={className} /> : null;
}
