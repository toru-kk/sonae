import { ReactNode } from "react";

type HeaderVariant = "gear" | "packages" | "explore" | "ai" | "profile" | "plans" | "public";

const VARIANTS: Record<
  HeaderVariant,
  { gradient: string; radial: string; patternId: string }
> = {
  gear: {
    gradient: "bg-gradient-to-r from-[#03080d] via-[#1a2a18] to-[#2a4a28]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_70%_40%,rgba(200,160,60,0.18),transparent)]",
    patternId: "dots",
  },
  packages: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#0a2a1a] to-[#1a6040]",
    radial:
      "bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(52,211,153,0.2),transparent)]",
    patternId: "contour",
  },
  explore: {
    gradient: "bg-gradient-to-bl from-[#03080d] via-[#08201e] to-[#124540]",
    radial:
      "bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(56,189,248,0.18),transparent)]",
    patternId: "compass",
  },
  ai: {
    gradient: "bg-gradient-to-b from-[#03080d] via-[#10102a] to-[#1e1845]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(139,92,246,0.22),transparent)]",
    patternId: "neural",
  },
  profile: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]",
    radial:
      "bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(20,75,44,0.4),transparent)]",
    patternId: "ridge",
  },
  plans: {
    gradient: "bg-gradient-to-r from-[#03080d] via-[#201a08] to-[#352a10]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_60%_40%,rgba(251,191,36,0.18),transparent)]",
    patternId: "stars",
  },
  public: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#0a2a1a] to-[#1a6040]",
    radial:
      "bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(52,211,153,0.18),transparent)]",
    patternId: "contour",
  },
};

function SvgPattern({ id }: { id: string }) {
  switch (id) {
    case "dots":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-dots)" />
        </svg>
      );
    case "contour":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-contour" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
              <path d="M0 15 Q25 5 50 15 Q75 25 100 15" fill="none" stroke="white" strokeWidth="0.7" />
              <path d="M0 35 Q25 25 50 35 Q75 45 100 35" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M0 50 Q25 42 50 50 Q75 58 100 50" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-contour)" />
        </svg>
      );
    case "compass":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-compass" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <line x1="12" y1="14" x2="16" y2="14" stroke="white" strokeWidth="0.5" />
              <line x1="14" y1="12" x2="14" y2="16" stroke="white" strokeWidth="0.5" />
              <circle cx="14" cy="14" r="3" fill="none" stroke="white" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-compass)" />
        </svg>
      );
    case "neural":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-neural" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.5" fill="white" fillOpacity="0.7" />
              <circle cx="28" cy="28" r="1.5" fill="white" fillOpacity="0.7" />
              <circle cx="28" cy="8" r="1" fill="white" fillOpacity="0.5" />
              <circle cx="8" cy="28" r="1" fill="white" fillOpacity="0.5" />
              <circle cx="18" cy="18" r="0.8" fill="white" fillOpacity="0.4" />
              <line x1="8" y1="8" x2="28" y2="28" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
              <line x1="28" y1="8" x2="8" y2="28" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
              <line x1="8" y1="8" x2="18" y2="18" stroke="white" strokeWidth="0.2" strokeOpacity="0.4" />
              <line x1="28" y1="28" x2="18" y2="18" stroke="white" strokeWidth="0.2" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-neural)" />
        </svg>
      );
    case "ridge":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 200 100">
          <path d="M0 85 Q10 78 18 70 Q22 65 28 58 Q32 53 38 48 Q42 44 48 38 Q52 34 55 30 Q58 34 62 40 Q66 46 72 52 Q78 48 82 42 Q86 36 90 28 Q94 32 98 38 Q102 44 108 50 Q114 46 118 40 Q122 34 128 30 Q132 34 136 40 Q140 46 148 55 Q156 50 162 45 Q168 48 175 55 Q182 60 190 65 Q196 70 200 72 L200 100 L0 100Z" fill="white" fillOpacity="0.3" />
          <path d="M0 90 Q12 84 20 78 Q28 72 36 65 Q42 60 50 55 Q56 58 62 63 Q68 60 74 54 Q80 48 86 42 Q92 46 98 52 Q104 56 112 60 Q118 56 124 50 Q130 46 138 42 Q144 46 150 52 Q158 58 166 62 Q174 58 182 55 Q190 60 200 65 L200 100 L0 100Z" fill="white" fillOpacity="0.18" />
          <path d="M0 94 Q15 90 30 86 Q40 83 50 80 Q60 82 70 85 Q80 80 90 76 Q100 78 110 82 Q120 78 130 74 Q140 76 155 80 Q170 78 185 75 Q195 78 200 80 L200 100 L0 100Z" fill="white" fillOpacity="0.1" />
        </svg>
      );
    case "stars":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-stars" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 8 L31.5 13 L37 13 L32.5 16.5 L34 22 L30 18.5 L26 22 L27.5 16.5 L23 13 L28.5 13Z" fill="white" fillOpacity="0.5" transform="scale(0.35) translate(10,5)" />
              <path d="M30 8 L31.5 13 L37 13 L32.5 16.5 L34 22 L30 18.5 L26 22 L27.5 16.5 L23 13 L28.5 13Z" fill="white" fillOpacity="0.3" transform="scale(0.25) translate(160,130)" />
              <circle cx="12" cy="45" r="0.7" fill="white" fillOpacity="0.6" />
              <circle cx="48" cy="12" r="0.5" fill="white" fillOpacity="0.4" />
              <circle cx="35" cy="50" r="0.4" fill="white" fillOpacity="0.3" />
              <circle cx="52" cy="38" r="0.6" fill="white" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-stars)" />
        </svg>
      );
    default:
      return null;
  }
}

type Props = {
  variant: HeaderVariant;
  children: ReactNode;
  className?: string;
};

export function HeaderGradient({ variant, children, className = "" }: Props) {
  const v = VARIANTS[variant];
  return (
    <div
      className={`relative overflow-hidden ${v.gradient} ${className}`}
    >
      <div className={`absolute inset-0 ${v.radial}`} />
      <SvgPattern id={v.patternId} />
      <div className="relative">{children}</div>
    </div>
  );
}
