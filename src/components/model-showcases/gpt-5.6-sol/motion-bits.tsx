"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  Orbit,
  Save,
  Sparkles,
} from "lucide-react"

type ConceptId = "A" | "B" | "C"
type RunState = "idle" | "loading" | "success" | "error"

const concepts = {
  A: {
    name: "Arc Shift",
    headline: "Move at the speed of now",
    copy: "A fast-cut launch system that follows the product from first spark to daily ritual.",
    reach: "2.3M",
    ctr: "4.9%",
    conversion: "3.4%",
  },
  B: {
    name: "Signal Bloom",
    headline: "One touch starts the story",
    copy: "A luminous social sequence where product moments expand into community reactions.",
    reach: "1.9M",
    ctr: "5.8%",
    conversion: "4.1%",
  },
  C: {
    name: "Night Relay",
    headline: "Keep the idea in motion",
    copy: "A nocturnal campaign built for repeat encounters across screens, sound, and street media.",
    reach: "2.6M",
    ctr: "4.3%",
    conversion: "3.1%",
  },
} as const

const visualThemes = {
  "Prism trails": {
    stage: "from-[#21135f] via-[#5d164f] to-[#080913]",
    flare: "bg-fuchsia-400",
    ink: "text-fuchsia-100",
  },
  "Solar flare": {
    stage: "from-[#6f250f] via-[#42114f] to-[#080913]",
    flare: "bg-orange-300",
    ink: "text-orange-100",
  },
  "Signal green": {
    stage: "from-[#083b38] via-[#17344f] to-[#080913]",
    flare: "bg-lime-300",
    ink: "text-lime-100",
  },
} as const

const toneLines = {
  Electric: "Make the first second count.",
  Precise: "Every frame finds its mark.",
  Playful: "Catch the unexpected.",
} as const

const audiences = ["Culture seekers", "Mobile creators", "Design-led teams"] as const
const channels = ["Social video", "Digital out-of-home", "Launch stream"] as const
const tones = ["Electric", "Precise", "Playful"] as const
const visuals = ["Prism trails", "Solar flare", "Signal green"] as const

