import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login"],
        disallow: [
          "/dashboard",
          "/inventory",
          "/stock",
          "/sales",
          "/purchases",
          "/suppliers",
          "/customers",
          "/catalog",
          "/reports",
          "/activity",
          "/settings",
        ],
      },
    ],
    sitemap: "https://apexmoto-inventory.vercel.app/sitemap.xml",
  };
}
