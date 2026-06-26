import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // permite correr vários dev servers (modos de warp) sem colidirem na .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // standalone server output for the Coolify Docker image
  output: "standalone",
};

export default nextConfig;
