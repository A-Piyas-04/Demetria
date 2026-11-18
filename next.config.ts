import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  experimental: {
    // Run the React Compiler as native Rust inside Turbopack instead of the
    // Node/Babel plugin. The Babel pass was the main cause of the long,
    // repeated "Compiling..." states during `next dev`.
    turbopackRustReactCompiler: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
