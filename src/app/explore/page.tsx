"use client";

import Link from "next/link";
import { Globe, Weight, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

type PublicPackage = {
  id: string;
  name: string;
  description: string | null;
  mountain_type: string | null;
  total_weight_g: number;
  user_id: string;
  users: { display_name: string | null; avatar_url: string | null } | null;
  gear_package_items: { count: number }[];
};

function Avatar({ name, avatarUrl, size = "sm" }: { name: string; avatarUrl?: string | null; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt={name} className={`${dim} rounded-full object-cover shrink-0`} />;
  }
  return (
    <div className={`${dim} rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground shrink-0`}>
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default function ExplorePage() {
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));

    supabase
      .from("gear_packages")
      .select("id, name, description, mountain_type, total_weight_g, user_id, users(display_name, avatar_url), gear_package_items(count)")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setPackages((data ?? []) as unknown as PublicPackage[]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">

      {/* ヘッダー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white/70">Sonae</span>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">みんなの装備</h1>
            <Globe className="h-5 w-5 text-green-400 shrink-0" />
          </div>
          <p className="text-sm text-white/60 max-w-lg">
            登山者たちが公開した装備パッケージを参考にしよう。気に入ったセットをベースに、自分の装備を作れます。
          </p>
          {!loading && (
            <div className="mt-4 text-xs text-white/35">
              {packages.length} パッケージ公開中
            </div>
          )}
        </div>
      </div>

      {/* パッケージグリッド */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        )}

        {!loading && packages.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-24 text-center">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-semibold text-foreground mb-1">まだ公開パッケージがありません</p>
            <p className="text-xs text-muted-foreground mb-6">あなたが最初に公開してみよう</p>
            <Link href={isLoggedIn ? "/packages" : "/register"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              {isLoggedIn ? "パッケージを公開する" : "無料で始める"}
            </Link>
          </div>
        )}

        {!loading && packages.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
              const w = pkg.total_weight_g ?? 0;
              const itemCount = pkg.gear_package_items?.[0]?.count ?? 0;
              const creator = pkg.users;
              const creatorName = creator?.display_name ?? "匿名ユーザー";
              return (
                <Link key={pkg.id} href={`/packages/${pkg.id}/public`}
                  className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all overflow-hidden">

                  <div className="flex-1 p-4 pb-3">
                    {/* クリエイター */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <Avatar name={creatorName} avatarUrl={creator?.avatar_url} size="sm" />
                      <span className="text-xs text-muted-foreground truncate">{creatorName}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-2 flex-1">{pkg.name}</h2>
                    </div>

                    {pkg.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{pkg.description}</p>
                    )}

                    {/* 統計バッジ */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {pkg.mountain_type && (
                        <span className="rounded-full border border-border bg-accent/50 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {pkg.mountain_type}
                        </span>
                      )}
                      {w > 0 && <ULScore weightG={w} />}
                    </div>
                  </div>

                  {/* 重量・アイテム数フッター */}
                  <div className="border-t border-border px-4 py-3 bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground tabular-nums">
                          {w > 0 ? formatWeight(w) : "—"}
                        </span>
                        {itemCount > 0 && (
                          <span className="text-xs text-muted-foreground">{itemCount} 点</span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-primary group-hover:underline">
                        詳細を見る →
                      </span>
                    </div>
                    {w > 0 && (
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, (w / 12000) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <Weight className="mx-auto h-8 w-8 text-primary mb-3" />
          <h3 className="text-base font-bold text-foreground mb-1">自分の装備を管理しよう</h3>
          <p className="text-sm text-muted-foreground mb-4">
            AIが山に合わせた装備セットを提案。荷物忘れゼロを目指そう。
          </p>
          {isLoggedIn ? (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/packages"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                マイパッケージを見る
              </Link>
              <Link href="/ai-suggest"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                AI提案を試す
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                無料で始める
              </Link>
              <Link href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                ログインして使う
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
