export type SkillTag =
  | "Baseline"
  | "Visual"
  | "Design"
  | "Taste"
  | "Polish"
  | "UX"
  | "Component"
  | "Artifact"
  | "Motion"
  | "Product"
  | "MaxQuality"

export type SkillSourceType =
  | "local-skill"
  | "external-skill"
  | "library"
  | "guideline"

export type SkillRecord = {
  id: string
  name: string
  aliases?: string[]
  type: SkillSourceType
  status: "installed" | "bundled" | "external" | "not-installed"
  summary: string
  localPath?: string
  officialUrl?: string
  githubUrl?: string
  installCommands: string[]
  usageCommands: string[]
  notes: string[]
}

export type ShowcaseItem = {
  id: string
  numericId: string
  title: string
  provider: string
  model: string
  skills: string[]
  skillChainLabel: string
  tags: SkillTag[]
  bestFor: string
  focus: string
  reason: string
  stylePreset: "standard" | "visual" | "design" | "artifact" | "ux" | "system" | "motion" | "premium" | "max"
  screenshots: {
    desktop: string
    mobile: string
  }
  demoUrl: string
  sourceUrl?: string
}
