"use client"

import { useState } from "react"
import {
  AlertCircle,
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
    name: "After dark",
    headline: "Let the room follow your rhythm.",
    copy: "A cinematic reveal that treats light, sound, and movement as one connected product experience.",
    reach: "2.0M",
    ctr: "5.0%",
    conversion: "3.8%",
  },
  B: {
    name: "Closer signal",
    headline: "Bring every detail into focus.",
    copy: "A product-led campaign built around tactile controls, precise sound, and quiet confidence.",
    reach: "1.7M",
    ctr: "5.7%",
    conversion: "4.4%",
  },
  C: {
    name: "Open current",
    headline: "Turn one moment into the whole night.",
    copy: "A social-first launch that moves from intimate listening to collective celebration.",
    reach: "2.5M",
    ctr: "4.6%",
    conversion: "3.3%",
  },
} as const

const stageThemes = {
  "Indigo spotlight": {
    stage: "bg-[radial-gradient(circle_at_70%_28%,#3955b8_0%,#16275b_30%,#081329_72%)]",
    accent: "bg-[#8ca5ff]",
    text: "text-[#dce4ff]",
  },
  "Cyan halo": {
    stage: "bg-[radial-gradient(circle_at_70%_28%,#147c91_0%,#123957_32%,#081329_72%)]",
    accent: "bg-[#77e6f4]",
    text: "text-[#c7f8ff]",
  },
  "Amber beam": {
    stage: "bg-[radial-gradient(circle_at_70%_28%,#9a5528_0%,#3f3149_34%,#081329_72%)]",
    accent: "bg-[#ffc48a]",
    text: "text-[#ffe5ca]",
  },
} as const

