import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
const assetUrl = assetBaseUrl ? new URL(assetBaseUrl) : null;

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: isStaticExport,
  images: {
    unoptimized: true,
    remotePatterns: assetUrl
      ? [
          {
            protocol: assetUrl.protocol.replace(":", "") as "http" | "https",
            hostname: assetUrl.hostname,
            port: assetUrl.port,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
