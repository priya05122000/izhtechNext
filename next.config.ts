import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  images: {
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
            key: "Content-Security-Policy",
            value: `
            default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            style-src * 'unsafe-inline' data: blob:;
            img-src * data: blob:;
            font-src * data: blob:;
            connect-src * data: blob: ws: wss:;
            frame-ancestors *;
          `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },

};

export default nextConfig;