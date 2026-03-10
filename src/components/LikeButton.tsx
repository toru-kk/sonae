"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Props = {
  packageId: string;
  initialLikeCount?: number;
  compact?: boolean;
};

export function LikeButton({ packageId, initialLikeCount = 0, compact = false }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: like } = await (supabase as any)
        .from("package_likes")
        .select("id")
        .eq("user_id", uid)
        .eq("package_id", packageId)
        .maybeSingle();
      setLiked(!!like);
    });
  }, [packageId]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId === undefined || loading) return;
    if (!userId) {
      window.location.href = `/login?redirect=/packages/${packageId}/public`;
      return;
    }
    setLoading(true);
    const method = liked ? "DELETE" : "POST";
    const res = await fetch(`/api/packages/${packageId}/like`, { method });
    if (res.ok) {
      setLiked(!liked);
      setCount((c) => c + (liked ? -1 : 1));
    }
    setLoading(false);
  };

  if (compact) {
    return (
      <button
        onClick={toggle}
        disabled={loading || userId === undefined}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50",
          liked
            ? "text-rose-500 bg-rose-50 hover:bg-rose-100"
            : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
        )}
      >
        <Heart className={cn("h-3 w-3", liked && "fill-current")} />
        {count > 0 && <span>{count}</span>}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={loading || userId === undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50",
        liked
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border-border bg-card text-foreground hover:border-rose-200 hover:text-rose-500"
      )}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      {liked ? "いいね済み" : "いいね"}
      {count > 0 && <span className="tabular-nums text-xs opacity-70">{count}</span>}
    </button>
  );
}
