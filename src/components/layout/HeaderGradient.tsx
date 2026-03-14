import { ReactNode } from "react";

type HeaderVariant = "gear" | "packages" | "explore" | "ai" | "profile" | "plans" | "public";

const VARIANTS: Record<
  HeaderVariant,
  { gradient: string; radial: string; patternId: string }
> = {
  gear: {
    gradient: "bg-gradient-to-r from-[#03080d] via-[#0d1f15] to-[#1a3d25]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_70%_40%,rgba(180,140,60,0.12),transparent)]",
    patternId: "dots",
  },
  packages: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]",
    radial:
      "bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(52,211,153,0.15),transparent)]",
    patternId: "contour",
  },
  explore: {
    gradient: "bg-gradient-to-bl from-[#03080d] via-[#071a18] to-[#0f3a35]",
    radial:
      "bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(56,189,248,0.12),transparent)]",
    patternId: "compass",
  },
  ai: {
    gradient: "bg-gradient-to-b from-[#03080d] via-[#0d0f1f] to-[#1a1535]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(139,92,246,0.15),transparent)]",
    patternId: "neural",
  },
  profile: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]",
    radial:
      "bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(20,75,44,0.4),transparent)]",
    patternId: "ridge",
  },
  plans: {
    gradient: "bg-gradient-to-r from-[#03080d] via-[#1a1508] to-[#2a2010]",
    radial:
      "bg-[radial-gradient(ellipse_50%_60%_at_60%_40%,rgba(251,191,36,0.12),transparent)]",
    patternId: "stars",
  },
  public: {
    gradient: "bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]",
    radial:
      "bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(52,211,153,0.12),transparent)]",
    patternId: "contour",
  },
};

function SvgPattern({ id }: { id: string }) {
  switch (id) {
    case "dots":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-dots)" />
        </svg>
      );
    case "contour":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-contour" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q30 8 60 20 Q90 32 120 20" fill="none" stroke="white" strokeWidth="0.8" />
              <path d="M0 35 Q30 28 60 35 Q90 42 120 35" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-contour)" />
        </svg>
      );
    case "compass":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-compass" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <line x1="14" y1="16" x2="18" y2="16" stroke="white" strokeWidth="0.6" />
              <line x1="16" y1="14" x2="16" y2="18" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-compass)" />
        </svg>
      );
    case "neural":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-neural" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.2" fill="white" />
              <circle cx="30" cy="30" r="1.2" fill="white" />
              <circle cx="30" cy="10" r="0.8" fill="white" />
              <circle cx="10" cy="30" r="0.8" fill="white" />
              <line x1="10" y1="10" x2="30" y2="30" stroke="white" strokeWidth="0.3" />
              <line x1="30" y1="10" x2="10" y2="30" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#p-neural)" />
        </svg>
      );
    case "ridge":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 85 L15 60 L30 72 L50 35 L65 55 L80 25 L95 50 L100 40 L100 100 L0 100Z" fill="white" fillOpacity="0.5" />
          <path d="M0 90 L20 75 L40 82 L55 60 L70 70 L85 50 L100 65 L100 100 L0 100Z" fill="white" fillOpacity="0.3" />
        </svg>
      );
    case "stars":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="p-stars" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M24 8 L25.5 14 L32 14 L27 18 L28.5 24 L24 20 L19.5 24 L21 18 L16 14 L22.5 14Z" fill="white" fillOpacity="0.6" transform="scale(0.4) translate(30,10)" />
              <circle cx="10" cy="38" r="0.6" fill="white" />
              <circle cx="38" cy="8" r="0.5" fill="white" />
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
