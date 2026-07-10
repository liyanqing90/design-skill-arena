import { describe, expect, it } from "vitest"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"

import { assetUrl, isR2AssetsEnabled } from "@/lib/assets"
import { coverScreenshots } from "@/data/showcase-assets"
import { screenshotAssetVersions } from "@/data/screenshot-asset-versions"
import packageJson from "../package.json"

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
    return
  }

  process.env[name] = value
}

describe("assetUrl", () => {
  it("keeps local assets local when R2 is switched off", () => {
    expect(assetUrl("/covers/gpt-55/standard-builder.webp", "https://arena-assets.xflux.cn", false)).toBe(
      "/covers/gpt-55/standard-builder.webp"
    )
  })

  it("prefixes local assets with the configured asset base when R2 is switched on", () => {
    expect(assetUrl("/covers/gpt-55/standard-builder.webp", "https://arena-assets.xflux.cn/", true)).toBe(
      "https://arena-assets.xflux.cn/covers/gpt-55/standard-builder.webp"
    )
  })

  it("does not rewrite absolute URLs", () => {
    expect(assetUrl("https://cdn.example.com/a.webp", "https://arena-assets.xflux.cn", true)).toBe(
      "https://cdn.example.com/a.webp"
    )
  })

  it("parses the R2 asset switch explicitly", () => {
    expect(isR2AssetsEnabled("1")).toBe(true)
    expect(isR2AssetsEnabled("r2")).toBe(true)
    expect(isR2AssetsEnabled("0")).toBe(false)
    expect(isR2AssetsEnabled(undefined)).toBe(false)
  })

  it("keeps Cloudflare deployments on the R2 asset build path", () => {
    expect(packageJson.scripts["build:cloudflare"]).toContain("NEXT_PUBLIC_USE_R2_ASSETS")
    expect(packageJson.scripts["build:cloudflare"]).toContain("NEXT_PUBLIC_USE_R2_ASSETS:-1")
    expect(packageJson.scripts["build:cloudflare"]).toContain("NEXT_PUBLIC_ASSET_BASE_URL")
    expect(packageJson.scripts["build:cloudflare"]).toContain("arena-assets.xflux.cn")
    expect(packageJson.scripts["deploy:cloudflare"]).toContain("pnpm build:cloudflare")
    expect(packageJson.scripts["deploy:cloudflare"]).toContain("--branch main")
    expect(packageJson.scripts["deploy:cloudflare"]).not.toContain("pnpm build:static")
  })

  it("versions screenshot URLs from the file content hash", () => {
    const previousUseR2 = process.env.NEXT_PUBLIC_USE_R2_ASSETS
    try {
      process.env.NEXT_PUBLIC_USE_R2_ASSETS = "0"
      const screenshotPath = "/model-screenshots/qwen-37-max/standard-builder/desktop.webp"
      const hash = createHash("sha256")
        .update(readFileSync(`public${screenshotPath}`))
        .digest("hex")
        .slice(0, 12)

      expect(screenshotAssetVersions[screenshotPath]).toBe(hash)
      expect(coverScreenshots("qwen-37-max", "standard-builder").desktop).toBe(`${screenshotPath}?v=${hash}`)
    } finally {
      restoreEnv("NEXT_PUBLIC_USE_R2_ASSETS", previousUseR2)
    }
  })

  it("can switch versioned screenshot URLs to R2", () => {
    const previousUseR2 = process.env.NEXT_PUBLIC_USE_R2_ASSETS
    const previousBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL
    try {
      process.env.NEXT_PUBLIC_USE_R2_ASSETS = "1"
      process.env.NEXT_PUBLIC_ASSET_BASE_URL = "https://arena-assets.xflux.cn"

      const screenshotPath = "/model-screenshots/qwen-37-max/standard-builder/desktop.webp"
      const hash = screenshotAssetVersions[screenshotPath]

      expect(coverScreenshots("qwen-37-max", "standard-builder").desktop).toBe(
        `https://arena-assets.xflux.cn${screenshotPath}?v=${hash}`
      )
    } finally {
      restoreEnv("NEXT_PUBLIC_USE_R2_ASSETS", previousUseR2)
      restoreEnv("NEXT_PUBLIC_ASSET_BASE_URL", previousBase)
    }
  })
})
