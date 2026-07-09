"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react"

type ConceptId = "A" | "B" | "C"
type GenerationState = "idle" | "loading" | "success" | "error"

const concepts = {
  A: {
    title: "Open frequency",
    headline: "Sound that follows your day.",
    copy: "Lead with freedom of movement, then reveal the precision hidden inside the smallest listening ritual.",
    reach: "1.7M",
    ctr: "4.8%",
    conversion: "3.5%",
  },
  B: {
    title: "Quiet force",
    headline: "Hear the detail. Lose the noise.",
    copy: "Use visual restraint and one decisive product promise across social, editorial, and retail placements.",
    reach: "1.4M",
    ctr: "5.6%",
    conversion: "4.0%",
  },
  C: {
    title: "Shared signal",
    headline: "Pass the feeling forward.",
    copy: "Build participation around playlists, public moments, and creator-led stories that travel across channels.",
    reach: "2.2M",
    ctr: "4.4%",
    conversion: "3.1%",
  },
} as const

const visualStyles = {
  "Cobalt field": {
    canvas: "bg-[#1647d8] text-white",
    quiet: "text-blue-100",
    button: "border-white bg-white text-[#1647d8]",
  },
  "White space": {
    canvas: "bg-white text-[#111111]",
    quiet: "text-neutral-600",
    button: "border-[#111111] bg-[#111111] text-white",
  },
  "Black frame": {
    canvas: "bg-[#111111] text-white",
    quiet: "text-neutral-300",
    button: "border-[#2b5cff] bg-[#2b5cff] text-white",
  },
} as const

const audiences = ["Urban listeners", "Creative commuters", "Independent makers"] as const
const channels = ["Social and web", "Retail launch", "Creator partnerships"] as const
const tones = ["Direct", "Cultured", "Restless"] as const
const styles = ["Cobalt field", "White space", "Black frame"] as const

function timeLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function StandardTasteShowcase() {
  const [brief, setBrief] = useState(
    "Launch featherweight wireless headphones for city listeners who want studio detail without retreating from daily life.",
  )
  const [audience, setAudience] = useState<string>(audiences[0])
  const [channel, setChannel] = useState<string>(channels[0])
  const [tone, setTone] = useState<string>(tones[0])
  const [visualStyle, setVisualStyle] = useState<keyof typeof visualStyles>("Cobalt field")
  const [concept, setConcept] = useState<ConceptId>("A")
  const [generation, setGeneration] = useState<GenerationState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [saved, setSaved] = useState(false)
  const [exportCount, setExportCount] = useState(0)
  const [activity, setActivity] = useState([
    "09:42 / Workspace opened",
    "09:46 / Open frequency selected",
  ])

  const selected = concepts[concept]
  const palette = visualStyles[visualStyle]
  const briefReady = brief.trim().length >= 20

  function log(message: string) {
    setActivity((items) => [`${timeLabel()} / ${message}`, ...items].slice(0, 6))
  }

  function changeControl(label: string, value: string, update: (next: string) => void) {
    update(value)
    log(`${label} changed to ${value}`)
  }

  function selectConcept(next: ConceptId) {
    setConcept(next)
    log(`${concepts[next].title} selected`)
  }

  function generate() {
    if (!briefReady || generation === "loading") return
    const nextAttempt = attempt + 1
    setAttempt(nextAttempt)
    setGeneration("loading")
    log("Campaign generation started")
    window.setTimeout(() => {
      const next: GenerationState = nextAttempt % 2 === 0 ? "error" : "success"
      setGeneration(next)
      log(next === "success" ? "Campaign preview regenerated" : "Generation paused at copy review")
    }, 700)
  }

  function save() {
    setSaved(true)
    log("Campaign draft saved")
  }

  function exportCampaign() {
    setExportCount((value) => value + 1)
    log(`Export ${exportCount + 1} prepared`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#f4f4f1] text-[#111111]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 border-b-2 border-black pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span className="bg-black px-2 py-1 text-white">GPT 5.6 Sol</span>
              <span className="border border-black px-2 py-1">frontend-app-builder + taste-skill</span>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Muse</h1>
              <span className="pb-1 text-sm text-neutral-600">Campaign Studio</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <SharpButton onClick={save} label={saved ? "Saved" : "Save"} icon="save" />
            <SharpButton onClick={exportCampaign} label={exportCount ? `Export ${exportCount}` : "Export"} icon="export" />
            <button
              type="button"
              onClick={generate}
              disabled={!briefReady || generation === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 border-2 border-black bg-black px-4 text-sm font-semibold text-white transition-[transform,background-color,color] hover:bg-[#1647d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647d8] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
            >
              {generation === "loading" ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {generation === "loading" ? "Generating" : "Generate"}
            </button>
          </div>
        </header>

        <section className="grid min-w-0 border-x-2 border-b-2 border-black lg:grid-cols-[minmax(0,1fr)_310px]" aria-label="Campaign workspace">
          <div className="min-w-0 border-b-2 border-black lg:border-b-0 lg:border-r-2">
            <div className={`relative min-h-[690px] min-w-0 overflow-hidden transition-colors duration-300 motion-reduce:transition-none ${palette.canvas}`}>
              <div className="grid min-h-[690px] min-w-0 grid-cols-1 md:grid-cols-[100px_minmax(0,1fr)]">
                <div className="flex border-b border-current/30 md:flex-col md:border-b-0 md:border-r">
                  {(Object.keys(concepts) as ConceptId[]).map((id) => {
                    const active = concept === id
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => selectConcept(id)}
                        className={`min-h-14 flex-1 border-r border-current/30 text-2xl font-semibold transition-[background-color,color] last:border-r-0 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-current md:border-b md:border-r-0 md:last:border-b-0 motion-reduce:transition-none ${
                          active ? "bg-black text-white" : "bg-transparent"
                        }`}
                      >
                        {id}
                      </button>
                    )
                  })}
                </div>

                <article className="relative flex min-w-0 flex-col justify-between p-5 sm:p-8 lg:p-12">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className={`text-sm font-medium ${palette.quiet}`}>{selected.title}</p>
                      <p className={`mt-1 text-xs ${palette.quiet}`}>{audience} / {channel}</p>
                    </div>
                    <Status state={generation} />
                  </div>

                  <div className="max-w-5xl py-10">
                    <p className={`mb-5 text-sm font-semibold ${palette.quiet}`}>{tone} voice</p>
                    <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-[5.8rem]">
                      {selected.headline}
                    </h2>
                    <p className={`mt-7 max-w-[64ch] text-pretty text-base leading-7 ${palette.quiet}`}>
                      {brief}
                    </p>
                    <button
                      type="button"
                      onClick={() => log("Preview call to action opened")}
                      className={`mt-8 inline-flex min-h-11 items-center gap-2 border-2 px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current active:translate-y-px motion-reduce:transition-none ${palette.button}`}
                    >
                      Explore the launch
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </button>
                  </div>

                  <div>
                    <p className={`mb-4 max-w-[55ch] text-sm leading-6 ${palette.quiet}`}>{selected.copy}</p>
                    <dl className="grid grid-cols-3 border-t border-current/40 pt-4">
                      <LargeMetric label="Reach" value={selected.reach} />
                      <LargeMetric label="CTR" value={selected.ctr} />
                      <LargeMetric label="Conversion" value={selected.conversion} />
                    </dl>
                  </div>

                  {generation === "loading" && (
                    <div className="absolute inset-0 grid place-items-center bg-black/80 text-white" role="status" aria-label="Generating campaign">
                      <div className="text-center">
                        <Loader2 aria-hidden="true" className="mx-auto size-8 animate-spin motion-reduce:animate-none" />
                        <p className="mt-4 text-sm font-semibold">Composing campaign</p>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>

          <aside className="min-w-0 bg-white p-5" aria-labelledby="taste-inspector-title">
            <h2 id="taste-inspector-title" className="text-lg font-semibold">Direction</h2>
            <p className="mt-1 text-xs leading-5 text-neutral-600">A narrow set of controls keeps the preview dominant.</p>
            <div className="mt-6 flex flex-col gap-5">
              <label htmlFor="taste-brief" className="flex flex-col gap-2 text-sm font-semibold">
                Campaign Brief
                <textarea
                  id="taste-brief"
                  value={brief}
                  onChange={(event) => setBrief(event.target.value)}
                  onBlur={() => log("Campaign brief updated")}
                  aria-invalid={!briefReady}
                  aria-describedby="taste-brief-help"
                  className="min-h-36 resize-y border-2 border-black bg-white px-3 py-3 text-sm font-normal leading-6 outline-none transition-shadow placeholder:text-neutral-600 focus:shadow-[4px_4px_0_#1647d8] motion-reduce:transition-none"
                />
              </label>
              <p id="taste-brief-help" className={briefReady ? "-mt-3 text-xs text-neutral-600" : "-mt-3 text-xs font-medium text-red-700"}>
                {briefReady ? "Preview copy updates immediately." : "Add at least 20 characters."}
              </p>
              <SharpSelect id="taste-audience" label="Target audience" value={audience} options={audiences} onChange={(value) => changeControl("Audience", value, setAudience)} />
              <SharpSelect id="taste-channel" label="Channel" value={channel} options={channels} onChange={(value) => changeControl("Channel", value, setChannel)} />
              <SharpSelect id="taste-tone" label="Tone" value={tone} options={tones} onChange={(value) => changeControl("Tone", value, setTone)} />
              <SharpSelect id="taste-style" label="Visual style" value={visualStyle} options={styles} onChange={(value) => changeControl("Visual style", value, (next) => setVisualStyle(next as keyof typeof visualStyles))} />
            </div>
          </aside>
        </section>

        <section className="border-x-2 border-b-2 border-black bg-[#e7e7e2]" aria-labelledby="taste-activity-title">
          <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
            <h2 id="taste-activity-title" className="border-b-2 border-black p-4 text-sm font-semibold md:border-b-0 md:border-r-2">Activity ledger</h2>
            <ol className="grid min-w-0 sm:grid-cols-2 xl:grid-cols-3">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="min-w-0 border-b border-black/25 px-4 py-3 text-xs leading-5 last:border-b-0 sm:border-r sm:last:border-r-0">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}

function SharpButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: "save" | "export" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 border-2 border-black bg-transparent px-3 text-sm font-semibold transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647d8] active:translate-y-px motion-reduce:transition-none"
    >
      {icon === "save" ? <Save aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}
      {label}
    </button>
  )
}

function SharpSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border-0 border-b-2 border-black bg-transparent px-0 text-sm font-normal outline-none transition-colors hover:border-[#1647d8] focus:border-[#1647d8] focus:ring-2 focus:ring-[#1647d8]/20 motion-reduce:transition-none"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Status({ state }: { state: GenerationState }) {
  const states = {
    idle: { label: "Ready", icon: <Sparkles aria-hidden="true" className="size-4" /> },
    loading: { label: "Generating", icon: <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> },
    success: { label: "Campaign ready", icon: <CheckCircle2 aria-hidden="true" className="size-4" /> },
    error: { label: "Copy review needed", icon: <AlertTriangle aria-hidden="true" className="size-4" /> },
  } as const
  const current = states[state]
  return (
    <div role={state === "error" ? "alert" : "status"} aria-live="polite" className="inline-flex min-h-11 items-center gap-2 border border-current px-3 text-xs font-semibold">
      {current.icon}
      {current.label}
    </div>
  )
}

function LargeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-r border-current/30 px-3 first:pl-0 last:border-r-0">
      <dt className="text-xs opacity-65">{label}</dt>
      <dd className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">{value}</dd>
    </div>
  )
}
