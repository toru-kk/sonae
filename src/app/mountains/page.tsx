import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "山別の装備パッケージ | Sonae",
  description: "槍ヶ岳・富士山・北アルプスなど、山別の登山装備パッケージをチェック。Sonaeに公開された実際の登山者の装備リスト。",
};

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default async function MountainsPage() {
  const supabase = createAnonClient();

  const { data } = await supabase
    .from("gear_packages")
    .select("mountain_type")
    .eq("is_public", true)
    .not("mountain_type", "is", null);

  // mountain_typeを集計
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const mt = row.mountain_type as string;
    counts[mt] = (counts[mt] ?? 0) + 1;
  }

  const mountains = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2.5 mb-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <SonaeLogoIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Sonae</span>
            </Link>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">山別の装備</h1>
            <Mountain className="h-5 w-5 text-green-400 shrink-0" />
          </div>
          <p className="text-sm text-white/60 max-w-lg">
            実際の登山者が公開した山別の装備パッケージ。参考にして自分の装備を考えよう。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {mountains.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground text-sm">まだ公開パッケージがありません</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {mountains.map(({ name, count }) => (
              <Link
                key={name}
                href={`/mountains/${encodeURIComponent(name)}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 hover:bg-secondary hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mountain className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{count} 件</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