function clock() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function MotionBitsShowcase() {
  const [brief, setBrief] = useState(
    "Introduce a pocket-sized projector that turns any surface into a shared cinema for young city creatives.",
  )
  const [audience, setAudience] = useState<string>(audiences[0])
  const [channel, setChannel] = useState<string>(channels[0])
  const [tone, setTone] = useState<keyof typeof toneLines>("Electric")
  const [visual, setVisual] = useState<keyof typeof visualThemes>("Prism trails")
  const [concept, setConcept] = useState<ConceptId>("A")
  const [runState, setRunState] = useState<RunState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [saved, setSaved] = useState(0)
  const [exports, setExports] = useState(0)
  const [activity, setActivity] = useState([
    "09:42  Kinetic workspace opened",
    "09:45  Arc Shift entered the active track",
  ])

  const selected = concepts[concept]
  const theme = visualThemes[visual]
  const briefReady = brief.trim().length >= 20

  function note(message: string) {
    setActivity((items) => [`${clock()}  ${message}`, ...items].slice(0, 5))
  }

  function setControl(label: string, value: string, update: (next: string) => void) {
    update(value)
    note(`${label} set to ${value}`)
  }

  function selectConcept(next: ConceptId) {
    setConcept(next)
    note(`${concepts[next].name} moved to the active track`)
  }

  function generate() {
    if (!briefReady || runState === "loading") return

    const nextAttempt = attempt + 1
    setAttempt(nextAttempt)
    setRunState("loading")
    note("Motion render started")

    window.setTimeout(() => {
      const result: RunState = nextAttempt % 2 === 0 ? "error" : "success"
      setRunState(result)
      note(result === "success" ? `${selected.name} motion pass completed` : "Motion render lost a keyframe")
    }, 820)
  }

  function save() {
    setSaved((value) => value + 1)
    note(`Motion draft ${saved + 1} saved`)
  }

  function exportFile() {
    setExports((value) => value + 1)
    note(`MP4 package ${exports + 1} queued`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#080913] text-[#f8f7ff]">
      <style>{`
        @keyframes mbits-orbit {
          to { transform: rotate(360deg); }
        }
        @keyframes mbits-runner {
          0% { transform: translateX(-12%); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateX(1050%); opacity: 0; }
        }
        @keyframes mbits-scan {
          0%, 100% { transform: translateY(-16%); opacity: 0; }
          16%, 78% { opacity: .75; }
          92% { transform: translateY(620%); opacity: 0; }
        }
        @keyframes mbits-breathe {
          0%, 100% { transform: scale(.92); opacity: .34; }
          50% { transform: scale(1.08); opacity: .7; }
        }
        .mbits-orbit { animation: mbits-orbit 18s linear infinite; }
        .mbits-orbit-reverse { animation: mbits-orbit 12s linear infinite reverse; }
        .mbits-runner { animation: mbits-runner 2.8s cubic-bezier(.16,1,.3,1) infinite; }
        .mbits-scan { animation: mbits-scan 2.2s cubic-bezier(.16,1,.3,1) infinite; }
        .mbits-breathe { animation: mbits-breathe 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mbits-orbit, .mbits-orbit-reverse, .mbits-runner, .mbits-scan, .mbits-breathe {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1560px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 border-b border-white/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <Orbit aria-hidden="true" className="size-5 text-lime-300" />
              Muse
            </div>
            <span className="border border-white/20 px-2 py-1 text-xs font-medium text-white/80">GPT 5.6 Sol</span>
            <span className="border border-lime-300/40 bg-lime-300/10 px-2 py-1 text-xs font-medium text-lime-100">react-bits</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <KineticButton label={saved > 0 ? `Saved ${saved}` : "Save"} onClick={save} icon="save" />
            <KineticButton label={exports > 0 ? `Exported ${exports}` : "Export"} onClick={exportFile} icon="export" />
            <button
              type="button"
              onClick={generate}
              disabled={!briefReady || runState === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-lime-300 bg-lime-300 px-4 text-sm font-semibold text-[#111509] transition-[transform,background-color] duration-200 hover:bg-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
            >
              {runState === "loading" ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles aria-hidden="true" className="size-4" />
              )}
              {runState === "loading" ? "Generating" : "Generate"}
            </button>
          </div>
        </header>

        <section className="grid min-w-0 gap-5 py-5 lg:grid-cols-[290px_minmax(0,1fr)]" aria-label="Kinetic campaign workspace">
          <aside className="min-w-0 border border-white/15 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Campaign controls</h2>
              <Activity aria-hidden="true" className="size-4 text-lime-300" />
            </div>
            <div className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm" htmlFor="motion-brief">
                <span className="font-medium text-white">Campaign Brief</span>
                <textarea
                  id="motion-brief"
                  value={brief}
                  onChange={(event) => setBrief(event.target.value)}
                  onBlur={() => note("Campaign brief updated")}
                  aria-invalid={!briefReady}
                  aria-describedby="motion-brief-help"
                  className="min-h-32 resize-y border border-white/20 bg-[#0f1020] px-3 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/55 hover:border-white/35 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/25 motion-reduce:transition-none"
                />
              </label>
              <p id="motion-brief-help" className={briefReady ? "text-xs text-white/55" : "text-xs text-rose-300"}>
                {briefReady ? "Edits flow directly into the active stage." : "Enter at least 20 characters to generate."}
              </p>
              <DarkSelect
                id="motion-audience"
                label="Target audience"
                value={audience}
                options={audiences}
                onChange={(value) => setControl("Audience", value, setAudience)}
              />
              <DarkSelect
                id="motion-channel"
                label="Channel"
                value={channel}
                options={channels}
                onChange={(value) => setControl("Channel", value, setChannel)}
              />
              <DarkSelect
                id="motion-tone"
                label="Tone"
                value={tone}
                options={tones}
                onChange={(value) => setControl("Tone", value, (next) => setTone(next as keyof typeof toneLines))}
              />
              <DarkSelect
                id="motion-visual"
                label="Visual style"
                value={visual}
                options={visuals}
                onChange={(value) => setControl("Visual style", value, (next) => setVisual(next as keyof typeof visualThemes))}
              />
            </div>
          </aside>

          <div className="min-w-0">
            <div className={`relative min-h-[650px] min-w-0 overflow-hidden border border-white/15 bg-gradient-to-br p-4 sm:p-6 lg:p-8 ${theme.stage}`}>
              <div className={`pointer-events-none absolute -right-28 -top-24 size-[420px] rounded-full opacity-25 blur-3xl ${theme.flare}`} />
              <div className="mbits-orbit pointer-events-none absolute -right-32 top-12 size-[520px] rounded-full border border-white/15">
                <span className={`absolute left-8 top-24 size-3 rounded-full ${theme.flare}`} />
              </div>
              <div className="mbits-orbit-reverse pointer-events-none absolute -right-12 top-32 size-[320px] rounded-full border border-dashed border-white/20">
                <span className="absolute bottom-10 right-5 size-2 rounded-full bg-white" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-white/15">
                <span className={`mbits-runner block size-2 -translate-y-1/2 rounded-full ${theme.flare}`} />
              </div>

              <div className="relative flex min-h-[570px] flex-col justify-between gap-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/65">{channel} / {audience}</p>
                    <p className={`mt-1 text-sm ${theme.ink}`}>{visual}</p>
                  </div>
                  <RunStatus state={runState} />
                </div>

                <div className="relative max-w-4xl py-8">
                  <p className="mb-5 max-w-[34ch] text-lg text-white/75">{toneLines[tone]}</p>
                  <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-[5.5rem]">
                    {selected.headline}
                  </h1>
                  <p className="mt-6 max-w-[62ch] text-pretty text-sm leading-6 text-white/70 sm:text-base">
                    {brief}
                  </p>
                </div>

                {runState === "loading" && (
                  <div className="absolute inset-0 grid place-items-center bg-[#080913]/72" role="status" aria-label="Generating campaign motion">
                    <div className="relative grid size-44 place-items-center">
                      <div className="mbits-breathe absolute inset-0 rounded-full border border-lime-300/45 bg-lime-300/10" />
                      <div className="mbits-orbit absolute inset-6 rounded-full border border-dashed border-white/35" />
                      <div className="text-center">
                        <Sparkles aria-hidden="true" className="mx-auto size-5 text-lime-300" />
                        <p className="mt-3 text-sm font-medium">Building motion</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
                  <div className="min-w-0">
                    <p className="mb-3 text-xs font-medium text-white/55">Creative track</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3" role="group" aria-label="Creative concepts">
                      {(Object.keys(concepts) as ConceptId[]).map((id, index) => {
                        const item = concepts[id]
                        const active = id === concept
                        return (
                          <button
                            key={id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => selectConcept(id)}
                            className={`relative min-h-20 border px-4 py-3 text-left transition-[transform,background-color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200 active:scale-[0.98] motion-reduce:transition-none ${
                              active
                                ? "-translate-y-1 border-lime-300 bg-lime-300 text-[#111509]"
                                : "border-white/20 bg-[#0b0c18]/65 text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
                            } ${index === 0 ? "sm:-rotate-1" : index === 2 ? "sm:rotate-1" : ""}`}
                          >
                            <span className="block text-xs font-semibold">{id}</span>
                            <span className="mt-2 block text-sm font-medium">{item.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <dl className="grid grid-cols-3 border border-white/15 bg-[#080913]/70 p-4">
                    <Metric label="Reach" value={selected.reach} />
                    <Metric label="CTR" value={selected.ctr} />
                    <Metric label="Conversion" value={selected.conversion} />
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/15 py-4" aria-labelledby="motion-activity-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <h2 id="motion-activity-title" className="flex shrink-0 items-center gap-2 text-sm font-semibold sm:w-40">
              <Activity aria-hidden="true" className="size-4 text-lime-300" />
              Activity
            </h2>
            <ol className="grid min-w-0 flex-1 gap-x-6 gap-y-2 text-xs text-white/55 sm:grid-cols-2 xl:grid-cols-3">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="min-w-0 break-words leading-5">{item}</li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}

function DarkSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-2 text-sm" htmlFor={id}>
      <span className="font-medium text-white/75">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border border-white/20 bg-[#0f1020] px-3 text-sm text-white outline-none transition-colors hover:border-white/35 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/25 motion-reduce:transition-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function KineticButton({
  label,
  onClick,
  icon,
}: {
  label: string
  onClick: () => void
  icon: "save" | "export"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 bg-white/[0.04] px-3 text-sm font-medium text-white transition-[transform,background-color,border-color] hover:border-white/45 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200 active:scale-[0.98] motion-reduce:transition-none"
    >
      {icon === "save" ? <Save aria-hidden="true" className="size-4" /> : <Download aria-hidden="true" className="size-4" />}
      {label}
    </button>
  )
}

function RunStatus({ state }: { state: RunState }) {
  const content = {
    idle: { icon: <Activity aria-hidden="true" className="size-4" />, label: "Ready", style: "border-white/20 bg-white/5 text-white/70" },
    loading: { icon: <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />, label: "Rendering", style: "border-lime-300/50 bg-lime-300/10 text-lime-100" },
    success: { icon: <CheckCircle2 aria-hidden="true" className="size-4" />, label: "Motion ready", style: "border-emerald-300/50 bg-emerald-300/10 text-emerald-100" },
    error: { icon: <AlertTriangle aria-hidden="true" className="size-4" />, label: "Keyframe error, generate again", style: "border-rose-300/50 bg-rose-300/10 text-rose-100" },
  } as const
  const current = content[state]

  return (
    <div
      role={state === "error" ? "alert" : "status"}
      aria-live="polite"
      className={`inline-flex min-h-11 max-w-full items-center gap-2 self-start border px-3 text-xs font-medium ${current.style}`}
    >
      {current.icon}
      <span className="break-words">{current.label}</span>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-2 first:pl-0 last:pr-0">
      <dt className="text-[10px] text-white/50">{label}</dt>
      <dd className="mt-1 truncate text-lg font-semibold text-white sm:text-xl">{value}</dd>
    </div>
  )
}
