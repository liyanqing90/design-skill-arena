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
    name: "Measured reveal",
    headline: "A calmer way to carry the day.",
    subline: "Lead with considered utility and let the material details build confidence.",
    reach: "1.6M",
    ctr: "4.9%",
    conversion: "3.7%",
  },
  B: {
    name: "Proof in practice",
    headline: "Designed around the way you move.",
    subline: "Show the product in real routines, then close with one concrete performance proof.",
    reach: "1.9M",
    ctr: "5.3%",
    conversion: "4.2%",
  },
  C: {
    name: "Invitation loop",
    headline: "Take one good habit with you.",
    subline: "Turn the launch into an invitation people can adapt, save, and share with others.",
    reach: "2.2M",
    ctr: "4.5%",
    conversion: "3.3%",
  },
} as const

const sceneStyles = {
  "Soft daylight": "from-[#dfe9ee] via-[#f7f9f8] to-[#cddce2] text-[#16313a]",
  "Studio neutral": "from-[#e5e6e8] via-white to-[#d9dde1] text-[#17202a]",
  "Night contrast": "from-[#14253a] via-[#22364c] to-[#0e1826] text-white",
} as const

const audiences = ["Mindful commuters", "Design-conscious adults", "Wellness communities"] as const
const channels = ["Launch site", "Retail and social", "Email sequence"] as const
const tones = ["Reassuring", "Clear", "Optimistic"] as const
const styles = ["Soft daylight", "Studio neutral", "Night contrast"] as const

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function StandardImpeccableShowcase() {
  const [brief, setBrief] = useState(
    "Launch a durable temperature-smart bottle for people who want a healthier routine without another complicated device.",
  )
  const [audience, setAudience] = useState<string>(audiences[0])
  const [channel, setChannel] = useState<string>(channels[0])
  const [tone, setTone] = useState<string>(tones[0])
  const [visualStyle, setVisualStyle] = useState<keyof typeof sceneStyles>("Soft daylight")
  const [concept, setConcept] = useState<ConceptId>("A")
  const [generation, setGeneration] = useState<GenerationState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [savedRevision, setSavedRevision] = useState(0)
  const [exportCount, setExportCount] = useState(0)
  const [activity, setActivity] = useState([
    "Workspace opened",
    "Measured reveal selected",
  ])

  const selected = concepts[concept]
  const briefReady = brief.trim().length >= 20

  function record(message: string) {
    setActivity((items) => [`${currentTime()}  ${message}`, ...items].slice(0, 5))
  }

  function updateSetting(label: string, value: string, update: (next: string) => void) {
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
    record("Generation started")
    window.setTimeout(() => {
      const result: GenerationState = nextAttempt % 2 === 0 ? "error" : "success"
      setGeneration(result)
      record(result === "success" ? "Campaign draft generated" : "Generation stopped during brief validation")
    }, 780)
  }

  function save() {
    setSavedRevision((value) => value + 1)
    record(`Revision ${savedRevision + 1} saved`)
  }

  function exportCampaign() {
    setExportCount((value) => value + 1)
    record(`Export ${exportCount + 1} prepared`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#eef2f4] text-[#17202a]">
      <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#53636e]">
              <span className="rounded-md bg-white px-2 py-1 ring-1 ring-[#cad4da]">GPT 5.6 Sol</span>
              <span className="rounded-md bg-white px-2 py-1 ring-1 ring-[#cad4da]">frontend-app-builder + impeccable</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Muse Campaign Studio</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <QuietButton label={savedRevision ? `Saved ${savedRevision}` : "Save"} onClick={save} icon="save" />
            <QuietButton label={exportCount ? `Export ${exportCount}` : "Export"} onClick={exportCampaign} icon="export" />
            <button
              type="button"
              onClick={generate}
              disabled={!briefReady || generation === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#173f50] px-4 text-sm font-semibold text-white transition-[transform,background-color] hover:bg-[#22586d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f50] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
            >
              {generation === "loading" ? <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles aria-hidden="true" className="size-4" />}
              {generation === "loading" ? "Generating" : "Generate"}
            </button>
          </div>
        </header>

        <section className="rounded-xl bg-white p-4 ring-1 ring-[#d2dce1]" aria-labelledby="impeccable-brief-label">
          <div className="grid gap-3 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 id="impeccable-brief-label" className="text-sm font-semibold">Campaign Brief</h2>
              <p className="mt-1 text-xs text-[#5d6c76]">Keep the product truth specific.</p>
            </div>
            <textarea
              aria-labelledby="impeccable-brief-label"
              aria-describedby="impeccable-brief-help"
              aria-invalid={!briefReady}
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              onBlur={() => record("Campaign brief updated")}
              className="min-h-20 w-full resize-y rounded-lg border border-[#aebcc4] bg-[#fbfcfc] px-3 py-3 text-sm leading-6 text-[#17202a] outline-none transition-shadow placeholder:text-[#52616b] hover:border-[#758a95] focus:border-[#173f50] focus:ring-3 focus:ring-[#173f50]/20 motion-reduce:transition-none lg:min-h-16"
            />
            <p id="impeccable-brief-help" className={briefReady ? "text-xs text-[#5d6c76]" : "max-w-48 text-xs font-medium text-[#a12a2a]"}>
              {briefReady ? `${brief.length} characters` : "Add at least 20 characters before generating."}
            </p>
          </div>
        </section>

        <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]" aria-label="Campaign preview and inspector">
          <div className="min-w-0 rounded-xl bg-white p-3 ring-1 ring-[#d2dce1] sm:p-4">
            <div className={`relative flex min-h-[560px] min-w-0 flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-6 transition-colors duration-300 sm:p-10 ${sceneStyles[visualStyle]}`}>
              <div className="pointer-events-none absolute right-[8%] top-[16%] size-56 rounded-full border-[32px] border-current opacity-[0.07] sm:size-72" />
              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">{selected.name}</p>
                  <p className="mt-1 text-xs opacity-65">{audience} / {channel}</p>
                </div>
                <GenerationStatus state={generation} />
              </div>

              <article className="relative max-w-4xl py-8">
                <p className="mb-4 text-sm font-medium opacity-70">{tone} direction</p>
                <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  {selected.headline}
                </h2>
                <p className="mt-5 max-w-[62ch] text-pretty text-sm leading-6 opacity-75 sm:text-base">{brief}</p>
              </article>

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[54ch] text-sm leading-6 opacity-70">{selected.subline}</p>
                <button
                  type="button"
                  onClick={() => record("Preview call to action opened")}
                  className="min-h-11 shrink-0 rounded-lg border border-current bg-white/70 px-4 text-sm font-semibold text-[#173f50] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current active:translate-y-px motion-reduce:transition-none"
                >
                  View the collection
                </button>
              </div>

              {generation === "loading" && (
                <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-white/90 p-8 text-[#173f50]" role="status" aria-label="Generating campaign">
                  <div className="h-4 w-32 animate-pulse rounded bg-[#d8e3e8] motion-reduce:animate-none" />
                  <div className="h-12 w-4/5 animate-pulse rounded bg-[#c7d8df] motion-reduce:animate-none" />
                  <div className="h-4 w-3/5 animate-pulse rounded bg-[#d8e3e8] motion-reduce:animate-none" />
                  <span className="text-sm font-medium">Building a precise campaign draft</span>
                </div>
              )}
            </div>

            <dl className="grid grid-cols-3 gap-3 px-2 pb-1 pt-5 sm:px-4">
              <Metric label="Reach" value={selected.reach} />
              <Metric label="CTR" value={selected.ctr} />
              <Metric label="Conversion" value={selected.conversion} />
            </dl>
          </div>

          <aside className="min-w-0 rounded-xl bg-white p-5 ring-1 ring-[#d2dce1]" aria-labelledby="impeccable-inspector-title">
            <h2 id="impeccable-inspector-title" className="text-base font-semibold">Campaign inspector</h2>
            <p className="mt-1 text-xs leading-5 text-[#5d6c76]">Changes are reflected in the preview immediately.</p>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">Creative concepts</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(Object.keys(concepts) as ConceptId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={concept === id}
                    onClick={() => chooseConcept(id)}
                    className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition-colors hover:border-[#173f50] hover:bg-[#edf4f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f50] motion-reduce:transition-none ${concept === id ? "border-[#173f50] bg-[#173f50] text-white" : "border-[#b7c3c9] bg-white text-[#263943]"}`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 flex flex-col gap-4">
              <InspectorSelect id="impeccable-audience" label="Target audience" value={audience} options={audiences} onChange={(value) => updateSetting("Audience", value, setAudience)} />
              <InspectorSelect id="impeccable-channel" label="Channel" value={channel} options={channels} onChange={(value) => updateSetting("Channel", value, setChannel)} />
              <InspectorSelect id="impeccable-tone" label="Tone" value={tone} options={tones} onChange={(value) => updateSetting("Tone", value, setTone)} />
              <InspectorSelect id="impeccable-style" label="Visual style" value={visualStyle} options={styles} onChange={(value) => updateSetting("Visual style", value, (next) => setVisualStyle(next as keyof typeof sceneStyles))} />
            </div>

            {generation === "error" && (
              <div className="mt-5 rounded-lg border border-[#c65454] bg-[#fff3f3] p-4 text-[#7f2020]">
                <div className="flex items-start gap-3">
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Generation could not finish</p>
                    <p className="mt-1 text-xs leading-5">Review the brief for one clear product promise, then choose Generate again. Your current draft is preserved.</p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className="rounded-xl bg-[#17202a] px-4 py-4 text-white" aria-labelledby="impeccable-activity-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <h2 id="impeccable-activity-title" className="shrink-0 text-sm font-semibold sm:w-36">Activity</h2>
            <ol className="grid min-w-0 flex-1 gap-x-6 gap-y-2 text-xs text-white/65 sm:grid-cols-2 xl:grid-cols-3">
              {activity.map((item, index) => <li key={`${item}-${index}`} className="min-w-0 break-words leading-5">{item}</li>)}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}

function QuietButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: "save" | "export" }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#aebcc4] bg-white px-3 text-sm font-semibold transition-colors hover:border-[#758a95] hover:bg-[#f7f9fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f50] active:translate-y-px motion-reduce:transition-none">
      {icon === "save" ? <Save aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}
      {label}
    </button>
  )
}

function InspectorSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm font-medium">
      {label}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-lg border border-[#aebcc4] bg-white px-3 text-sm text-[#17202a] outline-none transition-shadow hover:border-[#758a95] focus:border-[#173f50] focus:ring-3 focus:ring-[#173f50]/20 motion-reduce:transition-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function GenerationStatus({ state }: { state: GenerationState }) {
  const map = {
    idle: { label: "Ready", icon: <Sparkles aria-hidden="true" className="size-4" /> },
    loading: { label: "Generating", icon: <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" /> },
    success: { label: "Draft ready", icon: <CheckCircle2 aria-hidden="true" className="size-4" /> },
    error: { label: "Needs review", icon: <AlertCircle aria-hidden="true" className="size-4" /> },
  } as const
  return <div role={state === "error" ? "alert" : "status"} aria-live="polite" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-current/25 bg-white/65 px-3 text-xs font-semibold text-[#173f50]">{map[state].icon}{map[state].label}</div>
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><dt className="text-xs text-[#61717a]">{label}</dt><dd className="mt-1 truncate text-2xl font-semibold tracking-tight text-[#17202a] sm:text-3xl">{value}</dd></div>
}
