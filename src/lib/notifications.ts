type NotificationType = "like" | "comment" | "follow";

/**
 * 通知を作成する。自分への通知はスキップ。重複(23505)は無視。
 */
export async function createNotification(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  {
    recipientUserId,
    actorId,
    type,
    packageId,
  }: {
    recipientUserId: string;
    actorId: string;
    type: NotificationType;
    packageId?: string | null;
  }
): Promise<void> {
  if (actorId === recipientUserId) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("notifications")
    .insert({
      user_id: recipientUserId,
      actor_id: actorId,
      type,
      package_id: packageId ?? null,
    });

  if (error && error.code !== "23505") {
    console.error("Failed to create notification:", error.message);
  }
}
