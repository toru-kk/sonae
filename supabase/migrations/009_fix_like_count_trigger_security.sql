-- =============================================
-- like_count トリガー関数を SECURITY DEFINER に修正
--
-- 他ユーザーのパッケージにいいねした際、トリガーが
-- gear_packages.like_count を更新しようとするが、
-- RLS (auth.uid() = user_id) でブロックされていた
-- =============================================

-- トリガー関数を SECURITY DEFINER で再作成
CREATE OR REPLACE FUNCTION update_package_like_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_id uuid;
BEGIN
  target_id := coalesce(new.package_id, old.package_id);
  UPDATE public.gear_packages
    SET like_count = (
      SELECT count(*) FROM public.package_likes WHERE package_id = target_id
    )
  WHERE id = target_id;
  RETURN coalesce(new, old);
END;
$$;

-- package_likes に UPDATE ポリシー追加（リアクション種別変更用）
CREATE POLICY "ユーザーは自分のいいねを更新できる"
  ON public.package_likes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
