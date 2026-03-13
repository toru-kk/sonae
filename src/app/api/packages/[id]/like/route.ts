import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: packageId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("package_likes")
    .insert({ user_id: user.id, package_id: packageId });

  if (error && error.code !== "23505") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 通知作成（新規いいねの場合のみ）
  if (!error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: pkg } = await (supabase as any)
      .from("gear_packages")
      .select("user_id")
      .eq("id", packageId)
      .single();
    if (pkg?.user_id) {
      await createNotification(supabase, {
        recipientUserId: pkg.user_id,
        actorId: user.id,
        type: "like",
        packageId,
      });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: packageId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("package_likes")
    .delete()
    .eq("user_id", user.id)
    .eq("package_id", packageId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 対応する通知を削除
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pkg } = await (supabase as any)
    .from("gear_packages")
    .select("user_id")
    .eq("id", packageId)
    .single();
  if (pkg?.user_id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("notifications")
      .delete()
      .eq("user_id", pkg.user_id)
      .eq("actor_id", user.id)
      .eq("type", "like")
      .eq("package_id", packageId);
  }

  return NextResponse.json({ ok: true });
}
