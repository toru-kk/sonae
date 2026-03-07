-- =============================================
-- Sonae - 初期スキーマ
-- =============================================

-- UUIDサポート
create extension if not exists "uuid-ossp";

-- =============================================
-- 1. ユーザープロファイル
-- =============================================
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'standard', 'premium')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 新規ユーザー登録時に自動作成
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- 2. 装備カテゴリ（システムマスター）
-- =============================================
create table public.gear_categories (
  id text primary key,
  name text not null,
  name_ja text not null,
  icon text not null default '📦',
  sort_order int not null default 0
);

-- 初期カテゴリデータ
insert into public.gear_categories (id, name, name_ja, icon, sort_order) values
  ('shelter',    'Shelter',    'シェルター・テント',  '⛺', 1),
  ('sleeping',   'Sleeping',   'シュラフ・寝具',      '🛏',  2),
  ('clothing',   'Clothing',   '衣類',                '👕',  3),
  ('footwear',   'Footwear',   '靴・足回り',          '👟',  4),
  ('backpack',   'Backpack',   'バックパック',        '🎒',  5),
  ('navigation', 'Navigation', 'ナビゲーション',      '🗺️',  6),
  ('safety',     'Safety',     '安全装備',            '🦺',  7),
  ('cooking',    'Cooking',    '調理器具',            '🍳',  8),
  ('food',       'Food',       '食料・行動食',        '🍫',  9),
  ('hygiene',    'Hygiene',    '衛生用品',            '🧴', 10),
  ('tools',      'Tools',      '道具・その他',        '🔧', 11),
  ('other',      'Other',      'その他',              '📦', 12);

-- =============================================
-- 3. 装備アイテム（ユーザー所持品）
-- =============================================
create table public.gear_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  category_id text not null references public.gear_categories(id),
  weight_g int check (weight_g >= 0),
  notes text,
  image_url text,
  is_essential boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_gear_items_user_id on public.gear_items(user_id);
create index idx_gear_items_category on public.gear_items(category_id);

-- =============================================
-- 4. 装備パッケージ（セット）
-- =============================================
create table public.gear_packages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  description text,
  mountain_type text,
  total_weight_g int not null default 0,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_gear_packages_user_id on public.gear_packages(user_id);

-- =============================================
-- 5. パッケージ内装備（中間テーブル）
-- =============================================
create table public.gear_package_items (
  id uuid default uuid_generate_v4() primary key,
  package_id uuid not null references public.gear_packages(id) on delete cascade,
  gear_item_id uuid not null references public.gear_items(id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  notes text,
  unique(package_id, gear_item_id)
);

create index idx_package_items_package on public.gear_package_items(package_id);

-- パッケージ合計重量を自動更新するトリガー
create or replace function update_package_total_weight()
returns trigger language plpgsql as $$
begin
  update public.gear_packages
  set total_weight_g = (
    select coalesce(sum(gi.weight_g * gpi.quantity), 0)
    from public.gear_package_items gpi
    join public.gear_items gi on gi.id = gpi.gear_item_id
    where gpi.package_id = coalesce(new.package_id, old.package_id)
      and gi.weight_g is not null
  )
  where id = coalesce(new.package_id, old.package_id);
  return coalesce(new, old);
end;
$$;

create trigger trg_update_package_weight
  after insert or update or delete on public.gear_package_items
  for each row execute procedure update_package_total_weight();

-- =============================================
-- 6. updated_at 自動更新
-- =============================================
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_users_updated_at
  before update on public.users
  for each row execute procedure update_updated_at();

create trigger trg_gear_items_updated_at
  before update on public.gear_items
  for each row execute procedure update_updated_at();

create trigger trg_gear_packages_updated_at
  before update on public.gear_packages
  for each row execute procedure update_updated_at();

-- =============================================
-- 7. Row Level Security
-- =============================================
alter table public.users enable row level security;
alter table public.gear_categories enable row level security;
alter table public.gear_items enable row level security;
alter table public.gear_packages enable row level security;
alter table public.gear_package_items enable row level security;

-- users: 自分のデータのみ
create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

-- gear_categories: 全員読み取り可
create policy "categories_select_all" on public.gear_categories for select using (true);

-- gear_items: 自分のデータのみ
create policy "gear_items_select_own" on public.gear_items for select using (auth.uid() = user_id);
create policy "gear_items_insert_own" on public.gear_items for insert with check (auth.uid() = user_id);
create policy "gear_items_update_own" on public.gear_items for update using (auth.uid() = user_id);
create policy "gear_items_delete_own" on public.gear_items for delete using (auth.uid() = user_id);

-- gear_packages: 自分のデータ + 公開パッケージは全員閲覧可
create policy "packages_select_own_or_public" on public.gear_packages
  for select using (auth.uid() = user_id or is_public = true);
create policy "packages_insert_own" on public.gear_packages for insert with check (auth.uid() = user_id);
create policy "packages_update_own" on public.gear_packages for update using (auth.uid() = user_id);
create policy "packages_delete_own" on public.gear_packages for delete using (auth.uid() = user_id);

-- gear_package_items: パッケージのオーナーのみ
create policy "package_items_select" on public.gear_package_items
  for select using (
    exists (
      select 1 from public.gear_packages gp
      where gp.id = package_id and (gp.user_id = auth.uid() or gp.is_public = true)
    )
  );
create policy "package_items_insert" on public.gear_package_items
  for insert with check (
    exists (select 1 from public.gear_packages gp where gp.id = package_id and gp.user_id = auth.uid())
  );
create policy "package_items_delete" on public.gear_package_items
  for delete using (
    exists (select 1 from public.gear_packages gp where gp.id = package_id and gp.user_id = auth.uid())
  );
