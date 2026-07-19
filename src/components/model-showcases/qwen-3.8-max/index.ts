import { type ComponentType, lazy } from "react"

export const MODEL_NAME = "Qwen 3.8 Max"
export const MODEL_SLUG = "qwen-3.8-max"

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

export type Qwen38MaxShowcaseId = (typeof showcaseIds)[number]

export const showcaseTitles: Record<Qwen38MaxShowcaseId, string> = {
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

export const showcaseSkills: Record<Qwen38MaxShowcaseId, string> = {
  "standard-builder": "frontend-app-builder",
  "visual-frontend": "frontend-skill",
  "design-logic": "frontend-design",
  "impeccable-full-flow": "impeccable",
  "artifact-builder": "web-artifacts-builder / artifacts-builder",
  "ux-pro-reference": "ui-ux-pro-max",
  "component-system": "shadcn-best-practices / shadcn",
  "motion-bits": "react-bits",
  "standard-taste": "frontend-app-builder + taste-skill",
  "standard-impeccable": "frontend-app-builder + impeccable",
  "visual-taste": "frontend-skill + taste-skill",
  "visual-impeccable": "frontend-skill + impeccable",
  "design-ux-pro": "frontend-design + ui-ux-pro-max",
  "design-impeccable": "frontend-design + impeccable",
  "balanced-chain": "frontend-app-builder + taste-skill + impeccable",
  "visual-premium-chain": "frontend-skill + taste-skill + impeccable",
  "product-polish-chain":
    "frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable",
  "max-quality-chain":
    "frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable",
}

export const showcaseComponents: Record<Qwen38MaxShowcaseId, ComponentType> = {
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

export function isQwen38MaxShowcaseId(value: string): value is Qwen38MaxShowcaseId {
  return showcaseIds.includes(value as Qwen38MaxShowcaseId)
}
