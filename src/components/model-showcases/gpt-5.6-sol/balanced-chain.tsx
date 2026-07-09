"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  ChevronRight,
  Download,
  Layers3,
  LoaderCircle,
  Save,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

type RouteId = "A" | "B" | "C"
type GenerateState = "idle" | "loading" | "success" | "error"

const routes: Record<
  RouteId,
  {
    title: string
    line: string
    copy: string
    reach: string
    ctr: string
    conversion: string
    tint: string
    shape: string
  }
> = {
  A: {
    title: "Daily ritual",
    line: "Make space for the work that matters.",
    copy: "Muse One turns focus into a simple, repeatable studio ritual.",
    reach: "2.7M",
    ctr: "4.6%",
    conversion: "8.7%",
    tint: "bg-[#dbe0c4]",
    shape: "rounded-[48%_52%_42%_58%/60%_38%_62%_40%]",
  },
  B: {
    title: "Shared momentum",
    line: "One clear hour changes the whole day.",
    copy: "A team story about fewer handoffs, stronger ideas, and visible progress.",
    reach: "3.3M",
    ctr: "4.1%",
    conversion: "7.9%",
    tint: "bg-[#f0b2a3]",
    shape: "rounded-[32%_68%_58%_42%/46%_58%_42%_54%]",
  },
  C: {
    title: "Quiet advantage",
    line: "Less noise. More signal.",
    copy: "A restrained product narrative for leaders who protect creative energy.",
    reach: "2.2M",
    ctr: "5.3%",
    conversion: "9.5%",
    tint: "bg-[#c7cec1]",
    shape: "rounded-[61%_39%_34%_66%/38%_52%_48%_62%]",
  },
}

