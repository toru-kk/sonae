// 装備アイテム
export type GearItem = {
  id: string;
  user_id: string;
  name: string;
  category_id: string;
  brand?: string | null;
  weight_g: number | null;
  notes: string | null;
  image_url: string | null;
  is_essential: boolean;
  created_at: string;
  updated_at: string;
};

// 装備カテゴリ
export type GearCategory = {
  id: string;
  name: string;
  name_ja: string;
  icon: string;
  sort_order: number;
};

// パッケージ（セット）
export type GearPackage = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  mountain_type: string | null;
  total_weight_g: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

// パッケージに含まれる装備
export type GearPackageItem = {
  id: string;
  package_id: string;
  gear_item_id: string;
  quantity: number;
  notes: string | null;
  // JOIN用
  gear_item?: GearItem;
};

// パッケージ + アイテム一覧（表示用）
export type GearPackageWithItems = GearPackage & {
  items: GearPackageItem[];
};
