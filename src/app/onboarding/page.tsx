"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Backpack, Layers, Sparkles, ArrowRight, ChevronRight, Check, ClipboardCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SonaeLogoIcon } from "@/components/SonaeLogo";

type Slide =
  | { id: "welcome" }
  | {
      id: "step";
      step: number;
      icon: React.ElementType;
      color: string;
      bg: string;
      border: string;
      title: string;
      desc: string;
      hint: string;
    }
  | { id: "done" };

const slides: Slide[] = [
  { id: "welcome" },
  {
    id: "step",
    step: 1,
    icon: Backpack,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    title: "装備を登録する",
    desc: "テント、シュラフ、レインウェア……持っている装備をカテゴリ別に登録しましょう。重量も記録しておくと後で役立ちます。",
    hint: "無料プランで30点まで登録できます。",
  },
  {
    id: "step",
    step: 2,
    icon: Layers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    title: "パッケージにまとめる",
    desc: "「北アルプスセット」「日帰り軽量化セット」など、登山スタイル別に装備をパッケージ化。総重量を自動計算します。",
    hint: "パッケージはURLでシェアできます（無料）。",
  },
  {
    id: "step",
    step: 3,
    icon: ClipboardCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    title: "荷造りチェックで確認する",
    desc: "出発前にパッケージを開いて「荷造りチェック」をスタート。装備をひとつずつ確認しながらパッキング。全部チェックで出発OK！",
    hint: "出発日を設定するとカウントダウンが表示されます。必須装備の未チェックは警告で通知。",
  },
  {
    id: "step",
    step: 4,
    icon: Sparkles,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "AIに装備を相談する",
    desc: "山名・季節・泊数を入力するだけ。登録した装備の中からAIが最適なセットを提案し、不足装備も指摘してくれます。",
    hint: "無料プランで月3回まで利用できます。",
  },
  { id: "done" },
];

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const name = data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "";
      setDisplayName(name);
    });
  }, [router]);

  const goNext = () => {
    if (animating) return;
    if (current >= slides.length - 1) {
      router.push("/gear/new");
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c + 1);
      setAnimating(false);
    }, 150);
  };

  const slide = slides[current];

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center bg-background px-4 py-12">

      {/* ロゴ */}
      <div className="flex items-center gap-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
          <SonaeLogoIcon />
        </div>
        <span className="text-base font-bold text-foreground">Sonae</span>
      </div>

      {/* カード */}
      <div
        className="w-full max-w-sm transition-opacity duration-150"
        style={{ opacity: animating ? 0 : 1 }}
      >

        {/* ウェルカム */}
        {slide.id === "welcome" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <SonaeLogoIcon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-semibold text-primary mb-2">ようこそ</p>
            <h1 className="text-2xl font-black text-foreground mb-3">
              {displayName ? `${displayName}さん、` : ""}
              <br />はじめましょう。
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Sonaeは4ステップで使えます。
            </p>
            {/* フロー図 */}
            <div className="mb-8 rounded-xl border border-border bg-secondary/30 divide-y divide-border text-left overflow-hidden">
              {[
                { icon: Backpack,       label: "装備を登録",         color: "text-sky-600",     bg: "bg-sky-50"     },
                { icon: Layers,         label: "パッケージにまとめる", color: "text-violet-600",  bg: "bg-violet-50"  },
                { icon: ClipboardCheck, label: "荷造りチェックで確認", color: "text-emerald-600", bg: "bg-emerald-50" },
                { icon: Sparkles,       label: "AIに装備を相談",      color: "text-amber-600",   bg: "bg-amber-50"   },
              ].map(({ icon: Icon, label, color, bg }, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg ${bg}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <span className={`ml-auto text-[10px] font-black tracking-widest ${color}`}>STEP {i + 1}</span>
                </div>
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              使い方を見る
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link
              href="/gear"
              className="mt-4 block text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              スキップしてダッシュボードへ
            </Link>
          </div>
        )}

        {/* ステップ解説 */}
        {slide.id === "step" && (() => {
          const StepIcon = slide.icon;
          return (
            <div>
              {/* ステップインジケーター */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i < slide.step ? "w-6 bg-primary" : "w-3 bg-border"
                    }`}
                  />
                ))}
              </div>

              <div className="text-center mb-8">
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${slide.bg} ${slide.border} border`}>
                  <StepIcon className={`h-8 w-8 ${slide.color}`} />
                </div>
                <p className={`text-xs font-black tracking-widest uppercase mb-2 ${slide.color}`}>
                  STEP {slide.step} / {TOTAL_STEPS}
                </p>
                <h2 className="text-xl font-black text-foreground mb-3">{slide.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{slide.desc}</p>
              </div>

              {/* ヒントバッジ */}
              <div className={`mb-8 rounded-xl ${slide.bg} border ${slide.border} px-4 py-3`}>
                <p className={`text-xs font-semibold ${slide.color}`}>{slide.hint}</p>
              </div>

              <button
                onClick={goNext}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {slide.step < TOTAL_STEPS ? "次へ" : "さっそく始める"}
                <ChevronRight className="h-4 w-4" />
              </button>
              <Link
                href="/gear"
                className="mt-4 block text-xs text-center text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                スキップ
              </Link>
            </div>
          );
        })()}

        {/* 完了 */}
        {slide.id === "done" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-black text-foreground mb-3">準備完了！</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              まずは装備を登録しましょう。<br />
              登録 → パッケージ作成 → 荷造りチェック<br />
              の順に進めると最短で使いこなせます。
            </p>
            {/* ミニロードマップ */}
            <div className="mb-8 rounded-xl border border-border bg-secondary/30 divide-y divide-border text-left overflow-hidden">
              {[
                { num: "1", label: "装備を登録する",       sub: "今からやります",             active: true  },
                { num: "2", label: "パッケージを作る",      sub: "装備をセットにまとめる",     active: false },
                { num: "3", label: "荷造りチェックをする",  sub: "出発前に確認リストで確かめる", active: false },
              ].map((row) => (
                <div key={row.num} className={`flex items-center gap-3 px-4 py-3 ${row.active ? "bg-primary/5" : ""}`}>
                  <div className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${row.active ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}>
                    {row.num}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${row.active ? "text-primary" : "text-foreground"}`}>{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Backpack className="h-4 w-4" />
              最初の装備を登録する
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/gear"
              className="mt-4 block text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              後で登録する
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
