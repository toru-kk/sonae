import { CheckCircle, Sparkles, Crown, Zap } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { PlanCheckoutButton } from "@/components/PlanCheckoutButton";
import { PlanPortalButton } from "@/components/PlanPortalButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

async function getCurrentPlan(): Promise<"free" | "standard" | "premium" | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await (supabase as AnyClient)
      .from("users")
      .select("plan, stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();
    return data?.plan ?? "free";
  } catch {
    return null;
  }
}

const FEATURES = [
  { label: "装備登録",       free: "30点",   standard: "200点",  premium: "無制限" },
  { label: "パッケージ作成", free: "3つ",    standard: "20つ",   premium: "無制限" },
  { label: "AI装備提案",     free: "3回/月", standard: "30回/月", premium: "無制限" },
  { label: "パッケージ公開・シェア", free: "✓", standard: "✓",  premium: "✓" },
  { label: "チェックリスト", free: "✓",     standard: "✓",      premium: "✓" },
  { label: "優先サポート",   free: "—",     standard: "—",      premium: "✓" },
];

export default async function PlansPage() {
  const currentPlan = await getCurrentPlan();
  const isLoggedIn = currentPlan !== null;
  const hasStripeSubscription = currentPlan === "standard" || currentPlan === "premium";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">

      {/* ブランドヘッダー */}
      <div className="mb-10 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] px-6 py-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(20,75,44,0.4),transparent)]" />
          <div className="relative">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <SonaeLogoIcon className="h-7 w-7" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Pricing</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">まずは無料で始められる</h1>
            <p className="text-sm text-white/60">装備管理・シェア機能はすべて無料。AIが必要になったらアップグレード。</p>
          </div>
        </div>
      </div>

      {/* プランカード */}
      <div className="grid gap-4 md:grid-cols-3 mb-12">

        {/* Free */}
        <div className={`relative rounded-2xl border p-6 flex flex-col ${currentPlan === "free" ? "border-primary/50 ring-1 ring-primary/30" : "border-border bg-card"}`}>
          {currentPlan === "free" && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/20 border border-primary/30 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-primary">
              現在のプラン
            </span>
          )}
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Free</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-foreground">¥0</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">まず試してみたい人に</p>
          </div>
          <ul className="space-y-2.5 flex-1 mb-6">
            {["装備 30点まで登録", "パッケージ 3つまで", "AI提案 3回/月", "パッケージ公開・シェア", "チェックリスト"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          {isLoggedIn ? (
            <Link href="/gear" className="block w-full rounded-xl border border-border bg-secondary py-3 text-center text-sm font-semibold text-foreground hover:bg-secondary/80 transition-colors">
              マイ装備を見る
            </Link>
          ) : (
            <Link href="/register" className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              無料で始める
            </Link>
          )}
        </div>

        {/* Standard */}
        <div className={`relative rounded-2xl border p-6 flex flex-col shadow-xl scale-[1.02] ${currentPlan === "standard" ? "border-primary/80 bg-primary text-primary-foreground ring-2 ring-primary/40" : "border-primary bg-primary text-primary-foreground"}`}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-900">
            {currentPlan === "standard" ? "現在のプラン" : "人気"}
          </span>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/60 mb-1">Standard</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">¥480</span>
              <span className="text-sm text-primary-foreground/60">/月</span>
            </div>
            <p className="mt-1 text-xs text-primary-foreground/70">本格的に使いたい人に</p>
          </div>
          <ul className="space-y-2.5 flex-1 mb-6">
            {["装備 200点まで登録", "パッケージ 20つまで", "AI提案 30回/月", "パッケージ公開・シェア", "チェックリスト"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 shrink-0 text-green-300" />
                {f}
              </li>
            ))}
          </ul>
          {currentPlan === "standard" ? (
            <PlanPortalButton highlight />
          ) : currentPlan === "premium" ? (
            <div className="block w-full rounded-xl bg-white/20 py-3 text-center text-sm font-semibold text-primary-foreground/60 cursor-not-allowed">
              現在 Premium をご利用中
            </div>
          ) : (
            <PlanCheckoutButton plan="standard" highlight label="スタンダードにする" />
          )}
        </div>

        {/* Premium */}
        <div className={`relative rounded-2xl border p-6 flex flex-col ${currentPlan === "premium" ? "border-amber-400/50 ring-1 ring-amber-400/30 bg-card" : "border-border bg-card"}`}>
          {currentPlan === "premium" && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400/20 border border-amber-400/30 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-600">
              現在のプラン
            </span>
          )}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Premium</p>
              <Crown className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-foreground">¥980</span>
              <span className="text-sm text-muted-foreground">/月</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">制限なく使い倒したい人に</p>
          </div>
          <ul className="space-y-2.5 flex-1 mb-6">
            {["装備 無制限", "パッケージ 無制限", "AI提案 無制限", "パッケージ公開・シェア", "チェックリスト", "優先サポート"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          {currentPlan === "premium" ? (
            <PlanPortalButton />
          ) : (
            <PlanCheckoutButton plan="premium" label="プレミアムにする" />
          )}
        </div>
      </div>

      {/* 機能比較表 */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-4 text-center">プラン比較</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">機能</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Free</th>
                <th className="px-4 py-3 text-center font-bold text-primary bg-primary/5">Standard</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Premium</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-accent/20"}>
                  <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.free}</td>
                  <td className="px-4 py-3 text-center font-semibold text-primary bg-primary/5">{row.standard}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-foreground mb-4 text-center">よくある質問</h2>
        <div className="space-y-3">
          {[
            { q: "解約はいつでもできますか？", a: "はい。いつでもキャンセル可能で、次回の更新日以降に自動的に無料プランへ戻ります。" },
            { q: "プランをダウングレードしたらデータは消えますか？", a: "装備・パッケージのデータは保持されます。ただし無料プランの上限を超えた分は新規追加ができなくなります。" },
            { q: "支払い方法は何が使えますか？", a: "Stripeを通じてクレジットカード・デビットカードがご利用いただけます。" },
            { q: "AIはどんな提案をしてくれますか？", a: "登録済みの装備の中から最適なセットを選定し、不足している装備の提案と安全警告を出します。山名・月・泊数を入力するだけです。" },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{q}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 有料プランのCTA（未ログイン・Freeユーザー向け） */}
      {(!isLoggedIn || currentPlan === "free") && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535] p-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(20,75,44,0.4),transparent)]" />
          <div className="relative">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <p className="text-white font-bold mb-1">AI提案を使って、山の準備を完璧に</p>
            <p className="text-white/60 text-sm mb-5">スタンダードプランからAI提案が月30回使えます</p>
            {isLoggedIn ? (
              <PlanCheckoutButton plan="standard" label="スタンダードプランを始める" />
            ) : (
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-green-50 transition-colors">
                <Sparkles className="h-4 w-4" />
                無料で始める
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 有料プラン管理（有料ユーザー向け） */}
      {hasStripeSubscription && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">プランの管理・変更・解約</p>
          <p className="text-xs text-muted-foreground mb-4">Stripeのお客様ポータルから請求情報の確認・プラン変更・解約ができます</p>
          <PlanPortalButton />
        </div>
      )}

    </div>
  );
}
