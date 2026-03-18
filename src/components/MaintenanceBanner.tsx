"use client";

import { Construction } from "lucide-react";

export function MaintenanceBanner() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE !== "true") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
          <Construction className="h-7 w-7 text-amber-600" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-foreground">メンテナンス中</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          現在サービスの改善作業を行っています。<br />
          しばらくお待ちください。
        </p>
        <p className="mt-4 text-xs text-muted-foreground/60">Sonae — 登山装備管理</p>
      </div>
    </div>
  );
}
