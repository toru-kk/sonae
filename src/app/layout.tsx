import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Sonae — 登山装備管理", template: "%s | Sonae" },
  description: "AIが山に合わせた装備パッケージを提案する登山装備管理サービス。所持装備を管理し、荷物忘れをゼロへ。",
  openGraph: {
    title: "Sonae — 登山装備管理",
    description: "AIが山に合わせた装備パッケージを提案。荷物忘れをゼロへ。",
    siteName: "Sonae",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/api/og/home", width: 1200, height: 630, alt: "Sonae — 登山装備管理" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonae — 登山装備管理",
    description: "AIが山に合わせた装備パッケージを提案。荷物忘れをゼロへ。",
    images: ["/api/og/home"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.variable} font-sans min-h-screen`}>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <SonaeLogoIcon />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-foreground">Sonae</span>
            </Link>
            <NavBar />
          </div>
        </header>
        <div className="pt-14 pb-16 md:pb-0">{children}</div>
        <MobileNav />
        <Analytics />
      </body>
    </html>
  );
}
