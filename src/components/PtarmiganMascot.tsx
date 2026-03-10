export function PtarmiganMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 150"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="68" cy="138" rx="32" ry="6" fill="black" opacity="0.12" />

      {/* Backpack */}
      <rect x="26" y="62" width="16" height="22" rx="4" fill="#2563eb" opacity="0.92" />
      <rect x="27" y="63" width="14" height="9" rx="2" fill="#60a5fa" opacity="0.6" />
      <path d="M29 61 C28 57 30 54 33 54 C36 54 37 57 36 61" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Backpack strap */}
      <path d="M30 84 C28 88 28 92 30 94" stroke="#1d4ed8" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="68" cy="88" rx="36" ry="30" fill="white" opacity="0.96" />

      {/* Body feather spots (ptarmigan summer pattern) */}
      <circle cx="58" cy="82" r="2.5" fill="#d1c9b0" opacity="0.7" />
      <circle cx="70" cy="78" r="2" fill="#d1c9b0" opacity="0.6" />
      <circle cx="80" cy="84" r="2.5" fill="#d1c9b0" opacity="0.65" />
      <circle cx="62" cy="94" r="2" fill="#d1c9b0" opacity="0.5" />
      <circle cx="76" cy="96" r="2.5" fill="#d1c9b0" opacity="0.6" />
      <circle cx="54" cy="96" r="2" fill="#d1c9b0" opacity="0.5" />
      <circle cx="86" cy="94" r="2" fill="#d1c9b0" opacity="0.45" />

      {/* Wing edge */}
      <path d="M36 82 Q44 72 66 76" stroke="#e5e7eb" strokeWidth="2" fill="none" opacity="0.9" />
      <path d="M34 91 Q42 82 63 85" stroke="#e5e7eb" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Sonae label on body */}
      <rect x="55" y="88" width="22" height="8" rx="2" fill="#14532d" opacity="0.85" />
      <text x="66" y="94" fontSize="5.5" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">sonae</text>

      {/* Neck */}
      <ellipse cx="82" cy="72" rx="16" ry="11" fill="white" opacity="0.96" />

      {/* Head */}
      <circle cx="90" cy="52" r="24" fill="white" opacity="0.96" />

      {/* Head feather spots */}
      <circle cx="82" cy="46" r="1.8" fill="#d1c9b0" opacity="0.5" />
      <circle cx="90" cy="42" r="1.5" fill="#d1c9b0" opacity="0.4" />
      <circle cx="98" cy="48" r="1.8" fill="#d1c9b0" opacity="0.45" />

      {/* Eye */}
      <circle cx="102" cy="48" r="5.5" fill="#1e293b" />
      <circle cx="103.8" cy="46.2" r="1.8" fill="white" />
      <circle cx="100.5" cy="50" r="1" fill="#334155" />

      {/* Red eyebrow comb — characteristic of ptarmigan */}
      <path d="M97 40 Q102 34 108 38" stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Beak */}
      <path d="M112 51 L122 53 L112 57 Z" fill="#92764a" />
      <path d="M112 51 L122 53" stroke="#78634a" strokeWidth="0.8" />

      {/* Feet (feathered) */}
      <g stroke="#92764a" strokeWidth="2.2" strokeLinecap="round">
        <line x1="52" y1="116" x2="46" y2="126" />
        <line x1="52" y1="116" x2="52" y2="128" />
        <line x1="52" y1="116" x2="58" y2="126" />
        <line x1="72" y1="117" x2="66" y2="127" />
        <line x1="72" y1="117" x2="72" y2="129" />
        <line x1="72" y1="117" x2="78" y2="127" />
      </g>
      {/* Ankle fluff */}
      <ellipse cx="52" cy="116" rx="5" ry="3.5" fill="white" opacity="0.8" />
      <ellipse cx="72" cy="117" rx="5" ry="3.5" fill="white" opacity="0.8" />

      {/* Cheek blush */}
      <ellipse cx="107" cy="56" rx="4" ry="2.5" fill="#fca5a5" opacity="0.35" />
    </svg>
  );
}
