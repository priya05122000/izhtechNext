import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  trailingSlash: true,

  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,

  images: {

    unoptimized: true,

    formats: ["image/avif", "image/webp"],

    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1600],

    imageSizes: [64, 96, 128, 256, 384],

    qualities: [70, 75, 80, 90],

    remotePatterns: [

      {
        protocol: "https",
        hostname: "api.izhtech.com",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "7700",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "7700",
        pathname: "/images/**",
      },

    ],

  },

  async redirects() {

    return [

      // WWW → Non-WWW
      {
        source: "/:path*",

        has: [
          {
            type: "host",
            value: "www.izhtech.com",
          },
        ],

        destination: "https://izhtech.com/:path*/",

        permanent: true,
      },

      // HTTP → HTTPS (optional if already handled by hosting/server)
      {
        source: "/:path*",

        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],

        destination: "https://izhtech.com/:path*/",

        permanent: true,
      },

    ];

  },

  async headers() {

    return [

      {
        source: "/llms.txt",

        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],

      },

      {
        source: "/(.*)",

        headers: [

          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=()",
          },

          {
            key: "Strict-Transport-Security",
            value:
              "max-age=31536000; includeSubDomains; preload",
          },

          {
            key: "Content-Security-Policy",

            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: blob: https:;
              font-src 'self' data: https:;
              connect-src 'self' https: ws: wss:;
              frame-ancestors 'self';
              base-uri 'self';
              form-action 'self';
            `
              .replace(/\n/g, "")
              .replace(/\s{2,}/g, " ")
              .trim(),
          },

        ],

      },

    ];

  },

};

export default nextConfig;