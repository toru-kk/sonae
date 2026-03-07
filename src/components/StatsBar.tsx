"use client";

import { useEffect, useState } from "react";
import { Backpack, Layers, Clock, Sparkles, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useGear } from "@/hooks/useGear";
import { usePackages } from "@/hooks/usePackages";

// ログイン前: アイコン + 機能説明
const FEATURES = [
  { icon: Backpack, label: "装備をカテゴリ別に管理" },
  { icon: Sparkles, label: "AIが最適な装備を提案"   },
  { icon: Check,    label: "出発前の荷造りチェック"  },
];

export function StatsBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { gearItems, loading: gearLoading } = useGear();
  const { packages, loading: pkgLoading } = usePackages();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  /* ---- ログイン済み: ユーザーの実データ ---- */
  if (isLoggedIn) {
    const isLoading = gearLoading || pkgLoading;

    // 最後に追加した装備
    const latestGear = [...gearItems].sort((a, b) => {
      return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
    })[0];

    const stats = [
      {
        icon: Backpack,
        value: isLoading ? "—" : `${gearItems.length}`,
        unit: "点",
        label: "登録装備",
        sub: undefined as string | undefined,
      },
      {
        icon: Layers,
        value: isLoading ? "—" : `${packages.length}`,
        unit: "セット",
        label: "パッケージ",
        sub: undefined as string | undefined,
      },
      {
        icon: Clock,
        value: isLoading ? "—" : (latestGear ? latestGear.name : "—"),
        unit: "",
        label: "最近追加",
        sub: isLoading ? undefined : latestGear?.brand ?? undefined,
        isText: true,
      },
    ];

    return (
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            あなたの装備データ
          </p>
          <div className="flex items-stretch divide-x divide-border">
            {stats.map(({ icon: Icon, value, unit, label, sub, isText }) => (
              <div key={label} className="flex-1 px-3 sm:px-5 first:pl-0 last:pr-0 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                </div>
                {isText ? (
                  <p className="text-sm font-bold text-foreground truncate leading-snug">
                    {value}
                  </p>
                ) : (
                  <p className="text-xl font-bold text-foreground tabular-nums">
                    {value}
                    {unit && <span className="text-sm font-normal text-muted-foreground ml-0.5">{unit}</span>}
                  </p>
                )}
                {sub && <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---- 未ログイン: 機能ハイライト ---- */
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center divide-x divide-border">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex-1 px-3 sm:px-5 first:pl-0 last:pr-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-[11px] sm:text-xs font-medium text-foreground leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
