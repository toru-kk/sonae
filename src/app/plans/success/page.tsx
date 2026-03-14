import Link from "next/link";
import { CheckCircle, Sparkles } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { HeaderGradient } from "@/components/layout/HeaderGradient";

export default function PlansSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 text-center">
      <HeaderGradient variant="plans" className="rounded-2xl p-10">
        <div>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <CheckCircle className="h-9 w-9 text-green-400" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <SonaeLogoIcon className="h-5 w-5 text-white/60" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Sonae</p>
          </div>
          <h1 className="text-2xl font-black text-white mb-2">プランを有効化しました！</h1>
          <p className="text-sm text-white/60 mb-8">
            ご登録ありがとうございます。<br />AI提案をはじめ、すべての機能をお使いいただけます。
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/ai-suggest"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-green-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              AI提案を試す
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              マイページへ
            </Link>
          </div>
        </div>
      </HeaderGradient>
    </div>
  );
}
