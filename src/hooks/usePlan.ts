"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { type PlanType, type PlanLimits, getPlanLimits, isAdmin } from "@/lib/plan-limits";

export function usePlan() {
  const [plan, setPlan] = useState<PlanType>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setPlan("free"); return; }

        // 管理者は常にpremium扱い
        if (isAdmin(user.email)) {
          setPlan("premium");
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase as any)
          .from("users")
          .select("plan")
          .eq("id", user.id)
          .maybeSingle();
        setPlan((data?.plan as PlanType) ?? "free");
      } catch {
        setPlan("free");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const limits: PlanLimits = getPlanLimits(plan);

  return { plan, limits, loading };
}
