-- 通知システム

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('like', 'comment', 'follow')),
  actor_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id uuid REFERENCES gear_packages(id) ON DELETE CASCADE,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- パフォーマンス用インデックス
CREATE INDEX idx_notifications_user_id_created ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_user_id_unread ON notifications(user_id) WHERE is_read = false;

-- 重複防止（同じいいね・フォローで複数通知しない）
CREATE UNIQUE INDEX idx_notifications_unique_like
  ON notifications(user_id, actor_id, type, package_id)
  WHERE type = 'like';
CREATE UNIQUE INDEX idx_notifications_unique_follow
  ON notifications(user_id, actor_id, type)
  WHERE type = 'follow';

-- RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = actor_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Actors can delete their notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = actor_id);
