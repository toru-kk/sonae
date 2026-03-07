"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Globe, Lock, Weight } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";
import { CategoryIcon } from "@/components/gear/CategoryIcon";
import { usePackages } from "@/hooks/usePackages";
import { useGear } from "@/hooks/useGear";
import type { GearItem } from "@/types/gear";
import { cn } from "@/lib/utils";

const MOUNTAIN_TYPES = [
  "高山・縦走",
  "低山・ハイキング",
  "富士山",
  "雪山",
  "沢登り",
  "その他",
] as const;

const categoryMap = Object.fromEntries(mockCategories.map((c) => [c.id, c]));

function formatWeight(g: number) {
  if (g === 0) return "0 g";
  return g >= 1000 ? `${(g / 1000).toFixed(1)} kg` : `${g} g`;
}

function groupGearByCategory(gearItems: GearItem[]) {
  const groups: Record<string, GearItem[]> = {};
  gearItems.forEach((item) => {
    if (!groups[item.category_id]) groups[item.category_id] = [];
    groups[item.category_id].push(item);
  });
  return mockCategories
    .filter((cat) => groups[cat.id]?.length > 0)
    .map((cat) => ({ cat, items: groups[cat.id] }));
}

export default function PackageNewPage() {
  const router = useRouter();
  const { addPackage } = usePackages();
  const { gearItems } = useGear();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mountainType, setMountainType] = useState<string>(MOUNTAIN_TYPES[0]);
  const [isPublic, setIsPublic] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const gearGroups = groupGearByCategory(gearItems);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedItems = gearItems.filter((item) => selectedIds.has(item.id));
  const totalWeight = selectedItems.reduce((sum, item) => sum + (item.weight_g ?? 0), 0);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const id = await addPackage({
      name: name.trim(),
      description: description.trim() || null,
      mountain_type: mountainType,
      is_public: isPublic,
      item_ids: Array.from(selectedIds),
    });
    if (id) router.push(`/packages/${id}`);
    else setSaving(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Link
        href="/packages"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        パッケージ
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">パッケージを新規作成</h1>

      <div className="space-y-6">
        {/* パッケージ名 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            パッケージ名<span className="ml-1 text-xs text-red-500">必須</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 北アルプス縦走セット"
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>

        {/* 説明 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="パッケージの目的や特徴を入力..."
            rows={3}
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
          />
        </div>

        {/* 山タイプ */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">山タイプ</label>
          <select
            value={mountainType}
            onChange={(e) => setMountainType(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          >
            {MOUNTAIN_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* 公開設定 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">公開設定</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                !isPublic ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              <Lock className="h-4 w-4" />非公開
            </button>
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                isPublic ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              <Globe className="h-4 w-4" />公開
            </button>
          </div>
        </div>

        {/* 装備の選択 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">装備の選択</label>
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{selectedIds.size} 点選択</span>
                <span className="inline-flex items-center gap-1">
                  <Weight className="h-3 w-3" />{formatWeight(totalWeight)}
                </span>
              </div>
            )}
          </div>

          {gearItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-10 text-center">
              <p className="text-sm text-muted-foreground mb-3">装備が登録されていません</p>
              <Link href="/gear/new"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                装備を追加する
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {gearGroups.map(({ cat, items }) => (
                <div key={cat.id}>
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <CategoryIcon categoryId={cat.id} iconName={cat.icon} size="sm" className="h-4 w-4 rounded-md" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cat.name_ja}</span>
                  </div>
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {items.map((item, idx) => {
                      const isSelected = selectedIds.has(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                            idx < items.length - 1 && "border-b border-border",
                            isSelected ? "bg-primary/5" : "hover:bg-secondary/50"
                          )}
                        >
                          <div className={cn(
                            "shrink-0 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors",
                            isSelected ? "border-primary bg-primary" : "border-border bg-card"
                          )}>
                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <CategoryIcon
                            categoryId={item.category_id}
                            iconName={categoryMap[item.category_id]?.icon}
                            size="sm"
                            variant="flat"
                            className="shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            {item.brand && <p className="text-xs text-muted-foreground">{item.brand}</p>}
                          </div>
                          <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
                            {item.weight_g ? `${item.weight_g} g` : "—"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 保存ボタン */}
        <div className="pt-2 pb-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className={cn(
              "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
              !name.trim() || saving
                ? "bg-primary/40 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {saving ? "保存中..." : "パッケージを保存"}
          </button>
        </div>
      </div>
    </div>
  );
}
