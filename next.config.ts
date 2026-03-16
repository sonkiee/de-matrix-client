import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // cacheComponents: true,
  // allowedDevOrigins: [],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
