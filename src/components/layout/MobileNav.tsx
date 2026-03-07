"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Backpack, Layers, Sparkles, User, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/gear",       label: "装備",       icon: Backpack },
  { href: "/packages",   label: "パック",     icon: Layers   },
  { href: "/ai-suggest", label: "AI提案",     icon: Sparkles },
  { href: "/explore",    label: "みんなの",   icon: Globe    },
  { href: "/profile",    label: "マイページ", icon: User     },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  // チェックリストページは独自フッターを持つため非表示
  if (!isLoggedIn || pathname.includes("/checklist")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 backdrop-blur-sm">
      <div className="flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}>
              <Icon className={cn("h-5 w-5 transition-colors", isActive && "text-primary")} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
