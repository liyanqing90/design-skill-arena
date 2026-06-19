"use client"

import { useMemo, useState } from "react"
import { Sparkles, Wand2, Bookmark, Share2, Loader2 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-skill"

const AUDIENCES = ["Urban creators", "Night owls", "Festival crowd"]
const CHANNELS = ["Paid social", "OOH billboard", "Spotify audio"]
const TONES = ["Bold", "Dreamy", "Raw"]
const STYLES = ["Neon dusk", "Mono studio", "Chromatic"]

const CONCEPTS = [
  { id: "A", name: "AFTERGLOW", line: "The sound that stays after the lights go down.", grad: "from-fuchsia-600 via-purple-700 to-indigo-900", reach: 940, ctr: 5.1, conv: 2.4 },
  { id: "B", name: "STILL / LOUD", line: "Silence you can wear. Volume you control.", grad: "from-amber-500 via-rose-600 to-slate-900", reach: 870, ctr: 4.4, conv: 3.0 },
  { id: "C", name: "OPEN AIR", line: "Built for the open air and the late train home.", grad: "from-cyan-500 via-blue-700 to-slate-950", reach: 1010, ctr: 4.0, conv: 2.7 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function VisualFrontend() {
  const [brief, setBrief] = useState("A premium wearable audio launch that feels cinematic and nocturnal.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Visual board ready"])

  const c = CONCEPTS[active]
  const note = (m: string) => setLog((p) => [m, ...p].slice(0, 4))
  const metrics = useMemo(() => {
    const k = (TONES.indexOf(tone) + STYLES.indexOf(style)) * 0.04
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.4)).toFixed(1), conv: +(c.conv * (1 + k * 0.2)).toFixed(1) }
  }, [tone, style, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Rendering key visual…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Brief too thin to render") }
      else { setGen("success"); note(`Key visual ready · ${style}`) }
    }, 1200)
  }

  const pill = (val: string, set: (v: string) => void, opts: string[]) => (
    <select value={val} onChange={(e) => set(e.target.value)}
      className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-white/60">
      {opts.map((o) => <option key={o} className="text-slate-900">{o}</option>)}
    </select>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className={`relative min-h-screen bg-gradient-to-br ${c.grad} transition-all duration-700`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <header className="relative flex flex-wrap items-center gap-3 px-5 py-4 sm:px-10">
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight"><Sparkles className="size-5" />Muse</span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs backdrop-blur">{MODEL}</span>
          <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-xs">{CHAIN}</span>
        </header>

        <section className="relative mx-auto flex max-w-5xl flex-col justify-center px-5 py-10 sm:px-10 sm:py-20">
          <span className="text-sm uppercase tracking-[0.3em] text-white/70">Concept {c.id} · {channel}</span>
          <h1 className="mt-3 text-5xl font-black leading-none tracking-tight sm:text-8xl">{c.name}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-2xl">{c.line}</p>
          <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={2}
            className="mt-6 max-w-xl resize-none rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white/90 outline-none backdrop-blur placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-white/60" />

          <div className="mt-6 flex flex-wrap gap-6 text-white/90">
            {[["Reach", `${metrics.reach}K`], ["CTR", `${metrics.ctr}%`], ["Conv", `${metrics.conv}%`]].map(([l, v]) => (
              <div key={l}><p className="text-xs uppercase tracking-wider text-white/60">{l}</p><p className="text-3xl font-bold">{v}</p></div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            {CONCEPTS.map((x, i) => (
              <button key={x.id} onClick={() => { setActive(i); note(`Switched to ${x.name}`) }}
                className={`h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-br ${x.grad} text-left transition ${i === active ? "ring-2 ring-white scale-105" : "opacity-70 hover:opacity-100"}`}>
                <span className="block p-2 text-xs font-bold">{x.id}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="sticky bottom-0 z-10 border-t border-white/15 bg-black/30 px-5 py-3 backdrop-blur-md sm:px-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2">
            {pill(audience, setAudience, AUDIENCES)}
            {pill(channel, setChannel, CHANNELS)}
            {pill(tone, setTone, TONES)}
            {pill(style, setStyle, STYLES)}
            <button onClick={generate} disabled={gen === "loading"}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:opacity-60">
              {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
              {gen === "loading" ? "Rendering" : "Generate"}
            </button>
            <button onClick={() => note("Saved to board")} className="rounded-full border border-white/30 p-2 hover:bg-white/10"><Bookmark className="size-4" /></button>
            <button onClick={() => note("Shared link copied")} className="rounded-full border border-white/30 p-2 hover:bg-white/10"><Share2 className="size-4" /></button>
          </div>
          <p className="mx-auto mt-2 max-w-5xl text-xs text-white/60">
            {gen === "error" ? "⚠ Brief too short to render a key visual." : gen === "success" ? "✓ Key visual rendered." : log[0]}
          </p>
        </div>
      </div>
    </div>
  )
}
