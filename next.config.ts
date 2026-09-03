import type { NextConfig } from "next";

/**
 * Two hosts, one config.
 *
 * GitHub Pages cannot run a server and serves this repo from /Portfolio, so
 * that build exports plain HTML under a base path and turns off image
 * optimisation (there is nothing to optimise it with). Vercel gets the normal
 * build, at the root, with optimisation left on.
 *
 * The workflow sets GITHUB_PAGES=true. Nothing else does.
 */
const pages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath: "/Portfolio",
      // Each route becomes its own directory with an index.html, which is the
      // shape GitHub Pages resolves most reliably.
      trailingSlash: true,
      images: { unoptimized: true },
      // Read by lib/asset.ts, because unoptimized images do not get basePath.
      env: { NEXT_PUBLIC_BASE_PATH: "/Portfolio" },
    }
  : { env: { NEXT_PUBLIC_BASE_PATH: "" } };

export default nextConfig;
