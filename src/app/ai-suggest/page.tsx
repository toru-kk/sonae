"use client";

import { Sparkles } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { HeaderGradient } from "@/components/layout/HeaderGradient";

export default function AiSuggestPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8">

      {/* ブランドヘッダー */}
      <div className="mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 pt-1">
        <HeaderGradient variant="ai" className="rounded-2xl px-5 py-4">
          <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-10 z-10">
            <Sparkles className="h-16 w-16 text-amber-400" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg font-black text-white">AI装備提案</h1>
                <span className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Sonae</span>
              </div>
              <p className="text-xs text-white/50">
                山名・季節・泊数を入力するだけで最適な装備を提案
              </p>
            </div>
          </div>
        </HeaderGradient>
      </div>

      {/* Coming Soon */}
      <div className="rounded-2xl border border-border bg-card py-16 px-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Coming Soon</p>
        <h2 className="text-xl font-black text-foreground mb-3">準備中です</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          AI装備提案機能は現在準備中です。<br />
          もうしばらくお待ちください。
        </p>
      </div>

    </div>
  );
}
