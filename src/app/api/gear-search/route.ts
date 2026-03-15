import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 24;

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const query = req.nextUrl.searchParams.get("q")?.trim();
  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0", 10);
  const mountainType = req.nextUrl.searchParams.get("mountain_type");

  if (!query || query.length < 1) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  // 装備名で gear_items を検索 → package_id を取得 → 公開パッケージを返す
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: matchingItems } = await (supabase as any)
    .from("gear_items")
    .select("id, name, brand")
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
    .limit(200);

  if (!matchingItems || matchingItems.length === 0) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  const gearItemIds = matchingItems.map((g: { id: string }) => g.id);

  // gear_package_items から該当する package_id を取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pkgItems } = await (supabase as any)
    .from("gear_package_items")
    .select("package_id")
    .in("gear_item_id", gearItemIds);

  if (!pkgItems || pkgItems.length === 0) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  const packageIds = [...new Set(pkgItems.map((pi: { package_id: string }) => pi.package_id))];

  // 公開パッケージを取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q = (supabase as any)
    .from("gear_packages")
    .select(
      "id, name, description, mountain_type, total_weight_g, like_count, user_id, created_at, users(display_name, avatar_url), gear_package_items(count)"
    )
    .eq("is_public", true)
    .in("id", packageIds)
    .order("like_count", { ascending: false });

  if (mountainType) {
    q = q.eq("mountain_type", mountainType);
  }

  const offset = page * PAGE_SIZE;
  q = q.range(offset, offset + PAGE_SIZE - 1);

  const { data, error } = await q;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    packages: data ?? [],
    hasMore: (data ?? []).length === PAGE_SIZE,
  });
}
