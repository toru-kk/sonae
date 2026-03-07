import {
  Tent, BedDouble, Shirt, Footprints, Backpack,
  Compass, ShieldCheck, Flame, Apple, Wrench,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Tent, BedDouble, Shirt, Footprints, Backpack,
  Compass, ShieldCheck, Flame, Apple, Wrench,
};

export const categoryStyle: Record<string, {
  bg: string; gradient: string; ring: string; text: string; border: string;
}> = {
  shelter:    { bg: "bg-orange-50",  gradient: "from-orange-400 to-orange-600",  ring: "ring-orange-400",  text: "text-orange-600",  border: "border-orange-200" },
  sleeping:   { bg: "bg-violet-50",  gradient: "from-violet-400 to-violet-600",  ring: "ring-violet-400",  text: "text-violet-600",  border: "border-violet-200" },
  clothing:   { bg: "bg-sky-50",     gradient: "from-sky-400 to-sky-600",        ring: "ring-sky-400",     text: "text-sky-600",     border: "border-sky-200"    },
  footwear:   { bg: "bg-amber-50",   gradient: "from-amber-400 to-amber-600",    ring: "ring-amber-400",   text: "text-amber-600",   border: "border-amber-200"  },
  backpack:   { bg: "bg-emerald-50", gradient: "from-emerald-500 to-green-700",  ring: "ring-emerald-500", text: "text-emerald-700", border: "border-emerald-200"},
  navigation: { bg: "bg-blue-50",    gradient: "from-blue-400 to-blue-600",      ring: "ring-blue-400",    text: "text-blue-600",    border: "border-blue-200"   },
  safety:     { bg: "bg-red-50",     gradient: "from-red-400 to-red-600",        ring: "ring-red-400",     text: "text-red-600",     border: "border-red-200"    },
  cooking:    { bg: "bg-rose-50",    gradient: "from-rose-400 to-pink-600",      ring: "ring-rose-400",    text: "text-rose-600",    border: "border-rose-200"   },
  food:       { bg: "bg-lime-50",    gradient: "from-lime-400 to-green-500",     ring: "ring-lime-400",    text: "text-lime-700",    border: "border-lime-200"   },
  tools:      { bg: "bg-slate-100",  gradient: "from-slate-400 to-slate-600",    ring: "ring-slate-400",   text: "text-slate-600",   border: "border-slate-200"  },
};

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, { container: string; icon: string }> = {
  xs: { container: "h-6 w-6",   icon: "h-3 w-3"   },
  sm: { container: "h-8 w-8",   icon: "h-4 w-4"   },
  md: { container: "h-10 w-10", icon: "h-5 w-5"   },
  lg: { container: "h-14 w-14", icon: "h-7 w-7"   },
  xl: { container: "h-20 w-20", icon: "h-10 w-10" },
};

type Props = {
  categoryId: string;
  iconName?: string;
  size?: Size;
  variant?: "flat" | "gradient";
  className?: string;
};

export function CategoryIcon({
  categoryId, iconName, size = "md", variant = "flat", className,
}: Props) {
  const Icon = iconName ? (iconMap[iconName] ?? Wrench) : Wrench;
  const style = categoryStyle[categoryId] ?? {
    bg: "bg-secondary", gradient: "from-slate-400 to-slate-600",
    ring: "ring-slate-400", text: "text-slate-600", border: "border-slate-200",
  };
  const s = sizeMap[size];

  if (variant === "gradient") {
    return (
      <div className={cn(
        "shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm",
        style.gradient, s.container, className
      )}>
        <Icon className={cn("text-white drop-shadow-sm", s.icon)} strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className={cn(
      "shrink-0 flex items-center justify-center rounded-xl",
      style.bg, s.container, className
    )}>
      <Icon className={cn(style.text, s.icon)} strokeWidth={1.75} />
    </div>
  );
}
