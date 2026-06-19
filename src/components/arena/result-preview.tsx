import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"
import { t } from "@/i18n"

type Preset = ShowcaseItem["stylePreset"]

const styles: Record<
  Preset,
  {
    label: string
    shell: string
    text: string
    muted: string
  }
> = {
  standard: {
    label: "标准构建",
    shell: "bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)]",
    text: "text-slate-950",
    muted: "text-slate-600",
  },
  visual: {
    label: "强视觉",
    shell: "bg-[radial-gradient(circle_at_22%_18%,#22d3ee_0,#0f172a_24%,#020617_58%,#881337)]",
    text: "text-white",
    muted: "text-cyan-100/75",
  },
  design: {
    label: "设计逻辑",
    shell: "bg-[linear-gradient(90deg,#ffffff_0_46%,#e7e5e4_46%_47%,#f5f5f4_47%)]",
    text: "text-stone-950",
    muted: "text-stone-500",
  },
  artifact: {
    label: "Artifact",
    shell: "bg-[linear-gradient(135deg,#111827,#1f2937_48%,#78350f)]",
    text: "text-amber-50",
    muted: "text-amber-100/70",
  },
  ux: {
    label: "UX 结构",
    shell: "bg-[linear-gradient(135deg,#f8fafc,#e0f2fe)]",
    text: "text-slate-950",
    muted: "text-slate-600",
  },
  system: {
    label: "组件系统",
    shell: "bg-[linear-gradient(135deg,#f9fafb,#ffffff_40%,#e5e7eb)]",
    text: "text-zinc-950",
    muted: "text-zinc-500",
  },
  motion: {
    label: "动效",
    shell: "bg-[radial-gradient(circle_at_70%_20%,#34d399,#052e2b_30%,#020617_72%)]",
    text: "text-white",
    muted: "text-emerald-100/75",
  },
  premium: {
    label: "精修",
    shell: "bg-[linear-gradient(135deg,#18181b,#27272a_48%,#57534e)]",
    text: "text-white",
    muted: "text-zinc-200/70",
  },
  max: {
    label: "综合链路",
    shell: "bg-[linear-gradient(135deg,#082f49,#0f172a_42%,#042f2e)]",
    text: "text-white",
    muted: "text-teal-100/75",
  },
}

export function ResultPreview({ item, compact = false }: { item: ShowcaseItem; compact?: boolean }) {
  const style = styles[item.stylePreset]

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-lg border p-5 transition duration-300 group-hover:scale-[1.015]",
        style.shell,
        style.text,
        compact ? "min-h-60" : "min-h-80"
      )}
    >
      <Motif preset={item.stylePreset} />

      <div className="relative flex min-h-[inherit] flex-col justify-between gap-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={cn("text-xs font-medium", style.muted)}>{style.label}</p>
            <h3 className={cn("mt-3 max-w-[10ch] font-semibold leading-none tracking-tight", compact ? "text-4xl" : "text-6xl")}>
              {t.preview.launch}
            </h3>
          </div>
          <span className="rounded-md border border-current/20 px-2 py-1 font-mono text-xs tabular-nums">
            {item.numericId}
          </span>
        </div>

        <div className="grid gap-3 text-xs">
          <span className={style.muted}>{t.preview.studio}</span>
          <span className={style.muted}>{t.preview.audience}</span>
          <span className={style.muted}>{t.preview.channel}</span>
          <span className={style.muted}>{t.preview.tone}</span>
        </div>
      </div>
    </div>
  )
}

function Motif({ preset }: { preset: Preset }) {
  if (preset === "visual") {
    return (
      <>
        <div className="absolute -right-16 top-8 size-52 rounded-full border border-white/25" />
        <div className="absolute bottom-0 left-0 h-28 w-3/4 skew-x-[-18deg] bg-cyan-300/20" />
      </>
    )
  }

  if (preset === "design") {
    return (
      <>
        <div className="absolute right-8 top-8 h-44 w-px bg-stone-950/20" />
        <div className="absolute bottom-10 right-10 grid w-40 grid-cols-3 gap-2">
          <span className="h-16 bg-stone-950" />
          <span className="h-28 bg-stone-300" />
          <span className="h-10 bg-stone-500" />
        </div>
      </>
    )
  }

  if (preset === "artifact") {
    return (
      <>
        <div className="absolute right-5 top-5 h-32 w-44 rounded-md border border-amber-200/20 bg-black/20" />
        <div className="absolute right-10 top-12 h-2 w-28 bg-amber-200/40" />
        <div className="absolute right-10 top-20 h-2 w-20 bg-amber-200/25" />
        <div className="absolute right-10 top-28 h-2 w-32 bg-amber-200/20" />
      </>
    )
  }

  if (preset === "ux") {
    return (
      <>
        <div className="absolute right-8 top-8 grid gap-3">
          {[0, 1, 2].map((row) => (
            <span key={row} className="block h-10 w-36 rounded-full border border-sky-300 bg-white/65" />
          ))}
        </div>
        <div className="absolute bottom-8 right-12 size-20 rounded-full bg-sky-300/45" />
      </>
    )
  }

  if (preset === "system") {
    return (
      <div className="absolute right-5 top-5 grid w-44 grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((cell) => (
          <span key={cell} className="h-20 rounded-md border bg-white/75 shadow-xs" />
        ))}
      </div>
    )
  }

  if (preset === "motion") {
    return (
      <>
        <div className="absolute right-10 top-10 size-32 animate-pulse rounded-full border border-emerald-200/40" />
        <div className="absolute right-20 top-20 size-32 animate-pulse rounded-full border border-emerald-200/25" />
        <div className="absolute bottom-8 left-8 h-2 w-40 rounded-full bg-emerald-200/40" />
      </>
    )
  }

  if (preset === "premium") {
    return (
      <>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/[0.08]" />
        <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full border border-white/20" />
      </>
    )
  }

  if (preset === "max") {
    return (
      <>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-teal-300/10" />
        <div className="absolute right-8 top-8 grid h-44 w-44 grid-cols-2 gap-2">
          <span className="rounded-tl-3xl bg-teal-200/25" />
          <span className="rounded-tr-lg bg-white/10" />
          <span className="rounded-bl-lg bg-white/10" />
          <span className="rounded-br-3xl bg-teal-200/30" />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="absolute right-6 top-6 grid w-40 grid-cols-2 gap-2">
        <span className="h-16 rounded-md border bg-white/70" />
        <span className="h-24 rounded-md border bg-white/50" />
        <span className="h-20 rounded-md border bg-white/55" />
        <span className="h-12 rounded-md border bg-white/75" />
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-full bg-slate-900/5" />
    </>
  )
}
