"use client";

import { useState } from "react";
import { Loader2, Settings } from "lucide-react";

type Props = {
  highlight?: boolean;
};

export function PlanPortalButton({ highlight = false }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
        highlight
          ? "bg-white/20 text-primary-foreground hover:bg-white/30"
          : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          処理中...
        </>
      ) : (
        <>
          <Settings className="h-4 w-4" />
          プランを管理する
        </>
      )}
    </button>
  );
}
