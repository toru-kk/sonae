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

// ─── Lookup helpers ───────────────────────────────────────────────────────────

const LEVEL_ICON_MAP: Record<string, (p: P) => ReactElement> = {
  newbie:   IconNewbie,
  trail:    IconTrail,
  climber:  IconClimber,
  alpinist: IconAlpinist,
  master:   IconMaster,
};

const SPECIALTY_ICON_MAP: Record<string, (p: P) => ReactElement> = {
  lowmountain: IconLowMountain,
  alpine:      IconAlpine,
  tent:        IconTent,
  winter:      IconWinter,
  fuji:        IconFuji,
  ul:          IconUL,
};

export function LevelBadgeIcon({ badgeKey, className }: { badgeKey: string; className?: string }) {
  const Icon = LEVEL_ICON_MAP[badgeKey];
  return Icon ? <Icon className={className} /> : null;
}

export function SpecialtyBadgeIcon({ badgeKey, className }: { badgeKey: string; className?: string }) {
  const Icon = SPECIALTY_ICON_MAP[badgeKey];
  return Icon ? <Icon className={className} /> : null;
}
