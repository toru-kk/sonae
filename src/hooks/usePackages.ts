/**
 * Supabase-backed パッケージフック
 */
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GearPackage } from "@/types/gear";

export type PackageWithItemIds = GearPackage & { item_ids: string[] };

export type PackageInput = {
  name: string;
  description?: string | null;
  mountain_type?: string | null;
  is_public: boolean;
  item_ids: string[];
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
    const { data, error: err } = await supabase
      .from("gear_packages")
      .select(`*, gear_package_items(gear_item_id)`)
      .order("created_at", { ascending: false });

    if (err) { setError(err.message); }
    else if (data) {
      const mapped: PackageWithItemIds[] = data.map((p: AnyClient) => ({
        ...p,
        item_ids: (p.gear_package_items ?? []).map(
          (i: { gear_item_id: string }) => i.gear_item_id
        ),
      }));
      setPackages(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addPackage = useCallback(async (input: PackageInput): Promise<string | null> => {
    const supabase = createClient() as AnyClient;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("ログインが必要です"); return null; }
    const { item_ids, ...pkgData } = input;

    const { data: pkg, error: err1 } = await supabase
      .from("gear_packages")
      .insert({ ...pkgData, user_id: user.id, total_weight_g: 0 })
      .select()
      .single();
    if (err1 || !pkg) { setError(err1?.message ?? "error"); return null; }

    if (item_ids.length > 0) {
      const rows = item_ids.map((gear_item_id: string) => ({
        package_id: pkg.id,
        gear_item_id,
      }));
      const { error: err2 } = await supabase.from("gear_package_items").insert(rows);
      if (err2) { setError(err2.message); return null; }
    }

    await load();
    return pkg.id as string;
  }, [load]);

  const updatePackage = useCallback(async (id: string, input: Partial<PackageInput>) => {
    const supabase = createClient() as AnyClient;
    const { item_ids, ...pkgData } = input;

    if (Object.keys(pkgData).length > 0) {
      await supabase.from("gear_packages").update(pkgData).eq("id", id);
    }

    if (item_ids !== undefined) {
      await supabase.from("gear_package_items").delete().eq("package_id", id);
      if (item_ids.length > 0) {
        const rows = item_ids.map((gear_item_id: string) => ({
          package_id: id,
          gear_item_id,
        }));
        await supabase.from("gear_package_items").insert(rows);
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
