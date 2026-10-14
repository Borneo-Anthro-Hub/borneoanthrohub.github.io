import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for CDN / GitHub Pages deployment.
  output: "export",

  // The deploy workflow sets this to the app's path within the parent site.
  basePath: process.env.NEXT_BASE_PATH ?? "",
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_BASE_PATH ?? "",
  },

  // GitHub Pages serves exported routes as directories with index.html.
  trailingSlash: true,

  // Required for static export — no image optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
