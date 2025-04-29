import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgproxy.ra.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
