"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "visual-frontend + taste-skill"

const AUDIENCES = ["Design-led buyers", "Urban creators", "Gallery crowd"]
const CHANNELS = ["Paid social", "Editorial", "OOH"]
const TONES = ["Assured", "Warm", "Understated"]
const STYLES = ["Editorial", "Soft studio", "Monochrome"]

const CONCEPTS = [
  { id: "A", name: "Quiet Power", line: "Presence without the noise.", reach: 860, ctr: 4.3, conv: 2.9, hue: "from-stone-200 to-stone-400", ink: "text-stone-900" },
  { id: "B", name: "Warm Signal", line: "Sound that feels like late light.", reach: 790, ctr: 4.7, conv: 3.2, hue: "from-amber-100 to-orange-300", ink: "text-stone-900" },
  { id: "C", name: "Studio Proof", line: "Crafted for the considered ear.", reach: 920, ctr: 4.0, conv: 2.7, hue: "from-rose-100 to-stone-300", ink: "text-stone-900" },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function VisualTaste() {
  const [brief, setBrief] = useState("A refined, gallery-grade launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Gallery loaded"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 3))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Composing…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Brief too short") }
      else { setGen("success"); note("Concepts composed") }
    }, 1050)
  }

  const quiet = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-2">
      <span className="text-xs uppercase tracking-wider text-stone-400">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="bg-transparent text-right text-sm text-stone-700 outline-none focus-visible:underline">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )

  return (
    <div className="min-h-screen bg-[#faf8f4] text-stone-800">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-5">
        <span className="flex items-center gap-2 font-medium"><Sparkles className="size-5 text-stone-500" />Muse</span>
        <span className="rounded-full border border-stone-300 px-2.5 py-0.5 text-xs text-stone-500">{MODEL}</span>
        <span className="rounded-full border border-stone-300 px-2.5 py-0.5 text-xs text-stone-500">{CHAIN}</span>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-12 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-5">
          <div className={`relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${c.hue} p-8 ${c.ink} transition-all duration-500`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
            <span className="relative text-xs uppercase tracking-[0.3em] opacity-60">{tone} · {style}</span>
            <h1 className="relative mt-2 text-5xl font-semibold tracking-tight">{c.name}</h1>
            <p className="relative mt-2 max-w-sm text-lg opacity-80">{c.line}</p>
          </div>
          <div className="flex gap-3">
            {CONCEPTS.map((x, i) => (
              <button key={x.id} onClick={() => { setActive(i); note(`Viewing ${x.name}`) }} className={`flex-1 overflow-hidden rounded-xl border transition ${i === active ? "border-stone-800" : "border-stone-200 hover:border-stone-400"}`}>
                <span className={`block aspect-video bg-gradient-to-br ${x.hue}`} />
                <span className="block py-2 text-xs text-stone-500">{x.id}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="grid grid-cols-3 gap-4 border-y border-stone-200 py-5">
            {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conv", `${m.conv}%`]].map(([l, v]) => <div key={l}><p className="text-xs uppercase tracking-wider text-stone-400">{l}</p><p className="mt-1 text-2xl font-light tabular-nums">{v}</p></div>)}
          </div>
          <div className="space-y-1">
            <label className="block py-2"><span className="mb-1 block text-xs uppercase tracking-wider text-stone-400">Brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} className="w-full resize-none border-b border-stone-200 bg-transparent pb-2 text-sm leading-relaxed text-stone-700 outline-none focus-visible:border-stone-500" /></label>
            {quiet("Audience", audience, setAudience, AUDIENCES)}{quiet("Channel", channel, setChannel, CHANNELS)}{quiet("Tone", tone, setTone, TONES)}{quiet("Style", style, setStyle, STYLES)}
          </div>
          <div className="flex items-center gap-5">
            <button onClick={generate} disabled={gen === "loading"} className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Generate</button>
            <button onClick={() => note("Saved")} className="text-stone-500 transition hover:text-stone-800"><Save className="size-4" /></button>
            <button onClick={() => note("Exported")} className="text-stone-500 transition hover:text-stone-800"><Download className="size-4" /></button>
            <span className={`ml-auto text-xs ${gen === "error" ? "text-red-600" : gen === "success" ? "text-emerald-700" : "text-stone-400"}`}>{log[0]}</span>
          </div>
        </aside>
      </main>
    </div>
  )
}
