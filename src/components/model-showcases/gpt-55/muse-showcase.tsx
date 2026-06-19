"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  Save,
  WandSparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CreativeId = "A" | "B" | "C"

export type LayoutId =
  | "standard-builder"
  | "visual-frontend"
  | "design-logic"
  | "impeccable-full-flow"
  | "artifact-builder"
  | "ux-pro-reference"
  | "component-system"
  | "motion-bits"
  | "standard-taste"
  | "standard-impeccable"
  | "visual-taste"
  | "visual-impeccable"
  | "design-ux-pro"
  | "design-impeccable"
  | "balanced-chain"
  | "visual-premium-chain"
  | "product-polish-chain"
  | "max-quality-chain"

export type PreviewMode =
  | "poster"
  | "cinema"
  | "blueprint"
  | "studio"
  | "artifact"
  | "journey"
  | "system"
  | "motion"
  | "gallery"
  | "polish"
  | "editorial"
  | "broadcast"
  | "matrix"
  | "atelier"
  | "ops"
  | "stage"
  | "workbench"
  | "command"

export type CreativeOption = {
  id: CreativeId
  name: string
  headline: string
  angle: string
  line: string
  motif: string
  reach: number
  ctr: number
  conversion: number
}

export type ShowcaseSpec = {
  id: LayoutId
  title: string
  modelName: string
  chain: string
  product: string
  defaultBrief: string
  controlLabels: {
    audience: string
    channel: string
    tone: string
    style: string
  }
  controls: {
    audiences: string[]
    channels: string[]
    tones: string[]
    styles: string[]
  }
  concepts: CreativeOption[]
  theme: {
    page: string
    panel: string
    mutedPanel: string
    preview: string
    accent: string
    accentText: string
    border: string
    chip: string
    metric: string
  }
  previewMode: PreviewMode
  activity: string[]
}

type Status = "idle" | "loading" | "success" | "error"
type ControlKey = keyof ShowcaseSpec["controls"]

const layouts: Record<
  LayoutId,
  {
    frame: string
    brief: string
    controls: string
    preview: string
    concepts: string
    metrics: string
    activity: string
    actions: string
  }
