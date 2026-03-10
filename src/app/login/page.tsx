"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("メールアドレスまたはパスワードが正しくありません");
      setLoading(false);
    } else {
      router.push("/gear");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-56px)]">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <SonaeLogoIcon />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">Sonae</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-foreground">ログイン</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              アカウントをお持ちでない方は
              <Link href="/register" className="ml-1 font-medium text-primary hover:underline">無料で作成</Link>
            </p>
          </div>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">メールアドレス</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" placeholder="example@mail.com"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">パスワード</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">パスワードを忘れた方</Link>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>ログイン</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 flex-col justify-end relative overflow-hidden bg-gradient-to-br from-[#0d2016] via-[#14432a] to-[#1a5c3a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(255,255,255,0.05),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#0a1a0f]"
          style={{ clipPath: "polygon(0 80%, 20% 40%, 35% 65%, 50% 15%, 65% 50%, 80% 25%, 100% 55%, 100% 100%, 0 100%)" }} />
        <div className="relative p-12 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">Sonae</p>
          <h2 className="text-3xl font-bold leading-snug mb-4">山に備える。<br />装備から、始まる。</h2>
          <p className="text-sm text-white/60 leading-relaxed">所持装備を登録して、AIが最適な<br />パッケージを提案する登山装備管理。</p>
        </div>
      </div>
    </div>
  );
}
