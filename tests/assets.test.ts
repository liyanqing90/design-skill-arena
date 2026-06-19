import { describe, expect, it } from "vitest"

import { assetUrl } from "@/lib/assets"

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
})
