"use client"

import { useEffect, useRef, useState } from "react"
import {
  Activity,
  ArrowUpRight,
  Check,
  Download,
  LoaderCircle,
  RefreshCw,
  Save,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

type ConceptId = "A" | "B" | "C"
type RunState = "idle" | "loading" | "success" | "error"

const concepts: Record<
  ConceptId,
  {
    name: string
    thesis: string
    headline: string
    body: string
    reach: string
    ctr: string
    conversion: string
    confidence: number
    accent: string
  }
> = {
  A: {
    name: "Proof in motion",
    thesis: "Lead with a live product truth and let the audience inspect the evidence.",
    headline: "See tomorrow take shape.",
    body: "A proof-led launch story built around small, visible moments of progress.",
    reach: "2.8M",
    ctr: "4.7%",
    conversion: "8.4%",
    confidence: 86,
    accent: "from-[#276b5f] via-[#3f8974] to-[#9dd1bc]",
  },
  B: {
    name: "The open invitation",
    thesis: "Turn the launch into a participatory prompt with a low-friction first step.",
    headline: "Make the first move yours.",
    body: "An audience-first campaign that turns curiosity into an immediate action.",
    reach: "3.4M",
    ctr: "4.2%",
    conversion: "7.6%",
    confidence: 79,
    accent: "from-[#7058a7] via-[#9f75b8] to-[#e0bfd7]",
  },
  C: {
    name: "Designed to endure",
    thesis: "Frame the product as a considered object with long-term cultural value.",
    headline: "Keep what moves you.",
    body: "A quieter premium narrative tuned for trust, craft, and long consideration.",
    reach: "2.1M",
    ctr: "5.1%",
    conversion: "9.2%",
    confidence: 82,
    accent: "from-[#ab603f] via-[#d2865f] to-[#f0c6a2]",
  },
}

const controlOptions = {
  audience: ["Design-forward founders", "Urban early adopters", "Purpose-led teams"],
  channel: ["Social + OOH", "Creator network", "Launch event"],
  tone: ["Assured", "Curious", "Warm"],
  style: ["Editorial evidence", "Human documentary", "Sculptural product"],
}

export default function DesignUxPro() {
  const [concept, setConcept] = useState<ConceptId>("A")
  const [brief, setBrief] = useState(
    "Launch a modular everyday device that gives creative teams back an hour of focused time.",
  )
  const [audience, setAudience] = useState(controlOptions.audience[0])
  const [channel, setChannel] = useState(controlOptions.channel[0])
  const [tone, setTone] = useState(controlOptions.tone[0])
  const [style, setStyle] = useState(controlOptions.style[0])
  const [runState, setRunState] = useState<RunState>("idle")
  const [saved, setSaved] = useState(false)
  const [activities, setActivities] = useState([
    "Evidence model loaded",
    "Three directions prepared",
    "Audience signal normalized",
  ])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const generationRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = concepts[concept]

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  function addActivity(message: string) {
    setActivities((current) => [message, ...current].slice(0, 4))
  }

  function cancelPendingRun() {
    runTokenRef.current += 1
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function generate() {
    cancelPendingRun()
    setRunState("loading")
    setSaved(false)
    generationRef.current += 1
    const attempt = generationRef.current
    const runToken = runTokenRef.current
    addActivity("Generation requested")
    timerRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timerRef.current = null
      if (attempt % 2 === 0) {
        setRunState("error")
        addActivity("Generation paused. Revise signal mix")
      } else {
        setRunState("success")
        addActivity(`Direction ${concept} regenerated`)
      }
    }, 720)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setRunState("success")
    addActivity(`Direction ${concept} saved to workspace`)
  }

  function exportPlan() {
    cancelPendingRun()
    setRunState("success")
    addActivity(`Direction ${concept} export prepared`)
  }

  function selectConcept(id: ConceptId) {
    cancelPendingRun()
    setConcept(id)
    setRunState("idle")
    addActivity(`Direction ${id} selected for review`)
  }

  const previewBrief = brief.trim() || "Add a campaign brief to shape the evidence."

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f3f2ed] text-[#17231f]">
      <header className="border-b border-[#17231f]/15 bg-[#fbfaf6] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#193f36] text-sm font-semibold text-white">
              M
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-[-0.02em]">Muse / Evidence Canvas</p>
              <p className="truncate text-xs text-[#5f6d67]">Launch study · Draft 04</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
            <span className="rounded-full border border-[#193f36]/20 bg-white px-3 py-1.5 font-semibold">
              GPT 5.6 Sol
            </span>
            <span className="rounded-full bg-[#d8e7df] px-3 py-1.5 font-medium text-[#193f36]">
              frontend-design + ui-ux-pro-max
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 border-b border-[#17231f]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#507366]">Research workspace</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Turn signals into a campaign direction.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generate}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#193f36] px-4 text-sm font-semibold text-white transition hover:bg-[#275d50] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#78a594]/40"
            >
              {runState === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}
              {runState === "loading" ? "Generating" : "Generate"}
            </button>
            <button
              type="button"
              onClick={save}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#193f36]/25 bg-white px-4 text-sm font-semibold transition hover:border-[#193f36] hover:bg-[#edf4f0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#78a594]/40"
            >
              {saved ? <Check className="size-4" /> : <Save className="size-4" />}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={exportPlan}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#193f36]/25 bg-white px-4 text-sm font-semibold transition hover:border-[#193f36] hover:bg-[#edf4f0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#78a594]/40"
            >
              <Download className="size-4" /> Export
            </button>
          </div>
        </div>

        <div className="grid min-w-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <aside className="min-w-0 rounded-[1.35rem] border border-[#17231f]/15 bg-[#fbfaf6] p-4" aria-label="Research controls">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Audience evidence</h2>
              <span className="rounded-full bg-[#e8ede9] px-2 py-1 text-[10px] font-bold uppercase tracking-wider">4 signals</span>
            </div>
            <label className="block text-xs font-semibold text-[#53625c]" htmlFor="dux-brief">Campaign Brief</label>
            <textarea
              id="dux-brief"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#17231f]/15 bg-white p-3 text-sm leading-6 outline-none transition focus:border-[#397866] focus:ring-4 focus:ring-[#78a594]/25"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {([
                ["Audience", "dux-audience", audience, setAudience, controlOptions.audience],
                ["Channel", "dux-channel", channel, setChannel, controlOptions.channel],
                ["Tone", "dux-tone", tone, setTone, controlOptions.tone],
                ["Visual style", "dux-style", style, setStyle, controlOptions.style],
              ] as const).map(([label, id, value, setter, options]) => (
                <label key={id} className="grid gap-1.5 text-xs font-semibold text-[#53625c]" htmlFor={id}>
                  {label}
                  <select
                    id={id}
                    value={value}
                    onChange={(event) => setter(event.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#17231f]/15 bg-white px-3 text-sm font-medium text-[#17231f] outline-none transition hover:border-[#397866] focus:border-[#397866] focus:ring-4 focus:ring-[#78a594]/25"
                  >
                    {options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-[#e7eee9] p-3 text-xs leading-5 text-[#43534d]">
              <p className="font-semibold text-[#193f36]">Observed pattern</p>
              <p className="mt-1">{audience} respond to concrete utility before brand aspiration.</p>
            </div>
          </aside>

          <section className="min-w-0" aria-label="Campaign creative preview">
            <div className="relative isolate flex min-h-[530px] overflow-hidden rounded-[1.75rem] bg-[#153d35] text-white shadow-[0_25px_80px_rgba(20,50,43,0.18)]">
              <div className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-80 transition-colors duration-500`} />
              <div className="absolute -right-20 top-16 size-72 rounded-full border-[42px] border-white/15" />
              <div className="absolute bottom-[-12%] left-[38%] h-64 w-44 rotate-12 rounded-[45%] bg-white/20 blur-sm" />
              <div className="relative z-10 flex w-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Muse launch study</p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/75">{previewBrief}</p>
                  </div>
                  <span className="rounded-full border border-white/30 bg-black/10 px-3 py-1.5 text-xs backdrop-blur">Direction {concept}</span>
                </div>
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-medium text-white/80">{tone} voice · {style}</p>
                  <h2 className="text-5xl font-semibold leading-[0.92] tracking-[-0.04em] sm:text-6xl">{active.headline}</h2>
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{active.body}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#193f36] transition hover:scale-[1.02] hover:bg-[#f1f7f4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/45 motion-reduce:transform-none">
                      Explore the launch <ArrowUpRight className="size-4" />
                    </button>
                    <span className="text-sm text-white/75">For {channel.toLowerCase()}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[#617068]">Preview responds to brief, tone, style, channel, and selected direction.</p>
          </section>

          <aside className="min-w-0 rounded-[1.35rem] border border-[#17231f]/15 bg-[#fbfaf6] p-4" aria-label="Forecast evidence">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Forecast evidence</h2>
              <span className="flex items-center gap-1.5 text-xs text-[#4d635b]"><span className="size-2 rounded-full bg-[#3d8a70]" /> Live mock</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 xl:grid-cols-1">
              {[
                ["Reach", active.reach, "+12%"],
                ["CTR", active.ctr, "+0.8"],
                ["Conversion", active.conversion, "+1.4"],
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-xl border border-[#17231f]/10 bg-white p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6c7a74]">{label}</p>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <p className="text-xl font-semibold tracking-tight">{value}</p>
                    <p className="text-[10px] font-bold text-[#347460]">{delta}</p>
                  </div>
                </div>
              ))}
            </div>
            <figure className="mt-4 rounded-xl border border-[#17231f]/10 bg-white p-3">
              <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                Response curve
                <span className="flex gap-3 text-[10px] font-medium text-[#64726c]">
                  <span className="flex items-center gap-1"><span className="h-0.5 w-4 bg-[#a4aea9]" /> Actual</span>
                  <span className="flex items-center gap-1"><span className="h-0.5 w-4 border-t-2 border-dashed border-[#347460]" /> Forecast</span>
                </span>
              </figcaption>
              <svg viewBox="0 0 260 125" className="mt-3 w-full" role="img" aria-label={`Actual and forecast response for direction ${concept}`}>
                <path d="M8 104 C42 94, 58 80, 90 83 S135 52, 160 58" fill="none" stroke="#a4aea9" strokeWidth="3" />
                <path d={concept === "A" ? "M160 58 C190 49, 220 34, 252 25" : concept === "B" ? "M160 58 C190 67, 221 42, 252 46" : "M160 58 C190 44, 222 38, 252 16"} fill="none" stroke="#347460" strokeWidth="3" strokeDasharray="6 5" />
                <circle cx="160" cy="58" r="4" fill="#347460" />
                <path d="M160 43 C196 26, 224 19, 252 10 L252 41 C222 53, 192 64, 160 73 Z" fill="#7db39e" opacity=".16" />
              </svg>
              <p className="mt-1 text-[10px] leading-4 text-[#64726c]">Shaded area shows the expected confidence band. Direction {concept}: {active.confidence}% confidence.</p>
            </figure>
            <div className="mt-4" aria-live="polite">
              {runState !== "idle" && (
                <div role={runState === "error" ? "alert" : "status"} className={`flex items-start gap-2 rounded-xl p-3 text-xs ${runState === "error" ? "bg-[#f9e4df] text-[#8b352d]" : runState === "loading" ? "bg-[#e6ece9] text-[#43554e]" : "bg-[#dcece5] text-[#215945]"}`}>
                  {runState === "error" ? <TriangleAlert className="mt-0.5 size-4 shrink-0" /> : runState === "loading" ? <RefreshCw className="mt-0.5 size-4 shrink-0 animate-spin motion-reduce:animate-none" /> : <Check className="mt-0.5 size-4 shrink-0" />}
                  <span>{runState === "error" ? "Signal mix conflicted. Generate again to retry." : runState === "loading" ? "Testing creative against audience signals…" : saved ? "Direction saved with evidence snapshot." : "Campaign evidence updated successfully."}</span>
                </div>
              )}
            </div>
            <div className="mt-4 border-t border-[#17231f]/10 pt-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5a6963]"><Activity className="size-3.5" /> Activity</h3>
              <ol className="mt-3 space-y-3">
                {activities.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2 text-xs leading-5 text-[#4e5e58]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#4c8b75]" />{item}</li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        <section className="mt-4 rounded-[1.35rem] border border-[#17231f]/15 bg-[#fbfaf6] p-4 sm:p-5" aria-labelledby="dux-comparison">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#507366]">Direction comparison</p>
              <h2 id="dux-comparison" className="mt-1 text-lg font-semibold">Three hypotheses, one decision surface</h2>
            </div>
            <p className="text-xs text-[#617068]">Select A, B, or C to update the preview and forecast.</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(Object.keys(concepts) as ConceptId[]).map((id) => {
              const item = concepts[id]
              const selected = concept === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectConcept(id)}
                  className={`min-h-36 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#78a594]/35 ${selected ? "border-[#193f36] bg-[#e3eee9] shadow-[inset_0_0_0_1px_#193f36]" : "border-[#17231f]/12 bg-white hover:-translate-y-0.5 hover:border-[#397866] hover:shadow-md motion-reduce:transform-none"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${selected ? "bg-[#193f36] text-white" : "bg-[#edf0ee]"}`}>{id}</span>
                    <span className="text-xs font-semibold text-[#47665a]">{item.confidence}% confidence</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5a6963]">{item.thesis}</p>
                  <div className="mt-3 flex gap-3 text-[10px] font-semibold text-[#53625c]"><span>{item.reach} reach</span><span>{item.ctr} CTR</span><span>{item.conversion} CVR</span></div>
                </button>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2 text-xs text-[#53625c] sm:grid-cols-3">
            <p className="rounded-xl bg-[#eef0ed] px-3 py-2"><strong className="text-[#17231f]">Confidence note:</strong> Based on local mock benchmarks.</p>
            <p className="rounded-xl bg-[#eef0ed] px-3 py-2"><strong className="text-[#17231f]">Assumption:</strong> Media mix remains within ±8%.</p>
            <p className="rounded-xl bg-[#eef0ed] px-3 py-2"><strong className="text-[#17231f]">Review:</strong> Validate creator fit before export.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
