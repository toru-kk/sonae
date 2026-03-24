-- package_likes にリアクション種別カラム追加
-- 既存データは自動的に 'heart' になる
ALTER TABLE public.package_likes
  ADD COLUMN IF NOT EXISTS reaction_type TEXT NOT NULL DEFAULT 'heart';

-- CHECK制約
ALTER TABLE public.package_likes
  ADD CONSTRAINT package_likes_reaction_type_check
  CHECK (reaction_type IN ('heart', 'reference', 'light', 'impressive', 'want'));

-- UPDATE用RLSポリシー（リアクション切り替え用）
CREATE POLICY "ユーザーは自分のリアクションを更新できる"
  ON public.package_likes FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
