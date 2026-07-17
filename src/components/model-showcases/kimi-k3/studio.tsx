"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Download,
  Save,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type ConceptId = "A" | "B" | "C"

export type Concept = {
  id: ConceptId
  name: string
  headline: string
  sub: string
  reach: number
  ctr: number
  conv: number
}

export type ControlsSpec = {
  audiences: string[]
  channels: string[]
  tones: string[]
  styles: string[]
}

export type StudioSpec = {
  modelName: string
  chain: string
  brief: string
  controls: ControlsSpec
  concepts: [Concept, Concept, Concept]
  activity: string[]
}

export type Status = "idle" | "loading" | "success" | "error"

export type StudioState = {
  brief: string
  setBrief: (value: string) => void
  audience: string
  setAudience: (value: string) => void
  channel: string
  setChannel: (value: string) => void
  tone: string
  setTone: (value: string) => void
  style: string
  setStyle: (value: string) => void
  concept: Concept
  conceptId: ConceptId
  selectConcept: (id: ConceptId) => void
  status: Status
  generate: () => void
  saved: boolean
  save: () => void
  exported: boolean
  exportCampaign: () => void
  activity: string[]
  metrics: { reach: number; ctr: number; conv: number }
}

function hashText(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 9973
  }
  return hash
}

export function useStudio(spec: StudioSpec): StudioState {
  const [brief, setBrief] = useState(spec.brief)
  const [audience, setAudience] = useState(spec.controls.audiences[0])
  const [channel, setChannel] = useState(spec.controls.channels[0])
  const [tone, setTone] = useState(spec.controls.tones[0])
  const [style, setStyle] = useState(spec.controls.styles[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [saved, setSaved] = useState(false)
  const [exported, setExported] = useState(false)
  const [activity, setActivity] = useState<string[]>(spec.activity)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const pushActivity = (entry: string) => {
    setActivity((current) => [entry, ...current].slice(0, 6))
  }

  const concept = spec.concepts.find((item) => item.id === conceptId) ?? spec.concepts[0]

  const selectConcept = (id: ConceptId) => {
    setConceptId(id)
    const next = spec.concepts.find((item) => item.id === id)
    if (next) {
      pushActivity(`Selected concept ${id} · ${next.name}`)
    }
  }

  const generate = () => {
    if (status === "loading") {
      return
    }
    setStatus("loading")
    pushActivity("Generate started")
    const fails = brief.trim().length < 24
    timerRef.current = window.setTimeout(() => {
      if (fails) {
        setStatus("error")
        pushActivity("Generate failed · brief too thin")
      } else {
        setStatus("success")
        pushActivity("Generate complete · forecast refreshed")
      }
    }, 1400)
  }

  const save = () => {
    setSaved(true)
    pushActivity("Draft saved locally")
  }

  const exportCampaign = () => {
    setExported(true)
    pushActivity("Export package prepared")
  }

  const seed =
    hashText(brief + audience + channel + tone + style) + (status === "success" ? 41 : 0)
  const metrics = {
    reach: Math.round(concept.reach + (seed % 90) - 40),
    ctr: Math.max(0.8, Math.round((concept.ctr + ((seed % 14) - 7) / 10) * 10) / 10),
    conv: Math.max(0.5, Math.round((concept.conv + ((seed % 10) - 5) / 10) * 10) / 10),
  }

  return {
    brief,
    setBrief,
    audience,
    setAudience,
    channel,
    setChannel,
    tone,
    setTone,
    style,
    setStyle,
    concept,
    conceptId,
    selectConcept,
    status,
    generate,
    saved,
    save,
    exported,
    exportCampaign,
    activity,
    metrics,
  }
}

export function ModelBadge({ modelName, dark }: { modelName: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase",
        dark
          ? "border-white/25 bg-white/10 text-white"
          : "border-neutral-900/15 bg-neutral-900 text-white"
      )}
    >
      <Sparkles className="size-3" aria-hidden />
      {modelName}
    </span>
  )
}

export function ChainBadge({ chain, dark }: { chain: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none",
        dark
          ? "border-white/20 bg-transparent text-white/80"
          : "border-neutral-900/15 bg-white/60 text-neutral-600"
      )}
    >
      <span className="truncate">{chain}</span>
    </span>
  )
}

