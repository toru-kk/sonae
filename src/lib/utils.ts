import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 重量をフォーマット（g → kg表示）
export function formatWeight(grams: number | null): string {
  if (grams === null) return "—";
  if (grams >= 1000) return `${(grams / 1000).toFixed(1)}kg`;
  return `${grams}g`;
}
