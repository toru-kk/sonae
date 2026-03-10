"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  packageId: string;
  creatorId: string | null;
  compact?: boolean;
};

export function CopyPackageButton({ packageId, creatorId, compact = false }: Props) {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null | undefined>(undefined);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  const isOwn = currentUserId !== undefined && currentUserId !== null && currentUserId === creatorId;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    if (currentUserId === null) {
      router.push(`/login?redirect=/packages/${packageId}/public`);
      return;
    }

    setCopying(true);
    try {
      const res = await fetch(`/api/packages/${packageId}/copy`, { method: "POST" });
      if (res.status === 401) {
        router.push(`/login?redirect=/packages/${packageId}/public`);
        return;
      }
      const data = await res.json();
      if (data.packageId) {
        router.push(`/packages/${data.packageId}`);
      } else {
        setError("コピーに失敗しました");
      }
    } catch {
      setError("エラーが発生しました");
    } finally {
      setCopying(false);
    }
  };

  if (isOwn) {
    return compact ? (
      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed select-none">
        <Copy className="h-3 w-3" />自分のパッケージ
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground cursor-not-allowed select-none">
        <Copy className="h-4 w-4" />自分のパッケージ
      </span>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          onClick={handleClick}
          disabled={copying || currentUserId === undefined}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copying ? <Loader2 className="h-3 w-3 animate-spin" /> : <Copy className="h-3 w-3" />}
          参考にする
        </button>
        {error && <p className="text-[10px] text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleClick}
        disabled={copying || currentUserId === undefined}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copying ? (
          <><Loader2 className="h-4 w-4 animate-spin" />コピー中...</>
        ) : (
          <><Copy className="h-4 w-4" />このセットを参考にする</>
        )}
      </button>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
