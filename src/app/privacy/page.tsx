import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Sonae",
  description: "Sonae（ソナエ）のプライバシーポリシー。個人情報の取り扱いについて説明します。",
};

const EFFECTIVE_DATE = "2025年4月1日";
const CONTACT_EMAIL = "sonae.support@gmail.com";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Sonaeトップ
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">プライバシーポリシー</h1>
        <p className="mt-1 text-sm text-muted-foreground">施行日：{EFFECTIVE_DATE}</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground">

        <section className="space-y-3">
          <h2 className="text-base font-bold">1. 基本方針</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sonae（以下「本サービス」）は、ユーザーの個人情報を適切に保護・管理することを重要な責務と考え、
            以下のポリシーに従って個人情報を取り扱います。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">2. 収集する情報</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">本サービスでは、以下の情報を収集する場合があります。</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>メールアドレス（アカウント登録時）</li>
            <li>表示名・プロフィール画像（任意入力）</li>
            <li>登山歴・活動エリアなどのプロフィール情報（任意入力）</li>
            <li>登録した装備品・パッケージデータ</li>
            <li>サービス利用ログ・アクセス情報</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">3. 利用目的</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">収集した情報は、以下の目的で利用します。</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>本サービスの提供・運営・改善</li>
            <li>ユーザーサポートへの対応</li>
            <li>不正利用・セキュリティ対策</li>
            <li>サービスに関する重要なお知らせの送信</li>
            <li>統計情報の作成（個人を特定できない形式）</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">4. 第三者への提供</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            以下の場合を除き、ユーザーの個人情報を第三者に提供・開示することはありません。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護に必要な場合</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">5. 利用する外部サービス</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">本サービスは以下の外部サービスを利用しています。</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>Supabase</strong> — データベース・認証（米国）</li>
            <li><strong>Vercel</strong> — ホスティング・アクセス解析（米国）</li>
            <li><strong>Anthropic</strong> — AI機能（米国）</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            各サービスのプライバシーポリシーについては、各社のウェブサイトをご確認ください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">6. データの保管と削除</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            アカウントを削除することで、登録された個人情報および装備データを削除することができます。
            削除のご依頼は下記お問い合わせ先までご連絡ください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">7. Cookie・アクセス解析</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本サービスはサービス改善を目的としてCookieおよびアクセス解析ツールを使用します。
            ブラウザの設定でCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">8. 改定</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本ポリシーは必要に応じて改定することがあります。重要な変更がある場合はサービス内でお知らせします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold">9. お問い合わせ</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            個人情報の取り扱いに関するお問い合わせは以下までご連絡ください。
          </p>
          <p className="text-sm font-medium">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </section>

      </div>

      <div className="mt-12 border-t border-border pt-6 flex gap-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:text-foreground transition-colors">利用規約</Link>
        <Link href="/" className="hover:text-foreground transition-colors">トップへ戻る</Link>
      </div>
    </div>
  );
}
