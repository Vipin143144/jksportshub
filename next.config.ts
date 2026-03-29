import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "jksportshub.com", pathname: "/**" },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const CopyWebpackPlugin = require("copy-webpack-plugin");
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, "node_modules/.prisma/client"),
              to: path.join(__dirname, ".next/server"),
              filter: (resourcePath: string) => {
                return resourcePath.includes("rhel-openssl") || resourcePath.includes("libquery_engine");
              },
            },
          ],
        })
      );
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    optimizePackageImports: [
      "framer-motion",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
};

export default nextConfig;
