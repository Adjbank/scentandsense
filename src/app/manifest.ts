import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shinrin-Yoku ไร่เชิญตะวัน",
    short_name: "Shinrin-Yoku",
    description: "อาบป่าเมืองเหนือ ถ่ายรูปต้นไม้ รู้จักสายพันธุ์และเอกลักษณ์ด้านกลิ่นของพืชไทย",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ee",
    theme_color: "#1f4d3a",
    lang: "th",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
