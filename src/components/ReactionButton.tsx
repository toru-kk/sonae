"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { REACTION_ICON_MAP } from "@/components/BadgeIcons";

type ReactionType = "heart" | "reference" | "light" | "impressive" | "want";

const REACTIONS: {
  type: ReactionType;
  label: string;
  activeText: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  { type: "heart", label: "いいね", activeText: "text-rose-500", activeBg: "bg-rose-50", activeBorder: "border-rose-200" },
  { type: "reference", label: "参考になった", activeText: "text-blue-500", activeBg: "bg-blue-50", activeBorder: "border-blue-200" },
  { type: "light", label: "軽い！", activeText: "text-violet-500", activeBg: "bg-violet-50", activeBorder: "border-violet-200" },
  { type: "impressive", label: "すごい！", activeText: "text-amber-500", activeBg: "bg-amber-50", activeBorder: "border-amber-200" },
  { type: "want", label: "欲しい！", activeText: "text-emerald-500", activeBg: "bg-emerald-50", activeBorder: "border-emerald-200" },
];

type Props = {
  packageId: string;
  initialLikeCount?: number;
  compact?: boolean;
};

export function ReactionButton({ packageId, initialLikeCount = 0, compact = false }: Props) {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [totalCount, setTotalCount] = useState(initialLikeCount);
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
        .select("reaction_type")
        .eq("user_id", uid)
        .eq("package_id", packageId)
        .maybeSingle();
      if (like?.reaction_type) {
        setUserReaction(like.reaction_type as ReactionType);
      }
    });
  }, [packageId]);

  const handleReaction = async (type: ReactionType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId === undefined || loading) return;
    if (!userId) {
      window.location.href = `/login?redirect=/packages/${packageId}/public`;
      return;
    }

    setLoading(true);

    if (type === userReaction) {
      // 同じリアクションをタップ → 取り消し
      const res = await fetch(`/api/packages/${packageId}/like`, { method: "DELETE" });
      if (res.ok) {
        setUserReaction(null);
        setTotalCount((c) => c - 1);
      }
    } else {
      // 新規 or 切り替え
      const isNew = userReaction === null;
      const res = await fetch(`/api/packages/${packageId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction_type: type }),
      });
      if (res.ok) {
        setUserReaction(type);
        if (isNew) setTotalCount((c) => c + 1);
      }
    }

    setLoading(false);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-0.5">
        {REACTIONS.map((r) => {
          const Icon = REACTION_ICON_MAP[r.type];
          const isActive = userReaction === r.type;
          return (
            <button
              key={r.type}
              onClick={(e) => handleReaction(r.type, e)}
              disabled={loading || userId === undefined}
              title={r.label}
              className={cn(
                "inline-flex items-center justify-center rounded-md p-1.5 transition-colors disabled:opacity-50",
                isActive
                  ? `${r.activeText} ${r.activeBg}`
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
        {totalCount > 0 && (
          <span className="ml-1 text-xs font-medium text-muted-foreground tabular-nums">{totalCount}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {REACTIONS.map((r) => {
        const Icon = REACTION_ICON_MAP[r.type];
        const isActive = userReaction === r.type;
        return (
          <button
            key={r.type}
            onClick={(e) => handleReaction(r.type, e)}
            disabled={loading || userId === undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-colors disabled:opacity-50",
              isActive
                ? `${r.activeBorder} ${r.activeBg} ${r.activeText}`
                : "border-border bg-card text-muted-foreground hover:border-gray-300 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {r.label}
          </button>
        );
      })}
      {totalCount > 0 && (
        <span className="ml-1 text-sm font-medium text-muted-foreground tabular-nums">
          {totalCount}
        </span>
      )}
    </div>
  );
}
