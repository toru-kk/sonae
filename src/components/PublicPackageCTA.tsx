"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2, Layers, Weight, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function PublicPackageCTA({ packageId, ownerId }: { packageId: string; ownerId: string | null }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
      setIsOwner(!!data.user && data.user.id === ownerId);
    });
  }, [ownerId]);

  const handleCopy = async () => {
    setCopying(true);
    const res = await fetch(`/api/packages/${packageId}/copy`, { method: "POST" });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    const data = await res.json();
    setCopying(false);
    if (data.packageId) {
      router.push(`/packages/${data.packageId}`);
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
        {isLoggedIn && isOwner ? (
          <>
            <p className="mb-3 text-center text-xs text-muted-foreground whitespace-nowrap">
              あなたのパッケージです
            </p>
            <div className="flex gap-3">
              <Link
                href={`/packages/${packageId}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Pencil className="h-4 w-4" />
                編集する
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">マイパッケージ</span>
              </Link>
            </div>
          </>
        ) : isLoggedIn ? (
          <>
            <p className="mb-3 text-center text-xs text-muted-foreground" style={{ wordBreak: 'normal' }}>
              この装備リストをそのまま自分用にコピーして編集できます
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={copying}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {copying ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />コピー中...</>
                ) : (
                  <><Copy className="h-4 w-4" />コピーして編集</>
                )}
              </button>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">マイパッケージ</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-center text-xs text-muted-foreground" style={{ wordBreak: 'normal' }}>
              この装備リストをベースに、自分だけの装備を管理する
            </p>
            <div className="flex gap-3">
              <Link href="/register"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                無料で始める
              </Link>
              <Link href="/login"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                ログイン
              </Link>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground whitespace-nowrap">
              <Weight className="inline h-3 w-3 mr-0.5 -mt-0.5" />
              装備30点・パッケージ3つまで無料
            </p>
          </>
        )}
      </div>
    </div>
  );
}
