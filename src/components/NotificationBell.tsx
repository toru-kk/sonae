"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/notifications/unread-count");
        if (res.ok) {
          const data = await res.json();
          setCount(data.count ?? 0);
        }
      } catch {
        // silently fail
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href="/notifications"
      className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      aria-label={`通知${count > 0 ? ` (${count}件の未読)` : ""}`}
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
