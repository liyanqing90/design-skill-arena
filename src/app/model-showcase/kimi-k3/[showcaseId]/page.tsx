import { notFound } from "next/navigation"

import {
  MODEL_NAME,
  isKimiK3ShowcaseId,
  showcaseComponents,
  showcaseIds,
  showcaseTitles,
} from "@/components/model-showcases/kimi-k3"

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

  if (isKimiK3ShowcaseId(showcaseId)) {
    return {
      title: `${MODEL_NAME} ${showcaseTitles[showcaseId]} | Muse Showcase`,
    }
  }

  return {
    title: "Muse Showcase",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ showcaseId: string }>
}) {
  const { showcaseId } = await params

  if (!isKimiK3ShowcaseId(showcaseId)) {
    notFound()
  }

  const Showcase = showcaseComponents[showcaseId]
  return <Showcase />
}
