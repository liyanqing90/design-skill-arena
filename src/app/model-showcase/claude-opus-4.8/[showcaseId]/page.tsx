import { notFound } from "next/navigation"

import {
  CLAUDE_MODEL_NAME,
  claudeShowcaseComponents,
  isClaudeShowcaseId,
} from "@/components/model-showcases/claude-opus-4.8"
import { claudeShowcaseIds, getClaudeShowcase } from "@/data/claude-opus-4.8-showcases"

export const dynamicParams = false

export function generateStaticParams() {
  return claudeShowcaseIds.map((showcaseId) => ({ showcaseId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params
  const item = getClaudeShowcase(showcaseId)

  return {
    title: item
      ? `${CLAUDE_MODEL_NAME} ${item.title} | Muse Result`
      : "Muse Result",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params

  if (!isClaudeShowcaseId(showcaseId)) {
    notFound()
  }

  const Showcase = claudeShowcaseComponents[showcaseId]
  return <Showcase />
}
