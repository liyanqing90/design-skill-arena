"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  ChevronDown,
  Clapperboard,
  Download,
  LoaderCircle,
  PanelLeftClose,
  Save,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react"

type CutId = "A" | "B" | "C"
type RenderState = "idle" | "loading" | "success" | "error"

const cuts: Record<
  CutId,
  {
    name: string
    frame: string
    headline: string
    copy: string
    reach: string
    ctr: string
    conversion: string
    orb: string
  }
> = {
  A: {
    name: "Zero hour",
    frame: "01:08:14",
    headline: "ENTER THE CLEAR.",
    copy: "A high-contrast origin film where focus arrives like a new frequency.",
    reach: "3.1M",
    ctr: "4.9%",
    conversion: "8.6%",
    orb: "from-[#0b67ff] via-[#33b8ff] to-[#b9efff]",
  },
  B: {
    name: "Signal run",
    frame: "01:18:09",
    headline: "MOVE AT THE SPEED OF INTENT.",
    copy: "A kinetic studio sequence that tracks one idea from spark to finished work.",
    reach: "3.8M",
    ctr: "4.4%",
    conversion: "7.8%",
    orb: "from-[#1543c9] via-[#7d4dff] to-[#e0b7ff]",
  },
  C: {
    name: "After image",
    frame: "01:27:22",
    headline: "LEAVE ONLY THE ESSENTIAL.",
    copy: "A slow premium portrait of the tool, the hands, and the work that remains.",
    reach: "2.5M",
    ctr: "5.5%",
    conversion: "9.7%",
    orb: "from-[#046c8c] via-[#19d6e7] to-[#ecfeff]",
  },
}

