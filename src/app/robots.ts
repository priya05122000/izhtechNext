import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, "") ||
  "https://izhtech.com";

// A crawler that matches a named group ignores the `*` group entirely, so the
// named groups repeat these rather than inheriting them.
const DISALLOW = [
  "/admin",
  "/api/",
  "/pdf/",
  "/blog/author/",
  "/blog/category/uncategorized/",
  "/*.php",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
