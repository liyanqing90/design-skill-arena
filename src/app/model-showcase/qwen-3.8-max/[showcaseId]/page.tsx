import { notFound } from "next/navigation"

import {
  MODEL_NAME,
  isQwen38MaxShowcaseId,
  showcaseComponents,
  showcaseIds,
  showcaseTitles,
} from "@/components/model-showcases/qwen-3.8-max"

export const dynamicParams = false

export function generateStaticParams() {
  return showcaseIds.map((showcaseId) => ({ showcaseId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params

  if (!isQwen38MaxShowcaseId(showcaseId)) {
    return { title: "Muse Showcase" }
  }

  return {
    title: `${MODEL_NAME} ${showcaseTitles[showcaseId]} | Muse Showcase`,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params

  if (!isQwen38MaxShowcaseId(showcaseId)) {
    notFound()
  }

  const Showcase = showcaseComponents[showcaseId]
  return <Showcase />
}
