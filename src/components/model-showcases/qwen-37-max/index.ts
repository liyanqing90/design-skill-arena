import { type ComponentType, lazy } from "react"

export const MODEL_NAME = "Qwen 3.7 Max"
export const MODEL_SLUG = "qwen-37-max"

export const showcaseIds = [
  "standard-builder",
  "visual-frontend",
  "design-logic",
  "impeccable-full-flow",
  "artifact-builder",
  "ux-pro-reference",
  "component-system",
  "motion-bits",
  "standard-taste",
  "standard-impeccable",
  "visual-taste",
  "visual-impeccable",
  "design-ux-pro",
  "design-impeccable",
  "balanced-chain",
  "visual-premium-chain",
  "product-polish-chain",
  "max-quality-chain",
] as const

export type QwenShowcaseId = (typeof showcaseIds)[number]

export const showcaseTitles: Record<QwenShowcaseId, string> = {
  "standard-builder": "Standard Builder",
  "visual-frontend": "Visual Frontend",
  "design-logic": "Design Logic",
  "impeccable-full-flow": "Impeccable Full Flow",
  "artifact-builder": "Artifact Builder",
  "ux-pro-reference": "UX Pro Reference",
  "component-system": "Component System",
  "motion-bits": "Motion Bits",
  "standard-taste": "Standard + Taste",
  "standard-impeccable": "Standard + Impeccable",
  "visual-taste": "Visual + Taste",
  "visual-impeccable": "Visual + Impeccable",
  "design-ux-pro": "Design + UX Pro",
  "design-impeccable": "Design + Impeccable",
  "balanced-chain": "Balanced Chain",
  "visual-premium-chain": "Visual Premium Chain",
  "product-polish-chain": "Product Polish Chain",
  "max-quality-chain": "Max Quality Chain",
}

export const showcaseComponents: Record<QwenShowcaseId, ComponentType> = {
  "standard-builder": lazy(() => import("./standard-builder")),
  "visual-frontend": lazy(() => import("./visual-frontend")),
  "design-logic": lazy(() => import("./design-logic")),
  "impeccable-full-flow": lazy(() => import("./impeccable-full-flow")),
  "artifact-builder": lazy(() => import("./artifact-builder")),
  "ux-pro-reference": lazy(() => import("./ux-pro-reference")),
  "component-system": lazy(() => import("./component-system")),
  "motion-bits": lazy(() => import("./motion-bits")),
  "standard-taste": lazy(() => import("./standard-taste")),
  "standard-impeccable": lazy(() => import("./standard-impeccable")),
  "visual-taste": lazy(() => import("./visual-taste")),
  "visual-impeccable": lazy(() => import("./visual-impeccable")),
  "design-ux-pro": lazy(() => import("./design-ux-pro")),
  "design-impeccable": lazy(() => import("./design-impeccable")),
  "balanced-chain": lazy(() => import("./balanced-chain")),
  "visual-premium-chain": lazy(() => import("./visual-premium-chain")),
  "product-polish-chain": lazy(() => import("./product-polish-chain")),
  "max-quality-chain": lazy(() => import("./max-quality-chain")),
}

export function isQwenShowcaseId(value: string): value is QwenShowcaseId {
  return showcaseIds.includes(value as QwenShowcaseId)
}
