"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Layers, Sparkles } from "lucide-react";

export function UserProfileCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
  }, []);

  if (isLoggedIn) {
    return (
      <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm font-semibold text-foreground mb-1">自分のパッケージも管理しよう</p>
        <p className="text-xs text-muted-foreground mb-4">装備パッケージを作成・公開して、みんなと共有できます</p>
        <div className="flex justify-center gap-3">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            <Layers className="h-4 w-4" />
            マイパッケージへ
          </Link>
          <Link
            href="/ai-suggest"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" />
            AI提案を試す
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
      <p className="text-sm font-semibold text-foreground mb-1">あなたも装備を管理しよう</p>
      <p className="text-xs text-muted-foreground mb-4">Sonaeで自分だけの装備パッケージを作成・公開できます</p>
      <div className="flex justify-center gap-3">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          無料で始める
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          ログイン
        </Link>
      </div>
    </div>
  );
}