> = {
  "standard-builder": {
    frame: "xl:grid-cols-[320px_minmax(0,1fr)_300px]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-1 xl:row-start-2",
    preview: "xl:col-start-2 xl:row-span-3",
    concepts: "xl:col-start-3 xl:row-start-1",
    metrics: "xl:col-start-3 xl:row-start-2",
    activity: "xl:col-start-1 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3",
  },
  "visual-frontend": {
    frame: "xl:grid-cols-[minmax(0,1.15fr)_360px]",
    brief: "xl:col-start-2 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-2",
    preview: "xl:col-start-1 xl:row-span-4",
    concepts: "xl:col-start-2 xl:row-start-3",
    metrics: "xl:col-start-1 xl:row-start-5",
    activity: "xl:col-start-2 xl:row-start-4",
    actions: "xl:col-start-1 xl:row-start-6",
  },
  "design-logic": {
    frame: "xl:grid-cols-[300px_minmax(0,1fr)_300px]",
    brief: "xl:col-span-3",
    controls: "xl:col-start-1 xl:row-start-2",
    preview: "xl:col-start-2 xl:row-span-2",
    concepts: "xl:col-start-3 xl:row-start-2",
    metrics: "xl:col-start-1 xl:row-start-3",
    activity: "xl:col-start-3 xl:row-start-3",
    actions: "xl:col-span-3",
  },
  "impeccable-full-flow": {
    frame: "xl:grid-cols-[380px_minmax(0,1fr)]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-1 xl:row-start-2",
    preview: "xl:col-start-2 xl:row-span-3",
    concepts: "xl:col-start-1 xl:row-start-3",
    metrics: "xl:col-start-2 xl:row-start-4",
    activity: "xl:col-start-1 xl:row-start-4",
    actions: "xl:col-start-2 xl:row-start-5",
  },
  "artifact-builder": {
    frame: "xl:grid-cols-[minmax(0,1fr)_340px_280px]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-1 xl:row-span-2",
    preview: "xl:col-start-1 xl:row-start-2 xl:row-span-3",
    concepts: "xl:col-start-3 xl:row-start-1",
    metrics: "xl:col-start-3 xl:row-start-2",
    activity: "xl:col-start-2 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3",
  },
  "ux-pro-reference": {
    frame: "xl:grid-cols-[340px_340px_minmax(0,1fr)]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-1",
    preview: "xl:col-start-3 xl:row-span-3",
    concepts: "xl:col-start-1 xl:row-start-2 xl:col-span-2",
    metrics: "xl:col-start-1 xl:row-start-3",
    activity: "xl:col-start-2 xl:row-start-3",
    actions: "xl:col-span-3",
  },
  "component-system": {
    frame: "xl:grid-cols-[300px_minmax(0,1fr)_320px]",
    brief: "xl:col-start-2 xl:row-start-1",
    controls: "xl:col-start-1 xl:row-start-1 xl:row-span-2",
    preview: "xl:col-start-2 xl:row-start-2 xl:row-span-2",
    concepts: "xl:col-start-3 xl:row-start-1",
    metrics: "xl:col-start-3 xl:row-start-2",
    activity: "xl:col-start-1 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3",
  },
  "motion-bits": {
    frame: "xl:grid-cols-[minmax(0,1fr)_300px]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-1",
    preview: "xl:col-start-1 xl:row-start-2",
    concepts: "xl:col-start-1 xl:row-start-3",
    metrics: "xl:col-start-2 xl:row-start-2",
    activity: "xl:col-start-2 xl:row-start-3",
    actions: "xl:col-span-2",
  },
  "standard-taste": {
    frame: "xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-1 xl:row-start-2",
    preview: "xl:col-start-2 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-1 xl:row-start-3",
    metrics: "xl:col-start-2 xl:row-start-4",
    activity: "xl:col-start-1 xl:row-start-4",
    actions: "xl:col-span-2",
  },
  "standard-impeccable": {
    frame: "xl:grid-cols-[330px_minmax(0,1fr)_330px]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-3 xl:row-start-1",
    preview: "xl:col-start-2 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-1 xl:row-start-2",
    metrics: "xl:col-start-3 xl:row-start-2",
    activity: "xl:col-start-1 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3",
  },
  "visual-taste": {
    frame: "xl:grid-cols-[minmax(0,1fr)_380px]",
    brief: "xl:col-start-2 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-3",
    preview: "xl:col-start-1 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-2 xl:row-start-2",
    metrics: "xl:col-start-1 xl:row-start-4",
    activity: "xl:col-start-2 xl:row-start-4",
    actions: "xl:col-span-2",
  },
  "visual-impeccable": {
    frame: "xl:grid-cols-[360px_minmax(0,1fr)]",
    brief: "xl:col-start-1 xl:row-start-2",
    controls: "xl:col-start-1 xl:row-start-3",
    preview: "xl:col-start-2 xl:row-start-1 xl:row-span-4",
    concepts: "xl:col-start-1 xl:row-start-1",
    metrics: "xl:col-start-2 xl:row-start-5",
    activity: "xl:col-start-1 xl:row-start-4",
    actions: "xl:col-span-2",
  },
  "design-ux-pro": {
    frame: "xl:grid-cols-[280px_minmax(0,1fr)_280px]",
    brief: "xl:col-start-1 xl:row-start-1 xl:row-span-2",
    controls: "xl:col-start-3 xl:row-start-1",
    preview: "xl:col-start-2 xl:row-start-1 xl:row-span-2",
    concepts: "xl:col-start-2 xl:row-start-3",
    metrics: "xl:col-start-3 xl:row-start-2",
    activity: "xl:col-start-1 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3",
  },
  "design-impeccable": {
    frame: "xl:grid-cols-[minmax(0,1fr)_320px_320px]",
    brief: "xl:col-start-2 xl:row-start-1",
    controls: "xl:col-start-3 xl:row-start-1",
    preview: "xl:col-start-1 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-2 xl:row-start-2 xl:col-span-2",
    metrics: "xl:col-start-2 xl:row-start-3",
    activity: "xl:col-start-3 xl:row-start-3",
    actions: "xl:col-span-3",
  },
  "balanced-chain": {
    frame: "xl:grid-cols-[340px_minmax(0,1fr)_340px]",
    brief: "xl:col-start-2 xl:row-start-1",
    controls: "xl:col-start-1 xl:row-start-1",
    preview: "xl:col-start-2 xl:row-start-2 xl:row-span-2",
    concepts: "xl:col-start-3 xl:row-start-1",
    metrics: "xl:col-start-1 xl:row-start-2",
    activity: "xl:col-start-3 xl:row-start-2",
    actions: "xl:col-start-1 xl:row-start-3 xl:col-span-3",
  },
  "visual-premium-chain": {
    frame: "xl:grid-cols-[minmax(0,1fr)_300px_300px]",
    brief: "xl:col-start-2 xl:row-start-1 xl:col-span-2",
    controls: "xl:col-start-3 xl:row-start-2",
    preview: "xl:col-start-1 xl:row-start-1 xl:row-span-4",
    concepts: "xl:col-start-2 xl:row-start-2",
    metrics: "xl:col-start-2 xl:row-start-3",
    activity: "xl:col-start-3 xl:row-start-3",
    actions: "xl:col-start-2 xl:row-start-4 xl:col-span-2",
  },
  "product-polish-chain": {
    frame: "xl:grid-cols-[300px_300px_minmax(0,1fr)]",
    brief: "xl:col-start-1 xl:row-start-1",
    controls: "xl:col-start-2 xl:row-start-1",
    preview: "xl:col-start-3 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-1 xl:row-start-2 xl:col-span-2",
    metrics: "xl:col-start-1 xl:row-start-3",
    activity: "xl:col-start-2 xl:row-start-3",
    actions: "xl:col-span-3",
  },
  "max-quality-chain": {
    frame: "xl:grid-cols-[280px_minmax(0,1fr)_280px_280px]",
    brief: "xl:col-start-1 xl:row-start-1 xl:row-span-2",
    controls: "xl:col-start-3 xl:row-start-1",
    preview: "xl:col-start-2 xl:row-start-1 xl:row-span-3",
    concepts: "xl:col-start-4 xl:row-start-1",
    metrics: "xl:col-start-3 xl:row-start-2 xl:col-span-2",
    activity: "xl:col-start-1 xl:row-start-3",
    actions: "xl:col-start-3 xl:row-start-3 xl:col-span-2",
  },
}

