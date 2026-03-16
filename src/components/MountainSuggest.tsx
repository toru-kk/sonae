"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";

type Mountain = { name: string; pref: string; elevation?: number };

const MOUNTAINS: Mountain[] = [
  // 北海道
  { name: "大雪山", pref: "北海道", elevation: 2291 },
  { name: "十勝岳", pref: "北海道", elevation: 2077 },
  { name: "羊蹄山", pref: "北海道", elevation: 1898 },
  { name: "利尻山", pref: "北海道", elevation: 1721 },
  { name: "トムラウシ山", pref: "北海道", elevation: 2141 },
  // 東北
  { name: "岩手山", pref: "岩手県", elevation: 2038 },
  { name: "鳥海山", pref: "山形県・秋田県", elevation: 2236 },
  { name: "月山", pref: "山形県", elevation: 1984 },
  { name: "蔵王山", pref: "山形県・宮城県", elevation: 1841 },
  { name: "飯豊山", pref: "山形県・新潟県・福島県", elevation: 2105 },
  { name: "朝日岳", pref: "山形県", elevation: 1870 },
  { name: "磐梯山", pref: "福島県", elevation: 1816 },
  { name: "安達太良山", pref: "福島県", elevation: 1700 },
  // 関東
  { name: "筑波山", pref: "茨城県", elevation: 877 },
  { name: "男体山", pref: "栃木県", elevation: 2486 },
  { name: "日光白根山", pref: "栃木県・群馬県", elevation: 2578 },
  { name: "那須岳", pref: "栃木県", elevation: 1917 },
  { name: "赤城山", pref: "群馬県", elevation: 1828 },
  { name: "谷川岳", pref: "群馬県・新潟県", elevation: 1977 },
  { name: "武尊山", pref: "群馬県", elevation: 2158 },
  { name: "両神山", pref: "埼玉県", elevation: 1723 },
  { name: "雲取山", pref: "東京都・埼玉県・山梨県", elevation: 2017 },
  { name: "高尾山", pref: "東京都", elevation: 599 },
  { name: "大山", pref: "神奈川県", elevation: 1252 },
  { name: "丹沢山", pref: "神奈川県", elevation: 1567 },
  { name: "塔ノ岳", pref: "神奈川県", elevation: 1491 },
  // 中部・北アルプス
  { name: "槍ヶ岳", pref: "長野県・岐阜県", elevation: 3180 },
  { name: "穂高岳", pref: "長野県・岐阜県", elevation: 3190 },
  { name: "奥穂高岳", pref: "長野県・岐阜県", elevation: 3190 },
  { name: "北穂高岳", pref: "長野県・岐阜県", elevation: 3106 },
  { name: "前穂高岳", pref: "長野県", elevation: 3090 },
  { name: "常念岳", pref: "長野県", elevation: 2857 },
  { name: "燕岳", pref: "長野県", elevation: 2763 },
  { name: "蝶ヶ岳", pref: "長野県", elevation: 2677 },
  { name: "立山", pref: "富山県", elevation: 3015 },
  { name: "剱岳", pref: "富山県", elevation: 2999 },
  { name: "薬師岳", pref: "富山県", elevation: 2926 },
  { name: "白馬岳", pref: "長野県・富山県", elevation: 2932 },
  { name: "唐松岳", pref: "長野県・富山県", elevation: 2696 },
  { name: "五竜岳", pref: "長野県・富山県", elevation: 2814 },
  { name: "鹿島槍ヶ岳", pref: "長野県・富山県", elevation: 2889 },
  { name: "笠ヶ岳", pref: "岐阜県", elevation: 2898 },
  { name: "乗鞍岳", pref: "長野県・岐阜県", elevation: 3026 },
  { name: "焼岳", pref: "長野県・岐阜県", elevation: 2455 },
  // 中部・南アルプス
  { name: "北岳", pref: "山梨県", elevation: 3193 },
  { name: "間ノ岳", pref: "山梨県・静岡県", elevation: 3190 },
  { name: "甲斐駒ヶ岳", pref: "山梨県・長野県", elevation: 2967 },
  { name: "仙丈ヶ岳", pref: "長野県", elevation: 3033 },
  { name: "赤石岳", pref: "静岡県・長野県", elevation: 3121 },
  { name: "聖岳", pref: "静岡県・長野県", elevation: 3013 },
  { name: "光岳", pref: "静岡県・長野県", elevation: 2592 },
  // 中部・八ヶ岳ほか
  { name: "八ヶ岳", pref: "長野県・山梨県", elevation: 2899 },
  { name: "赤岳", pref: "長野県・山梨県", elevation: 2899 },
  { name: "蓼科山", pref: "長野県", elevation: 2531 },
  { name: "霧ヶ峰", pref: "長野県", elevation: 1925 },
  { name: "美ヶ原", pref: "長野県", elevation: 2034 },
  { name: "浅間山", pref: "長野県・群馬県", elevation: 2568 },
  { name: "妙高山", pref: "新潟県", elevation: 2454 },
  { name: "火打山", pref: "新潟県", elevation: 2462 },
  { name: "苗場山", pref: "新潟県・長野県", elevation: 2145 },
  { name: "巻機山", pref: "新潟県・群馬県", elevation: 1967 },
  // 富士山
  { name: "富士山", pref: "山梨県・静岡県", elevation: 3776 },
  // 近畿
  { name: "大台ヶ原", pref: "奈良県・三重県", elevation: 1695 },
  { name: "大峰山", pref: "奈良県", elevation: 1915 },
  { name: "伊吹山", pref: "滋賀県・岐阜県", elevation: 1377 },
  { name: "比良山", pref: "滋賀県", elevation: 1214 },
  { name: "六甲山", pref: "兵庫県", elevation: 931 },
  // 中国・四国
  { name: "大山", pref: "鳥取県", elevation: 1729 },
  { name: "石鎚山", pref: "愛媛県", elevation: 1982 },
  { name: "剣山", pref: "徳島県", elevation: 1955 },
  // 九州
  { name: "阿蘇山", pref: "熊本県", elevation: 1592 },
  { name: "くじゅう連山", pref: "大分県", elevation: 1791 },
  { name: "祖母山", pref: "大分県・宮崎県", elevation: 1756 },
  { name: "霧島山", pref: "宮崎県・鹿児島県", elevation: 1700 },
  { name: "開聞岳", pref: "鹿児島県", elevation: 924 },
  { name: "屋久島・宮之浦岳", pref: "鹿児島県", elevation: 1936 },
];

type Props = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
};

export function MountainSuggest({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = value.trim()
    ? MOUNTAINS.filter(
        (m) =>
          m.name.includes(value) ||
          m.pref.includes(value)
      ).slice(0, 8)
    : [];

  const handleSelect = useCallback((m: Mountain) => {
    onChange(m.name);
    setOpen(false);
    inputRef.current?.blur();
  }, [onChange]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showDropdown = open && focused && filtered.length > 0;

  return (
    <div ref={ref} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => { setFocused(true); setOpen(true); }}
        placeholder="例：槍ヶ岳、富士山、高尾山"
        className={className}
      />
      {showDropdown && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden">
          {filtered.map((m) => (
            <button
              key={`${m.name}-${m.pref}`}
              type="button"
              onClick={() => handleSelect(m)}
              className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left hover:bg-accent transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">{m.name}</span>
                {m.elevation && (
                  <span className="ml-2 text-xs text-muted-foreground">{m.elevation.toLocaleString()}m</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{m.pref}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
