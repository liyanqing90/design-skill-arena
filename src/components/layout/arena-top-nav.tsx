"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Locale = "zh-CN" | "en-US"

type ArenaTopNavProps = {
  locale?: Locale
  onLocaleChange?: (locale: Locale) => void
  onPromptOpen?: () => void
  onSkillsOpen?: () => void
  showGenerationMeta?: boolean
  labels?: {
    siteName: string
    generatedBy: string
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
          generatedBy: "Homepage generated with GPT-5.5",
          prompt: "View prompt",
          skillsSummary: "Skills summary",
        }
      : {
          siteName: "设计技能竞技场",
          generatedBy: "本页面由 GPT-5.5 生成",
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
              <span>{navLabels.generatedBy}</span>
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
