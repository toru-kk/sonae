-- =============================================
-- 003: パブリックプロフィール + アバターストレージ
-- =============================================

-- users テーブルを誰でも読めるように（display_name, avatar_url 表示用）
create policy "users_select_all" on public.users
  for select using (true);

-- avatars ストレージバケット
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- アバター画像: 誰でも読める
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

-- アバター画像: 認証済みユーザーがアップロード可
create policy "avatars_auth_upload" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- アバター画像: 自分のファイルを更新・削除可
create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
