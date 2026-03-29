-- =============================================
-- gear_items の公開パッケージ閲覧ポリシー修正
--
-- 旧ポリシーは gear_items 行との紐付け条件と
-- is_public チェックが欠けており、
-- 全ユーザーの全装備が閲覧可能になっていた
-- =============================================

DROP POLICY IF EXISTS "gear_items_public_package_read" ON public.gear_items;

CREATE POLICY "gear_items_public_package_read" ON public.gear_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gear_package_items gpi
      JOIN gear_packages gp ON gp.id = gpi.package_id
      WHERE gpi.gear_item_id = gear_items.id
        AND gp.is_public = true
    )
  );
