import { Heart } from "lucide-react"

import type { ShowcaseItem } from "@/types/showcase"
import { assetUrl } from "@/lib/assets"

export function ShowcaseCard({
  coverAlt,
  index,
  item,
  onOpen,
  onVote,
  voteCount,
  voteLabel,
  voted,
  voting,
}: {
  coverAlt: string
  index: number
  item: ShowcaseItem
  onOpen: () => void
  onVote: () => void
  voteCount?: number
  voteLabel: string
  voted: boolean
  voting: boolean
}) {
  const coverSrc = assetUrl(item.screenshots.desktop)

  return (
    <article
      className="arena-enter flex min-h-full flex-col text-zinc-950"
      style={{ animationDelay: `${index * 25}ms` }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-950/15 bg-white">
        <button type="button" onClick={onOpen} className="group size-full text-left">
          {/* eslint-disable-next-line @next/next/no-img-element -- ponytail: R2 serves compressed WebP; next/image is disabled for static export. */}
          <img
            src={coverSrc}
            alt={coverAlt}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.025]"
          />
        </button>
        <button
          type="button"
          onClick={onVote}
          disabled={voted || voting}
          aria-label={voteLabel}
          className="absolute right-2 top-2 inline-flex min-h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-zinc-950/10 bg-[#f7f7f2]/90 px-2 font-mono text-xs tabular-nums text-zinc-950 shadow-sm backdrop-blur transition hover:border-zinc-950/25 hover:bg-white disabled:cursor-default disabled:opacity-75 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
        >
          <Heart size={14} aria-hidden="true" className={voted ? "fill-zinc-950" : ""} />
          {voteCount === undefined ? null : <span>{voteCount}</span>}
        </button>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="group grid gap-2 py-3 text-left transition duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
      >
        <div className="flex min-h-5 items-center gap-3 font-mono text-[13px] tabular-nums text-zinc-500">
          <span>{item.numericId}</span>
          <span>{item.model}</span>
        </div>
        <h3 className="truncate text-[22px] font-semibold leading-none">{item.title}</h3>
        <p className="truncate text-sm font-medium text-zinc-500" title={item.skillChainLabel}>
          {item.skillChainLabel}
        </p>
      </button>
    </article>
  )
}
