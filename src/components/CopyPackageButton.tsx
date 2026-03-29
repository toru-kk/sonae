"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2, X, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type GearItemForCopy = {
  id: string;
  name: string;
  brand?: string | null;
  weight_g: number | null;
  category_id: string;
};

type Props = {
  packageId: string;
  creatorId: string | null;
  compact?: boolean;
  items?: GearItemForCopy[];
};

function formatWeight(g: number | null) {
  if (!g) return "—";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

const CATEGORY_NAMES: Record<string, string> = {
  shelter: "シェルター", sleeping: "シュラフ・寝具", clothing: "衣類",
  footwear: "靴・足回り", backpack: "バックパック", navigation: "ナビゲーション",
  safety: "安全装備", cooking: "調理器具", food: "食料・行動食",
  tools: "道具・その他",
};

export function CopyPackageButton({ packageId, creatorId, compact = false, items = [] }: Props) {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null | undefined>(undefined);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  const isOwn = currentUserId !== undefined && currentUserId !== null && currentUserId === creatorId;

  // カテゴリ別グループ化
  const grouped = useMemo(() => {
    const map: Record<string, GearItemForCopy[]> = {};
    for (const item of items) {
      if (!map[item.category_id]) map[item.category_id] = [];
      map[item.category_id].push(item);
    }
    return Object.entries(map).sort(
      ([a], [b]) => (Object.keys(CATEGORY_NAMES).indexOf(a) - Object.keys(CATEGORY_NAMES).indexOf(b))
    );
  }, [items]);

  const selectedWeight = useMemo(() => {
    return items.filter((i) => selected.has(i.id)).reduce((s, i) => s + (i.weight_g ?? 0), 0);
  }, [items, selected]);

  const openModal = () => {
    setSelected(new Set(items.map((i) => i.id)));
    setShowModal(true);
    setError(null);
  };

  const toggleItem = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((i) => i.id)));
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    if (currentUserId === null) {
      router.push(`/login?redirect=/packages/${packageId}/public`);
      return;
    }

    if (items.length > 0) {
      openModal();
    } else {
      // items未提供の場合は従来通り全コピー
      handleCopy();
    }
  };

  const handleCopy = async (selectedIds?: string[]) => {
    setCopying(true);
    setShowModal(false);
    try {
      const res = await fetch(`/api/packages/${packageId}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedIds ? { selected_gear_item_ids: selectedIds } : {}),
      });
      if (res.status === 401) {
        router.push(`/login?redirect=/packages/${packageId}/public`);
        return;
      }
      const data = await res.json();
      if (data.packageId) {
        router.push(`/packages/${data.packageId}`);
      } else {
        setError("コピーに失敗しました");
      }
    } catch {
      setError("エラーが発生しました");
    } finally {
      setCopying(false);
    }
  };

  if (isOwn) {
    return compact ? (
      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed select-none">
        <Copy className="h-3 w-3" />自分のパッケージ
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground cursor-not-allowed select-none">
        <Copy className="h-4 w-4" />自分のパッケージ
      </span>
    );
  }

  const button = compact ? (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={copying || currentUserId === undefined}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copying ? <Loader2 className="h-3 w-3 animate-spin" /> : <Copy className="h-3 w-3" />}
        参考にする
      </button>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  ) : (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleClick}
        disabled={copying || currentUserId === undefined}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copying ? (
          <><Loader2 className="h-4 w-4 animate-spin" />コピー中...</>
        ) : (
          <><Copy className="h-4 w-4" />このセットを参考にする</>
        )}
      </button>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );

  return (
    <>
      {button}

      {/* 装備選択モーダル */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg max-h-[85dvh] flex flex-col bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-xl overflow-hidden">
            {/* ヘッダー */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground">コピーする装備を選択</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selected.size} / {items.length} 点選択中 · {formatWeight(selectedWeight)}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* 全選択/全解除 */}
            <div className="shrink-0 px-5 py-2.5 border-b border-border bg-secondary/30">
              <button onClick={toggleAll} className="text-xs font-medium text-primary hover:underline">
                {selected.size === items.length ? "すべて解除" : "すべて選択"}
              </button>
            </div>

            {/* アイテムリスト */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
              {grouped.map(([catId, catItems]) => (
                <div key={catId}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {CATEGORY_NAMES[catId] ?? catId}
                  </p>
                  <div className="rounded-xl border border-border bg-background overflow-hidden divide-y divide-border">
                    {catItems.map((item) => {
                      const isSelected = selected.has(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center gap-3 px-3.5 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                        >
                          <div className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                            isSelected ? "border-primary bg-primary" : "border-border bg-background"
                          )}>
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            {item.brand && <p className="text-xs text-muted-foreground truncate">{item.brand}</p>}
                          </div>
                          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                            {formatWeight(item.weight_g)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* フッター */}
            <div className="shrink-0 px-5 py-4 border-t border-border bg-card">
              <button
                onClick={() => handleCopy(Array.from(selected))}
                disabled={selected.size === 0 || copying}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {copying ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />コピー中...</>
                ) : (
                  <><Copy className="h-4 w-4" />{selected.size} 点の装備をコピー</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
