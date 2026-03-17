import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 24;

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const query = req.nextUrl.searchParams.get("q")?.trim();
  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0", 10);
  const mountainType = req.nextUrl.searchParams.get("mountain_type");

  if (!query || query.length < 1 || query.length > 100) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  const packageIdSet = new Set<string>();

  // 1. 装備名・ブランドで gear_items を検索 → package_id を取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: matchingItems } = await (supabase as any)
    .from("gear_items")
    .select("id, name, brand")
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
    .limit(200);

  if (matchingItems && matchingItems.length > 0) {
    const gearItemIds = matchingItems.map((g: { id: string }) => g.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: pkgItems } = await (supabase as any)
      .from("gear_package_items")
      .select("package_id")
      .in("gear_item_id", gearItemIds);

    if (pkgItems) {
      for (const pi of pkgItems) {
        packageIdSet.add(pi.package_id);
      }
    }
  }

  // 2. パッケージ名・説明文でも検索（装備名でヒットしない場合の補完）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nameMatches } = await (supabase as any)
    .from("gear_packages")
    .select("id")
    .eq("is_public", true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(100);

  if (nameMatches) {
    for (const p of nameMatches) {
      packageIdSet.add(p.id);
    }
  }

  if (packageIdSet.size === 0) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  const packageIds = [...packageIdSet];

  // 公開パッケージを取得（装備アイテム情報も含む）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q = (supabase as any)
    .from("gear_packages")
    .select(
      "id, name, description, mountain_type, total_weight_g, like_count, user_id, created_at, users(display_name, avatar_url), gear_package_items(gear_items(name, brand, weight_g, category_id, image_url))"
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

  // gear_package_items をフラットな items 配列に変換
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const packages = (data ?? []).map((pkg: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = (pkg.gear_package_items ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((pi: any) => pi.gear_items)
      .filter(Boolean);
    return {
      ...pkg,
      gear_package_items: undefined,
      items,
      item_count: items.length,
    };
  });

  return NextResponse.json({
    packages,
    hasMore: packages.length === PAGE_SIZE,
  });
}
