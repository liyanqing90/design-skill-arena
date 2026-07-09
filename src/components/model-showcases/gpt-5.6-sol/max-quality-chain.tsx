"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  Download,
  Eye,
  Leaf,
  LoaderCircle,
  Save,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

type PathId = "A" | "B" | "C"
type WarRoomState = "idle" | "loading" | "success" | "error"

const paths: Record<
  PathId,
  {
    name: string
    premise: string
    headline: string
    copy: string
    reach: string
    ctr: string
    conversion: string
    confidence: number
    glow: string
  }
> = {
  A: {
    name: "Living signal",
    premise: "Product utility becomes a growing, visible system.",
    headline: "GIVE THE GOOD WORK LIGHT.",
    copy: "Muse One clears a protected space where ideas can take root and become durable work.",
    reach: "3.0M",
    ctr: "4.9%",
    conversion: "8.9%",
    confidence: 87,
    glow: "from-[#b9ef92] via-[#63b978] to-[#174b36]",
  },
  B: {
    name: "Field notes",
    premise: "A documentary trail follows teams reclaiming focused time.",
    headline: "FOLLOW THE WORK FORWARD.",
    copy: "A human campaign built from the small decisions that turn attention into progress.",
    reach: "3.7M",
    ctr: "4.4%",
    conversion: "7.9%",
    confidence: 80,
    glow: "from-[#e0c77b] via-[#8f9f59] to-[#31523d]",
  },
  C: {
    name: "Quiet canopy",
    premise: "Premium stillness makes focus feel rare, useful, and attainable.",
    headline: "KEEP A CLEARING FOR WHAT MATTERS.",
    copy: "An assured product narrative for leaders who want growth without creative erosion.",
    reach: "2.5M",
    ctr: "5.5%",
    conversion: "9.8%",
    confidence: 84,
    glow: "from-[#8ad9c6] via-[#3d9081] to-[#153e35]",
  },
}

const phases = ["Signal", "Shape", "Scenario", "Launch"]

