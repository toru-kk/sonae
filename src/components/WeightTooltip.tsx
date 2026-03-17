"use client";

import { HelpCircle, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

export function WeightTooltip({ variant = "light" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number; openBelow: boolean }>({ top: 0, right: 16, openBelow: false });
  const ref = useRef<HTMLDivElement>(null);

  const calcPos = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const openBelow = spaceAbove < 220;
    setPos({
      top: openBelow ? rect.bottom + 8 : rect.top - 8,
      right: Math.max(16, window.innerWidth - rect.right),
      openBelow,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    calcPos();
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, calcPos]);

  const isDark = variant === "dark";

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors",
          isDark
            ? "text-white/40 hover:text-white/70"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="重量の定義"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          className={cn(
            "fixed z-50 w-64 rounded-xl border p-3.5 shadow-lg text-left",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            isDark
              ? "border-white/10 bg-gray-900 text-white/90"
              : "border-border bg-card text-foreground"
          )}
          style={{
            top: pos.top,
            right: pos.right,
            transform: pos.openBelow ? undefined : "translateY(-100%)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold">重量の定義</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-full p-0.5 transition-colors",
                isDark ? "hover:bg-white/10" : "hover:bg-secondary"
              )}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <dl className="space-y-1.5 text-[11px] leading-relaxed">
            <div>
              <dt className="font-bold text-primary">ベースウェイト（携行）</dt>
              <dd className={isDark ? "text-white/60" : "text-muted-foreground"}>
                パックに入れる固定装備の重量。食料・水・着用中の衣類を除く
              </dd>
            </div>
            <div>
              <dt className="font-bold text-violet-500">着用</dt>
              <dd className={isDark ? "text-white/60" : "text-muted-foreground"}>
                行動中に身につけている衣類・靴など
              </dd>
            </div>
            <div>
              <dt className="font-bold text-amber-500">消耗品</dt>
              <dd className={isDark ? "text-white/60" : "text-muted-foreground"}>
                食料・水・燃料など行程中に消費するもの
              </dd>
            </div>
            <div className={cn("pt-1 border-t", isDark ? "border-white/10" : "border-border")}>
              <dt className="font-bold">合計</dt>
              <dd className={isDark ? "text-white/60" : "text-muted-foreground"}>
                すべての装備の総重量
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
