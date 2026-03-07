"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, AlertTriangle, CheckCircle, ShoppingCart, Save, Check, Loader2, Lock, X } from "lucide-react";
import { mockAiResult } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { usePackages } from "@/hooks/usePackages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

type AiResult = typeof mockAiResult & {
  recommended_items: Array<{
    name: string;
    category: string;
    reason: string;
    from_user_gear: boolean;
    gear_id?: string | null;
  }>;
};

const priorityConfig = {
  "必須":       { cls: "bg-red-50 border-red-200 text-red-700",    dot: "bg-red-500" },
  "推奨":       { cls: "bg-amber-50 border-amber-200 text-amber-700", dot: "bg-amber-500" },
  "あると便利": { cls: "bg-blue-50 border-blue-200 text-blue-600",  dot: "bg-blue-400" },
};

export default function AiSuggestPage() {
  const router = useRouter();
  const { addPackage } = usePackages();
  const [mountain, setMountain] = useState("槍ヶ岳");
  const [month, setMonth] = useState(8);
  const [nights, setNights] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiResult | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [plan, setPlan] = useState<"free" | "standard" | "premium" | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient() as AnyClient;
    supabase.auth.getUser().then(async ({ data }: { data: { user: { id: string } | null } }) => {
      if (!data.user) { setPlan("free"); return; }
      const { data: userRow } = await supabase
        .from("users")
        .select("plan")
        .eq("id", data.user.id)
        .single();
      setPlan(userRow?.plan ?? "free");
    });
  }, []);

  const isLoggedIn = plan !== null;
  const isPaid = plan === "standard" || plan === "premium";

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult(null);
    setShowSaveForm(false);
    setIsFallback(false);
    setLimitReached(false);
    try {
      const res = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mountain, month, nights }),
      });
      if (res.status === 429) {
        setLimitReached(true);
        setIsLoading(false);
        return;
      }
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setResult(data);
    } catch {
      setIsFallback(true);
      setResult({ ...(mockAiResult as AiResult), mountain, month, nights });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSaveForm = () => {
    if (!result) return;
    const nightsLabel = result.nights === 0 ? "日帰り" : `${result.nights}泊`;
    setSaveName(`${result.mountain} ${result.month}月 ${nightsLabel} セット`);
    setShowSaveForm(true);
  };

  const handleSave = async () => {
    if (!result || !saveName.trim()) return;
    setIsSaving(true);
    const gearIds = result.recommended_items
      .map((item) => item.gear_id)
      .filter((id): id is string => !!id);
    const nightsLabel = result.nights === 0 ? "日帰り" : `${result.nights}泊${result.nights + 1}日`;
    const id = await addPackage({
      name: saveName.trim(),
      description: `AI提案: ${result.mountain} ${result.month}月 ${nightsLabel}`,
      mountain_type: "高山・縦走",
      is_public: false,
      item_ids: gearIds,
    });
    setIsSaving(false);
    if (id) {
      router.push(`/packages/${id}`);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8">

      {/* ブランドヘッダー */}
      <div className="sticky top-14 z-10 mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 pt-1 bg-background/80 backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] px-5 py-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-10">
            <Sparkles className="h-16 w-16 text-amber-400" />
          </div>
          <div className="relative flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <SonaeLogoIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg font-black text-white">AI装備提案</h1>
                <span className="text-[10px] font-semibold tracking-widest text-white/35 uppercase">Sonae</span>
              </div>
              <p className="text-xs text-white/50">
                山名・季節・泊数を入力するだけで最適な装備を提案
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 未ログインゲート */}
      {plan === null && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-bold text-foreground mb-1">ログインが必要です</p>
          <p className="text-xs text-muted-foreground mb-4">無料アカウントを作成するとAI提案をすぐに試せます</p>
          <a href="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            無料で始める
          </a>
        </div>
      )}

      {/* 無料プランゲート（将来的にプラン制限を復活させる場合のために残す） */}
      {false && plan !== null && !isPaid && (
        <div className="mb-8 rounded-2xl border border-border overflow-hidden">
          {/* プレビューぼかし */}
          <div className="relative">
            <div className="pointer-events-none select-none opacity-40 blur-[2px] p-5 space-y-4 bg-card">
              <div className="h-9 rounded-lg bg-secondary w-full" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-9 rounded-lg bg-secondary" />
                <div className="h-9 rounded-lg bg-secondary" />
              </div>
              <div className="h-11 rounded-lg bg-primary/30" />
            </div>
            {/* ロックオーバーレイ */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <div className="text-center px-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">有料プランの機能です</p>
                <p className="mt-1 text-xs text-muted-foreground">スタンダード / プレミアムプランでご利用いただけます</p>
              </div>
            </div>
          </div>

          {/* プラン説明 */}
          <div className="border-t border-border bg-accent/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">AI提案でできること</p>
            <div className="space-y-2 mb-4">
              {[
                "山名・月・泊数を入力するだけで最適な装備を選定",
                "持っていない装備の不足も指摘",
                "標高・難易度・季節を考慮した安全警告付き",
                "提案結果をそのままパッケージとして保存",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex-1 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-center">
                <p className="text-xs font-bold text-primary">スタンダード</p>
                <p className="text-lg font-bold text-foreground mt-0.5">¥480<span className="text-xs font-normal text-muted-foreground">/月</span></p>
                <p className="text-[10px] text-muted-foreground">AI提案 30回/月</p>
              </div>
              <div className="flex-1 rounded-xl bg-primary px-4 py-3 text-center">
                <p className="text-xs font-bold text-primary-foreground/70">プレミアム</p>
                <p className="text-lg font-bold text-primary-foreground mt-0.5">¥980<span className="text-xs font-normal text-primary-foreground/60">/月</span></p>
                <p className="text-[10px] text-primary-foreground/70">AI提案 無制限</p>
              </div>
            </div>
            <button
              disabled
              className="mt-3 w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              アップグレード（近日公開）
            </button>
          </div>
        </div>
      )}

      {/* デモプレビュー（無料ユーザー向け） */}
      {false && plan !== null && !isPaid && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">AI提案のサンプル</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-xs text-center text-muted-foreground mb-5">
            有料プランでは以下のような提案が表示されます
          </p>

          {/* サンプル結果 */}
          <div className="space-y-4 relative">
            {/* SAMPLE透かし */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="rotate-[-20deg] rounded-xl border-4 border-primary/20 px-8 py-3">
                <p className="text-4xl font-black tracking-widest text-primary/10 select-none">SAMPLE</p>
              </div>
            </div>

            {/* 結果サマリーカード */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d2016] to-[#1a5c3a] p-5 text-white">
              <div className="absolute right-4 top-4 opacity-10">
                <Sparkles className="h-20 w-20" />
              </div>
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-1">AI提案結果</p>
                  <h2 className="text-lg font-bold">槍ヶ岳　8月　2泊3日</h2>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-2xl font-bold tabular-nums">7.8<span className="text-sm font-normal ml-1">kg</span></p>
                  <p className="text-xs text-white/60">推定総重量</p>
                </div>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-white/75">
                槍ヶ岳は標高3,180mの高山です。8月でも稜線では気温が10℃以下になることがあります。テント泊2泊を想定し、防寒・防水を重視した装備を選定しました。
              </p>
            </div>

            {/* 注意事項 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-sm font-semibold text-amber-800">注意事項</p>
              </div>
              <ul className="space-y-1.5">
                {["稜線では夏でも低体温症のリスクがあります。ダウンウェアを必ず持参してください。", "高山病対策として、初日は無理のないペース配分を心がけてください。"].map((w, i) => (
                  <li key={i} className="text-sm text-amber-700 leading-relaxed">{w}</li>
                ))}
              </ul>
            </div>

            {/* 推奨装備 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">所持装備から使用（3 点）</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "ダウンジャケット", category: "ウェア", reason: "稜線の防寒に必須" },
                  { name: "30Lバックパック", category: "バッグ", reason: "2泊分の装備が収まる適切な容量" },
                  { name: "トレッキングポール", category: "装備", reason: "岩場での安定性を高める" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.category}　—　{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 不足装備 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">追加で必要な装備（3 点）</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "ファーストエイドキット", priority: "必須" as const, reason: "高山での緊急時に必須。絆創膏・鎮痛剤・テーピングを含むセットを推奨" },
                  { name: "ヘッドランプ（予備電池つき）", priority: "必須" as const, reason: "テント泊では夜間・早朝の行動が発生するため必携" },
                  { name: "防水グローブ", priority: "推奨" as const, reason: "8月でも稜線上では気温10℃以下になることがあり、悪天候時に有効" },
                ].map((item, i) => {
                  const cfg = priorityConfig[item.priority];
                  return (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                      <div className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${cfg.cls}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${cfg.cls}`}>{item.priority}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{item.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* アップグレード誘導 */}
          <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">あなたの装備で提案を受けるには</p>
            <p className="text-xs text-muted-foreground mb-3">スタンダードまたはプレミアムプランにアップグレードしてください</p>
            <button disabled className="rounded-lg bg-primary/30 px-5 py-2 text-sm font-semibold text-primary cursor-not-allowed">
              アップグレード（近日公開）
            </button>
          </div>
        </div>
      )}

      {/* 入力フォーム（ログイン済みユーザー全員） */}
      {isLoggedIn && (
      <div className="rounded-xl border border-border bg-card p-5 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4">登山計画を入力</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              山名
            </label>
            <input
              type="text"
              value={mountain}
              onChange={(e) => setMountain(e.target.value)}
              placeholder="例：槍ヶ岳、富士山、高尾山"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                時期
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                泊数
              </label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={0}>日帰り</option>
                <option value={1}>1泊2日</option>
                <option value={2}>2泊3日</option>
                <option value={3}>3泊以上</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || limitReached}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                装備を提案してもらう
              </>
            )}
          </button>
          {remaining !== null && remaining > 0 && (
            <p className="text-center text-xs text-muted-foreground">今月残り {remaining} 回</p>
          )}
          {limitReached && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">今月の上限（3回）に達しました</p>
                <p className="text-xs text-red-700 mt-0.5">来月1日にリセットされます。</p>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* 空状態（未提案） */}
      {isLoggedIn && !isLoading && !result && (
        <div className="rounded-xl border border-dashed border-border py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">山名・季節・泊数を入力して提案を受けよう</p>
          <p className="text-xs text-muted-foreground">登録済みの装備から最適なセットをAIが選定します</p>
        </div>
      )}

      {/* ローディングスケルトン */}
      {isLoggedIn && isLoading && (
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d2016] to-[#1a5c3a] p-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-green-400 animate-pulse" />
              <p className="text-sm font-semibold text-green-400 animate-pulse">AIが装備を分析中...</p>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-white/20 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-white/20 animate-pulse" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-secondary animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-secondary animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI結果 */}
      {isLoggedIn && result && !isLoading && (
        <div className="space-y-5">

          {/* オフラインフォールバック通知 */}
          {isFallback && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">サンプル結果を表示しています</p>
                <p className="text-xs text-amber-700 mt-0.5">AI接続に失敗したため、参考用のサンプルデータを表示しています。通信環境を確認して再提案してください。</p>
              </div>
            </div>
          )}

          {/* 装備未登録の場合の案内 */}
          {result.recommended_items.every((item) => !item.gear_id) && result.recommended_items.length > 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">装備を登録するともっと精度が上がります</p>
                <p className="mt-0.5 text-xs text-amber-700">装備を登録すると、あなたの所持品からAIが最適なセットを選定できます。</p>
                <a href="/gear/new" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-800 underline underline-offset-2">
                  装備を追加する
                </a>
              </div>
            </div>
          )}

          {/* 結果サマリー */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0d2016] to-[#1a5c3a] p-5 text-white">
            <div className="absolute right-4 top-4 opacity-10">
              <Sparkles className="h-20 w-20" />
            </div>
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-1">AI提案結果</p>
                <h2 className="text-lg font-bold">
                  {result.mountain}　{result.month}月
                  　{result.nights === 0 ? "日帰り" : `${result.nights}泊${result.nights + 1}日`}
                </h2>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-bold tabular-nums">
                  {(result.total_weight_estimate_g / 1000).toFixed(1)}<span className="text-sm font-normal ml-1">kg</span>
                </p>
                <p className="text-xs text-white/60">推定総重量</p>
              </div>
            </div>
            <p className="relative mt-3 text-sm leading-relaxed text-white/75">{result.reasoning}</p>
          </div>

          {/* 注意事項 */}
          {result.warnings.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-sm font-semibold text-amber-800">注意事項</p>
              </div>
              <ul className="space-y-1.5">
                {result.warnings.map((w, i) => (
                  <li key={i} className="text-sm text-amber-700 leading-relaxed">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 推奨装備（所持品から） */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                所持装備から使用（{result.recommended_items.length} 点）
              </h3>
            </div>
            <div className="space-y-2">
              {result.recommended_items.map((item, i) => (
                <div key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {item.category}　—　{item.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 不足装備 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                追加で必要な装備（{result.missing_items.length} 点）
              </h3>
            </div>
            <div className="space-y-2">
              {result.missing_items.map((item, i) => {
                const cfg = priorityConfig[item.priority as keyof typeof priorityConfig];
                return (
                  <div key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5">
                    <div className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${cfg.cls}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${cfg.cls}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleOpenSaveForm}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Save className="h-4 w-4" />
              パッケージとして保存
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-4 w-4" />
              再提案
            </button>
          </div>

          {/* 保存フォーム */}
          {showSaveForm && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">パッケージ名を入力</p>
                <button
                  onClick={() => setShowSaveForm(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="例: 槍ヶ岳 8月 2泊 セット"
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={!saveName.trim() || isSaving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    保存してパッケージへ
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
