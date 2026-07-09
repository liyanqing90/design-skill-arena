import { notFound } from "next/navigation"

import {
  GPT_56_SOL_MODEL_NAME,
  gpt56SolShowcaseComponents,
  gpt56SolShowcaseIds,
  gpt56SolShowcaseTitles,
  isGpt56SolShowcaseId,
} from "@/components/model-showcases/gpt-5.6-sol"

export const dynamicParams = false

export function generateStaticParams() {
  return gpt56SolShowcaseIds.map((showcaseId) => ({ showcaseId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params
  const title = isGpt56SolShowcaseId(showcaseId)
    ? gpt56SolShowcaseTitles[showcaseId]
    : null

  return {
    title: title ? `${GPT_56_SOL_MODEL_NAME} ${title} | Muse Result` : "Muse Result",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params

  if (!isGpt56SolShowcaseId(showcaseId)) {
    notFound()
  }

  const Showcase = gpt56SolShowcaseComponents[showcaseId]
  return <Showcase />
}
