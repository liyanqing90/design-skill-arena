import { describe, expect, it } from "vitest"

import { showcases } from "@/data/showcases"

const expectedModels = ["GPT-5.5", "Qwen 3.7 Max", "Kimi 2.7 Code", "GLM 5.2"]

describe("showcases", () => {
  it("keeps all model showcase collections", () => {
    expect(showcases).toHaveLength(expectedModels.length * 18)
  })

  it("keeps 18 showcases per model", () => {
    expect(new Set(showcases.map((item) => item.model))).toEqual(new Set(expectedModels))
    expectedModels.forEach((model) => {
      expect(showcases.filter((item) => item.model === model)).toHaveLength(18)
    })
  })

  it("has stable unique ids", () => {
    const ids = showcases.map((item) => item.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
