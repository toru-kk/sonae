import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 24;

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0", 10);
  const mountainType = req.nextUrl.searchParams.get("mountain_type");
  const query = req.nextUrl.searchParams.get("q")?.trim();

  // Get followed user IDs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: follows } = await (supabase as any)
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followedIds = (follows ?? []).map(
    (f: { following_id: string }) => f.following_id
  );

  if (followedIds.length === 0) {
    return NextResponse.json({ packages: [], hasMore: false });
  }

  // Query packages from followed users
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q = (supabase as any)
    .from("gear_packages")
    .select(
      "id, name, description, mountain_type, total_weight_g, like_count, user_id, created_at, users(display_name, avatar_url), gear_package_items(count)"
    )
    .eq("is_public", true)
    .in("user_id", followedIds)
    .order("created_at", { ascending: false });

  if (mountainType) {
    q = q.eq("mountain_type", mountainType);
  }

  if (query) {
    q = q.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
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
