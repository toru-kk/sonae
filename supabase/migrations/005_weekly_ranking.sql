-- 週間人気ランキング用RPC関数
-- package_likesの過去7日間のいいね数を集計し、ランキングを返す

-- パフォーマンス用インデックス
CREATE INDEX IF NOT EXISTS package_likes_created_at_package_id_idx
  ON public.package_likes (created_at DESC, package_id);

-- anon用SELECTポリシー（RPC関数がanon経由で動くために必要）
CREATE POLICY "package_likes_anon_select"
  ON public.package_likes FOR SELECT
  TO anon
  USING (true);

-- 週間ランキングRPC関数
CREATE OR REPLACE FUNCTION get_weekly_ranking(result_limit integer DEFAULT 20)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  mountain_type text,
  total_weight_g integer,
  like_count integer,
  weekly_like_count bigint,
  user_id uuid,
  created_at timestamptz,
  display_name text,
  avatar_url text,
  item_count bigint
) LANGUAGE sql STABLE AS $$
  SELECT
    gp.id,
    gp.name,
    gp.description,
    gp.mountain_type,
    gp.total_weight_g,
    gp.like_count,
    COUNT(pl.id) AS weekly_like_count,
    gp.user_id,
    gp.created_at,
    u.display_name,
    u.avatar_url,
    (SELECT COUNT(*) FROM gear_package_items gpi WHERE gpi.package_id = gp.id) AS item_count
  FROM package_likes pl
  INNER JOIN gear_packages gp ON gp.id = pl.package_id AND gp.is_public = true
  LEFT JOIN users u ON u.id = gp.user_id
  WHERE pl.created_at >= now() - interval '7 days'
  GROUP BY gp.id, gp.name, gp.description, gp.mountain_type, gp.total_weight_g,
           gp.like_count, gp.user_id, gp.created_at, u.display_name, u.avatar_url
  ORDER BY weekly_like_count DESC, gp.like_count DESC
  LIMIT result_limit;
$$;
