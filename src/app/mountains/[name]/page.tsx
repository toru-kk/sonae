import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { ULScore } from "@/components/ULScore";
import { Mountain, ChevronLeft } from "lucide-react";

function formatWeight(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ name: string }> }
): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return {
    title: `${decoded}の装備パッケージ | Sonae`,
    description: `${decoded}の登山装備パッケージ一覧。実際の登山者が使った装備リストを参考にしよう。`,
    openGraph: {
      title: `${decoded}の装備パッケージ | Sonae`,
      description: `${decoded}の登山装備パッケージ一覧。実際の登山者が使った装備リストを参考にしよう。`,
      images: [`/api/og/mountain/${name}`],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function MountainPage(
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const mountainName = decodeURIComponent(name);
  const supabase = createAnonClient();

  const { data: packages } = await supabase
    .from("gear_packages")
    .select("id, name, description, total_weight_g, user_id, users(display_name, avatar_url), gear_package_items(count)")
    .eq("is_public", true)
    .eq("mountain_type", mountainName)
    .order("created_at", { ascending: false });

  if (!packages || packages.length === 0) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#03080d] via-[#071d13] to-[#185535]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(20,75,44,0.4),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2.5 mb-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <SonaeLogoIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Sonae</span>
            </Link>
          </div>

          <Link href="/mountains" className="mb-5 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition-colors">
            <ChevronLeft className="h-3 w-3" />山一覧に戻る
          </Link>

          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{mountainName}</h1>
            <Mountain className="h-5 w-5 text-green-400 shrink-0" />
          </div>
          <p className="text-sm text-white/50">{packages.length} 件の公開装備パッケージ</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {packages.map((pkg: any) => {
          const w = pkg.total_weight_g ?? 0;
          const itemCount = pkg.gear_package_items?.[0]?.count ?? 0;
          const creator = pkg.users;
          const creatorName = creator?.display_name ?? "匿名ユーザー";
          return (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.id}/public`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:bg-secondary hover:border-primary/30 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{pkg.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground truncate">{creatorName}</span>
                  {itemCount > 0 && <span className="text-xs text-muted-foreground shrink-0">· {itemCount} 点</span>}
                </div>
              </div>
              <div className="shrink-0 text-right">
                {w > 0 && (
                  <>
                    <p className="text-sm font-semibold text-foreground tabular-nums">{formatWeight(w)}</p>
                    <ULScore weightG={w} className="mt-1 justify-end" />
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
