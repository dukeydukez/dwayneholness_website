import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/timecapsoul"],
      },
    ],
    sitemap: "https://dwayneholness.com/sitemap.xml",
  };
}
