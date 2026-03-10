"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

type Props = {
  plan: "standard" | "premium";
  highlight?: boolean;
  label?: string;
};

export function PlanCheckoutButton({ plan, highlight = false, label }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        window.location.href = `/login?redirect=/plans`;
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  const defaultLabel = plan === "standard" ? "スタンダードにする" : "プレミアムにする";

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
        highlight
          ? "bg-white text-primary hover:bg-green-50"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          処理中...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          {label ?? defaultLabel}
        </>
      )}
    </button>
  );
}
