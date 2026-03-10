"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Loader2, Trash2, MessageCircle, Send } from "lucide-react";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  users: {
    display_name: string | null;
    avatar_url: string | null;
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

export function PackageComments({ packageId }: { packageId: string }) {
  const supabase = createClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchComments() {
    setLoading(true);
    const res = await fetch(`/api/packages/${packageId}/comments`);
    const data = await res.json();
    setComments(data.comments ?? []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    const res = await fetch(`/api/packages/${packageId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setContent("");
      textareaRef.current?.focus();
    }
    setSubmitting(false);
  }

  async function handleDelete(commentId: string) {
    setDeletingId(commentId);
    const res = await fetch(`/api/packages/${packageId}/comments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    });
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
    setDeletingId(null);
  }

  return (
    <div className="mt-8 border-t border-border pt-8">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground mb-5">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
        コメント
        {comments.length > 0 && (
          <span className="ml-1 text-sm font-normal text-muted-foreground">({comments.length})</span>
        )}
      </h2>

      {/* コメント一覧 */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          まだコメントがありません。最初のコメントを投稿しましょう！
        </p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => {
            const name = comment.users?.display_name ?? "ユーザー";
            const initial = name.slice(0, 1).toUpperCase();
            const isOwn = comment.user_id === currentUserId;
            return (
              <div key={comment.id} className="flex gap-3">
                {/* アバター */}
                {comment.users?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={comment.users.avatar_url}
                    alt={name}
                    className="h-8 w-8 rounded-full object-cover shrink-0 ring-1 ring-border"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#14532d] to-[#22c55e] shrink-0 text-xs font-bold text-white select-none">
                    {initial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <Link
                      href={`/u/${comment.user_id}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{timeAgo(comment.created_at)}</span>
                    {isOwn && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deletingId === comment.id}
                        className="ml-auto text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-40"
                        aria-label="削除"
                      >
                        {deletingId === comment.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 投稿フォーム */}
      {currentUserId ? (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 500))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e as any);
              }}
              rows={2}
              placeholder="装備について質問・感想を書く… (Cmd+Enterで送信)"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <p className="mt-0.5 text-right text-xs text-muted-foreground">{content.length}/500</p>
          </div>
          <button
            type="submit"
            disabled={!content.trim() || submitting}
            className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="text-primary font-semibold hover:underline">ログイン</Link>
            するとコメントできます
          </p>
        </div>
      )}
    </div>
  );
}
