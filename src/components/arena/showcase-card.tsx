import Image from "next/image"

import type { ShowcaseItem } from "@/types/showcase"
import { assetUrl } from "@/lib/assets"

export function ShowcaseCard({
  coverAlt,
  index,
  item,
  onOpen,
}: {
  coverAlt: string
  index: number
  item: ShowcaseItem
  onOpen: () => void
}) {
  const coverSrc = assetUrl(item.screenshots.desktop)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="arena-enter group flex min-h-full flex-col text-left text-zinc-950"
      style={{ animationDelay: `${index * 25}ms` }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-950/15 bg-white">
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          sizes="(min-width: 1440px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          priority={index === 0}
          unoptimized
          className="object-cover object-top transition duration-300 group-hover:scale-[1.025]"
        />
      </div>

      <div className="grid gap-2 py-3 transition duration-300 group-hover:translate-x-1">
        <div className="flex min-h-5 items-center gap-3 font-mono text-[13px] tabular-nums text-zinc-500">
          <span>{item.numericId}</span>
          <span>{item.model}</span>
        </div>
        <h3 className="truncate text-[22px] font-semibold leading-none">{item.title}</h3>
        <p className="truncate text-sm font-medium text-zinc-500" title={item.skillChainLabel}>
          {item.skillChainLabel}
        </p>
      </div>
    </button>
  )
}
