import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "WebSell";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : undefined,
};

export default nextConfig;
