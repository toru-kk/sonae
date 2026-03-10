"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Plan = {
  name: string;
  highlight: boolean;
  href: string;
  cta: string;
};

export function PlanCTA({ plan }: { plan: Plan }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const href = isLoggedIn
    ? plan.name === "Free" ? "/gear" : "/plans"
    : plan.href;
  const label = isLoggedIn
    ? plan.name === "Free" ? "マイ装備を見る" : "プランを見る・アップグレード"
    : plan.cta;

  return (
    <Link href={href}
      className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
        plan.highlight
          ? "bg-white text-primary hover:bg-green-50"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}>
      {label}
    </Link>
  );
}
