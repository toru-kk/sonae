import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId: targetId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.id === targetId) return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("follows")
    .insert({ follower_id: user.id, following_id: targetId });

  if (error && error.code !== "23505") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 通知作成（新規フォローの場合のみ）
  if (!error) {
    await createNotification(supabase, {
      recipientUserId: targetId,
      actorId: user.id,
      type: "follow",
    });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId: targetId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", targetId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 対応する通知を削除
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("notifications")
    .delete()
    .eq("user_id", targetId)
    .eq("actor_id", user.id)
    .eq("type", "follow");

  return NextResponse.json({ ok: true });
}
