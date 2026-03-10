import Link from "next/link";
import { SonaeLogoIcon } from "@/components/SonaeLogo";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <SonaeLogoIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-6xl font-black text-foreground/10 tabular-nums">404</p>
          <h1 className="mt-2 text-xl font-bold text-foreground">ページが見つかりません</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            このページは存在しないか、移動・削除された可能性があります。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            トップへ戻る
          </Link>
          <Link
            href="/gear"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            マイ装備を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
