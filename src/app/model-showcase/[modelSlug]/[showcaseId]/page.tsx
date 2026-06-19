import { notFound } from "next/navigation"

import {
  MODEL_NAME as GPT_MODEL_NAME,
  MODEL_SLUG as GPT_MODEL_SLUG,
  isGpt55ShowcaseId,
  showcaseComponents as gptShowcaseComponents,
  showcaseIds as gptShowcaseIds,
  showcaseTitles as gptShowcaseTitles,
} from "@/components/model-showcases/gpt-55"

import {
  MODEL_NAME as QWEN_MODEL_NAME,
  MODEL_SLUG as QWEN_MODEL_SLUG,
  isQwenShowcaseId,
  showcaseComponents as qwenShowcaseComponents,
  showcaseIds as qwenShowcaseIds,
  showcaseTitles as qwenShowcaseTitles,
} from "@/components/model-showcases/qwen-37-max"

export const dynamicParams = false

export function generateStaticParams() {
  return [
    ...gptShowcaseIds.map((showcaseId) => ({
      modelSlug: GPT_MODEL_SLUG,
      showcaseId,
    })),
    ...qwenShowcaseIds.map((showcaseId) => ({
      modelSlug: QWEN_MODEL_SLUG,
      showcaseId,
    })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modelSlug: string; showcaseId: string }>
}) {
  const { modelSlug, showcaseId } = await params

  if (modelSlug === GPT_MODEL_SLUG && isGpt55ShowcaseId(showcaseId)) {
    return {
      title: `${GPT_MODEL_NAME} ${gptShowcaseTitles[showcaseId]} | Muse Showcase`,
    }
  }

  if (modelSlug === QWEN_MODEL_SLUG && isQwenShowcaseId(showcaseId)) {
    return {
      title: `${QWEN_MODEL_NAME} ${qwenShowcaseTitles[showcaseId]} | Muse Showcase`,
    }
  }

  return {
    title: "Muse Showcase",
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ modelSlug: string; showcaseId: string }>
}) {
  const { modelSlug, showcaseId } = await params

  if (modelSlug === GPT_MODEL_SLUG && isGpt55ShowcaseId(showcaseId)) {
    const Showcase = gptShowcaseComponents[showcaseId]
    return <Showcase />
  }

  if (modelSlug === QWEN_MODEL_SLUG && isQwenShowcaseId(showcaseId)) {
    const Showcase = qwenShowcaseComponents[showcaseId]
    return <Showcase />
  }

  notFound()
}
