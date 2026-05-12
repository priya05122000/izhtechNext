import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.izhtech.com",
      },
    ],
  },
};

export default nextConfig;