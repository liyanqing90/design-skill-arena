import { notFound } from "next/navigation"

import { ArtifactBuilderShowcase } from "@/components/model-showcases/glm-5.2/artifact-builder"
import { BalancedChainShowcase } from "@/components/model-showcases/glm-5.2/balanced-chain"
import { ComponentSystemShowcase } from "@/components/model-showcases/glm-5.2/component-system"
import { DesignImpeccableShowcase } from "@/components/model-showcases/glm-5.2/design-impeccable"
import { DesignLogicShowcase } from "@/components/model-showcases/glm-5.2/design-logic"
import { DesignUxProShowcase } from "@/components/model-showcases/glm-5.2/design-ux-pro"
import { ImpeccableFullFlowShowcase } from "@/components/model-showcases/glm-5.2/impeccable-full-flow"
import { MaxQualityChainShowcase } from "@/components/model-showcases/glm-5.2/max-quality-chain"
import { MotionBitsShowcase } from "@/components/model-showcases/glm-5.2/motion-bits"
import { ProductPolishChainShowcase } from "@/components/model-showcases/glm-5.2/product-polish-chain"
import { StandardBuilderShowcase } from "@/components/model-showcases/glm-5.2/standard-builder"
import { StandardImpeccableShowcase } from "@/components/model-showcases/glm-5.2/standard-impeccable"
import { StandardTasteShowcase } from "@/components/model-showcases/glm-5.2/standard-taste"
import { UxProReferenceShowcase } from "@/components/model-showcases/glm-5.2/ux-pro-reference"
import { VisualFrontendShowcase } from "@/components/model-showcases/glm-5.2/visual-frontend"
import { VisualImpeccableShowcase } from "@/components/model-showcases/glm-5.2/visual-impeccable"
import { VisualPremiumChainShowcase } from "@/components/model-showcases/glm-5.2/visual-premium-chain"
import { VisualTasteShowcase } from "@/components/model-showcases/glm-5.2/visual-taste"
import { getGlmShowcase, glmShowcaseIds } from "@/data/glm-5.2-showcases"
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

export const dynamicParams = false

export function generateStaticParams() {
  return glmShowcaseIds.map((showcaseId) => ({
    showcaseId,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params
  const item = getGlmShowcase(showcaseId)

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
  const item = getGlmShowcase(showcaseId)

  if (!item) {
    notFound()
  }

  const PageComponent = pages[showcaseId] ?? StandardBuilderShowcase

  return <PageComponent item={item} />
}
