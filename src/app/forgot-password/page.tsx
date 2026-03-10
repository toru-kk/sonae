"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (err) {
      setError("メールの送信に失敗しました。もう一度お試しください。");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <SonaeLogoIcon />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">Sonae</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">パスワードをリセット</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            登録済みのメールアドレスにリセット用リンクを送信します。
          </p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
            <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-500" />
            <p className="font-semibold text-green-800 mb-1">メールを送信しました</p>
            <p className="text-sm text-green-700 mb-4">
              <span className="font-medium">{email}</span> に送信しました。
              メール内のリンクからパスワードを再設定してください。
            </p>
            <p className="text-xs text-green-600">
              メールが届かない場合は迷惑メールフォルダをご確認ください。
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />{error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                  メールアドレス
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="example@mail.com"
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>リセットメールを送る</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-primary hover:underline">ログインに戻る</Link>
        </p>
      </div>
    </div>
  );
}
