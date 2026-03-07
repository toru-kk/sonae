-- =============================================
-- AI提案キャッシュテーブル
-- 同じ条件のリクエストは72時間キャッシュ
-- =============================================

create table public.ai_suggest_cache (
  id uuid default uuid_generate_v4() primary key,
  cache_key text not null unique,   -- "{mountain}:{month}:{nights}" を正規化したキー
  result jsonb not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '72 hours')
);

-- 期限切れキャッシュの高速削除のためのインデックス
create index ai_suggest_cache_expires_at_idx on public.ai_suggest_cache (expires_at);

-- RLS: キャッシュはサービスロール経由のみ（APIから server-side で読み書き）
alter table public.ai_suggest_cache enable row level security;

-- ログイン済みユーザーは読み取り可（APIで認証チェック後に使う）
create policy "authenticated users can read cache"
  on public.ai_suggest_cache for select
  to authenticated
  using (expires_at > now());
