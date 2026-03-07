"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    if (password !== confirm) {
      setError("パスワードが一致しません");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (err) {
      setError("パスワードの変更に失敗しました。リンクの有効期限が切れている可能性があります。");
    } else {
      setDone(true);
      setTimeout(() => router.push("/gear"), 2000);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <SonaeLogoIcon />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">Sonae</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">新しいパスワードを設定</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">8文字以上で入力してください。</p>
        </div>

        {done ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
            <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-500" />
            <p className="font-semibold text-green-800 mb-1">パスワードを変更しました</p>
            <p className="text-sm text-green-700">ダッシュボードに移動しています...</p>
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
                  新しいパスワード
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="8文字以上"
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                  パスワードを確認
                </label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  placeholder="もう一度入力"
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>パスワードを変更する</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          リンクが無効な場合は
          <Link href="/forgot-password" className="ml-1 font-medium text-primary hover:underline">
            再送信
          </Link>
        </p>
      </div>
    </div>
  );
}