export default function VisualPremiumChain() {
  const [cut, setCut] = useState<CutId>("A")
  const [brief, setBrief] = useState("Reveal Muse One as the precision instrument that removes friction from a creative day.")
  const [audience, setAudience] = useState("Creative technologists")
  const [channel, setChannel] = useState("Hero film + social")
  const [tone, setTone] = useState("Cinematic")
  const [style, setStyle] = useState("Chrome noir")
  const [pace, setPace] = useState(62)
  const [controlsOpen, setControlsOpen] = useState(false)
  const [state, setState] = useState<RenderState>("idle")
  const [saved, setSaved] = useState(false)
  const [activity, setActivity] = useState([
    "Cut A loaded to monitor",
    "Chrome grade applied",
    "Audience lens synced",
  ])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const renderRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = cuts[cut]

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  function record(message: string) {
    setActivity((items) => [message, ...items].slice(0, 4))
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
    renderRef.current += 1
    const renderNumber = renderRef.current
    const runToken = runTokenRef.current
    setState("loading")
    setSaved(false)
    record("New render queued")
    timerRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timerRef.current = null
      if (renderNumber % 2 === 0) {
        setState("error")
        record("Frame continuity needs review")
      } else {
        setState("success")
        record(`Cut ${cut} render completed`)
      }
    }, 840)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setState("success")
    record(`Cut ${cut} saved to review reel`)
  }

  function exportCut() {
    cancelPendingRun()
    setState("success")
    record(`Cut ${cut} export package prepared`)
  }

  function selectCut(id: CutId) {
    cancelPendingRun()
    setCut(id)
    setState("idle")
    record(`Cut ${id} loaded to monitor`)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030407] text-white">
      <header className="border-b border-white/10 bg-[#07090d] px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full border border-white/20 bg-gradient-to-b from-white/20 to-transparent"><Clapperboard className="size-4" /></div>
            <div>
              <p className="text-sm font-semibold tracking-wide">MUSE / MASTERING SUITE</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Picture locked / Local mock</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-white/20 px-3 py-1.5 font-semibold">GPT 5.6 Sol</span>
            <span className="rounded-full border border-[#27a8ff]/30 bg-[#0b4f8d]/35 px-3 py-1.5 font-medium text-[#b9e8ff]">frontend-skill + taste-skill + impeccable</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1700px] p-3 sm:p-5 lg:p-6">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
            <span className="size-2 rounded-full bg-[#168fff] shadow-[0_0_16px_#168fff]" /> Live campaign monitor
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-expanded={controlsOpen} onClick={() => setControlsOpen((open) => !open)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium transition hover:border-[#28a7ff]/60 hover:bg-[#0b5ea8]/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30">
              <SlidersHorizontal className="size-4" /> Scene controls <ChevronDown className={`size-4 transition-transform ${controlsOpen ? "rotate-180" : ""}`} />
            </button>
            <button type="button" onClick={generate} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#128dff] px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(18,141,255,.28)] transition hover:bg-[#35a4ff] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/35">
              {state === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}{state === "loading" ? "Rendering" : "Generate"}
            </button>
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30">{saved ? <Check className="size-4 text-[#78ddff]" /> : <Save className="size-4" />}{saved ? "Saved" : "Save"}</button>
            <button type="button" onClick={exportCut} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30"><Download className="size-4" />Export</button>
          </div>
        </div>

        <section className="relative isolate min-h-[650px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#080b12] shadow-[0_35px_90px_rgba(0,0,0,.6)]" aria-label="Cinematic campaign preview">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(18,141,255,.24),transparent_34%),radial-gradient(circle_at_25%_75%,rgba(28,57,101,.38),transparent_32%),linear-gradient(135deg,#070910_0%,#020307_60%,#08101f_100%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className={`absolute right-[8%] top-[14%] h-[58%] w-[34%] min-w-64 rotate-[-12deg] rounded-[48%] bg-gradient-to-br ${active.orb} shadow-[0_0_100px_rgba(36,157,255,.28)] transition-all duration-700 motion-reduce:transition-none`}>
            <div className="absolute inset-[7%] rounded-[48%] border border-black/40 bg-gradient-to-br from-white/30 via-transparent to-black/60 backdrop-blur-sm" />
            <div className="absolute left-[18%] top-[12%] h-[65%] w-[16%] rotate-12 rounded-full bg-white/35 blur-xl" />
          </div>
          <div className="absolute bottom-[20%] right-[3%] h-px w-[62%] bg-gradient-to-r from-transparent via-[#2199ff]/60 to-transparent" />

          <div className="relative z-10 flex min-h-[650px] flex-col justify-between p-5 sm:p-8 lg:p-12">
            <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-white/45">
              <span>CAM A07 / CUT {cut}</span>
              <span>{active.frame} / 24 FPS</span>
            </div>
            <div className="max-w-4xl pb-8 sm:pb-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#65c6ff]">{tone} / {style}</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.86] tracking-[-0.04em] sm:text-6xl">{active.headline}</h1>
              <p className="mt-6 max-w-xl text-sm leading-6 text-white/65 sm:text-base">{brief || active.copy}</p>
              <p className="mt-3 max-w-xl text-sm text-white/45">{active.copy} Built for {audience.toLowerCase()} across {channel.toLowerCase()}.</p>
              <button type="button" className="mt-7 min-h-11 rounded-full border border-[#5dbdff]/50 bg-[#0b5a9d]/20 px-5 text-sm font-semibold text-[#bdeaff] backdrop-blur transition hover:bg-[#147ed1]/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30">Watch the full launch cut</button>
            </div>
          </div>

          {controlsOpen && (
            <aside className="absolute inset-3 z-20 max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#090c12]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-5 sm:right-auto sm:top-5 sm:w-[340px]" aria-label="Progressive scene controls">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div><p className="text-sm font-semibold">Scene controls</p><p className="mt-1 text-xs text-white/45">Adjust only what the shot needs.</p></div>
                <button type="button" onClick={() => setControlsOpen(false)} aria-label="Close scene controls" className="grid min-h-11 min-w-11 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30"><X className="size-4" /></button>
              </div>
              <label htmlFor="vp-brief" className="mt-4 block text-xs font-medium text-white/65">Campaign Brief</label>
              <textarea id="vp-brief" value={brief} onChange={(event) => setBrief(event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/15 bg-white/5 p-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-[#299fff] focus:ring-4 focus:ring-[#168fff]/20" />
              <div className="mt-4 grid gap-3">
                {([
                  ["Audience", "vp-audience", audience, setAudience, ["Creative technologists", "Design leaders", "New media founders"]],
                  ["Channel", "vp-channel", channel, setChannel, ["Hero film + social", "Cinema + OOH", "Creator premieres"]],
                  ["Tone", "vp-tone", tone, setTone, ["Cinematic", "Mesmeric", "Precise"]],
                  ["Visual style", "vp-style", style, setStyle, ["Chrome noir", "Electric macro", "Slow-tech portrait"]],
                ] as const).map(([label, id, value, setter, options]) => (
                  <label key={id} htmlFor={id} className="grid gap-1.5 text-xs font-medium text-white/60">
                    {label}
                    <select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 rounded-xl border border-white/15 bg-[#111721] px-3 text-sm text-white outline-none transition hover:border-[#299fff]/60 focus:border-[#299fff] focus:ring-4 focus:ring-[#168fff]/20">
                      {options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </label>
                ))}
              </div>
              <label htmlFor="vp-pace" className="mt-4 flex justify-between text-xs font-medium text-white/60">Edit pace <output>{pace}%</output></label>
              <input id="vp-pace" type="range" min="20" max="90" value={pace} onChange={(event) => setPace(Number(event.target.value))} className="h-11 w-full accent-[#1595ff]" />
              <button type="button" onClick={() => setControlsOpen(false)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/10 text-sm font-semibold transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30"><PanelLeftClose className="size-4" />Return to monitor</button>
            </aside>
          )}

          <div className="relative z-10 mx-4 mb-4 grid grid-cols-3 gap-2 sm:absolute sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:mx-0 sm:w-[min(720px,70%)] sm:-translate-x-1/2">
            {(Object.keys(cuts) as CutId[]).map((id) => {
              const item = cuts[id]
              const selected = cut === id
              return (
                <button key={id} type="button" onClick={() => selectCut(id)} aria-pressed={selected} className={`group min-h-20 min-w-0 rounded-xl border p-2 text-left backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#168fff]/30 ${selected ? "border-[#47b5ff] bg-[#0d65a9]/45 shadow-[0_0_24px_rgba(20,148,255,.2)]" : "border-white/10 bg-black/45 hover:border-white/35 hover:bg-white/10"}`}>
                  <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className={`h-7 w-full shrink-0 overflow-hidden rounded-lg bg-gradient-to-br sm:h-11 sm:w-16 ${item.orb}`}><div className="ml-[38%] mt-1 h-9 w-5 rounded-full bg-white/30 blur-sm" /></div>
                    <div className="min-w-0"><p className="truncate text-[10px] font-semibold sm:text-xs">{id}<span className="hidden sm:inline"> / {item.name}</span></p><p className="hidden truncate font-mono text-[9px] text-white/45 sm:mt-1 sm:block">{item.frame}</p></div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-[#080a0e] p-3 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(240px,1.5fr)]" aria-label="Forecast and render status">
          {[["Reach", active.reach], ["CTR", active.ctr], ["Conversion", active.conversion]].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">{label}</p><p className="mt-1 text-xl font-semibold tracking-tight">{value}</p></div>
          ))}
          <div className="min-w-0 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">Render status + Activity</p>
              {state === "loading" && <span role="status" className="flex items-center gap-1 text-xs text-[#74ccff]"><LoaderCircle className="size-3.5 animate-spin motion-reduce:animate-none" />Rendering</span>}
              {state === "success" && <span role="status" className="flex items-center gap-1 text-xs text-[#7de5c0]"><Check className="size-3.5" />{saved ? "Saved" : "Ready"}</span>}
              {state === "error" && <span role="alert" className="flex items-center gap-1 text-xs text-[#ff9e99]"><TriangleAlert className="size-3.5" />Retry</span>}
              {state === "idle" && <span className="text-xs text-white/45">Standing by</span>}
            </div>
            <p className="mt-2 truncate text-xs text-white/60">{activity[0]}</p>
          </div>
        </section>
      </div>
    </main>
  )
}
