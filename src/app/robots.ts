import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/mountains", "/mountains/", "/packages/*/public", "/u/", "/explore"],
        disallow: ["/gear", "/packages", "/ai-suggest", "/profile", "/api/", "/forgot-password", "/reset-password", "/onboarding", "/login", "/register"],
      },
    ],
    sitemap: "https://sonae.app/sitemap.xml",
  };
}
