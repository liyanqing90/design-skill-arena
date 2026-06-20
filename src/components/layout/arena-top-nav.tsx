"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const projectUrl = "https://github.com/liyanqing90/design-skill-arena"

type Locale = "zh-CN" | "en-US"

type ArenaTopNavProps = {
  locale?: Locale
  onLocaleChange?: (locale: Locale) => void
  onPromptOpen?: () => void
  onSkillsOpen?: () => void
  showGenerationMeta?: boolean
  labels?: {
    siteName: string
    prompt: string
    skillsSummary: string
  }
}

export function ArenaTopNav({
  locale = "zh-CN",
  onLocaleChange,
  onPromptOpen,
  onSkillsOpen,
  showGenerationMeta = false,
  labels,
}: ArenaTopNavProps) {
  const pathname = usePathname()
  const showActions = showGenerationMeta || Boolean(onLocaleChange) || Boolean(onSkillsOpen)
  const navLabels =
    labels ??
    (locale === "en-US"
      ? {
          siteName: "Design Skill Arena",
          prompt: "View prompt",
          skillsSummary: "Skills summary",
        }
      : {
          siteName: "设计技能竞技场",
          prompt: "查看提示词",
          skillsSummary: "Skills 汇总",
        })

  return (
    <div className="arena-enter flex min-h-11 flex-col justify-center gap-3 border-b border-zinc-950/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="flex min-h-11 items-center font-mono text-xs uppercase text-zinc-500 transition hover:text-zinc-950"
      >
        {navLabels.siteName}
      </Link>
      {showActions ? (
        <nav
          aria-label="Primary"
          className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-zinc-500"
        >
          {showGenerationMeta ? (
            <>
              <a
                href={projectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub: Design Skill Arena"
                className="inline-flex min-h-11 items-center text-zinc-950 transition hover:text-zinc-600"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
                  <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.7 4.8 18.7 5 18.7 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.8c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                onClick={onPromptOpen}
                className="min-h-11 text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 transition hover:decoration-zinc-950 disabled:pointer-events-none disabled:text-zinc-400"
                disabled={!onPromptOpen}
              >
                {navLabels.prompt}
              </button>
            </>
          ) : null}

          {onSkillsOpen ? (
            <>
              {showGenerationMeta ? <span aria-hidden="true">/</span> : null}
              <button
                type="button"
                onClick={onSkillsOpen}
                className={`min-h-11 transition ${
                  pathname === "/skills"
                    ? "text-zinc-950 underline decoration-zinc-950 underline-offset-4"
                    : "text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 hover:decoration-zinc-950"
                }`}
              >
                {navLabels.skillsSummary}
              </button>
            </>
          ) : null}

          {onLocaleChange ? (
            <>
              {showGenerationMeta || onSkillsOpen ? <span aria-hidden="true">/</span> : null}
              {(["zh-CN", "en-US"] as const).map((nextLocale) => (
                <button
                  key={nextLocale}
                  type="button"
                  onClick={() => onLocaleChange(nextLocale)}
                  className={`min-h-11 px-1 transition ${
                    locale === nextLocale
                      ? "text-zinc-950 underline decoration-zinc-950 underline-offset-4"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  {nextLocale === "zh-CN" ? "中" : "EN"}
                </button>
              ))}
            </>
          ) : null}
        </nav>
      ) : null}
    </div>
  )
}
