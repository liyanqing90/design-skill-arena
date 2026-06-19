"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "react-bits"

const AUDIENCES = ["Urban creators", "Night owls", "Festival crowd"]
const CHANNELS = ["Paid social", "OOH", "Audio"]
const TONES = ["Bold", "Playful", "Hyped"]
const STYLES = ["Neon", "Glow", "Pulse"]

const CONCEPTS = [
  { id: "A", name: "AFTERGLOW", line: "The sound that stays after the lights go down.", glow: "shadow-fuchsia-500/40", grad: "from-fuchsia-500 to-indigo-600", reach: 940, ctr: 5.1, conv: 2.4 },
  { id: "B", name: "STILL / LOUD", line: "Silence you can wear. Volume you control.", glow: "shadow-amber-500/40", grad: "from-amber-400 to-rose-600", reach: 870, ctr: 4.4, conv: 3.0 },
  { id: "C", name: "OPEN AIR", line: "Built for the open air and the late train home.", glow: "shadow-cyan-500/40", grad: "from-cyan-400 to-blue-600", reach: 1010, ctr: 4.0, conv: 2.7 },
]

type Gen = "idle" | "loading" | "success" | "error"

function useCountUp(target: number, deps: unknown[]) {
  const [v, setV] = useState(target)
  const ref = useRef(target)
  useEffect(() => {
    const from = ref.current; const start = performance.now(); const dur = 600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur); const e = 1 - Math.pow(1 - p, 3)
      setV(from + (target - from) * e)
      if (p < 1) raf = requestAnimationFrame(tick); else ref.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return v
}

export default function MotionBits() {
  const [brief, setBrief] = useState("A kinetic, energetic launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Stage ready"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (TONES.indexOf(tone) + STYLES.indexOf(style)) * 0.04
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.4)).toFixed(1), conv: +(c.conv * (1 + k * 0.2)).toFixed(1) }
  }, [tone, style, c])

  const reach = useCountUp(m.reach, [m.reach])
  const ctr = useCountUp(m.ctr, [m.ctr])
  const conv = useCountUp(m.conv, [m.conv])

  const move = (d: number) => { setActive((a) => (a + d + CONCEPTS.length) % CONCEPTS.length); note("Slide changed") }
  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Animating concepts…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Too short to animate") }
      else { setGen("success"); note("Sequence complete") }
    }, 1100)
  }

  const pill = (val: string, set: (v: string) => void, opts: string[]) => (
    <select value={val} onChange={(e) => set(e.target.value)} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white outline-none transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-white/60">
      {opts.map((o) => <option key={o} className="text-slate-900">{o}</option>)}
    </select>
  )

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-10">
        <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 animate-pulse text-fuchsia-400" />Muse</span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{MODEL}</span>
        <span className="rounded-full border border-fuchsia-400/40 px-2.5 py-0.5 text-xs text-fuchsia-300">{CHAIN}</span>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-6 sm:px-10">
        <div className="relative">
          <div className={`overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} shadow-2xl ${c.glow} transition-all duration-500`}>
            <div className="relative flex min-h-[260px] flex-col justify-end p-7 sm:p-10">
              <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
              <span key={`${c.id}-tag`} className="relative animate-[arena-enter_500ms_both] text-xs uppercase tracking-[0.3em] text-white/80">Concept {c.id}</span>
              <h1 key={c.id} className="relative animate-[arena-enter_600ms_both] text-4xl font-black tracking-tight sm:text-6xl">{c.name}</h1>
              <p className="relative mt-3 max-w-md text-white/85">{c.line}</p>
            </div>
          </div>
          <button onClick={() => move(-1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur transition hover:scale-110 hover:bg-black/50"><ChevronLeft className="size-5" /></button>
          <button onClick={() => move(1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur transition hover:scale-110 hover:bg-black/50"><ChevronRight className="size-5" /></button>
          <div className="mt-3 flex justify-center gap-2">
            {CONCEPTS.map((x, i) => <button key={x.id} aria-label={`Go to ${x.id}`} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"}`} />)}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[["Reach", `${Math.round(reach)}K`], ["CTR", `${ctr.toFixed(1)}%`], ["Conversion", `${conv.toFixed(1)}%`]].map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-xs text-white/60">{l}</p><p className="mt-1 text-3xl font-bold tabular-nums">{v}</p>
            </div>
          ))}
        </div>

        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={2} className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400" />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {pill(audience, setAudience, AUDIENCES)}{pill(channel, setChannel, CHANNELS)}{pill(tone, setTone, TONES)}{pill(style, setStyle, STYLES)}
          <button onClick={generate} disabled={gen === "loading"} className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-2 text-sm font-semibold transition hover:scale-105 disabled:opacity-60">
            {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}{gen === "loading" ? "Animating" : "Generate"}
          </button>
          <button onClick={() => note("Saved")} className="rounded-full border border-white/20 p-2 transition hover:scale-110 hover:bg-white/10"><Save className="size-4" /></button>
          <button onClick={() => note("Exported")} className="rounded-full border border-white/20 p-2 transition hover:scale-110 hover:bg-white/10"><Download className="size-4" /></button>
        </div>
        <p className={`mt-3 text-xs ${gen === "error" ? "text-red-400" : gen === "success" ? "text-emerald-400" : "text-white/50"}`}>{log[0]}</p>
      </main>
    </div>
  )
}
