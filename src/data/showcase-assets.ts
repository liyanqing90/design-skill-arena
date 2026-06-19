export function coverScreenshots(modelSlug: string, showcaseId: string) {
  const src = `/model-screenshots/${modelSlug}/${showcaseId}/desktop.webp`

  return { desktop: src, mobile: src }
}
