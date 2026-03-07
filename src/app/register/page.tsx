"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { createClient } from "@/lib/supabase/client";

const features = [
  "装備品の登録・管理（無料で30点まで）",
  "パッケージの作成・管理",
  "AIによる装備提案（月3回まで）",
  "出発前チェックリスト・シェア機能",
];

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("パスワードは8文字以上で入力してください"); return; }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });

    if (err) {
      setError(err.message === "User already registered" ? "このメールアドレスはすでに登録済みです" : err.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <SonaeLogoIcon />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">Sonae</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-foreground">無料アカウントを作成</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              すでにアカウントをお持ちの方は
              <Link href="/login" className="ml-1 font-medium text-primary hover:underline">ログイン</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-700">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <CheckCircle className="h-4 w-4 shrink-0" />確認メールを送信しました
              </div>
              <p className="text-green-600 text-xs leading-relaxed">
                <strong>{email}</strong> に届いたメールのリンクをクリックして登録を完了してください。
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">ニックネーム</label>
              <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="nickname" placeholder="やまだ / TaroYamada"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">メールアドレス</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" placeholder="example@mail.com"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">パスワード</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" placeholder="8文字以上"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              登録することで<Link href="/terms" className="underline hover:text-foreground">利用規約</Link>および<Link href="/privacy" className="underline hover:text-foreground">プライバシーポリシー</Link>に同意したものとみなします。
            </p>
            <button type="submit" disabled={loading || success}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>無料で始める</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 flex-col justify-center px-12 xl:px-16 bg-accent/40 border-l border-border">
        <div className="max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">無料プランでできること</p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span className="text-sm text-foreground">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Standardプランにアップグレードで</p>
            <p className="text-sm text-foreground font-medium">装備200点・AI提案30回/月・公開パッケージなど全機能が使えます。</p>
            <p className="mt-2 text-lg font-bold text-primary">¥480<span className="text-xs font-normal text-muted-foreground">/月</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
