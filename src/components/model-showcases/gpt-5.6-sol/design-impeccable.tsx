"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  Download,
  FileOutput,
  LoaderCircle,
  MousePointer2,
  RotateCcw,
  Save,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

type Proof = "A" | "B" | "C"
type StudioState = "idle" | "loading" | "success" | "error"

const proofs: Record<
  Proof,
  {
    label: string
    headline: string
    kicker: string
    note: string
    reach: string
    ctr: string
    conversion: string
    poster: string
  }
> = {
  A: {
    label: "The declaration",
    headline: "GOOD IDEAS NEED ROOM.",
    kicker: "A launch system for deep creative focus.",
    note: "Direct type / decisive crop / high recall",
    reach: "2.9M",
    ctr: "4.8%",
    conversion: "8.1%",
    poster: "bg-[#e90062] text-black",
  },
  B: {
    label: "The interruption",
    headline: "KEEP THE NOISE. CUT THE WAIT.",
    kicker: "Make an hour feel expansive again.",
    note: "Split rhythm / active tension / social first",
    reach: "3.6M",
    ctr: "4.3%",
    conversion: "7.5%",
    poster: "bg-[#111111] text-white",
  },
  C: {
    label: "The artifact",
    headline: "TIME, DESIGNED.",
    kicker: "An object for teams who make what comes next.",
    note: "Quiet field / product authority / premium intent",
    reach: "2.3M",
    ctr: "5.2%",
    conversion: "9.4%",
    poster: "bg-[#f3efe6] text-black",
  },
}

