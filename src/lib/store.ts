/**
 * Sonae グローバルストア（Zustand + localStorage永続化）
 * Supabase導入後はこのストアをSupabase呼び出しに置き換える
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockGearItems, mockPackages } from "@/lib/mock-data";
import type { GearItem, GearPackage } from "@/types/gear";

// ─────────────────────────────────────────
// 型
// ─────────────────────────────────────────
export type GearItemInput = {
  name: string;
  category_id: string;
  brand?: string;
  weight_g?: number | null;
  notes?: string;
  is_essential: boolean;
};

export type PackageInput = {
  name: string;
  description?: string;
  mountain_type?: string;
  is_public: boolean;
  item_ids: string[];
};

// ─────────────────────────────────────────
// ストア型
// ─────────────────────────────────────────
type GearStore = {
  gearItems: GearItem[];
  packages: (GearPackage & { item_ids: string[] })[];
  packageItemMap: Record<string, string[]>;

  // 装備 CRUD
  addGear: (input: GearItemInput) => string;
  updateGear: (id: string, input: Partial<GearItemInput>) => void;
  deleteGear: (id: string) => void;

  // パッケージ CRUD
  addPackage: (input: PackageInput) => string;
  updatePackage: (id: string, input: Partial<PackageInput>) => void;
  deletePackage: (id: string) => void;
  addGearToPackage: (packageId: string, gearId: string) => void;
  removeGearFromPackage: (packageId: string, gearId: string) => void;
};

// ─────────────────────────────────────────
// 初期データ（mockデータをストアにマッピング）
// ─────────────────────────────────────────
const initialGearItems: GearItem[] = mockGearItems.map((g) => ({
  id: g.id,
  user_id: "demo-user",
  name: g.name,
  category_id: g.category_id,
  brand: g.brand ?? null,
  weight_g: g.weight_g,
  notes: g.notes ?? null,
  image_url: null,
  is_essential: g.is_essential,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

const initialPackageItemMap: Record<string, string[]> = {
  "pkg-1": ["1","2","3","4","5","6","7","10","11","12"],
  "pkg-2": ["1","2","3","10","11"],
  "pkg-3": ["1","2","3","5","10","11","8"],
};

const initialPackages = mockPackages.map((p) => ({
  id: p.id,
  user_id: "demo-user",
  name: p.name,
  description: p.description ?? null,
  mountain_type: p.mountain_type ?? null,
  total_weight_g: p.total_weight_g,
  is_public: p.is_public,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  item_ids: initialPackageItemMap[p.id] ?? [],
}));

// ─────────────────────────────────────────
// 計算ヘルパー
// ─────────────────────────────────────────
function calcTotalWeight(itemIds: string[], gearItems: GearItem[]): number {
  return itemIds.reduce((sum, id) => {
    const g = gearItems.find((g) => g.id === id);
    return sum + (g?.weight_g ?? 0);
  }, 0);
}

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─────────────────────────────────────────
// ストア
// ─────────────────────────────────────────
export const useGearStore = create<GearStore>()(
  persist(
    (set, get) => ({
      gearItems: initialGearItems,
      packages: initialPackages,
      packageItemMap: initialPackageItemMap,

      // ── 装備 ──────────────────────────────
      addGear: (input) => {
        const id = newId();
        const now = new Date().toISOString();
        const item: GearItem = {
          id,
          user_id: "demo-user",
          name: input.name,
          category_id: input.category_id,
          weight_g: input.weight_g ?? null,
          notes: input.notes ?? null,
          image_url: null,
          is_essential: input.is_essential,
          created_at: now,
          updated_at: now,
        };
        set((s) => ({ gearItems: [item, ...s.gearItems] }));
        return id;
      },

      updateGear: (id, input) => {
        set((s) => ({
          gearItems: s.gearItems.map((g) =>
            g.id === id
              ? { ...g, ...input, updated_at: new Date().toISOString() }
              : g
          ),
        }));
      },

      deleteGear: (id) => {
        set((s) => ({
          gearItems: s.gearItems.filter((g) => g.id !== id),
          packages: s.packages.map((p) => {
            const item_ids = p.item_ids.filter((i) => i !== id);
            return {
              ...p,
              item_ids,
              total_weight_g: calcTotalWeight(item_ids, s.gearItems.filter((g) => g.id !== id)),
            };
          }),
        }));
      },

      // ── パッケージ ────────────────────────
      addPackage: (input) => {
        const id = newId();
        const now = new Date().toISOString();
        const pkg = {
          id,
          user_id: "demo-user",
          name: input.name,
          description: input.description ?? null,
          mountain_type: input.mountain_type ?? null,
          total_weight_g: calcTotalWeight(input.item_ids, get().gearItems),
          is_public: input.is_public,
          created_at: now,
          updated_at: now,
          item_ids: input.item_ids,
        };
        set((s) => ({ packages: [pkg, ...s.packages] }));
        return id;
      },

      updatePackage: (id, input) => {
        set((s) => ({
          packages: s.packages.map((p) => {
            if (p.id !== id) return p;
            const item_ids = input.item_ids ?? p.item_ids;
            return {
              ...p,
              ...input,
              item_ids,
              total_weight_g: calcTotalWeight(item_ids, s.gearItems),
              updated_at: new Date().toISOString(),
            };
          }),
        }));
      },

      deletePackage: (id) => {
        set((s) => ({ packages: s.packages.filter((p) => p.id !== id) }));
      },

      addGearToPackage: (packageId, gearId) => {
        set((s) => ({
          packages: s.packages.map((p) => {
            if (p.id !== packageId || p.item_ids.includes(gearId)) return p;
            const item_ids = [...p.item_ids, gearId];
            return { ...p, item_ids, total_weight_g: calcTotalWeight(item_ids, s.gearItems) };
          }),
        }));
      },

      removeGearFromPackage: (packageId, gearId) => {
        set((s) => ({
          packages: s.packages.map((p) => {
            if (p.id !== packageId) return p;
            const item_ids = p.item_ids.filter((i) => i !== gearId);
            return { ...p, item_ids, total_weight_g: calcTotalWeight(item_ids, s.gearItems) };
          }),
        }));
      },
    }),
    {
      name: "sonae-gear-store",
      // localStorageに保存
    }
  )
);