export function StatusPill({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
        <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
        Generating
      </span>
    )
  }
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
        <Check className="size-3" aria-hidden />
        Ready
      </span>
    )
  }
  if (status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
        <AlertTriangle className="size-3" aria-hidden />
        Needs detail
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-200/70 px-2.5 py-1 text-[11px] font-semibold text-neutral-600">
      <span className="size-1.5 rounded-full bg-neutral-400" />
      Draft
    </span>
  )
}

export function FieldSelect({
  label,
  value,
  options,
  onChange,
  tone = "light",
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  tone?: "light" | "dark"
}) {
  return (
    <label className="block">
      <span
        className={cn(
          "mb-1.5 block text-[11px] font-semibold tracking-[0.12em] uppercase",
          tone === "dark" ? "text-white/60" : "text-neutral-500"
        )}
      >
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm transition-colors outline-none focus-visible:ring-2",
            tone === "dark"
              ? "border-white/15 bg-white/5 text-white hover:border-white/30 focus-visible:ring-white/40 [&>option]:text-neutral-900"
              : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-500 focus-visible:ring-neutral-900/30"
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2",
            tone === "dark" ? "text-white/50" : "text-neutral-400"
          )}
          aria-hidden
        />
      </span>
    </label>
  )
}

export function SegmentedControl({
  label,
  value,
  options,
  onChange,
  tone = "light",
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  tone?: "light" | "dark"
}) {
  return (
    <div>
      <span
        className={cn(
          "mb-1.5 block text-[11px] font-semibold tracking-[0.12em] uppercase",
          tone === "dark" ? "text-white/60" : "text-neutral-500"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "flex flex-wrap gap-1 rounded-lg border p-1",
          tone === "dark" ? "border-white/15 bg-white/5" : "border-neutral-300 bg-neutral-100"
        )}
        role="group"
        aria-label={label}
      >
        {options.map((option) => {
          const active = option === value
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2",
                active
                  ? tone === "dark"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "bg-neutral-900 text-white shadow-sm"
                  : tone === "dark"
                    ? "text-white/70 hover:bg-white/10 hover:text-white focus-visible:ring-white/40"
                    : "text-neutral-600 hover:bg-white hover:text-neutral-900 focus-visible:ring-neutral-900/30"
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function BriefEditor({
  value,
  onChange,
  tone = "light",
  label = "Campaign brief",
  placeholder = "What are we launching?",
}: {
  value: string
  onChange: (value: string) => void
  tone?: "light" | "dark"
  label?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span
        className={cn(
          "mb-1.5 block text-[11px] font-semibold tracking-[0.12em] uppercase",
          tone === "dark" ? "text-white/60" : "text-neutral-500"
        )}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className={cn(
          "w-full resize-none rounded-lg border px-3 py-2.5 text-sm leading-relaxed transition-colors outline-none focus-visible:ring-2",
          tone === "dark"
            ? "border-white/15 bg-white/5 text-white placeholder:text-white/35 hover:border-white/30 focus-visible:ring-white/40"
            : "border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 hover:border-neutral-500 focus-visible:ring-neutral-900/30"
        )}
      />
    </label>
  )
}

export function ConceptCard({
  concept,
  selected,
  onSelect,
  tone = "light",
  className,
}: {
  concept: Concept
  selected: boolean
  onSelect: () => void
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group w-full rounded-xl border p-3 text-left transition-all outline-none focus-visible:ring-2",
        tone === "dark"
          ? "focus-visible:ring-white/50"
          : "focus-visible:ring-neutral-900/40",
        selected
          ? tone === "dark"
            ? "border-white bg-white/10 shadow-lg"
            : "border-neutral-900 bg-white shadow-md"
          : tone === "dark"
            ? "border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/10"
            : "border-neutral-200 bg-white/70 hover:border-neutral-400 hover:bg-white",
        className
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-full text-[11px] font-bold",
            selected
              ? tone === "dark"
                ? "bg-white text-neutral-900"
                : "bg-neutral-900 text-white"
              : tone === "dark"
                ? "bg-white/15 text-white"
                : "bg-neutral-200 text-neutral-700"
          )}
        >
          {concept.id}
        </span>
        {selected ? (
          <Check
            className={cn("size-4", tone === "dark" ? "text-white" : "text-neutral-900")}
            aria-hidden
          />
        ) : null}
      </span>
      <span
        className={cn(
          "mt-2 block text-sm font-semibold",
          tone === "dark" ? "text-white" : "text-neutral-900"
        )}
      >
        {concept.name}
      </span>
      <span
        className={cn(
          "mt-0.5 block text-xs leading-relaxed",
          tone === "dark" ? "text-white/60" : "text-neutral-500"
        )}
      >
        {concept.sub}
      </span>
    </button>
  )
}

export function MetricBlock({
  label,
  value,
  suffix,
  tone = "light",
}: {
  label: string
  value: string
  suffix?: string
  tone?: "light" | "dark"
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        tone === "dark" ? "border-white/15 bg-white/5" : "border-neutral-200 bg-white"
      )}
    >
      <div
        className={cn(
          "text-[10px] font-semibold tracking-[0.14em] uppercase",
          tone === "dark" ? "text-white/50" : "text-neutral-400"
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-xl font-bold tabular-nums",
          tone === "dark" ? "text-white" : "text-neutral-900"
        )}
      >
        {value}
        {suffix ? (
          <span
            className={cn(
              "ml-0.5 text-xs font-medium",
              tone === "dark" ? "text-white/50" : "text-neutral-400"
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export function ActivityList({
  items,
  tone = "light",
  title = "Activity",
}: {
  items: string[]
  tone?: "light" | "dark"
  title?: string
}) {
  return (
    <div>
      <div
        className={cn(
          "mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase",
          tone === "dark" ? "text-white/60" : "text-neutral-500"
        )}
      >
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={cn(
              "flex items-start gap-2 text-xs leading-relaxed",
              tone === "dark" ? "text-white/70" : "text-neutral-600"
            )}
          >
            <span
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                index === 0
                  ? tone === "dark"
                    ? "bg-white"
                    : "bg-neutral-900"
                  : tone === "dark"
                    ? "bg-white/30"
                    : "bg-neutral-300"
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ActionButtons({
  state,
  tone = "light",
  layout = "row",
}: {
  state: StudioState
  tone?: "light" | "dark"
  layout?: "row" | "column"
}) {
  const loading = state.status === "loading"
  return (
    <div
      className={cn(
        "flex gap-2",
        layout === "column" ? "flex-col" : "flex-row flex-wrap"
      )}
    >
      <button
        type="button"
        onClick={state.generate}
        disabled={loading}
        className={cn(
          "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 disabled:cursor-wait",
          tone === "dark"
            ? "bg-white text-neutral-900 hover:bg-neutral-200 focus-visible:ring-white/50 disabled:opacity-70"
            : "bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:ring-neutral-900/40 disabled:opacity-70"
        )}
      >
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Sparkles className="size-4" aria-hidden />
        )}
        {loading ? "Generating…" : "Generate"}
      </button>
      <button
        type="button"
        onClick={state.save}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all outline-none focus-visible:ring-2",
          tone === "dark"
            ? "border-white/25 text-white hover:bg-white/10 focus-visible:ring-white/50"
            : "border-neutral-300 text-neutral-800 hover:border-neutral-500 hover:bg-neutral-100 focus-visible:ring-neutral-900/40"
        )}
      >
        {state.saved ? (
          <Check className="size-4 text-emerald-500" aria-hidden />
        ) : (
          <Save className="size-4" aria-hidden />
        )}
        {state.saved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={state.exportCampaign}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all outline-none focus-visible:ring-2",
          tone === "dark"
            ? "border-white/25 text-white hover:bg-white/10 focus-visible:ring-white/50"
            : "border-neutral-300 text-neutral-800 hover:border-neutral-500 hover:bg-neutral-100 focus-visible:ring-neutral-900/40"
        )}
      >
        {state.exported ? (
          <Check className="size-4 text-emerald-500" aria-hidden />
        ) : (
          <Download className="size-4" aria-hidden />
        )}
        {state.exported ? "Exported" : "Export"}
      </button>
    </div>
  )
}

export function StatusNotice({ status }: { status: Status }) {
  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
        <Check className="size-3.5 shrink-0" aria-hidden />
        Forecast refreshed for the selected concept.
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
        <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
        Brief needs more detail before Muse can forecast this launch.
      </div>
    )
  }
  return null
}

export function PreviewShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[420px]",
        className
      )}
    >
      {children}
    </div>
  )
}