export default function BalancedChain() {
  const [route, setRoute] = useState<RouteId>("A")
  const [brief, setBrief] = useState("Launch Muse One as a calm focus companion for small teams building ambitious products.")
  const [audience, setAudience] = useState("Creative operators")
  const [channel, setChannel] = useState("Social + newsletter")
  const [tone, setTone] = useState("Clear and human")
  const [style, setStyle] = useState("Tactile minimal")
  const [state, setState] = useState<GenerateState>("idle")
  const [saved, setSaved] = useState(false)
  const [activity, setActivity] = useState([
    "Workspace opened",
    "Route A balanced",
    "Media assumptions loaded",
  ])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const generationRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = routes[route]

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  function note(message: string) {
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
    generationRef.current += 1
    const currentRun = generationRef.current
    const runToken = runTokenRef.current
    setState("loading")
    setSaved(false)
    note("Creative balance recalculating")
    timerRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timerRef.current = null
      if (currentRun % 2 === 0) {
        setState("error")
        note("Channel balance needs attention")
      } else {
        setState("success")
        note(`Route ${route} generated successfully`)
      }
    }, 690)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setState("success")
    note(`Route ${route} saved as a working draft`)
  }

  function exportCampaign() {
    cancelPendingRun()
    setState("success")
    note(`Route ${route} export is ready`)
  }

  function selectRoute(id: RouteId) {
    cancelPendingRun()
    setRoute(id)
    setState("idle")
    note(`Route ${id} moved to the center`)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#edf0e8] text-[#292a20]">
      <header className="border-b border-[#4c5137]/30 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1580px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#5b6240] text-sm font-bold text-[#f5f7f2]">M</div>
            <div>
              <p className="text-sm font-semibold">Muse Balance Desk</p>
              <p className="text-xs text-[#696b5b]">Campaign 04 / Working session</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg border border-[#5b6240]/25 bg-white/60 px-3 py-1.5 font-semibold">GPT 5.6 Sol</span>
            <span className="rounded-lg bg-[#5b6240] px-3 py-1.5 font-medium text-white">frontend-app-builder + taste-skill + impeccable</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1580px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6a7049]">Four-part campaign console</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.045em]">Keep the whole launch in view.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={generate} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#5b6240] px-4 text-sm font-semibold text-white transition hover:bg-[#464d2d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7f8658]/35">
              {state === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}{state === "loading" ? "Balancing" : "Generate"}
            </button>
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#5b6240]/35 bg-white/70 px-4 text-sm font-semibold transition hover:bg-[#e4e6d5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7f8658]/35">{saved ? <Check className="size-4" /> : <Save className="size-4" />}{saved ? "Saved" : "Save"}</button>
            <button type="button" onClick={exportCampaign} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#5b6240]/35 bg-white/70 px-4 text-sm font-semibold transition hover:bg-[#e4e6d5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7f8658]/35"><Download className="size-4" />Export</button>
          </div>
        </div>

        <div className="grid min-w-0 gap-3 lg:grid-cols-[310px_66px_minmax(0,1fr)] lg:grid-rows-[minmax(510px,auto)_250px]">
          <section className="min-w-0 rounded-2xl border border-[#4c5137]/25 bg-[#f3f4f1] p-4 lg:col-start-1 lg:row-start-1" aria-label="Campaign brief and controls">
            <div className="flex items-center justify-between border-b border-[#4c5137]/20 pb-3">
              <h2 className="text-sm font-semibold">01 / Frame the work</h2>
              <Layers3 className="size-4 text-[#687046]" />
            </div>
            <label htmlFor="bc-brief" className="mt-4 block text-xs font-semibold text-[#656755]">Campaign Brief</label>
            <textarea id="bc-brief" value={brief} onChange={(event) => setBrief(event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#4c5137]/25 bg-white/80 p-3 text-sm leading-6 outline-none transition focus:border-[#687046] focus:ring-4 focus:ring-[#7f8658]/20" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {([
                ["Audience", "bc-audience", audience, setAudience, ["Creative operators", "Studio founders", "Product teams"]],
                ["Channel", "bc-channel", channel, setChannel, ["Social + newsletter", "Creators + audio", "OOH + launch event"]],
                ["Tone", "bc-tone", tone, setTone, ["Clear and human", "Optimistic", "Quietly bold"]],
                ["Visual style", "bc-style", style, setStyle, ["Tactile minimal", "Soft geometry", "Documentary detail"]],
              ] as const).map(([label, id, value, setter, options]) => (
                <label key={id} htmlFor={id} className="grid gap-1.5 text-xs font-semibold text-[#656755]">
                  {label}
                  <select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 rounded-xl border border-[#4c5137]/25 bg-white/80 px-3 text-sm text-[#292a20] outline-none transition hover:border-[#687046] focus:border-[#687046] focus:ring-4 focus:ring-[#7f8658]/20">
                    {options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              ))}
            </div>
          </section>

          <nav className="flex min-h-16 items-center justify-center gap-2 rounded-2xl border border-[#4c5137]/25 bg-[#dfe3d9] p-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex-col" aria-label="Creative routes">
            {(Object.keys(routes) as RouteId[]).map((id) => (
              <button key={id} type="button" onClick={() => selectRoute(id)} aria-pressed={route === id} aria-label={`Select creative route ${id}`} className={`grid min-h-11 min-w-11 flex-1 place-items-center rounded-xl text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e77f6b]/35 lg:max-h-24 lg:w-full ${route === id ? "bg-[#e77f6b] text-[#2f241f] shadow-[0_5px_0_#b95f4f]" : "bg-[#eef1e8] text-[#565846] hover:bg-white hover:text-black"}`}>{id}</button>
            ))}
          </nav>

          <section className="relative isolate min-w-0 overflow-hidden rounded-2xl border border-[#4c5137]/25 bg-[#646a46] p-4 text-[#f5f7f2] sm:p-6 lg:col-start-3 lg:row-start-1" aria-label="Main campaign preview">
            <div className={`absolute -right-20 -top-16 size-[28rem] ${active.shape} ${active.tint} opacity-80 transition-all duration-500 motion-reduce:transition-none`} />
            <div className="absolute bottom-12 left-[48%] h-36 w-36 rotate-12 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-sm" />
            <div className="relative flex min-h-[470px] flex-col justify-between">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Muse One / {active.title}</p>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">{brief || "Add a brief in quadrant one to shape this direction."}</p>
                </div>
                <span className="rounded-full border border-white/25 px-3 py-1.5 text-xs">Route {route}</span>
              </div>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f3b8ab]">{tone} / {style}</p>
                <h2 className="mt-3 text-5xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-6xl">{active.line}</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/78">{active.copy}</p>
                <button type="button" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f3b09f] px-5 text-sm font-semibold text-[#312820] transition hover:gap-3 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/35">Meet Muse One <ChevronRight className="size-4" /></button>
              </div>
              <div className="flex flex-wrap justify-between gap-3 border-t border-white/20 pt-4 text-xs text-white/70"><span>{audience}</span><span>{channel}</span><span>Campaign preview / live mock</span></div>
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-[#4c5137]/25 bg-[#f0b09f] p-4 lg:col-start-1 lg:row-start-2" aria-labelledby="bc-metrics">
            <div className="flex items-center justify-between">
              <h2 id="bc-metrics" className="text-sm font-semibold">02 / Forecast</h2>
              <span className="text-xs">Route {route}</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[["Reach", active.reach], ["CTR", active.ctr], ["Conversion", active.conversion]].map(([label, value], index) => (
                <div key={label} className="min-w-0 border-l border-[#352a24]/25 pl-2 first:border-l-0 first:pl-0">
                  <p className="truncate text-[9px] font-bold uppercase tracking-wider text-[#60443d]">{label}</p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">{value}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#5b6240]" style={{ width: `${67 + index * 9 + (route.charCodeAt(0) - 65) * 3}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-[#60443d]">Projection adjusts when the central route changes. Mock confidence window: ±6%.</p>
          </section>

          <section className="min-w-0 rounded-2xl border border-[#4c5137]/25 bg-[#f3f4f1] p-4 lg:col-start-3 lg:row-start-2" aria-labelledby="bc-activity">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 id="bc-activity" className="text-sm font-semibold">03 / Activity</h2>
                <p className="mt-1 text-xs text-[#696b5b]">Recent changes across the four quadrants.</p>
              </div>
              <div className="min-h-11" aria-live="polite">
                {state === "loading" && <p role="status" className="flex items-center gap-2 rounded-full bg-[#e6e5d7] px-3 py-2 text-xs"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />Generating</p>}
                {state === "success" && <p role="status" className="flex items-center gap-2 rounded-full bg-[#dce5cd] px-3 py-2 text-xs font-semibold text-[#42512e]"><Check className="size-4" />{saved ? "Draft saved" : "Update ready"}</p>}
                {state === "error" && <p role="alert" className="flex items-center gap-2 rounded-full bg-[#f7d4ca] px-3 py-2 text-xs font-semibold text-[#803b31]"><TriangleAlert className="size-4" />Retry required</p>}
              </div>
            </div>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {activity.map((item, index) => <li key={`${item}-${index}`} className="rounded-xl border border-[#4c5137]/15 bg-white/75 px-3 py-2 text-xs leading-5"><span className="mr-2 font-mono text-[9px] text-[#e06f5c]">0{index + 1}</span>{item}</li>)}
            </ol>
          </section>
        </div>
      </div>
    </main>
  )
}
