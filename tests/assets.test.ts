import { describe, expect, it } from "vitest"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"

import { assetUrl } from "@/lib/assets"
import { coverScreenshots } from "@/data/showcase-assets"
import { screenshotAssetVersions } from "@/data/screenshot-asset-versions"
import packageJson from "../package.json"

describe("assetUrl", () => {
  it("keeps local assets local without a base url", () => {
    expect(assetUrl("/covers/gpt-55/standard-builder.webp", "")).toBe(
      "/covers/gpt-55/standard-builder.webp"
    )
  })

  it("prefixes local assets with the configured asset base", () => {
    expect(assetUrl("/covers/gpt-55/standard-builder.webp", "https://arena-assets.xflux.cn/")).toBe(
      "https://arena-assets.xflux.cn/covers/gpt-55/standard-builder.webp"
    )
  })

  it("does not rewrite absolute URLs", () => {
    expect(assetUrl("https://cdn.example.com/a.webp", "https://arena-assets.xflux.cn")).toBe(
      "https://cdn.example.com/a.webp"
    )
  })

  it("keeps Cloudflare deployments on the R2 asset build path", () => {
    expect(packageJson.scripts["build:cloudflare"]).toContain("NEXT_PUBLIC_ASSET_BASE_URL")
    expect(packageJson.scripts["build:cloudflare"]).toContain("arena-assets.xflux.cn")
    expect(packageJson.scripts["deploy:cloudflare"]).toContain("pnpm build:cloudflare")
    expect(packageJson.scripts["deploy:cloudflare"]).toContain("--branch main")
    expect(packageJson.scripts["deploy:cloudflare"]).not.toContain("pnpm build:static")
  })

  it("versions screenshot URLs from the file content hash", () => {
    const screenshotPath = "/model-screenshots/qwen-37-max/standard-builder/desktop.webp"
    const hash = createHash("sha256")
      .update(readFileSync(`public${screenshotPath}`))
      .digest("hex")
      .slice(0, 12)

    expect(screenshotAssetVersions[screenshotPath]).toBe(hash)
    expect(coverScreenshots("qwen-37-max", "standard-builder").desktop).toBe(`${screenshotPath}?v=${hash}`)
  })
})
