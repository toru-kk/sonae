"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Heart, MessageCircle, UserPlus, Loader2, CheckCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow";
  package_id: string | null;
  is_read: boolean;
  created_at: string;
  actor: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  package: {
    id: string;
    name: string;
  } | null;
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "たった今";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}日前`;
  return new Date(dateStr).toLocaleDateString("ja-JP", { month: "short", day: "numeric" });
}

const TYPE_CONFIG = {
  like: {
    icon: Heart,
    iconClass: "text-rose-500 bg-rose-50",
    message: (n: Notification) =>
      `${n.actor?.display_name ?? "ユーザー"}が「${n.package?.name ?? "パッケージ"}」にいいねしました`,
  },
  comment: {
    icon: MessageCircle,
    iconClass: "text-blue-500 bg-blue-50",
    message: (n: Notification) =>
      `${n.actor?.display_name ?? "ユーザー"}が「${n.package?.name ?? "パッケージ"}」にコメントしました`,
  },
  follow: {
    icon: UserPlus,
    iconClass: "text-green-600 bg-green-50",
    message: (n: Notification) =>
      `${n.actor?.display_name ?? "ユーザー"}があなたをフォローしました`,
  },
};

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      fetchNotifications();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNotifications() {
    setLoading(true);
    const res = await fetch("/api/notifications");
    if (res.ok) {
      const data = await res.json();
      setNotifications(data.notifications ?? []);
    }
    setLoading(false);
  }

  async function markAllRead() {
    setMarkingRead(true);
    const res = await fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    }
    setMarkingRead(false);
  }

  function getLink(n: Notification): string {
    if (n.type === "follow" && n.actor?.id) return `/u/${n.actor.id}`;
    if (n.package_id) return `/packages/${n.package_id}/public`;
    return "/notifications";
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 mb-20">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-xl font-bold text-foreground">通知</h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingRead}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            すべて既読にする
          </button>
        )}
      </div>

      {/* 通知一覧 */}
      {notifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <Bell className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">まだ通知はありません</p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifications.map((n) => {
            const config = TYPE_CONFIG[n.type];
            const Icon = config.icon;
            const actorName = n.actor?.display_name ?? "ユーザー";
            const actorInitial = actorName.slice(0, 1).toUpperCase();

            return (
              <Link
                key={n.id}
                href={getLink(n)}
                className={cn(
                  "flex items-start gap-3 rounded-xl px-4 py-3 transition-colors",
                  n.is_read
                    ? "hover:bg-secondary"
                    : "bg-primary/5 hover:bg-primary/10"
                )}
              >
                {/* アクターアバター */}
                {n.actor?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={n.actor.avatar_url}
                    alt={actorName}
                    className="h-9 w-9 rounded-full object-cover shrink-0 ring-1 ring-border"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] shrink-0 text-xs font-bold text-white select-none">
                    {actorInitial}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm leading-relaxed",
                    n.is_read ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {config.message(n)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {timeAgo(n.created_at)}
                  </p>
                </div>

                {/* タイプアイコン */}
                <div className={cn(
                  "shrink-0 flex h-8 w-8 items-center justify-center rounded-lg",
                  config.iconClass
                )}>
                  <Icon className="h-4 w-4" />
                </div>

                {/* 未読ドット */}
                {!n.is_read && (
                  <div className="shrink-0 mt-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
