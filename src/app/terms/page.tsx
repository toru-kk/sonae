import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | Sonae",
  description: "Sonae（ソナエ）の利用規約。サービスご利用にあたってのルールを説明します。",
};

const EFFECTIVE_DATE = "2025年4月1日";
const CONTACT_EMAIL = "sonae.support@gmail.com";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Sonaeトップ
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">利用規約</h1>
        <p className="mt-1 text-sm text-muted-foreground">施行日：{EFFECTIVE_DATE}</p>
      </div>

      <div className="space-y-8 text-foreground">

        <section className="space-y-3">
          <h2 className="text-base font-bold">第1条（適用）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本規約は、Sonae（以下「本サービス」）の利用に関する条件を定めるものです。
            ユーザーは本規約に同意の上、本サービスをご利用ください。
            アカウント登録をもって本規約に同意したものとみなします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第2条（登録・アカウント）</h2>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>登録には有効なメールアドレスが必要です</li>
            <li>アカウント情報は正確に入力してください</li>
            <li>アカウントは本人のみが利用できます。第三者への譲渡・貸与は禁止します</li>
            <li>パスワードの管理はユーザー自身の責任で行ってください</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第3条（無料プランと制限）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            無料プランでは以下の制限が適用されます。制限は予告なく変更される場合があります。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>装備品の登録：30点まで</li>
            <li>パッケージの作成：3つまで</li>
            <li>AI装備提案：月3回まで</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第4条（禁止事項）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">以下の行為を禁止します。</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>法令または公序良俗に違反する行為</li>
            <li>他のユーザーや第三者への誹謗中傷・嫌がらせ</li>
            <li>虚偽の情報の登録・公開</li>
            <li>本サービスへの不正アクセス・過負荷をかける行為</li>
            <li>スパム・広告目的での利用</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>その他、当方が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第5条（公開コンテンツ）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ユーザーが公開した装備パッケージは、他のユーザーが閲覧・参考にすることができます。
            公開したコンテンツの著作権はユーザーに帰属しますが、
            本サービスの運営・改善に必要な範囲で利用することに同意するものとします。
            他のユーザーがパッケージを「コピー」した場合、そのコピーは当該ユーザーに帰属します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第6条（免責事項）</h2>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>本サービスは現状有姿で提供されます。完全性・正確性・安全性を保証しません</li>
            <li>AIによる装備提案は参考情報です。実際の登山における安全確保はユーザー自身の責任です</li>
            <li>サービスの一時停止・終了によって生じた損害について責任を負いません</li>
            <li>ユーザー間またはユーザーと第三者間のトラブルに関与しません</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第7条（サービスの変更・停止）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            当方は、事前の通知なく本サービスの内容を変更・停止・終了することができます。
            これによりユーザーに生じた損害について、当方は責任を負わないものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第8条（規約の変更）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本規約は必要に応じて変更することがあります。
            変更後の規約はサービス内に掲示した時点から効力を生じます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第9条（準拠法・管轄）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本規約の解釈には日本法を適用します。
            本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">第10条（お問い合わせ）</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">本規約に関するお問い合わせは以下までご連絡ください。</p>
          <p className="text-sm font-medium">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </section>

      </div>

      <div className="mt-12 border-t border-border pt-6 flex gap-4 text-sm text-muted-foreground">
        <Link href="/privacy" className="hover:text-foreground transition-colors">プライバシーポリシー</Link>
        <Link href="/" className="hover:text-foreground transition-colors">トップへ戻る</Link>
      </div>
    </div>
  );
}
