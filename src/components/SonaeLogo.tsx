export function SonaeLogoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      {/* ツインピーク山シルエット（ワンパス） */}
      {/* 左サブピーク → 鞍部 → 右メインピーク */}
      <path
        d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z"
        fill="white"
      />
      {/* 頂上アンバーアクセント */}
      <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
    </svg>
  );
}
