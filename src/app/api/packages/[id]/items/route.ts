import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

/**
 * PUT /api/packages/[id]/items
 * パッケージのアイテム一覧を差し替え（delete + insert）
 * gear_package_items の RLS を回避するため service_role を使用
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: packageId } = await params;

  // ユーザー認証（通常のクライアント）
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // パッケージの所有者チェック
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pkg } = await (supabase as any)
    .from("gear_packages")
    .select("user_id")
    .eq("id", packageId)
    .single();

  if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (pkg.user_id !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // リクエストボディ
  const { item_ids, item_wear_types } = (await req.json()) as {
    item_ids: string[];
    item_wear_types?: Record<string, string>;
  };

  // service_role クライアント（RLS バイパス）
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 既存アイテムを削除
  const { error: delErr } = await admin
    .from("gear_package_items")
    .delete()
    .eq("package_id", packageId);

  if (delErr) {
    console.error("items delete error:", delErr);
    return NextResponse.json({ error: delErr.message }, { status: 500 });
  }

  // 新しいアイテムを挿入
  if (item_ids.length > 0) {
    const rows = item_ids.map((gear_item_id: string) => ({
      package_id: packageId,
      gear_item_id,
      wear_type: item_wear_types?.[gear_item_id] ?? "carried",
    }));

    const { error: insErr } = await admin.from("gear_package_items").insert(rows);
    if (insErr) {
      console.error("items insert error:", insErr);
      return NextResponse.json({ error: insErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