export default function MaxQualityChain() {
  const [path, setPath] = useState<PathId>("A")
  const [phase, setPhase] = useState("Shape")
  const [brief, setBrief] = useState("Launch Muse One as a focus system for creative organizations protecting craft while they scale.")
  const [audience, setAudience] = useState("Creative organizations")
  const [channel, setChannel] = useState("Film + field activations")
  const [tone, setTone] = useState("Grounded optimism")
  const [style, setStyle] = useState("Biophilic cinema")
  const [state, setState] = useState<WarRoomState>("idle")
  const [saved, setSaved] = useState(false)
  const [activity, setActivity] = useState([
    "Forecast model joined to Path A",
    "Narrative shape approved",
    "Audience signal set refreshed",
    "War room opened",
  ])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const attemptRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = paths[path]

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  function log(message: string) {
    setActivity((items) => [message, ...items].slice(0, 5))
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
    attemptRef.current += 1
    const attempt = attemptRef.current
    const runToken = runTokenRef.current
    setState("loading")
    setSaved(false)
    log("Synthesis run started")
    timerRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timerRef.current = null
      if (attempt % 2 === 0) {
        setState("error")
        log("Scenario tension needs resolution")
      } else {
        setState("success")
        log(`Path ${path} campaign synthesized`)
      }
    }, 880)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setState("success")
    log(`Path ${path} saved with forecast snapshot`)
  }

  function exportCampaign() {
    cancelPendingRun()
    setState("success")
    log(`Path ${path} handoff bundle prepared`)
  }

  function selectPath(id: PathId) {
    cancelPendingRun()
    setPath(id)
    setState("idle")
    log(`Path ${id} selected for synthesis`)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07130e] text-[#ecf4eb]">
      <header className="border-b border-[#a7c8a1]/15 bg-[#081710] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-[#9ecb9a]/25 bg-[#10291d]"><Leaf className="size-4 text-[#a8e18f]" /></div>
            <div><p className="text-sm font-semibold tracking-wide">MUSE / STRATEGY WAR ROOM</p><p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#9bb3a2]/55">Campaign system 06 / Live local model</p></div>
          </div>
          <div className="flex max-w-full flex-wrap items-center gap-2 text-xs">
            <span className="border border-[#9ecb9a]/25 bg-[#0c2117] px-3 py-1.5 font-semibold">GPT 5.6 Sol</span>
            <span className="max-w-full break-words bg-[#b7e496] px-3 py-1.5 font-semibold text-[#102018]">frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1680px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 border-b border-[#a7c8a1]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#96c488]">Integrated campaign intelligence</p>
            <h1 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">Map the signal. Shape the launch.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={generate} className="inline-flex min-h-11 items-center gap-2 bg-[#b7e496] px-4 text-sm font-semibold text-[#102018] transition hover:bg-[#d2f2b9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/30">{state === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}{state === "loading" ? "Synthesizing" : "Generate"}</button>
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-2 border border-[#a7c8a1]/25 bg-[#0d2118] px-4 text-sm font-semibold transition hover:border-[#b7e496]/60 hover:bg-[#153225] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/25">{saved ? <Check className="size-4 text-[#b7e496]" /> : <Save className="size-4" />}{saved ? "Saved" : "Save"}</button>
            <button type="button" onClick={exportCampaign} className="inline-flex min-h-11 items-center gap-2 border border-[#a7c8a1]/25 bg-[#0d2118] px-4 text-sm font-semibold transition hover:border-[#b7e496]/60 hover:bg-[#153225] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/25"><Download className="size-4" />Export</button>
          </div>
        </div>

        <div className="grid min-w-0 border-y border-[#a7c8a1]/15 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
          <aside className="min-w-0 py-5 xl:border-r xl:border-[#a7c8a1]/15 xl:pr-5" aria-label="Strategy timeline and campaign brief">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8ba795]">Strategy timeline</p>
            <ol className="relative mt-5 space-y-1 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-[#63816d]/40">
              {phases.map((item, index) => {
                const selected = phase === item
                return (
                  <li key={item} className="relative">
                    <button type="button" onClick={() => { cancelPendingRun(); setState("idle"); setPhase(item); log(`${item} phase opened`) }} aria-pressed={selected} className={`flex min-h-14 w-full items-center gap-3 px-1 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/20 ${selected ? "text-[#d3f1c0]" : "text-[#8ba795] hover:text-white"}`}>
                      <span className={`relative z-10 grid size-8 shrink-0 place-items-center border text-[10px] font-bold ${selected ? "border-[#b7e496] bg-[#b7e496] text-[#102018]" : "border-[#53715d] bg-[#0a1b13]"}`}>0{index + 1}</span>
                      <span><span className="block text-sm font-semibold">{item}</span><span className="mt-1 block text-[10px] text-[#718979]">{selected ? "In current view" : "Open phase"}</span></span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-6 border-t border-[#a7c8a1]/15 pt-5">
              <label htmlFor="mq-brief" className="text-xs font-semibold text-[#afc3b3]">Campaign Brief</label>
              <textarea id="mq-brief" value={brief} onChange={(event) => setBrief(event.target.value)} className="mt-2 min-h-32 w-full resize-y border border-[#76917d]/30 bg-[#0a1c13] p-3 text-sm leading-6 text-[#ecf4eb] outline-none transition placeholder:text-[#698070] focus:border-[#b7e496]/70 focus:ring-4 focus:ring-[#b7e496]/15" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {([
                ["Audience", "mq-audience", audience, setAudience, ["Creative organizations", "Design leadership", "Innovation teams"]],
                ["Tone", "mq-tone", tone, setTone, ["Grounded optimism", "Assured", "Contemplative"]],
              ] as const).map(([label, id, value, setter, options]) => <label key={id} htmlFor={id} className="grid gap-1.5 text-xs font-semibold text-[#afc3b3]">{label}<select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 border border-[#76917d]/30 bg-[#0a1c13] px-3 text-sm font-normal text-[#ecf4eb] outline-none transition hover:border-[#91b09a]/55 focus:border-[#b7e496]/70 focus:ring-4 focus:ring-[#b7e496]/15">{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
            </div>
          </aside>

          <section className="min-w-0 py-5 xl:px-5" aria-label="Campaign creative and direction controls">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8ba795]">Scenario preview / {phase}</p><h2 className="mt-1 text-lg font-medium">Path {path}: {active.name}</h2></div>
              <div className="grid grid-cols-3 border border-[#7f9d88]/25" role="group" aria-label="Creative paths">
                {(Object.keys(paths) as PathId[]).map((id) => <button key={id} type="button" onClick={() => selectPath(id)} aria-pressed={path === id} className={`min-h-11 px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/20 ${path === id ? "bg-[#b7e496] text-[#102018]" : "bg-[#0b1d14] text-[#9ab0a0] hover:bg-[#153225] hover:text-white"}`}>{id}</button>)}
              </div>
            </div>

            <div className="relative isolate mt-4 flex min-h-[570px] overflow-hidden border border-[#78927e]/25 bg-[#0d261a]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(94,174,104,.24),transparent_32%),linear-gradient(145deg,#0b2016_0%,#092015_55%,#06130e_100%)]" />
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,transparent_49.8%,rgba(188,225,182,.12)_50%,transparent_50.2%),linear-gradient(transparent_49.8%,rgba(188,225,182,.08)_50%,transparent_50.2%)] [background-size:120px_120px]" />
              <div className={`absolute right-[8%] top-[12%] h-[62%] w-[38%] min-w-64 rounded-[55%_45%_59%_41%/38%_55%_45%_62%] bg-gradient-to-br ${active.glow} opacity-90 shadow-[0_0_120px_rgba(88,170,105,.22)] transition-all duration-700 motion-reduce:transition-none`}>
                <div className="absolute inset-[14%] rounded-[45%] border border-white/20 bg-black/25 backdrop-blur-sm" />
                <div className="absolute left-[23%] top-[12%] h-[64%] w-[13%] rotate-[20deg] rounded-full bg-white/25 blur-xl" />
              </div>
              <div className="relative flex w-full flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b7e496]">Muse One / {style}</p><p className="mt-3 max-w-xl text-sm leading-6 text-[#b6c7b8]">{brief || "Add a brief to define the strategic clearing."}</p></div>
                  <span className="border border-[#bad6b3]/25 bg-black/10 px-3 py-1.5 text-xs text-[#b6c7b8]">Path {path} / {active.confidence}% confidence</span>
                </div>
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fc890]">{tone} / For {audience}</p>
                  <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.04em] sm:text-6xl">{active.headline}</h1>
                  <p className="mt-6 max-w-xl text-base leading-7 text-[#c4d2c5]">{active.copy}</p>
                  <button type="button" className="mt-7 inline-flex min-h-11 items-center gap-2 border border-[#b7e496]/55 bg-[#b7e496]/10 px-5 text-sm font-semibold text-[#d8f3c7] transition hover:bg-[#b7e496] hover:text-[#102018] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b7e496]/25"><Eye className="size-4" />Enter the campaign world</button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#b9d0b7]/15 pt-4 text-xs text-[#829b88]"><span>{channel}</span><span>{active.premise}</span></div>
              </div>
            </div>
          </section>

          <aside className="min-w-0 py-5 xl:border-l xl:border-[#a7c8a1]/15 xl:pl-5" aria-label="Forecast and delivery controls">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8ba795]">Forecast model</p>
              <div className="mt-4 grid grid-cols-3 gap-2 xl:grid-cols-1">
                {[["Reach", active.reach, "Awareness"], ["CTR", active.ctr, "Response"], ["Conversion", active.conversion, "Action"]].map(([label, value, hint]) => <div key={label} className="border-b border-[#a7c8a1]/15 pb-3"><div className="flex items-end justify-between gap-2"><div><p className="text-[9px] font-bold uppercase tracking-wider text-[#779081]">{label}</p><p className="mt-1 text-2xl font-medium">{value}</p></div><span className="hidden text-[10px] text-[#6d8775] xl:inline">{hint}</span></div></div>)}
              </div>
              <figure className="mt-5 border-y border-[#a7c8a1]/15 py-4">
                <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                  Response trajectory
                  <span className="flex gap-3 text-[9px] font-medium text-[#819887]"><span className="flex items-center gap-1"><span className="h-0.5 w-4 bg-[#718578]" />Actual</span><span className="flex items-center gap-1"><span className="h-0.5 w-4 border-t-2 border-dashed border-[#b7e496]" />Forecast</span></span>
                </figcaption>
                <svg viewBox="0 0 280 145" className="mt-3 w-full" role="img" aria-label={`Actual and forecast campaign response for Path ${path}`}>
                  <path d="M8 124 H272 M8 92 H272 M8 60 H272 M8 28 H272" stroke="#375040" strokeWidth="1" />
                  <path d="M8 119 C38 112 62 101 88 103 S129 81 153 83" fill="none" stroke="#718578" strokeWidth="3" />
                  <path d={path === "A" ? "M153 83 C183 70 212 47 272 29" : path === "B" ? "M153 83 C183 87 216 60 272 55" : "M153 83 C186 68 220 37 272 18"} fill="none" stroke="#b7e496" strokeDasharray="6 5" strokeWidth="3" />
                  <path d="M153 65 C198 43 236 25 272 16 L272 47 C226 61 190 83 153 99 Z" fill="#b7e496" opacity=".1" />
                  <circle cx="153" cy="83" r="4" fill="#b7e496" />
                </svg>
                <p className="mt-1 text-[10px] leading-4 text-[#718979]">Shaded forecast band reflects local mock uncertainty. Confidence {active.confidence}%.</p>
              </figure>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {([
                ["Channel", "mq-channel", channel, setChannel, ["Film + field activations", "Social + CRM", "Creators + OOH"]],
                ["Visual style", "mq-style", style, setStyle, ["Biophilic cinema", "Field documentary", "Sculptural stillness"]],
              ] as const).map(([label, id, value, setter, options]) => <label key={id} htmlFor={id} className="grid gap-1.5 text-xs font-semibold text-[#afc3b3]">{label}<select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 border border-[#76917d]/30 bg-[#0a1c13] px-3 text-sm font-normal text-[#ecf4eb] outline-none transition hover:border-[#91b09a]/55 focus:border-[#b7e496]/70 focus:ring-4 focus:ring-[#b7e496]/15">{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
            </div>

            <div className="mt-5 min-h-16 border-t border-[#a7c8a1]/15 pt-4" aria-live="polite">
              {state === "idle" && <p className="text-xs text-[#829b88]">Synthesis engine ready.</p>}
              {state === "loading" && <p role="status" className="flex items-center gap-2 text-xs text-[#c5eeb0]"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />Joining strategy, creative, and forecast…</p>}
              {state === "success" && <p role="status" className="flex items-center gap-2 text-xs font-semibold text-[#b7e496]"><Check className="size-4" />{saved ? "Path saved with current evidence." : "Campaign synthesis complete."}</p>}
              {state === "error" && <p role="alert" className="flex items-center gap-2 text-xs font-semibold text-[#f0a99b]"><TriangleAlert className="size-4" />Scenario conflict found. Generate again.</p>}
            </div>
          </aside>
        </div>

        <section className="border-b border-[#a7c8a1]/15 py-5" aria-labelledby="mq-activity">
          <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8ba795]">Operations</p><h2 id="mq-activity" className="mt-1 text-lg font-medium">Activity timeline</h2></div>
            <ol className="grid gap-0 sm:grid-cols-2 xl:grid-cols-5">
              {activity.map((item, index) => <li key={`${item}-${index}`} className="relative border-l border-[#6f8b76]/35 pb-4 pl-5 text-xs leading-5 text-[#9fb1a2] sm:pb-0 sm:pr-4"><span className="absolute -left-1.5 top-1.5 size-3 border border-[#86a88c] bg-[#07130e]" /><p className="font-semibold text-[#d6e3d5]">{item}</p><p className="mt-1 text-[10px] text-[#647d6b]">{index === 0 ? "Just now" : `${index * 2 + 1} min ago`}</p></li>)}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
