import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ['@kodnest/shared'],
};

export default nextConfig;
