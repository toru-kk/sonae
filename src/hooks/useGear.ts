/**
 * Supabase-backed 装備フック
 */
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GearItem } from "@/types/gear";

export type GearItemInput = {
  name: string;
  category_id: string;
  brand?: string | null;
  weight_g?: number | null;
  notes?: string | null;
  is_essential: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

export function useGear() {
  const [gearItems, setGearItems] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient() as AnyClient;
    const { data, error: err } = await supabase
      .from("gear_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) { setError(err.message); }
    else if (data) { setGearItems(data as GearItem[]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addGear = useCallback(async (input: GearItemInput): Promise<string | null> => {
    const supabase = createClient() as AnyClient;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("ログインが必要です"); return null; }
    const { data, error: err } = await supabase
      .from("gear_items")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();
    if (err) { setError(err.message); return null; }
    if (data) {
      setGearItems((prev) => [data as GearItem, ...prev]);
      return data.id as string;
    }
    return null;
  }, []);

  const updateGear = useCallback(async (id: string, input: Partial<GearItemInput>) => {
    const supabase = createClient() as AnyClient;
    const { data, error: err } = await supabase
      .from("gear_items")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (err) { setError(err.message); return; }
    if (data) {
      setGearItems((prev) => prev.map((g) => (g.id === id ? (data as GearItem) : g)));
    }
  }, []);

  const deleteGear = useCallback(async (id: string) => {
    const supabase = createClient() as AnyClient;
    const { error: err } = await supabase.from("gear_items").delete().eq("id", id);
    if (err) { setError(err.message); return; }
    setGearItems((prev) => prev.filter((g) => g.id !== id));
  }, []);

  return { gearItems, loading, error, addGear, updateGear, deleteGear, reload: load };
}