const controlKeys: ControlKey[] = ["audiences", "channels", "tones", "styles"]

const controlKeyLabels: Record<ControlKey, keyof ShowcaseSpec["controlLabels"]> = {
  audiences: "audience",
  channels: "channel",
  tones: "tone",
  styles: "style",
}

export function MuseShowcase({ spec }: { spec: ShowcaseSpec }) {
  const layout = layouts[spec.id]
  const [brief, setBrief] = useState(spec.defaultBrief)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState(spec.activity)
  const [controls, setControls] = useState(() => ({
    audiences: spec.controls.audiences[0],
    channels: spec.controls.channels[0],
    tones: spec.controls.tones[0],
    styles: spec.controls.styles[0],
  }))
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const concept = spec.concepts.find((item) => item.id === selected) ?? spec.concepts[0]
  const controlWeight = controlKeys.reduce((sum, key) => {
    const index = spec.controls[key].indexOf(controls[key])
    return sum + Math.max(index, 0)
  }, 0)
  const metrics = useMemo(
    () => ({
      reach: concept.reach + controlWeight * 48,
      ctr: concept.ctr + controlWeight * 0.08,
      conversion: concept.conversion + controlWeight * 0.06,
    }),
    [concept, controlWeight]
  )

  function pushActivity(message: string) {
    setActivity((items) => [message, ...items].slice(0, 5))
  }

  function changeControl(key: ControlKey, value: string) {
    setControls((current) => ({ ...current, [key]: value }))
    pushActivity(`${spec.controlLabels[controlKeyLabels[key]]} changed to ${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`Generate started for concept ${selected}`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 16) {
        setStatus("error")
        pushActivity("Error: brief needs more launch context")
        return
      }
      setStatus("success")
      pushActivity(`Success: ${concept.name} refreshed`)
    }, 820)
  }

  function save() {
    setStatus("success")
    pushActivity(`Saved ${concept.name} draft`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`Export queued for ${controls.channels}`)
  }

  return (
    <main className={cn("min-h-screen", spec.theme.page)}>
      <div className="mx-auto flex max-w-[1540px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-lg border border-current/10 bg-white/60 p-4 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", spec.theme.chip)}>
                {spec.modelName}
              </span>
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", spec.theme.chip)}>
                {spec.chain}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Muse Campaign Studio
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-current/70">
              {spec.title} builds a launch campaign workspace for {spec.product}.
            </p>
          </div>
          <StatusBadge status={status} theme={spec.theme} />
        </header>

        <div className={cn("grid gap-4", layout.frame)}>
          <section className={cn("rounded-lg border p-4", spec.theme.panel, spec.theme.border, layout.brief)}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Campaign Brief</h2>
              <span className="text-xs text-current/55">{brief.length} chars</span>
            </div>
            <textarea
              value={brief}
              onChange={(event) => {
                setBrief(event.target.value)
                if (status === "error" && event.target.value.trim().length >= 16) setStatus("idle")
              }}
              aria-label="Campaign Brief"
              aria-invalid={status === "error"}
              className="mt-3 min-h-32 w-full resize-y rounded-lg border border-current/15 bg-white/80 px-3 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-500 hover:border-current/30 focus-visible:border-current/50 focus-visible:ring-3 focus-visible:ring-current/20"
            />
            {status === "error" ? (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-700">
                <AlertCircle aria-hidden="true" className="size-4" />
                Add a clearer product promise before generating.
              </p>
            ) : null}
          </section>

          <section className={cn("rounded-lg border p-4", spec.theme.mutedPanel, spec.theme.border, layout.controls)}>
            <h2 className="text-sm font-semibold">Controls</h2>
            <div className="mt-4 grid gap-3">
              {controlKeys.map((key) => (
                <label key={key} className="grid gap-1.5 text-sm">
                  <span className="text-xs font-medium text-current/60">
                    {spec.controlLabels[controlKeyLabels[key]]}
                  </span>
                  <select
                    value={controls[key]}
                    onChange={(event) => changeControl(key, event.target.value)}
                    className="h-10 rounded-lg border border-current/15 bg-white/85 px-3 text-sm text-zinc-950 outline-none transition hover:border-current/30 focus-visible:border-current/50 focus-visible:ring-3 focus-visible:ring-current/20"
                  >
                    {spec.controls[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </section>

          <section
            className={cn(
              "relative overflow-hidden rounded-lg border p-4",
              spec.theme.preview,
              spec.theme.border,
              layout.preview
            )}
          >
            <CreativePreview
              brief={brief}
              concept={concept}
              controls={controls}
              mode={spec.previewMode}
              product={spec.product}
              theme={spec.theme}
            />
          </section>

          <section className={cn("rounded-lg border p-4", spec.theme.panel, spec.theme.border, layout.concepts)}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Creative Options</h2>
              <span className="text-xs text-current/55">A / B / C</span>
            </div>
            <div className="mt-4 grid gap-3">
              {spec.concepts.map((item) => {
                const active = item.id === selected
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelected(item.id)
                      pushActivity(`Selected concept ${item.id}: ${item.name}`)
                    }}
                    className={cn(
                      "group rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 hover:bg-white/70 focus-visible:ring-3 focus-visible:ring-current/20",
                      active
                        ? cn("border-current bg-white/80", spec.theme.accentText)
                        : "border-current/15 bg-white/35 text-current/75"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs">{item.id}</span>
                      {active ? <span className="text-xs font-semibold">Selected</span> : null}
                    </div>
                    <div className="mt-2 font-semibold">{item.name}</div>
                    <p className="mt-1 text-xs leading-5 text-current/65">{item.angle}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section className={cn("rounded-lg border p-4", spec.theme.mutedPanel, spec.theme.border, layout.metrics)}>
            <h2 className="text-sm font-semibold">Predicted Metrics</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 xl:grid-cols-1 2xl:grid-cols-3">
              <Metric label="Reach" value={formatReach(metrics.reach)} tone={spec.theme.metric} />
              <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} tone={spec.theme.metric} />
              <Metric label="Conversion" value={`${metrics.conversion.toFixed(1)}%`} tone={spec.theme.metric} />
            </div>
          </section>

          <section className={cn("rounded-lg border p-4", spec.theme.panel, spec.theme.border, layout.activity)}>
            <h2 className="text-sm font-semibold">Activity</h2>
            <ol className="mt-4 grid gap-2 text-sm text-current/70">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-md border border-current/10 bg-white/35 px-3 py-2">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section className={cn("rounded-lg border p-4", spec.theme.mutedPanel, spec.theme.border, layout.actions)}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold">Actions</h2>
                <p className="mt-1 text-sm text-current/60">Generate, Save, or Export the selected campaign.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={generate} disabled={status === "loading"} className={cn(spec.theme.accent)}>
                  {status === "loading" ? (
                    <Loader2 data-icon="inline-start" aria-hidden="true" className="animate-spin" />
                  ) : (
                    <WandSparkles data-icon="inline-start" aria-hidden="true" />
                  )}
                  Generate
                </Button>
                <Button variant="outline" onClick={save}>
                  <Save data-icon="inline-start" aria-hidden="true" />
                  Save
                </Button>
                <Button variant="outline" onClick={exportPlan}>
                  <Download data-icon="inline-start" aria-hidden="true" />
                  Export
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function StatusBadge({ status, theme }: { status: Status; theme: ShowcaseSpec["theme"] }) {
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-current/15 bg-white/70 px-3 py-2 text-sm font-medium">
        <Loader2 aria-hidden="true" className="size-4 animate-spin" />
        Loading
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
        <CheckCircle2 aria-hidden="true" className="size-4" />
        Success
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-red-700/20 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
        <AlertCircle aria-hidden="true" className="size-4" />
        Error
      </div>
    )
  }

  return <div className={cn("rounded-full px-3 py-2 text-sm font-medium", theme.chip)}>Ready</div>
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={cn("rounded-lg border border-current/10 p-3", tone)}>
      <div className="text-xs text-current/60">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
    </div>
  )
}

function CreativePreview({
  brief,
  concept,
  controls,
  mode,
  product,
  theme,
}: {
  brief: string
  concept: CreativeOption
  controls: Record<ControlKey, string>
  mode: PreviewMode
  product: string
  theme: ShowcaseSpec["theme"]
}) {
  const briefLine = brief.trim().split(/\s+/).slice(0, 11).join(" ")
  const cells = [
    controls.audiences,
    controls.channels,
    controls.tones,
    controls.styles,
  ]

  return (
    <div className="flex min-h-[520px] flex-col justify-between gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-current/65">Main Creative Preview</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-balance sm:text-5xl">
            {concept.headline}
          </h2>
        </div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", theme.chip)}>
          Concept {concept.id}
        </span>
      </div>

      <div className="relative min-h-80 overflow-hidden rounded-lg border border-current/15 bg-white/20 p-4">
        <PreviewArtwork mode={mode} concept={concept} product={product} cells={cells} theme={theme} />
      </div>

      <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-current/10 bg-white/35 p-4">
          <div className="text-xs font-medium text-current/55">Campaign line</div>
          <p className="mt-2 text-lg font-semibold">{concept.line}</p>
          <p className="mt-2 text-sm leading-6 text-current/65">{briefLine}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 md:grid-cols-2">
          {cells.map((item) => (
            <span key={item} className="rounded-md border border-current/10 bg-white/35 px-2 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewArtwork({
  mode,
  concept,
  product,
  cells,
  theme,
}: {
  mode: PreviewMode
  concept: CreativeOption
  product: string
  cells: string[]
  theme: ShowcaseSpec["theme"]
}) {
  const label = `${product} / ${concept.motif}`

  if (mode === "blueprint" || mode === "matrix" || mode === "command") {
    return (
      <div className="grid h-full min-h-72 grid-cols-6 gap-2">
        <div className="col-span-4 row-span-3 rounded-lg bg-white/70 p-4 text-zinc-950">
          <div className="grid h-full grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "rounded-md border border-zinc-950/10",
                  index % 3 === 0 ? theme.accent : "bg-zinc-100"
                )}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2 row-span-3 rounded-lg border border-current/15 bg-black/10 p-4">
          <div className="text-xs text-current/60">{label}</div>
          <div className="mt-4 grid gap-2">
            {cells.map((cell) => (
              <span key={cell} className="h-8 rounded-md bg-white/35 px-2 py-2 text-xs">
                {cell}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (mode === "cinema" || mode === "broadcast" || mode === "stage") {
    return (
      <div className="relative h-full min-h-72 overflow-hidden rounded-md bg-zinc-950 text-white">
        <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-3">
          {["Launch", concept.motif, cells[1]].map((item) => (
            <div key={item} className="rounded-md border border-white/20 bg-white/10 p-3">
              <div className="text-xs text-white/60">{item}</div>
              <div className="mt-8 h-2 rounded-full bg-white/50" />
            </div>
          ))}
        </div>
        <div className="absolute left-8 top-8 max-w-sm">
          <div className="text-sm text-white/65">{label}</div>
          <div className="mt-5 text-4xl font-semibold leading-none">{concept.name}</div>
        </div>
      </div>
    )
  }

  if (mode === "journey" || mode === "ops" || mode === "motion") {
    return (
      <div className="grid h-full min-h-72 content-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {cells.map((cell, index) => (
            <div key={cell} className="flex min-w-36 flex-1 items-center gap-3">
              <span className={cn("grid size-11 place-items-center rounded-full text-sm font-semibold", theme.accent)}>
                {index + 1}
              </span>
              <span className="h-px flex-1 bg-current/20" />
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white/50 p-5 text-zinc-950">
          <div className="text-sm font-medium">{label}</div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className={cn("h-16 rounded-md", index === 2 || index === 5 ? theme.accent : "bg-zinc-200")}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (mode === "system" || mode === "workbench" || mode === "artifact") {
    return (
      <div className="grid h-full min-h-72 gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="grid gap-2 rounded-lg bg-white/60 p-3 text-zinc-950">
          {["Brief", "Audience", "Channel", "Export"].map((item) => (
            <span key={item} className="rounded-md border border-zinc-950/10 px-3 py-2 text-sm">
              {item}
            </span>
          ))}
        </div>
        <div className="rounded-lg bg-white/40 p-4">
          <div className="grid h-full grid-cols-3 gap-3">
            <div className={cn("col-span-2 rounded-md p-4", theme.accent)}>
              <div className="text-sm font-semibold">{concept.name}</div>
              <div className="mt-16 h-3 w-3/4 rounded-full bg-current/20" />
              <div className="mt-3 h-3 w-1/2 rounded-full bg-current/20" />
            </div>
            <div className="grid gap-3">
              <span className="rounded-md bg-white/55" />
              <span className="rounded-md bg-white/35" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (mode === "gallery" || mode === "editorial" || mode === "atelier") {
    return (
      <div className="grid h-full min-h-72 grid-cols-5 gap-3">
        <div className={cn("col-span-3 rounded-lg p-5", theme.accent)}>
          <div className="max-w-xs text-4xl font-semibold leading-none">{concept.motif}</div>
          <div className="mt-20 h-2 w-28 rounded-full bg-current/25" />
        </div>
        <div className="col-span-2 grid gap-3">
          {cells.slice(0, 3).map((cell) => (
            <div key={cell} className="rounded-lg bg-white/45 p-3 text-sm">
              {cell}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-72 overflow-hidden rounded-md bg-white/55 p-5 text-zinc-950">
      <div className={cn("absolute -right-8 -top-8 size-48 rounded-full", theme.accent)} />
      <div className="relative max-w-md">
        <div className="text-sm font-medium">{label}</div>
        <div className="mt-8 text-5xl font-semibold leading-none">{concept.name}</div>
        <div className="mt-8 grid max-w-sm grid-cols-3 gap-2">
          {cells.slice(0, 3).map((cell) => (
            <span key={cell} className="rounded-md bg-zinc-950/10 px-2 py-2 text-xs">
              {cell}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatReach(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}M` : `${Math.round(value)}K`
}
