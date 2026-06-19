export function assetUrl(path: string, base = process.env.NEXT_PUBLIC_ASSET_BASE_URL) {
  if (!base || /^https?:\/\//.test(path)) return path

  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
}
