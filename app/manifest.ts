import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sanel Hizmet",
    short_name: "Sanel",
    description:
      "Fayans, tesisat, duşakabin ve ev bakım hizmetleri. Uygun fiyat, kaliteli işçilik.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e5a8a",
    lang: "tr",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
