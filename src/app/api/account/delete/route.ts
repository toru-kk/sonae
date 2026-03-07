import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function DELETE() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;

  // gear_package_items は gear_packages/gear_items の FK CASCADE で削除されるが、
  // CASCADE が設定されていない場合に備えて先に package_id 経由で削除
  const { data: pkgs } = await sb.from("gear_packages").select("id").eq("user_id", user.id);
  if (pkgs?.length) {
    await sb.from("gear_package_items").delete().in("package_id", pkgs.map((p: { id: string }) => p.id));
  }
  await sb.from("gear_packages").delete().eq("user_id", user.id);
  await sb.from("gear_items").delete().eq("user_id", user.id);
  await sb.from("users").delete().eq("id", user.id);

  // Supabase Auth からユーザーを削除（Service Role Key が必要）
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    );
    await adminClient.auth.admin.deleteUser(user.id);
  }

  return NextResponse.json({ success: true });
}
