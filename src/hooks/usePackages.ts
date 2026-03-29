/**
 * Supabase-backed パッケージフック
 */
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GearPackage } from "@/types/gear";

export type PackageWithItemIds = GearPackage & {
  item_ids: string[];
  item_wear_types: Record<string, string>;
};

export type PackageInput = {
  name: string;
  description?: string | null;
  mountain_type?: string | null;
  is_public: boolean;
  item_ids: string[];
  item_wear_types?: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

export function usePackages() {
  const [packages, setPackages] = useState<PackageWithItemIds[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient() as AnyClient;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data, error: err } = await supabase
      .from("gear_packages")
      .select(`*, gear_package_items(gear_item_id, wear_type)`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (err) { setError(err.message); console.error("[usePackages] load error:", err); }
    else if (data) {
      const mapped: PackageWithItemIds[] = data.map((p: AnyClient) => {
        const gpi = p.gear_package_items ?? [];
        const wearTypes: Record<string, string> = {};
        for (const i of gpi) {
          wearTypes[i.gear_item_id] = i.wear_type ?? 'carried';
        }
        return {
          ...p,
          item_ids: gpi.map((i: { gear_item_id: string }) => i.gear_item_id),
          item_wear_types: wearTypes,
        };
      });
      setPackages(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addPackage = useCallback(async (input: PackageInput): Promise<string | null> => {
    const supabase = createClient() as AnyClient;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("ログインが必要です"); return null; }
    const { item_ids, item_wear_types, ...pkgData } = input;

    const { data: pkg, error: err1 } = await supabase
      .from("gear_packages")
      .insert({ ...pkgData, user_id: user.id, total_weight_g: 0, base_weight_g: 0 })
      .select()
      .single();
    if (err1 || !pkg) { setError(err1?.message ?? "error"); return null; }

    if (item_ids.length > 0) {
      // APIルート経由でアイテムを挿入（RLSバイパス）
      const res = await fetch(`/api/packages/${pkg.id}/items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_ids, item_wear_types }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "アイテムの保存に失敗しました");
        return null;
      }
    }

    await load();
    return pkg.id as string;
  }, [load]);

  const updatePackage = useCallback(async (id: string, input: Partial<PackageInput>) => {
    const supabase = createClient() as AnyClient;
    const { item_ids, item_wear_types, ...pkgData } = input;

    if (Object.keys(pkgData).length > 0) {
      const { error: updErr } = await supabase.from("gear_packages").update(pkgData).eq("id", id);
      if (updErr) { console.error("gear_packages update error:", updErr); setError(updErr.message); return; }
    }

    if (item_ids !== undefined) {
      // APIルート経由でアイテムを更新（RLSバイパス）
      const res = await fetch(`/api/packages/${id}/items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_ids, item_wear_types }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("items update error:", err);
        setError(err.error ?? "アイテムの更新に失敗しました");
        return;
      }
    }

    await load();
  }, [load]);

  const deletePackage = useCallback(async (id: string) => {
    const supabase = createClient() as AnyClient;
    const { error: err } = await supabase.from("gear_packages").delete().eq("id", id);
    if (err) { setError(err.message); return; }
    setPackages((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { packages, loading, error, addPackage, updatePackage, deletePackage, reload: load };
}
