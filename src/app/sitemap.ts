import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://sonae.app";

function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = anonClient();

  // 山名一覧
  const { data: pkgs } = await supabase
    .from("gear_packages")
    .select("mountain_type")
    .eq("is_public", true)
    .not("mountain_type", "is", null);

  const mountainNames = [...new Set((pkgs ?? []).map((p) => p.mountain_type as string))];

  // 公開パッケージ一覧
  const { data: publicPkgs } = await supabase
    .from("gear_packages")
    .select("id, updated_at")
    .eq("is_public", true)
    .order("updated_at", { ascending: false })
    .limit(500);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/mountains`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE_URL}/ranking`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
  ];

  const mountainPages: MetadataRoute.Sitemap = mountainNames.map((name) => ({
    url: `${BASE_URL}/mountains/${encodeURIComponent(name)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const packagePages: MetadataRoute.Sitemap = (publicPkgs ?? []).map((pkg) => ({
    url: `${BASE_URL}/packages/${pkg.id}/public`,
    lastModified: pkg.updated_at ? new Date(pkg.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...mountainPages, ...packagePages];
}
