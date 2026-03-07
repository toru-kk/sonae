"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backpack, Layers, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SonaeLogoIcon } from "@/components/SonaeLogo";

const steps = [
  {
    number: "01",
    icon: Backpack,
    title: "装備を登録する",
    desc: "テント、シュラフ、レインウェア……持っている装備をカテゴリ別に登録。重量も記録しておくと後で役立ちます。",
    cta: "装備を追加する",
    href: "/gear/new",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    number: "02",
    icon: Layers,
    title: "パッケージにまとめる",
    desc: "「北アルプスセット」「日帰り軽量化セット」など、登山スタイル別に装備をまとめてパッケージ化。総重量を自動計算します。",
    cta: "パッケージを作る",
    href: "/packages/new",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "AIに相談する",
    desc: "山名・季節・泊数を入力するだけ。登録した装備の中からAIが最適なセットを提案し、不足装備も指摘してくれます。",
    cta: "AI提案を試す",
    href: "/ai-suggest",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "";
      setDisplayName(name);
    });
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">

      {/* ウェルカムヒーロー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_80%,rgba(20,75,44,0.5),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white/70">Sonae</span>
          </div>
          <div className="max-w-lg">
            <p className="text-green-300 text-sm font-semibold mb-2 tracking-wide">ようこそ</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
              {displayName ? `${displayName}さん、` : ""}はじめましょう。
            </h1>
            <p className="text-white/60 text-sm leading-relaxed">
              sonaeは3ステップで使えます。まず装備を登録して、パッケージにまとめて、あとはAIにお任せ。
            </p>
          </div>
        </div>
      </div>

      {/* 3ステップ */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="space-y-4">
          {steps.map(({ number, icon: Icon, title, desc, cta, href, color, bg, border }, idx) => (
            <div key={number}
              className={`relative rounded-2xl border ${border} bg-card p-6 flex items-start gap-5 group hover:shadow-md transition-all`}>

              {/* ステップ番号 */}
              <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">STEP {number}</span>
                </div>
                <h2 className="text-base font-bold text-foreground mb-1">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>

              {/* CTAボタン (右端) */}
              <Link href={href}
                className={`shrink-0 self-center inline-flex items-center gap-1.5 rounded-xl ${bg} border ${border} px-4 py-2 text-sm font-semibold ${color} hover:opacity-80 transition-opacity`}>
                {cta}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>

              {/* ステップ間の矢印 */}
              {idx < steps.length - 1 && (
                <div className="absolute -bottom-3.5 left-11 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                  <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* プライマリCTA */}
        <div className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground text-center">
          <p className="text-sm font-medium opacity-80 mb-1">まずはここから</p>
          <h3 className="text-lg font-black mb-4">最初の装備を登録してみよう</h3>
          <Link href="/gear/new"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-green-50 transition-colors">
            <Backpack className="h-4 w-4" />
            装備を追加する
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* スキップ */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/gear" className="hover:text-foreground underline underline-offset-2 transition-colors">
            スキップしてダッシュボードへ
          </Link>
        </p>
      </div>
    </div>
  );
}