export default function DesignImpeccable() {
  const [proof, setProof] = useState<Proof>("A")
  const [brief, setBrief] = useState("Introduce Muse One as the focus tool for creative teams who refuse disposable work.")
  const [audience, setAudience] = useState("Independent studios")
  const [channel, setChannel] = useState("Print + social")
  const [tone, setTone] = useState("Provocative")
  const [visualStyle, setVisualStyle] = useState("Swiss disruption")
  const [typeScale, setTypeScale] = useState(72)
  const [state, setState] = useState<StudioState>("idle")
  const [saved, setSaved] = useState(false)
  const [activity, setActivity] = useState([
    "17:42 / Proof A pinned",
    "17:39 / Type scale set to 72",
    "17:35 / Brief imported",
  ])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const attemptsRef = useRef(0)
  const runTokenRef = useRef(0)
  const active = proofs[proof]

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  function log(message: string) {
    const time = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())
    setActivity((items) => [`${time} / ${message}`, ...items].slice(0, 4))
  }

  function cancelPendingRun() {
    runTokenRef.current += 1
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function generate() {
    cancelPendingRun()
    setState("loading")
    setSaved(false)
    attemptsRef.current += 1
    const attempt = attemptsRef.current
    const runToken = runTokenRef.current
    log("Press check started")
    timeoutRef.current = setTimeout(() => {
      if (runToken !== runTokenRef.current) return
      timeoutRef.current = null
      if (attempt % 2 === 0) {
        setState("error")
        log("Ink conflict flagged")
      } else {
        setState("success")
        log(`Proof ${proof} re-composed`)
      }
    }, 810)
  }

  function save() {
    cancelPendingRun()
    setSaved(true)
    setState("success")
    log(`Proof ${proof} saved`)
  }

  function exportProof() {
    cancelPendingRun()
    setState("success")
    log(`Proof ${proof} packaged for export`)
  }

  function chooseProof(id: Proof) {
    cancelPendingRun()
    setProof(id)
    setState("idle")
    log(`Proof ${id} moved to press bed`)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#e8e5dd] text-[#0b0b0b]">
      <header className="bg-black px-4 py-3 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xl font-black tracking-[-0.04em]">MUSE®</span>
            <span className="h-5 w-px bg-white/25" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/65">Print room / 06</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="border border-white/35 px-3 py-1.5 font-semibold">GPT 5.6 Sol</span>
            <span className="bg-[#e90062] px-3 py-1.5 font-semibold text-black">frontend-design + impeccable</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 border-b-2 border-black pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em]">Campaign production desk</p>
            <h1 className="mt-1 font-serif text-2xl italic tracking-tight sm:text-3xl">The launch, set in type.</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={generate} className="inline-flex min-h-11 items-center gap-2 bg-black px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#e90062] hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/35">
              {state === "loading" ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="size-4" />}
              {state === "loading" ? "On press" : "Generate"}
            </button>
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-2 border-2 border-black bg-white px-4 text-xs font-bold uppercase tracking-wider transition hover:bg-[#f6d6e3] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/35">
              {saved ? <Check className="size-4" /> : <Save className="size-4" />}{saved ? "Saved" : "Save"}
            </button>
            <button type="button" onClick={exportProof} className="inline-flex min-h-11 items-center gap-2 border-2 border-black bg-white px-4 text-xs font-bold uppercase tracking-wider transition hover:bg-[#f6d6e3] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/35">
              <Download className="size-4" /> Export
            </button>
          </div>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(240px,0.65fr)_minmax(0,1.8fr)] xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <aside className="min-w-0 border-2 border-black bg-[#f8f6f0] p-4" aria-label="Typesetting controls">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Copy & measure</h2>
              <span className="font-mono text-[10px]">CMYK</span>
            </div>
            <label htmlFor="di-brief" className="mt-4 block text-[10px] font-bold uppercase tracking-wider">Campaign Brief</label>
            <textarea id="di-brief" value={brief} onChange={(event) => setBrief(event.target.value)} className="mt-2 min-h-28 w-full resize-y border-2 border-black bg-white p-3 font-serif text-sm leading-5 outline-none transition focus:bg-[#fff5f9] focus:ring-4 focus:ring-[#e90062]/30" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {([
                ["Audience", "di-audience", audience, setAudience, ["Independent studios", "Culture-led founders", "Design graduates"]],
                ["Channel", "di-channel", channel, setChannel, ["Print + social", "OOH sequence", "Launch journal"]],
                ["Tone", "di-tone", tone, setTone, ["Provocative", "Precise", "Deadpan"]],
                ["Visual style", "di-style", visualStyle, setVisualStyle, ["Swiss disruption", "Brutalist catalog", "Editorial restraint"]],
              ] as const).map(([label, id, value, setter, options]) => (
                <label key={id} htmlFor={id} className="grid gap-1 text-[10px] font-bold uppercase tracking-wider">
                  {label}
                  <select id={id} value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 border-2 border-black bg-white px-2 text-xs font-semibold normal-case tracking-normal outline-none transition hover:bg-[#f6d6e3] focus:ring-4 focus:ring-[#e90062]/30">
                    {options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              ))}
            </div>
            <label htmlFor="di-scale" className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
              Type scale <output>{typeScale} pt</output>
            </label>
            <input id="di-scale" type="range" min="54" max="92" value={typeScale} onChange={(event) => setTypeScale(Number(event.target.value))} className="mt-2 h-11 w-full accent-[#e90062]" />
            <div className="mt-3 grid grid-cols-8 border-x border-black text-center font-mono text-[8px]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((mark) => <span key={mark} className="border-r border-black py-1 last:border-r-0">{mark}</span>)}
            </div>
          </aside>

          <section className="relative min-w-0 overflow-hidden border-2 border-black bg-[#bdbab2] p-3 sm:p-6" aria-label="Press bed preview">
            <div className="absolute inset-x-0 top-0 flex h-5 items-end bg-black/10 px-2">
              {Array.from({ length: 18 }).map((_, index) => <span key={index} className="h-2 flex-1 border-l border-black/45" />)}
            </div>
            <div className="absolute inset-y-0 left-0 flex w-5 flex-col bg-black/10 pt-5">
              {Array.from({ length: 12 }).map((_, index) => <span key={index} className="w-2 flex-1 border-t border-black/45" />)}
            </div>
            <div className={`relative ml-3 mt-3 flex min-h-[545px] max-w-[880px] flex-col justify-between overflow-hidden border-2 border-black p-5 shadow-[12px_12px_0_#0b0b0b] sm:p-8 ${active.poster}`}>
              <div className="flex items-start justify-between gap-4 border-b-2 border-current pb-3 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>Muse One / Edition 01</span>
                <span>{audience}</span>
              </div>
              <div className="relative py-8">
                <div className="absolute -right-20 top-0 size-64 rounded-full border-[35px] border-current opacity-10" />
                <p className="relative max-w-3xl font-sans font-black leading-[0.83] tracking-[-0.04em]" style={{ fontSize: `clamp(3rem, ${typeScale / 10}vw, ${typeScale}px)` }}>{active.headline}</p>
                <p className="relative mt-7 max-w-md border-t-2 border-current pt-4 font-serif text-lg italic leading-6">{active.kicker}</p>
              </div>
              <div className="grid gap-4 border-t-2 border-current pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="min-w-0">
                  <p className="line-clamp-2 max-w-xl text-xs leading-5 opacity-75">{brief || "Add campaign copy at the left typesetting panel."}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em]">{tone} / {visualStyle} / {channel}</p>
                </div>
                <button type="button" className="min-h-11 border-2 border-current px-4 text-xs font-black uppercase tracking-wider transition hover:-translate-y-1 hover:shadow-[4px_4px_0_currentColor] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/40 motion-reduce:transform-none">Open edition ↗</button>
              </div>
            </div>
          </section>

          <aside className="min-w-0 border-l-2 border-black pl-4 lg:col-span-2 xl:col-span-1" aria-label="Press notes and forecast">
            <div className="grid grid-cols-3 border-y-2 border-black py-3 text-center xl:grid-cols-1 xl:text-left">
              {[["Reach", active.reach], ["CTR", active.ctr], ["Conversion", active.conversion]].map(([label, value]) => (
                <div key={label} className="border-r border-black px-2 last:border-r-0 xl:border-b xl:border-r-0 xl:py-3 xl:first:pt-0 xl:last:border-b-0 xl:last:pb-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest">{label}</p>
                  <p className="mt-1 font-serif text-2xl italic">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-b border-black pb-4" aria-live="polite">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Press status</p>
              <div className="mt-2 min-h-12">
                {state === "idle" && <p className="flex items-center gap-2 text-xs"><MousePointer2 className="size-4" /> Select a proof or adjust type.</p>}
                {state === "loading" && <p role="status" className="flex items-center gap-2 text-xs"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" /> Plates are being composed…</p>}
                {state === "success" && <p role="status" className="flex items-center gap-2 text-xs font-semibold text-[#08633f]"><Check className="size-4" /> {saved ? "Proof saved to the cabinet." : "Press check complete."}</p>}
                {state === "error" && <p role="alert" className="flex items-center gap-2 text-xs font-semibold text-[#a81747]"><TriangleAlert className="size-4" /> Ink density conflict. Generate again.</p>}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Marginalia / Activity</p>
              <ol className="mt-3 space-y-3 font-serif text-xs italic leading-5">
                {activity.map((item, index) => <li key={`${item}-${index}`} className="border-l border-black pl-3">{item}</li>)}
              </ol>
            </div>
            <div className="mt-5 bg-black p-4 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Art direction note</p>
              <p className="mt-2 font-serif text-sm italic leading-5">{active.note}. Preserve the rough edge when adapting to {channel.toLowerCase()}.</p>
            </div>
          </aside>
        </div>

        <section className="mt-4 border-t-2 border-black pt-4" aria-labelledby="di-proofs">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="di-proofs" className="text-xs font-black uppercase tracking-[0.2em]">A/B/C press proofs</h2>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider"><FileOutput className="size-3.5" /> Tap a proof to mount it</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {(Object.keys(proofs) as Proof[]).map((id, index) => {
              const item = proofs[id]
              const selected = proof === id
              return (
                <button key={id} type="button" onClick={() => chooseProof(id)} aria-pressed={selected} className={`group min-h-40 border-2 border-black p-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/35 ${selected ? "bg-[#e90062] shadow-[7px_7px_0_#0b0b0b]" : "bg-[#f8f6f0] hover:-translate-y-1 hover:shadow-[5px_5px_0_#0b0b0b] motion-reduce:transform-none"}`}>
                  <div className="flex items-center justify-between border-b border-black pb-2 text-[9px] font-bold uppercase tracking-wider"><span>0{index + 1} / {id}</span><span>{selected ? "On bed" : "Proof"}</span></div>
                  <p className="mt-4 max-w-xs text-xl font-black leading-none tracking-[-0.04em]">{item.headline}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px]"><span>R {item.reach}</span><span>C {item.ctr}</span><span>V {item.conversion}</span></div>
                </button>
              )
            })}
          </div>
        </section>

        <button type="button" onClick={() => { cancelPendingRun(); setTypeScale(72); setState("idle"); log("Type scale reset") }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e90062]/35"><RotateCcw className="size-4" /> Reset measure</button>
      </div>
    </main>
  )
}
