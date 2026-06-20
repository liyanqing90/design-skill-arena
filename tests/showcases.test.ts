import { describe, expect, it } from "vitest"
import { existsSync } from "node:fs"
import path from "node:path"

import { skills } from "@/data/skills"
import { showcases } from "@/data/showcases"
import { messages } from "@/i18n"

const expectedModels = ["GPT-5.5", "Qwen 3.7 Max", "Kimi 2.7 Code", "GLM 5.2", "Claude Opus 4.8"]

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

  it("points gallery covers to existing compressed images", () => {
    showcases.forEach((item) => {
      const [screenshotPath, query] = item.screenshots.desktop.split("?")

      expect(screenshotPath.endsWith(".webp")).toBe(true)
      expect(query).toMatch(/^v=[0-9a-f]{12}$/)
      expect(existsSync(path.join(process.cwd(), "public", screenshotPath.replace(/^\/+/, "")))).toBe(true)
    })
  })

  it("keeps homepage actions and skill summaries localized", () => {
    expect(messages["en-US"].common.prompt).toBe("View prompt")
    expect(messages["en-US"].common.skillsSummary).toBe("Skills summary")
    expect(messages["en-US"].common.copyPrompt).toBe("Copy prompt")
    expect(skills.every((skill) => skill.summaryEn?.trim())).toBe(true)
  })
})
