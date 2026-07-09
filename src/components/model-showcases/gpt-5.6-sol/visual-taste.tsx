"use client"

import { useState } from "react"
import {
  AlertTriangle,
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
    name: "Own the instant",
    headline: "THE CITY DOES NOT WAIT.",
    deck: "A street-scale launch that turns spontaneous snapshots into a public invitation.",
    reach: "2.4M",
    ctr: "5.1%",
    conversion: "3.6%",
  },
  B: {
    name: "Frame the feeling",
    headline: "KEEP WHAT HAPPENED HERE.",
    deck: "A human campaign built from close details, candid gestures, and creator testimony.",
    reach: "1.8M",
    ctr: "5.9%",
    conversion: "4.3%",
  },
  C: {
    name: "Pass it on",
    headline: "ONE SHOT STARTS ANOTHER.",
    deck: "A participatory story that moves from outdoor posters to a living social archive.",
    reach: "2.7M",
    ctr: "4.6%",
    conversion: "3.2%",
  },
} as const

const posterStyles = {
  "Vermilion block": "bg-[#ef3f27] text-[#171717]",
  "White paste-up": "bg-[#f3f1ec] text-[#1a1a1a]",
  "Graphite night": "bg-[#242424] text-[#ff5a3d]",
} as const

const audiences = ["Street photographers", "Culture-forward students", "Independent creators"] as const
const channels = ["Outdoor and social", "Retail takeovers", "Creator launch"] as const
const tones = ["Defiant", "Intimate", "Urgent"] as const
const styles = ["Vermilion block", "White paste-up", "Graphite night"] as const

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function VisualTasteShowcase() {
  const [brief, setBrief] = useState(
    "Launch a compact instant camera that helps a new generation turn unplanned city moments into physical keepsakes.",
  )
  const [audience, setAudience] = useState<string>(audiences[0])
  const [channel, setChannel] = useState<string>(channels[0])
  const [tone, setTone] = useState<string>(tones[0])
  const [visualStyle, setVisualStyle] = useState<keyof typeof posterStyles>("Vermilion block")
  const [concept, setConcept] = useState<ConceptId>("A")
  const [generation, setGeneration] = useState<GenerationState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [saved, setSaved] = useState(false)
  const [exportCount, setExportCount] = useState(0)
  const [activity, setActivity] = useState([
    "09:42  Poster workspace opened",
    "09:45  Own the instant selected",
  ])

  const selected = concepts[concept]
  const briefReady = brief.trim().length >= 20

  function log(message: string) {
    setActivity((items) => [`${getTime()}  ${message}`, ...items].slice(0, 5))
  }

  function updateControl(label: string, value: string, update: (next: string) => void) {
    update(value)
    log(`${label} changed to ${value}`)
  }

  function chooseConcept(next: ConceptId) {
    setConcept(next)
    log(`${concepts[next].name} selected`)
  }

  function generate() {
    if (!briefReady || generation === "loading") return
    const nextAttempt = attempt + 1
    setAttempt(nextAttempt)
    setGeneration("loading")
    log("Poster generation started")
    window.setTimeout(() => {
      const result: GenerationState = nextAttempt % 2 === 0 ? "error" : "success"
      setGeneration(result)
      log(result === "success" ? "Campaign posters generated" : "Poster copy exceeded the current frame")
    }, 760)
  }

  function save() {
    setSaved(true)
    log("Campaign saved")
  }

  function exportCampaign() {
    setExportCount((value) => value + 1)
    log(`Poster package ${exportCount + 1} exported`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#1d1d1d] text-[#f5f2ea]">
      <div className="mx-auto w-full max-w-[1640px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 border border-[#5a5a5a] bg-[#242424] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="bg-[#ef3f27] px-2 py-1 text-[#171717]">GPT 5.6 Sol</span>
              <span className="border border-[#777] px-2 py-1 text-[#f5f2ea]">frontend-skill + taste-skill</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">MUSE / CAMPAIGN STUDIO</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <PosterAction label={saved ? "Saved" : "Save"} onClick={save} icon="save" />
            <PosterAction label={exportCount ? `Export ${exportCount}` : "Export"} onClick={exportCampaign} icon="export" />
            <button
              type="button"
              onClick={generate}
              disabled={!briefReady || generation === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#ef3f27] px-4 text-sm font-bold text-[#171717] transition-[transform,background-color] hover:bg-[#ff6a50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a74] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
            >
              {generation === "loading" ? <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles aria-hidden="true" className="size-4" />}
              {generation === "loading" ? "Generating" : "Generate"}
            </button>
          </div>
        </header>

        <section className="grid min-w-0 border-x border-[#5a5a5a] lg:grid-cols-[260px_minmax(0,1fr)_320px]" aria-label="Campaign poster workspace">
          <aside className="min-w-0 border-b border-[#5a5a5a] bg-[#292929] p-4 lg:border-b-0 lg:border-r" aria-labelledby="visual-taste-controls">
            <h2 id="visual-taste-controls" className="text-sm font-semibold">Edge controls</h2>
            <p className="mt-1 text-xs leading-5 text-[#b9b6af]">Shape the poster without leaving the canvas.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <label htmlFor="visual-taste-brief" className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2 lg:col-span-1">
                Campaign Brief
                <textarea
                  id="visual-taste-brief"
                  value={brief}
                  onChange={(event) => setBrief(event.target.value)}
                  onBlur={() => log("Campaign brief updated")}
                  aria-invalid={!briefReady}
                  aria-describedby="visual-taste-brief-help"
                  className="min-h-40 resize-y border border-[#777] bg-[#1d1d1d] px-3 py-3 text-sm font-normal leading-6 text-white outline-none transition-colors placeholder:text-[#aaa69e] hover:border-[#a6a6a6] focus:border-[#ef3f27] focus:ring-2 focus:ring-[#ef3f27]/35 motion-reduce:transition-none"
                />
              </label>
              <p id="visual-taste-brief-help" className={briefReady ? "-mt-2 text-xs text-[#b9b6af] sm:col-span-2 lg:col-span-1" : "-mt-2 text-xs font-medium text-[#ff8a74] sm:col-span-2 lg:col-span-1"}>
                {briefReady ? "Poster copy updates as you type." : "Add at least 20 characters."}
              </p>
              <RailSelect id="visual-taste-audience" label="Target audience" value={audience} options={audiences} onChange={(value) => updateControl("Audience", value, setAudience)} />
              <RailSelect id="visual-taste-channel" label="Channel" value={channel} options={channels} onChange={(value) => updateControl("Channel", value, setChannel)} />
              <RailSelect id="visual-taste-tone" label="Tone" value={tone} options={tones} onChange={(value) => updateControl("Tone", value, setTone)} />
              <RailSelect id="visual-taste-style" label="Visual style" value={visualStyle} options={styles} onChange={(value) => updateControl("Visual style", value, (next) => setVisualStyle(next as keyof typeof posterStyles))} />
            </div>
          </aside>

          <article className={`relative flex min-h-[720px] min-w-0 flex-col justify-between overflow-hidden p-5 transition-colors duration-300 sm:p-8 lg:p-12 ${posterStyles[visualStyle]}`}>
            <div className="pointer-events-none absolute right-[-12%] top-[12%] size-[420px] rounded-full border-[64px] border-current opacity-10 sm:size-[540px]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">MUSE PRESENTS</p>
                <p className="mt-1 text-xs font-medium opacity-65">{audience} / {channel}</p>
              </div>
              <PosterStatus state={generation} />
            </div>

            <div className="relative max-w-5xl py-10">
              <p className="mb-5 text-sm font-bold">{tone} campaign</p>
              <h2 className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.04em] sm:text-6xl lg:text-[5.8rem]">
                {selected.headline}
              </h2>
              <p className="mt-7 max-w-[60ch] text-pretty text-base font-medium leading-7 opacity-80">{brief}</p>
            </div>

            <div className="relative flex flex-col gap-5 border-t-2 border-current pt-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[52ch] text-sm font-medium leading-6">{selected.deck}</p>
              <button
                type="button"
                onClick={() => log("Poster call to action opened")}
                className="min-h-11 shrink-0 border-2 border-current bg-[#1d1d1d] px-4 text-sm font-bold text-white transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current active:translate-y-px motion-reduce:transition-none"
              >
                SEE THE RELEASE
              </button>
            </div>

            {generation === "loading" && (
              <div className="absolute inset-0 grid place-items-center bg-[#1d1d1d]/92 text-white" role="status" aria-label="Generating campaign posters">
                <div className="text-center">
                  <div className="mx-auto grid size-24 animate-pulse place-items-center border-4 border-[#ef3f27] motion-reduce:animate-none">
                    <Loader2 aria-hidden="true" className="size-7 animate-spin motion-reduce:animate-none" />
                  </div>
                  <p className="mt-5 text-sm font-bold">BUILDING POSTER SET</p>
                </div>
              </div>
            )}
          </article>

          <aside className="min-w-0 border-t border-[#5a5a5a] bg-[#f3f1ec] text-[#1d1d1d] lg:border-l lg:border-t-0" aria-labelledby="visual-taste-concepts">
            <h2 id="visual-taste-concepts" className="border-b border-[#1d1d1d] p-4 text-sm font-bold">Creative headlines</h2>
            <div role="group" aria-label="Creative concepts">
              {(Object.keys(concepts) as ConceptId[]).map((id) => {
                const item = concepts[id]
                const active = concept === id
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseConcept(id)}
                    className={`block min-h-32 w-full border-b border-[#1d1d1d] p-4 text-left transition-colors hover:bg-[#ef3f27] focus-visible:outline-3 focus-visible:outline-offset-[-5px] focus-visible:outline-[#1d1d1d] motion-reduce:transition-none ${active ? "bg-[#1d1d1d] text-white" : "bg-transparent text-[#1d1d1d]"}`}
                  >
                    <span className="text-sm font-black">{id}</span>
                    <span className="mt-5 block text-xl font-black leading-tight tracking-[-0.025em]">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </aside>
        </section>

        <section className="grid border border-[#5a5a5a] bg-[#242424] sm:grid-cols-3" aria-label="Campaign prediction metrics">
          <PosterMetric label="Reach" value={selected.reach} />
          <PosterMetric label="CTR" value={selected.ctr} />
          <PosterMetric label="Conversion" value={selected.conversion} />
        </section>

        <section className="border-x border-b border-[#5a5a5a] bg-[#1d1d1d] p-4" aria-labelledby="visual-taste-activity">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <h2 id="visual-taste-activity" className="shrink-0 text-sm font-bold text-[#ef3f27] sm:w-40">ACTIVITY</h2>
            <ol className="grid min-w-0 flex-1 gap-x-6 gap-y-2 text-xs text-[#b9b6af] sm:grid-cols-2 xl:grid-cols-3">
              {activity.map((item, index) => <li key={`${item}-${index}`} className="min-w-0 break-words leading-5">{item}</li>)}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}

function PosterAction({ label, onClick, icon }: { label: string; onClick: () => void; icon: "save" | "export" }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#777] bg-transparent px-3 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-[#1d1d1d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a74] active:translate-y-px motion-reduce:transition-none">
      {icon === "save" ? <Save aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}{label}
    </button>
  )
}

function RailSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm font-semibold text-[#dedbd4]">
      {label}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full border border-[#777] bg-[#1d1d1d] px-3 text-sm font-normal text-white outline-none transition-colors hover:border-[#aaa] focus:border-[#ef3f27] focus:ring-2 focus:ring-[#ef3f27]/35 motion-reduce:transition-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function PosterStatus({ state }: { state: GenerationState }) {
  const current = {
    idle: { label: "READY", icon: <Sparkles aria-hidden="true" className="size-4" /> },
    loading: { label: "GENERATING", icon: <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> },
    success: { label: "POSTERS READY", icon: <CheckCircle2 aria-hidden="true" className="size-4" /> },
    error: { label: "FRAME ERROR", icon: <AlertTriangle aria-hidden="true" className="size-4" /> },
  } as const
  return <div role={state === "error" ? "alert" : "status"} aria-live="polite" className="inline-flex min-h-11 items-center gap-2 border border-current px-3 text-xs font-bold">{current[state].icon}{current[state].label}</div>
}

function PosterMetric({ label, value }: { label: string; value: string }) {
  return <dl className="min-w-0 border-b border-[#5a5a5a] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><dt className="text-xs font-bold text-[#b9b6af]">{label}</dt><dd className="mt-2 truncate text-4xl font-black tracking-[-0.04em] text-[#f5f2ea] sm:text-5xl">{value}</dd></dl>
}
