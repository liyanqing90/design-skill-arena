import { screenshotAssetVersions } from "@/data/screenshot-asset-versions"

export function coverScreenshots(modelSlug: string, showcaseId: string) {
  const src = `/model-screenshots/${modelSlug}/${showcaseId}/desktop.webp`
  const version = screenshotAssetVersions[src as keyof typeof screenshotAssetVersions]
  const versionedSrc = version ? `${src}?v=${version}` : src

  return { desktop: versionedSrc, mobile: versionedSrc }
}
