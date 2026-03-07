import Link from "next/link";
import { CheckCircle, Sparkles, Layers, Backpack, ChevronRight, Thermometer, BatteryLow, ClipboardList, Scale, MapPin, Archive } from "lucide-react";
import { SonaeLogoIcon } from "@/components/SonaeLogo";
import { HeroCTA } from "@/components/HeroCTA";
import { StatsBar } from "@/components/StatsBar";
import { FooterCTA } from "@/components/FooterCTA";
import { PlanCTA } from "@/components/PlanCTA";

export default function Home() {
  return (
    <>
    <div className="bg-background">

      {/* ヒーロー */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[580px]">
        {/* 深夜の空グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03080d] via-[#071d13] to-[#185535]" />
        {/* 月光のアンビエントグロー */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_42%_at_16%_18%,rgba(155,215,185,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_78%_68%,rgba(20,75,44,0.32),transparent)]" />
        {/* 地平線のぼんやりした光 */}
        <div className="absolute bottom-[88px] left-0 right-0 h-32 bg-gradient-to-t from-[#1a5c3a]/35 to-transparent pointer-events-none" />

        {/* オーロラ帯（薄い緑の光） */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-0 right-0 h-24 opacity-20"
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.18) 40%, rgba(16,185,129,0.22) 60%, transparent 100%)", filter: "blur(18px)", transform: "skewY(-3deg)" }} />
          <div className="absolute top-[22%] left-[10%] right-[15%] h-10"
            style={{ background: "linear-gradient(90deg, transparent, rgba(110,231,183,0.10), transparent)", filter: "blur(12px)" }} />
        </div>

        {/* 霧・霞レイヤー（山と空の境界） */}
        <div className="absolute pointer-events-none"
          style={{ bottom: "160px", left: 0, right: 0, height: "80px",
            background: "linear-gradient(180deg, transparent 0%, rgba(20,80,48,0.25) 50%, rgba(24,85,53,0.35) 100%)",
            filter: "blur(8px)" }} />
        {/* 霧の帯（中景の山の前） */}
        <div className="absolute pointer-events-none opacity-40"
          style={{ bottom: "130px", left: 0, right: 0, height: "40px",
            background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(180,230,200,0.12), transparent)",
            filter: "blur(6px)" }} />

        {/* 星・月・流れ星 SVGレイヤー */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* 月のグロー（重ねて柔らかく光る三日月） */}
          <circle cx="16%" cy="18%" r="48" fill="rgba(155,215,185,0.03)" />
          <circle cx="16%" cy="18%" r="30" fill="rgba(165,222,195,0.05)" />
          <circle cx="16%" cy="18%" r="18" fill="rgba(180,230,205,0.09)" />
          <circle cx="16%" cy="18%" r="11" fill="rgba(205,242,220,0.16)" />
          <circle cx="16%" cy="18%" r="7.5" fill="rgba(228,250,238,0.46)" />
          {/* 三日月の影（暗い円をオフセットして三日月に） */}
          <circle cx="18.4%" cy="16.2%" r="7" fill="rgba(3,8,6,0.94)" />

          {/* 流れ星 */}
          <line x1="64%" y1="6%" x2="74%" y2="12%" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="64%" cy="6%" r="1.1" fill="rgba(255,255,255,0.55)" />
          <line x1="78%" y1="3%" x2="84%" y2="7%" stroke="rgba(200,240,220,0.20)" strokeWidth="0.5" strokeLinecap="round" />

          {/* 星々（メイン） */}
          {[
            [8,6],[15,12],[23,4],[31,9],[38,3],[46,14],[54,7],[61,11],[68,5],[74,9],[81,3],[88,13],[94,7],
            [5,22],[13,18],[20,25],[28,19],[36,23],[44,17],[52,21],[60,16],[67,22],[75,18],[83,24],[91,19],
            [10,32],[18,28],[26,35],[33,30],[41,33],[49,27],[57,31],[65,28],[72,34],[80,29],[87,33],
            [3,42],[11,38],[19,44],[27,40],[35,43],[43,37],[51,41],[59,38],[66,44],[73,39],[79,43],[85,37],
          ].map(([x, y], i) => (
            <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 5 === 0 ? "1.2" : i % 3 === 0 ? "0.85" : "0.55"}
              fill="white" opacity={i % 5 === 0 ? "0.72" : i % 3 === 0 ? "0.42" : "0.22"} />
          ))}
          {/* 輝く特大の星 */}
          <circle cx="22%" cy="8%" r="1.6" fill="white" opacity="0.92" />
          <circle cx="22%" cy="8%" r="3" fill="rgba(255,255,255,0.12)" />
          <circle cx="67%" cy="5.5%" r="1.4" fill="#b4edcc" opacity="0.88" />
          <circle cx="67%" cy="5.5%" r="2.8" fill="rgba(180,237,204,0.10)" />
          <circle cx="45%" cy="3.5%" r="1.1" fill="white" opacity="0.82" />
        </svg>

        {/* 遠景の山々（薄い、高い峰） */}
        <svg className="absolute bottom-20 left-0 right-0 w-full pointer-events-none" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,180 L60,120 L120,150 L200,70 L280,110 L360,50 L440,100 L520,40 L600,90 L680,35 L760,85 L840,45 L920,95 L1000,55 L1080,100 L1140,70 L1200,90 L1200,200 L0,200 Z"
            fill="rgba(12,42,24,0.75)" />
        </svg>

        {/* 中景の山々（濃い緑） */}
        <svg className="absolute bottom-16 left-0 right-0 w-full pointer-events-none" viewBox="0 0 1200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,160 L80,100 L160,130 L240,80 L320,115 L400,60 L480,105 L560,70 L640,110 L720,65 L800,100 L880,55 L960,90 L1040,70 L1120,95 L1200,80 L1200,180 L0,180 Z"
            fill="rgba(16,58,34,0.85)" />
        </svg>

        {/* 松の木シルエット（左） */}
        <svg className="absolute bottom-[88px] left-0 pointer-events-none h-32 w-48 md:h-40 md:w-64" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,140 50,90 70,140" fill="#091e10" />
          <polygon points="25,105 50,45 75,105" fill="#091e10" />
          <polygon points="20,75 50,10 80,75" fill="#091e10" />
          <rect x="46" y="138" width="8" height="15" fill="#091e10" />
          <polygon points="100,140 118,100 136,140" fill="#0b2a15" />
          <polygon points="96,112 118,65 140,112" fill="#0b2a15" />
          <polygon points="93,88 118,32 143,88" fill="#0b2a15" />
          <rect x="114" y="138" width="8" height="15" fill="#0b2a15" />
          <polygon points="155,140 168,110 181,140" fill="#091e10" />
          <polygon points="152,118 168,82 184,118" fill="#091e10" />
          <rect x="164" y="138" width="8" height="12" fill="#091e10" />
        </svg>

        {/* 松の木シルエット（右） */}
        <svg className="absolute bottom-[88px] right-0 pointer-events-none h-28 w-40 md:h-36 md:w-56" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,130 40,85 60,130" fill="#0b2a15" />
          <polygon points="15,100 40,48 65,100" fill="#0b2a15" />
          <polygon points="12,75 40,15 68,75" fill="#0b2a15" />
          <rect x="36" y="128" width="8" height="12" fill="#0b2a15" />
          <polygon points="90,130 108,95 126,130" fill="#091e10" />
          <polygon points="86,105 108,62 130,105" fill="#091e10" />
          <rect x="104" y="128" width="8" height="12" fill="#091e10" />
          <polygon points="148,130 163,100 178,130" fill="#0b2a15" />
          <polygon points="145,108 163,70 181,108" fill="#0b2a15" />
          <rect x="159" y="128" width="8" height="12" fill="#0b2a15" />
        </svg>

        {/* 熊のシルエット — ミニマルなフラットスタイル */}
        <div className="absolute pointer-events-none opacity-70" style={{ bottom: '118px', left: '44%', transform: 'translateX(-50%)' }}>
          <svg className="w-10 h-12 sm:w-12 sm:h-14" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg" fill="#163c22">
            <circle cx="13" cy="12" r="7" />
            <circle cx="37" cy="12" r="7" />
            <circle cx="25" cy="23" r="14" />
            <ellipse cx="25" cy="44" rx="13" ry="14" />
            <ellipse cx="9" cy="40" rx="5" ry="9" transform="rotate(-20 9 40)" />
            <ellipse cx="41" cy="40" rx="5" ry="9" transform="rotate(20 41 40)" />
            <ellipse cx="18" cy="56" rx="6.5" ry="5" />
            <ellipse cx="32" cy="56" rx="6.5" ry="5" />
          </svg>
        </div>

        {/* 稜線シルエット（手前・白＝背景色） */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-background"
          style={{ clipPath: "polygon(0 65%, 12% 28%, 27% 58%, 43% 8%, 58% 48%, 72% 18%, 88% 42%, 100% 12%, 100% 100%, 0 100%)" }} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center gap-14 md:gap-12">

            {/* 左: テキスト — 背景にブラー層で可読性を確保 */}
            <div className="flex-1 text-white relative">
              {/* テキスト背景のソフトグロー */}
              <div className="absolute -inset-6 rounded-3xl bg-[#03080d]/40 blur-xl pointer-events-none" />

              <div className="relative">
                {/* ブランドロゴ */}
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm">
                    <SonaeLogoIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black tracking-tight text-white leading-none">Sonae</span>
                      <span className="text-sm font-bold text-green-300 leading-none">ソナエ</span>
                    </div>
                    <p className="text-[10px] font-medium tracking-widest text-white/45 uppercase mt-0.5">備え・登山装備管理</p>
                  </div>
                </div>

                <h1 className="mb-5 font-bold leading-[1.25] tracking-tight"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
                  <span className="block text-3xl sm:text-4xl md:text-4xl whitespace-nowrap">
                    次の山、装備は決まった？
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-green-300 mt-1 whitespace-nowrap">
                    sonaeで見つける、自分だけの正解。
                  </span>
                </h1>
                <p className="mb-8 text-base md:text-lg leading-relaxed text-white/70"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>
                  装備に迷う夜を、終わらせよう。
                </p>
                <HeroCTA />
              </div>
            </div>

            {/* 右: アプリUIモックアップ */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-64 md:w-72">
                {/* 背景グロー */}
                <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />
                {/* フォン枠 */}
                <div className="relative rounded-[2rem] border border-white/20 bg-[#0d1f14] shadow-2xl overflow-hidden">
                  {/* ステータスバー */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-2">
                    <span className="text-[10px] text-white/40 font-medium">9:41</span>
                    <div className="flex gap-1">
                      <div className="h-1.5 w-4 rounded-full bg-white/30" />
                      <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    </div>
                  </div>
                  {/* アプリヘッダー */}
                  <div className="border-b border-white/10 bg-white/5 px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-md bg-[#14432a] flex items-center justify-center">
                          <SonaeLogoIcon className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-bold text-white/90 truncate max-w-[120px]">北アルプス縦走セット</span>
                      </div>
                      <span className="text-[10px] font-medium text-green-400 tabular-nums">5 / 8</span>
                    </div>
                    {/* プログレスバー */}
                    <div className="mt-2 h-1 rounded-full bg-white/10">
                      <div className="h-full w-[62%] rounded-full bg-green-500 transition-all" />
                    </div>
                  </div>
                  {/* チェックリスト */}
                  <div className="px-3 py-2 space-y-0.5">
                    {[
                      { name: "ダウンジャケット",   brand: "mont-bell",     weight: "340g",  done: true  },
                      { name: "テント",             brand: "MSR",           weight: "1.5kg", done: true  },
                      { name: "シュラフ",           brand: "NANGA",         weight: "820g",  done: true  },
                      { name: "ヘッドランプ",       brand: "PETZL",         weight: "91g",   done: true  },
                      { name: "レインウェア",       brand: "Patagonia",     weight: "450g",  done: true  },
                      { name: "トレッキングポール", brand: "Black Diamond", weight: "480g",  done: false },
                      { name: "ファーストエイド",   brand: "—",             weight: "200g",  done: false },
                      { name: "非常食",             brand: "—",             weight: "300g",  done: false },
                    ].map((item) => (
                      <div key={item.name}
                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${item.done ? "bg-green-500/10" : "bg-white/4"}`}>
                        <div className={`shrink-0 h-4 w-4 rounded-full border flex items-center justify-center
                          ${item.done ? "bg-green-500 border-green-500" : "border-white/25 bg-transparent"}`}>
                          {item.done && (
                            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none">
                              <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-medium leading-tight truncate ${item.done ? "text-white/40 line-through" : "text-white/85"}`}>
                            {item.name}
                          </p>
                          <p className="text-[9px] text-white/30 truncate">{item.brand} · {item.weight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* フッター */}
                  <div className="border-t border-white/10 bg-white/3 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/50">残り <span className="font-semibold text-white/80">3</span> 点</span>
                      <span className="text-[10px] font-semibold text-green-400">4.0 kg / 4.2 kg</span>
                    </div>
                    <div className="w-full rounded-lg bg-green-600/30 py-2 text-center text-[10px] font-bold text-green-300 border border-green-500/30">
                      出発準備中... 62%
                    </div>
                  </div>
                  {/* ホームバー */}
                  <div className="flex justify-center py-2.5">
                    <div className="h-1 w-16 rounded-full bg-white/20" />
                  </div>
                </div>
                {/* 浮かんでいるバッジ */}
                <div className="absolute -right-2 md:-right-4 top-16 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 shadow-lg">
                  <p className="text-[9px] text-white/50 font-medium">総重量</p>
                  <p className="text-sm font-bold text-white">4.2 <span className="text-xs font-normal text-white/60">kg</span></p>
                </div>
                <div className="absolute -left-2 md:-left-5 bottom-24 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Sparkles className="h-2.5 w-2.5 text-green-400" />
                    </div>
                    <p className="text-[10px] font-semibold text-white/80">AI提案済み</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 統計バー */}
      <StatsBar />

      {/* 機能セクション */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-20">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">3つのステップで万全の準備を</h2>
          <p className="mt-3 text-muted-foreground">登山の準備を、もっとシンプルに、もっと確実に。</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01", icon: Backpack,
              title: "装備を登録",
              desc: "所持している装備をカテゴリ別に登録。重量・メモを記録して自分だけの装備データベースを作る。",
              href: "/gear",
            },
            {
              step: "02", icon: Layers,
              title: "パッケージを作成",
              desc: "「北アルプスセット」「低山セット」など登山スタイル別にまとめて管理。総重量を自動計算。",
              href: "/packages",
            },
            {
              step: "03", icon: Sparkles,
              title: "AIが最適化",
              desc: "山名・季節・泊数を入力するだけ。AIがあなたの装備から最適なセットを選んで提案する。",
              href: "/ai-suggest",
            },
          ].map(({ step, icon: Icon, title, desc, href }) => (
            <Link key={step} href={href}
              className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">{step}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                詳しく見る <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ペインポイント */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 md:pb-20">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">こんなこと、ありませんか？</p>
          <h2 className="mb-8 text-2xl md:text-3xl font-bold text-foreground">登山前の「あれ、持った？」から<br className="hidden sm:block" />解放されたい。</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { Icon: Thermometer,   text: "ザックを開けたら防寒着を忘れていた",   color: "text-sky-500",    bg: "bg-sky-50"    },
              { Icon: BatteryLow,    text: "ヘッドランプの電池が切れていた",       color: "text-amber-500",  bg: "bg-amber-50"  },
              { Icon: ClipboardList, text: "毎回Excelやメモ帳で管理するのが面倒", color: "text-violet-500", bg: "bg-violet-50" },
              { Icon: Scale,         text: "総重量を計算するのが手間すぎる",       color: "text-emerald-600",bg: "bg-emerald-50"},
              { Icon: MapPin,        text: "山に合った装備が毎回わからなくなる",   color: "text-rose-500",   bg: "bg-rose-50"   },
              { Icon: Archive,       text: "「あのセット」どこに保存したか忘れた", color: "text-orange-500", bg: "bg-orange-50" },
            ].map(({ Icon, text, color, bg }) => (
              <div key={text} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
                <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-accent/50 border border-border p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">sonaeはその「うっかり」を防ぐために作りました。</span>
              装備を一元管理して、チェックリストで出発前に確認。AIが最適なセットを選んでくれます。
            </p>
          </div>
        </div>
      </section>

      {/* AI CTAバナー */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 md:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d2016] to-[#1a5c3a] p-8 text-white md:p-12">
          <div className="absolute right-8 top-8 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="relative max-w-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-400">AI 装備提案</p>
            <h2 className="mb-3 text-2xl font-bold">山名を入れるだけで、<br />最適な装備をAIが選ぶ</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              槍ヶ岳、富士山、高尾山——山の特性・季節・泊数を考慮して、
              あなたの装備から最適なパッケージをAIが提案します。
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["標高・難易度を自動判定", "不足装備を指摘", "安全警告付き"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  {t}
                </span>
              ))}
            </div>
            <Link href="/ai-suggest"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#14432a] hover:bg-green-50 transition-colors">
              <Sparkles className="h-4 w-4" />
              AI提案を試す
            </Link>
          </div>
        </div>
      </section>

      {/* サンプルパッケージ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 md:pb-24">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Public Packages</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">登山者たちの装備セット</h2>
          <p className="mt-3 text-muted-foreground text-sm">sonaeで公開されている装備パッケージの一例</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "北アルプス縦走セット", mountain: "槍ヶ岳〜穂高", nights: "3泊4日", weight: "9.2kg", items: 22, tags: ["テント泊", "夏季"] },
            { name: "富士山 弾丸セット",   mountain: "富士山",      nights: "日帰り", weight: "4.1kg", items: 12, tags: ["日帰り", "夏季"] },
            { name: "冬期八ヶ岳セット",   mountain: "赤岳",        nights: "1泊2日", weight: "13.8kg", items: 28, tags: ["冬山", "テント泊"] },
            { name: "低山ハイク軽量化",   mountain: "高尾山周辺",  nights: "日帰り", weight: "2.8kg", items: 9,  tags: ["日帰り", "UL"] },
            { name: "南アルプス縦走",     mountain: "甲斐駒〜仙丈", nights: "2泊3日", weight: "11.4kg", items: 25, tags: ["テント泊", "秋季"] },
            { name: "沢登りセット",       mountain: "奥多摩",      nights: "日帰り", weight: "6.3kg", items: 18, tags: ["沢登り", "夏季"] },
          ].map((pkg) => (
            <div key={pkg.name}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-default">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pkg.tags.map((t) => (
                  <span key={t} className="rounded-full bg-accent/60 px-2.5 py-0.5 text-[10px] font-semibold text-primary">{t}</span>
                ))}
              </div>
              <h3 className="font-bold text-foreground leading-snug mb-1">{pkg.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{pkg.mountain} · {pkg.nights}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground tabular-nums">{pkg.weight}</p>
                  <p className="text-xs text-muted-foreground">{pkg.items} 点</p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          ※ 表示はサンプルです。登録・ログイン後に実際の公開パッケージを閲覧できます。
        </p>
      </section>

      {/* 料金プラン */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">まずは無料で始められる</h2>
            <p className="mt-3 text-sm text-muted-foreground">装備管理・シェア機能はすべて無料。AIが必要になったらアップグレード。</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Free",
                price: "¥0",
                period: "",
                desc: "まず試してみたい人に",
                highlight: false,
                features: ["装備 30点まで登録", "パッケージ 3つまで", "出発前チェックリスト", "パッケージ公開・シェア", "AI提案 3回/月"],
                cta: "無料で始める",
                href: "/register",
              },
              {
                name: "Standard",
                price: "¥480",
                period: "/月",
                desc: "本格的に使いたい人に",
                highlight: true,
                features: ["装備 200点まで登録", "パッケージ 20つまで", "出発前チェックリスト", "パッケージ公開・シェア", "AI提案 30回/月"],
                cta: "スタンダードにする",
                href: "/register",
              },
              {
                name: "Premium",
                price: "¥980",
                period: "/月",
                desc: "制限なく使い倒したい人に",
                highlight: false,
                features: ["装備 無制限", "パッケージ 無制限", "出発前チェックリスト", "パッケージ公開・シェア", "AI提案 無制限"],
                cta: "プレミアムにする",
                href: "/register",
              },
            ].map((plan) => (
              <div key={plan.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-primary bg-primary text-primary-foreground shadow-xl scale-[1.02]"
                    : "border-border bg-card"
                }`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-900">
                    人気
                  </span>
                )}
                <div className="mb-5">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{plan.price}</span>
                    {plan.period && <span className={`text-sm ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{plan.period}</span>}
                  </div>
                  <p className={`mt-1 text-xs ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.desc}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-green-300" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <PlanCTA plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">よくある質問</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "無料プランでできることは？", a: "装備30点の登録、パッケージ3つの作成、チェックリスト、パッケージの公開・シェアがすべて無料で使えます。AI提案も月3回まで無料です。" },
            { q: "クレジットカードなしで始められますか？", a: "はい。無料プランはクレジットカード不要で、メールアドレスだけで登録できます。" },
            { q: "公開したパッケージは誰でも見られますか？", a: "はい。公開設定にしたパッケージは、ログインなしで誰でも閲覧できます。XやLINEでシェアすると、綺麗なカード形式で表示されます。" },
            { q: "AI提案はどのくらい正確ですか？", a: "山名・季節・泊数をもとに、登録済みの装備から最適なセットを選定し、不足装備の指摘や安全警告も提示します。あくまで参考情報としてご活用ください。" },
            { q: "解約はいつでもできますか？", a: "はい。有料プランはいつでもキャンセル可能で、次回の更新日以降に無料プランへ戻ります。" },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-2">{q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* フッターCTA */}
      <section className="bg-accent/20 border-t border-border py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">装備に迷う夜を、終わらせよう。</h2>
          <p className="text-sm text-muted-foreground mb-6">無料で始めて、次の山の準備を整える。</p>
          <FooterCTA />
          <p className="mt-3 text-xs text-muted-foreground">クレジットカード不要 · メールだけで登録できます</p>
        </div>
      </section>

    </div>

    {/* サイトフッター */}
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2025 Sonae. All rights reserved.</p>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">利用規約</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">プライバシーポリシー</Link>
          <a href="mailto:sonae.support@gmail.com" className="hover:text-foreground transition-colors">お問い合わせ</a>
        </div>
      </div>
    </footer>
    </>
  );
}
