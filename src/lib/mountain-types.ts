export const MOUNTAIN_TYPES = [
  "高山・縦走",
  "日帰りハイク",
  "低山・ハイキング",
  "テント泊",
  "冬山",
  "富士山",
  "沢登り",
  "その他",
] as const;

export type MountainType = (typeof MOUNTAIN_TYPES)[number];
