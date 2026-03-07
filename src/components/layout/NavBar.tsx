"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Backpack, Layers, Sparkles, LogIn, LogOut, User, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { href: "/gear",       label: "マイ装備",   icon: Backpack },
  { href: "/packages",   label: "パッケージ", icon: Layers   },
  { href: "/ai-suggest", label: "AI提案",     icon: Sparkles },
];

const publicNavItems = [
  { href: "/explore", label: "みんなの装備", icon: Globe },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1">
      {/* ナビリンク */}
      <nav className="hidden md:flex items-center gap-0.5">
        {(user ? navItems : publicNavItems).map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-primary font-semibold"
                  : "font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          );
        })}
        {user && (
          <Link href="/explore"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm transition-colors",
              pathname === "/explore"
                ? "bg-accent text-primary font-semibold"
                : "font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}>
            <Globe className="h-4 w-4" />みんなの装備
          </Link>
        )}
      </nav>

      {/* 右側：認証ボタン */}
      <div className="flex items-center gap-2 ml-2">
        {user ? (
          <div className="flex items-center gap-2">
            <Link href="/profile"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
              {user.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.user_metadata.avatar_url} alt="" className="h-5 w-5 rounded-full object-cover shrink-0" />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shrink-0">
                  {(user.user_metadata?.display_name || user.email?.split("@")[0] || "?").slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="max-w-[120px] truncate">
                {user.user_metadata?.display_name || user.email?.split("@")[0]}
              </span>
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </div>
        ) : (
          <>
            <Link href="/login"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <LogIn className="h-4 w-4" />ログイン
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 sm:px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">無料で始める</span>
              <span className="sm:hidden">登録</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
