import { cn } from "@/lib/utils";

const tiers = [
  { max: 5000,     label: "UL",    sub: "超軽量", dot: "bg-emerald-500", cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { max: 8000,     label: "ライト", sub: "軽量",  dot: "bg-sky-500",     cls: "border-sky-200 bg-sky-50 text-sky-700" },
  { max: 12000,    label: "ミドル", sub: "標準",  dot: "bg-amber-500",   cls: "border-amber-200 bg-amber-50 text-amber-700" },
  { max: Infinity, label: "ヘビー", sub: "重装備", dot: "bg-rose-500",   cls: "border-rose-200 bg-rose-50 text-rose-700" },
];

export function ULScore({ weightG, className }: { weightG: number; className?: string }) {
  const tier = tiers.find((t) => weightG < t.max)!;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold",
      tier.cls, className
    )}>
      <span className={cn("h-2 w-2 rounded-full shrink-0", tier.dot)} />
      {tier.label}
      <span className="font-normal opacity-70">{tier.sub}</span>
    </span>
  );
}
