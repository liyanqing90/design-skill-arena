export function isR2AssetsEnabled(value = process.env.NEXT_PUBLIC_USE_R2_ASSETS) {
  return value === "1" || value === "true" || value === "on" || value === "r2"
}

export function assetUrl(
  path: string,
  base = process.env.NEXT_PUBLIC_ASSET_BASE_URL,
  useRemoteAssets = isR2AssetsEnabled()
) {
  if (!useRemoteAssets || !base || /^https?:\/\//.test(path)) return path

  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
}
