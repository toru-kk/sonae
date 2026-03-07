"use client";

import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function FooterCTA() {
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
      <Link href="/packages"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
        <Layers className="h-4 w-4" />
        パッケージを見る
        <ChevronRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link href="/register"
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
      無料で始める
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}
