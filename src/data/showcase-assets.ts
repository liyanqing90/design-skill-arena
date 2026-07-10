import { screenshotAssetVersions } from "@/data/screenshot-asset-versions"
import { assetUrl } from "@/lib/assets"

export function coverScreenshots(modelSlug: string, showcaseId: string) {
  const src = `/model-screenshots/${modelSlug}/${showcaseId}/desktop.webp`
  const version = screenshotAssetVersions[src as keyof typeof screenshotAssetVersions]
  const versionedSrc = version ? `${src}?v=${version}` : src
  const finalSrc = assetUrl(versionedSrc)

  return { desktop: finalSrc, mobile: finalSrc }
}
