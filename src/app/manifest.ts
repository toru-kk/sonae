import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sonae — 登山装備管理",
    short_name: "Sonae",
    description: "AIが山に合わせた装備パッケージを提案する登山装備管理サービス",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#185535",
    orientation: "portrait",
    icons: [
      {
        src: "/api/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
