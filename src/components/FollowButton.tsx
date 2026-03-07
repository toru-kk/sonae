"use client";

import { useState } from "react";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  targetUserId: string;
  initialFollowed: boolean;
  initialCount: number;
}

export function FollowButton({ targetUserId, initialFollowed, initialCount }: FollowButtonProps) {
  const [followed, setFollowed] = useState(initialFollowed);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/follow/${targetUserId}`, {
        method: followed ? "DELETE" : "POST",
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (res.ok) {
        setFollowed((f) => !f);
        setCount((c) => (followed ? c - 1 : c + 1));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        disabled={loading}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-60",
          followed
            ? "border border-border bg-secondary text-foreground hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : followed ? (
          <UserCheck className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {followed ? "フォロー中" : "フォローする"}
      </button>
      {count > 0 && (
        <span className="text-sm text-white/50">
          <span className="font-semibold text-white/80">{count}</span> フォロワー
        </span>
      )}
    </div>
  );
}
