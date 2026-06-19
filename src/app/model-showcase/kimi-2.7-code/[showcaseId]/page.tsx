import { notFound } from "next/navigation"

import { ArtifactBuilderShowcase } from "@/components/model-showcases/kimi-2.7-code/artifact-builder"
import { BalancedChainShowcase } from "@/components/model-showcases/kimi-2.7-code/balanced-chain"
import { ComponentSystemShowcase } from "@/components/model-showcases/kimi-2.7-code/component-system"
import { DesignImpeccableShowcase } from "@/components/model-showcases/kimi-2.7-code/design-impeccable"
import { DesignLogicShowcase } from "@/components/model-showcases/kimi-2.7-code/design-logic"
import { DesignUxProShowcase } from "@/components/model-showcases/kimi-2.7-code/design-ux-pro"
import { ImpeccableFullFlowShowcase } from "@/components/model-showcases/kimi-2.7-code/impeccable-full-flow"
import { MaxQualityChainShowcase } from "@/components/model-showcases/kimi-2.7-code/max-quality-chain"
import { MotionBitsShowcase } from "@/components/model-showcases/kimi-2.7-code/motion-bits"
import { ProductPolishChainShowcase } from "@/components/model-showcases/kimi-2.7-code/product-polish-chain"
import { StandardBuilderShowcase } from "@/components/model-showcases/kimi-2.7-code/standard-builder"
import { StandardImpeccableShowcase } from "@/components/model-showcases/kimi-2.7-code/standard-impeccable"
import { StandardTasteShowcase } from "@/components/model-showcases/kimi-2.7-code/standard-taste"
import { UxProReferenceShowcase } from "@/components/model-showcases/kimi-2.7-code/ux-pro-reference"
import { VisualFrontendShowcase } from "@/components/model-showcases/kimi-2.7-code/visual-frontend"
import { VisualImpeccableShowcase } from "@/components/model-showcases/kimi-2.7-code/visual-impeccable"
import { VisualPremiumChainShowcase } from "@/components/model-showcases/kimi-2.7-code/visual-premium-chain"
import { VisualTasteShowcase } from "@/components/model-showcases/kimi-2.7-code/visual-taste"
import { getModelShowcase } from "@/data/model-showcases"
import type { ShowcaseItem } from "@/types/showcase"

type ShowcasePage = (props: { item: ShowcaseItem }) => React.ReactNode

const pages: Record<string, ShowcasePage> = {
  "artifact-builder": ArtifactBuilderShowcase,
  "balanced-chain": BalancedChainShowcase,
  "component-system": ComponentSystemShowcase,
  "design-impeccable": DesignImpeccableShowcase,
  "design-logic": DesignLogicShowcase,
  "design-ux-pro": DesignUxProShowcase,
  "impeccable-full-flow": ImpeccableFullFlowShowcase,
  "max-quality-chain": MaxQualityChainShowcase,
  "motion-bits": MotionBitsShowcase,
  "product-polish-chain": ProductPolishChainShowcase,
  "standard-builder": StandardBuilderShowcase,
  "standard-impeccable": StandardImpeccableShowcase,
  "standard-taste": StandardTasteShowcase,
  "ux-pro-reference": UxProReferenceShowcase,
  "visual-frontend": VisualFrontendShowcase,
  "visual-impeccable": VisualImpeccableShowcase,
  "visual-premium-chain": VisualPremiumChainShowcase,
  "visual-taste": VisualTasteShowcase,
}

const MODEL = "Kimi 2.7 Code"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(pages).map((showcaseId) => ({
    showcaseId,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params
  const item = getModelShowcase(MODEL, showcaseId)

  return {
    title: item ? `${item.title} | Muse Result` : "Muse Result",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params
  const item = getModelShowcase(MODEL, showcaseId)

  if (!item) {
    notFound()
  }

  const PageComponent = pages[showcaseId] ?? StandardBuilderShowcase

  return <PageComponent item={item} />
}
