import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 公開パッケージを取得
  const { data: pkg, error: pkgErr } = await (supabase as AnyClient)
    .from("gear_packages")
    .select("*, gear_package_items(gear_item_id, gear_items(*))")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (pkgErr || !pkg) return NextResponse.json({ error: "Package not found" }, { status: 404 });
  if (pkg.user_id === user.id) return NextResponse.json({ error: "Cannot copy own package" }, { status: 400 });

  // 新しいパッケージを作成
  const { data: newPkg, error: newPkgErr } = await (supabase as AnyClient)
    .from("gear_packages")
    .insert({
      user_id: user.id,
      name: `${pkg.name}（コピー）`,
      description: pkg.description,
      mountain_type: pkg.mountain_type,
      is_public: false,
    })
    .select("id")
    .single();

  if (newPkgErr || !newPkg) return NextResponse.json({ error: "Failed to create package" }, { status: 500 });

  // 装備品をコピーしてパッケージに紐付け
  const gearItems = (pkg.gear_package_items ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((pi: any) => pi.gear_items)
    .filter(Boolean);

  if (gearItems.length > 0) {
    const { data: newItems, error: itemsErr } = await (supabase as AnyClient)
      .from("gear_items")
      .insert(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gearItems.map((item: any) => ({
          user_id: user.id,
          name: item.name,
          category_id: item.category_id,
          weight_g: item.weight_g,
          brand: item.brand,
          notes: item.notes,
          is_essential: item.is_essential,
        }))
      )
      .select("id");

    if (!itemsErr && newItems) {
      await (supabase as AnyClient)
        .from("gear_package_items")
        .insert(
          newItems.map((item: { id: string }) => ({
            package_id: newPkg.id,
            gear_item_id: item.id,
          }))
        );
    }
  }

  // コピー数をインクリメント（copy_count カラムが存在する場合のみ）
  await (supabase as AnyClient)
    .from("gear_packages")
    .update({ copy_count: (pkg.copy_count ?? 0) + 1 })
    .eq("id", id);

  return NextResponse.json({ packageId: newPkg.id });
}
