import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications";

const VALID_REACTIONS = ["heart", "reference", "light", "impressive", "want"] as const;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: packageId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // リアクション種別を取得（デフォルト: heart）
  let reactionType = "heart";
  try {
    const body = await req.json();
    if (body.reaction_type && VALID_REACTIONS.includes(body.reaction_type)) {
      reactionType = body.reaction_type;
    }
  } catch {
    // bodyが空の場合はデフォルトのheartを使用
  }

  // 既存リアクションを確認（通知判定用）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase as any)
    .from("package_likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("package_id", packageId)
    .maybeSingle();

  if (existing) {
    // 既存リアクションの種別変更（UPDATE）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("package_likes")
      .update({ reaction_type: reactionType })
      .eq("user_id", user.id)
      .eq("package_id", packageId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    // 新規リアクション（INSERT）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("package_likes")
      .insert({ user_id: user.id, package_id: packageId, reaction_type: reactionType });

    if (error && error.code !== "23505") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 新規リアクション時のみ通知作成
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
  }

  return NextResponse.json({ ok: true, reaction_type: reactionType });
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