const audiences = ["Nightlife hosts", "Design-led listeners", "Creative households"] as const
const channels = ["Launch film", "Social stories", "Retail experience"] as const
const tones = ["Cinematic", "Intimate", "Assured"] as const
const styles = ["Indigo spotlight", "Cyan halo", "Amber beam"] as const

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function VisualImpeccableShowcase() {
  const [brief, setBrief] = useState(
    "Launch a sculptural wireless speaker that adapts its sound and light to the energy of each room.",
  )
  const [audience, setAudience] = useState<string>(audiences[0])
  const [channel, setChannel] = useState<string>(channels[0])
  const [tone, setTone] = useState<string>(tones[0])
  const [visualStyle, setVisualStyle] = useState<keyof typeof stageThemes>("Indigo spotlight")
  const [concept, setConcept] = useState<ConceptId>("A")
  const [generation, setGeneration] = useState<GenerationState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [savedRevision, setSavedRevision] = useState(0)
  const [exportCount, setExportCount] = useState(0)
  const [activity, setActivity] = useState([
    "09:42  Spotlight workspace opened",
    "09:44  After dark selected",
  ])

  const selected = concepts[concept]
  const theme = stageThemes[visualStyle]
  const briefReady = brief.trim().length >= 20

  function record(message: string) {
    setActivity((items) => [`${now()}  ${message}`, ...items].slice(0, 6))
  }

  function updateControl(label: string, value: string, update: (next: string) => void) {
    update(value)
    record(`${label} changed to ${value}`)
  }

  function chooseConcept(next: ConceptId) {
    setConcept(next)
    record(`${concepts[next].name} selected`)
  }

  function generate() {
    if (!briefReady || generation === "loading") return
    const nextAttempt = attempt + 1
    setAttempt(nextAttempt)
    setGeneration("loading")
    record("Campaign generation started")
    window.setTimeout(() => {
      const result: GenerationState = nextAttempt % 2 === 0 ? "error" : "success"
      setGeneration(result)
      record(result === "success" ? "Campaign spotlight rendered" : "Lighting pass could not be resolved")
    }, 840)
  }

  function save() {
    setSavedRevision((value) => value + 1)
    record(`Revision ${savedRevision + 1} saved`)
  }

  function exportCampaign() {
    setExportCount((value) => value + 1)
    record(`Campaign package ${exportCount + 1} exported`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#071125] text-[#f4f7ff]">
      <style>{`
        @keyframes vi-spotlight {
          0%, 100% { transform: scale(.96); opacity: .42; }
          50% { transform: scale(1.05); opacity: .72; }
        }
        .vi-spotlight { animation: vi-spotlight 5s cubic-bezier(.16,1,.3,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .vi-spotlight { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 border-b border-[#30426a] pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-md bg-[#dce4ff] px-2 py-1 text-[#0b1733]">GPT 5.6 Sol</span>
              <span className="rounded-md border border-[#526994] px-2 py-1 text-[#c8d5f2]">frontend-skill + impeccable</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Muse Campaign Studio</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <MidnightAction label={savedRevision ? `Saved ${savedRevision}` : "Save"} onClick={save} icon="save" />
            <MidnightAction label={exportCount ? `Export ${exportCount}` : "Export"} onClick={exportCampaign} icon="export" />
            <button
              type="button"
              onClick={generate}
              disabled={!briefReady || generation === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#dce4ff] px-4 text-sm font-semibold text-[#0b1733] transition-[transform,background-color] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fb4ff] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
            >
              {generation === "loading" ? <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles aria-hidden="true" className="size-4" />}
              {generation === "loading" ? "Generating" : "Generate"}
            </button>
          </div>
        </header>

        <section className="rounded-xl border border-[#30426a] bg-[#0b1833] p-4" aria-labelledby="visual-impeccable-controls">
          <h2 id="visual-impeccable-controls" className="sr-only">Campaign controls</h2>
          <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(300px,1.6fr)_repeat(4,minmax(145px,0.6fr))] xl:items-end">
            <label htmlFor="visual-impeccable-brief" className="flex min-w-0 flex-col gap-2 text-xs font-semibold md:col-span-2 xl:col-span-1">
              Campaign Brief
              <textarea
                id="visual-impeccable-brief"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                onBlur={() => record("Campaign brief updated")}
                aria-invalid={!briefReady}
                aria-describedby="visual-impeccable-brief-help"
                className="min-h-20 w-full resize-y rounded-lg border border-[#526994] bg-[#071125] px-3 py-2 text-sm font-normal leading-6 text-white outline-none transition-shadow placeholder:text-[#9baacc] hover:border-[#7891c2] focus:border-[#9fb4ff] focus:ring-3 focus:ring-[#9fb4ff]/25 motion-reduce:transition-none"
              />
              <span id="visual-impeccable-brief-help" className={briefReady ? "text-[11px] font-normal text-[#9baacc]" : "text-[11px] font-medium text-[#ffaaa8]"}>
                {briefReady ? "Preview copy updates immediately." : "Add at least 20 characters."}
              </span>
            </label>
            <TopSelect id="visual-impeccable-audience" label="Target audience" value={audience} options={audiences} onChange={(value) => updateControl("Audience", value, setAudience)} />
            <TopSelect id="visual-impeccable-channel" label="Channel" value={channel} options={channels} onChange={(value) => updateControl("Channel", value, setChannel)} />
            <TopSelect id="visual-impeccable-tone" label="Tone" value={tone} options={tones} onChange={(value) => updateControl("Tone", value, setTone)} />
            <TopSelect id="visual-impeccable-style" label="Visual style" value={visualStyle} options={styles} onChange={(value) => updateControl("Visual style", value, (next) => setVisualStyle(next as keyof typeof stageThemes))} />
          </div>
        </section>

        <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]" aria-label="Campaign preview and performance status">
          <div className="min-w-0 rounded-xl border border-[#30426a] bg-[#0b1833] p-3 sm:p-4">
            <article className={`relative flex min-h-[610px] min-w-0 flex-col justify-between overflow-hidden rounded-lg p-6 sm:p-10 ${theme.stage}`}>
              <div className={`vi-spotlight pointer-events-none absolute right-[8%] top-[12%] size-[320px] rounded-full opacity-50 blur-3xl sm:size-[430px] ${theme.accent}`} />
              <div className="pointer-events-none absolute right-[18%] top-[19%] size-44 rounded-full border-[22px] border-white/10 sm:size-64" />
              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className={`text-sm font-semibold ${theme.text}`}>{selected.name}</p>
                  <p className="mt-1 text-xs text-white/60">{audience} / {channel}</p>
                </div>
                <StageStatus state={generation} announce={false} />
              </div>

              <div className="relative max-w-4xl py-10">
                <p className={`mb-5 text-sm font-medium ${theme.text}`}>{tone} direction</p>
                <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.5rem]">
                  {selected.headline}
                </h2>
                <p className="mt-6 max-w-[62ch] text-pretty text-sm leading-6 text-white/75 sm:text-base">{brief}</p>
              </div>

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[54ch] text-sm leading-6 text-white/65">{selected.copy}</p>
                <button type="button" onClick={() => record("Preview call to action opened")} className="min-h-11 shrink-0 rounded-lg border border-white/40 bg-white/10 px-4 text-sm font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:translate-y-px motion-reduce:transition-none">
                  Enter the experience
                </button>
              </div>

              {generation === "loading" && (
                <div className="absolute inset-0 grid place-items-center bg-[#071125]/90" role="status" aria-label="Generating campaign spotlight">
                  <div className="relative grid size-44 place-items-center">
                    <div className={`vi-spotlight absolute inset-0 rounded-full opacity-40 blur-xl ${theme.accent}`} />
                    <Loader2 aria-hidden="true" className="relative size-8 animate-spin text-white motion-reduce:animate-none" />
                    <span className="absolute -bottom-3 text-sm font-semibold text-white">Rendering spotlight</span>
                  </div>
                </div>
              )}
            </article>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3" role="group" aria-label="Creative concepts">
              {(Object.keys(concepts) as ConceptId[]).map((id) => {
                const item = concepts[id]
                const active = concept === id
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseConcept(id)}
                    className={`min-h-24 rounded-lg border p-3 text-left transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-[#9fb4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fb4ff] active:translate-y-px motion-reduce:transition-none ${active ? "border-[#9fb4ff] bg-[#182b55]" : "border-[#30426a] bg-[#0d1c3a]"}`}
                  >
                    <span className="text-xs font-semibold text-[#9fb4ff]">Concept {id}</span>
                    <span className="mt-2 block text-sm font-semibold text-white">{item.name}</span>
                    <span className="mt-2 block text-xs text-[#9baacc]">{active ? "Selected direction" : "Open direction"}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="flex min-w-0 flex-col gap-4">
            <section className="rounded-xl border border-[#30426a] bg-[#0b1833] p-5" aria-labelledby="visual-impeccable-status">
              <h2 id="visual-impeccable-status" className="text-sm font-semibold">Campaign status</h2>
              <div className="mt-4"><StageStatus state={generation} detailed /></div>
              {generation === "error" && (
                <p className="mt-3 rounded-lg bg-[#401f32] p-3 text-xs leading-5 text-[#ffc6cf]">
                  The lighting pass did not resolve. Choose a different visual style or generate again. Your current campaign remains available.
                </p>
              )}
            </section>

            <section className="rounded-xl border border-[#30426a] bg-[#0b1833] p-5" aria-labelledby="visual-impeccable-metrics">
              <h2 id="visual-impeccable-metrics" className="text-sm font-semibold">Prediction metrics</h2>
              <dl className="mt-4 flex flex-col gap-4">
                <SideMetric label="Reach" value={selected.reach} />
                <SideMetric label="CTR" value={selected.ctr} />
                <SideMetric label="Conversion" value={selected.conversion} />
              </dl>
            </section>

            <section className="min-h-0 flex-1 rounded-xl border border-[#30426a] bg-[#0b1833] p-5" aria-labelledby="visual-impeccable-activity">
              <h2 id="visual-impeccable-activity" className="text-sm font-semibold">Activity</h2>
              <ol className="mt-4 flex flex-col gap-3 text-xs leading-5 text-[#9baacc]">
                {activity.map((item, index) => <li key={`${item}-${index}`} className="border-b border-[#263a65] pb-3 last:border-b-0 last:pb-0">{item}</li>)}
              </ol>
            </section>
          </aside>
        </section>
      </div>
    </main>
  )
}

function MidnightAction({ label, onClick, icon }: { label: string; onClick: () => void; icon: "save" | "export" }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#526994] bg-[#0b1833] px-3 text-sm font-semibold text-[#dce4ff] transition-colors hover:border-[#9fb4ff] hover:bg-[#14264d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fb4ff] active:translate-y-px motion-reduce:transition-none">
      {icon === "save" ? <Save aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}{label}
    </button>
  )
}

function TopSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="flex min-w-0 flex-col gap-2 text-xs font-semibold text-[#c8d5f2]">
      {label}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-lg border border-[#526994] bg-[#071125] px-3 text-sm font-normal text-white outline-none transition-shadow hover:border-[#7891c2] focus:border-[#9fb4ff] focus:ring-3 focus:ring-[#9fb4ff]/25 motion-reduce:transition-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function StageStatus({
  state,
  detailed = false,
  announce = true,
}: {
  state: GenerationState
  detailed?: boolean
  announce?: boolean
}) {
  const states = {
    idle: { label: "Ready to generate", icon: <Sparkles aria-hidden="true" className="size-4" />, style: "border-[#526994] bg-[#0b1833] text-[#c8d5f2]" },
    loading: { label: "Rendering campaign", icon: <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />, style: "border-[#9fb4ff] bg-[#1a2d59] text-white" },
    success: { label: "Campaign ready", icon: <CheckCircle2 aria-hidden="true" className="size-4" />, style: "border-[#65c7b0] bg-[#123e45] text-[#c3fff1]" },
    error: { label: "Lighting pass failed", icon: <AlertCircle aria-hidden="true" className="size-4" />, style: "border-[#dc7080] bg-[#401f32] text-[#ffc6cf]" },
  } as const
  const current = states[state]
  return <div role={announce ? (state === "error" ? "alert" : "status") : undefined} aria-live={announce ? "polite" : undefined} className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg border px-3 text-xs font-semibold ${detailed ? "w-full" : ""} ${current.style}`}>{current.icon}<span className="break-words">{current.label}</span></div>
}

function SideMetric({ label, value }: { label: string; value: string }) {
  return <div className="flex min-w-0 items-end justify-between gap-3 border-b border-[#263a65] pb-3 last:border-b-0 last:pb-0"><dt className="text-xs text-[#9baacc]">{label}</dt><dd className="truncate text-3xl font-semibold tracking-[-0.035em] text-white">{value}</dd></div>
}
