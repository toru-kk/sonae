import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAnonClientRaw } from "@supabase/supabase-js";
import { createNotification } from "@/lib/notifications";

function createAnonClient() {
  return createAnonClientRaw(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET: コメント一覧取得（誰でも）
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAnonClient();

  const { data, error } = await (supabase as any)
    .from("package_comments")
    .select("id, content, created_at, user_id, users(display_name, avatar_url)")
    .eq("package_id", id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data ?? [] });
}

// POST: コメント投稿（要ログイン）
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const content = body.content?.trim() ?? "";
  if (!content || content.length > 500) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const { data, error } = await (supabase as any)
    .from("package_comments")
    .insert({ package_id: id, user_id: user.id, content })
    .select("id, content, created_at, user_id, users(display_name, avatar_url)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 通知作成
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pkg } = await (supabase as any)
    .from("gear_packages")
    .select("user_id")
    .eq("id", id)
    .single();
  if (pkg?.user_id) {
    await createNotification(supabase, {
      recipientUserId: pkg.user_id,
      actorId: user.id,
      type: "comment",
      packageId: id,
    });
  }

  return NextResponse.json({ comment: data });
}

// DELETE: 自分のコメント削除
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: packageId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { commentId } = await req.json();
  const { error } = await (supabase as any)
    .from("package_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id)
    .eq("package_id", packageId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
