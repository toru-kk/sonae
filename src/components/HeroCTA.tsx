"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function HeroCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (isLoggedIn) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href="/packages"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#14432a] hover:bg-green-50 transition-colors shadow-lg shadow-black/20">
          <Layers className="h-4 w-4" />
          パッケージを見る
        </Link>
        <Link href="/ai-suggest"
          className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors">
          <Sparkles className="h-4 w-4 text-green-300" />
          AI提案を見る
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/register"
        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#14432a] hover:bg-green-50 transition-colors shadow-lg shadow-black/20">
        無料で始める
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href="/explore"
        className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors">
        <Globe className="h-4 w-4 text-green-300" />
        みんなの装備を見る
      </Link>
    </div>
  );
}
