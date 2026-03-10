-- package_likes テーブル
create table if not exists public.package_likes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  package_id  uuid not null references public.gear_packages(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, package_id)
);

create index if not exists package_likes_package_id_idx on public.package_likes(package_id);
create index if not exists package_likes_user_id_idx on public.package_likes(user_id);

alter table public.package_likes enable row level security;

create policy "いいねは全ユーザーが参照できる"
  on public.package_likes for select to authenticated using (true);

create policy "ユーザーは自分のいいねを作成できる"
  on public.package_likes for insert to authenticated with check (auth.uid() = user_id);

create policy "ユーザーは自分のいいねを削除できる"
  on public.package_likes for delete to authenticated using (auth.uid() = user_id);

-- gear_packages に like_count カラム追加
alter table public.gear_packages
  add column if not exists like_count integer not null default 0;

-- like_count を自動更新するトリガー
create or replace function update_package_like_count()
returns trigger as $$
declare
  target_id uuid;
begin
  target_id := coalesce(new.package_id, old.package_id);
  update public.gear_packages
    set like_count = (
      select count(*) from public.package_likes where package_id = target_id
    )
  where id = target_id;
  return coalesce(new, old);
end;
$$ language plpgsql;

drop trigger if exists package_likes_count_update on public.package_likes;
create trigger package_likes_count_update
  after insert or delete on public.package_likes
  for each row execute procedure update_package_like_count();

-- 公開パッケージは認証ユーザーが参照できる（フォローフィード用）
drop policy if exists "公開パッケージは全認証ユーザーが参照できる" on public.gear_packages;
create policy "公開パッケージは全認証ユーザーが参照できる"
  on public.gear_packages for select
  to authenticated
  using (is_public = true or auth.uid() = user_id);
