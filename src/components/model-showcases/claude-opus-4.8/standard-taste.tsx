"use client"

import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-app-builder + taste-skill"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Confident", "Quiet", "Direct"]
const STYLES = ["Clean product", "Soft studio", "Editorial"]

const CONCEPTS = [
  { id: "A", name: "Daily Signal", line: "Hear the work before the room gets loud.", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", name: "Desk Ritual", line: "Start focused, stay reachable.", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", name: "Launch Proof", line: "Fewer pauses between idea and edit.", reach: 910, ctr: 3.9, conv: 2.6 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function StandardTaste() {
  const [brief, setBrief] = useState("A restrained, considered launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Draft opened"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 3))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Refining…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Brief too short") }
      else { setGen("success"); note("Concepts refined") }
    }, 1000)
  }

  const quiet = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="flex items-baseline justify-between gap-4 border-b border-stone-200 py-2.5">
      <span className="text-sm text-stone-400">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="bg-transparent text-right text-sm text-stone-700 outline-none focus-visible:underline">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-stone-800">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-sm font-medium tracking-wide text-stone-500">Muse</span>
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <span className="border-b border-stone-300 pb-px">{MODEL}</span>
            <span aria-hidden>·</span>
            <span className="border-b border-stone-300 pb-px">{CHAIN}</span>
          </div>
        </div>

        <div className="mb-8 flex gap-6 text-lg">
          {CONCEPTS.map((x, i) => (
            <button key={x.id} onClick={() => { setActive(i); note(`Reading ${x.name}`) }}
              className={`pb-1 tracking-tight transition ${i === active ? "border-b-2 border-stone-800 text-stone-900" : "text-stone-400 hover:text-stone-600"}`}>{x.id}</button>
          ))}
        </div>

        <article className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400">{tone} · {style}</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">{c.name}</h1>
          <p className="text-lg leading-relaxed text-stone-600">{c.line}</p>
          <p className="text-sm leading-relaxed text-stone-400">{brief}</p>
        </article>

        <div className="mt-10 grid grid-cols-3 gap-6 border-y border-stone-200 py-6">
          {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => (
            <div key={l}><p className="text-xs uppercase tracking-wider text-stone-400">{l}</p><p className="mt-1 text-2xl font-light tabular-nums text-stone-900">{v}</p></div>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <label className="block py-2.5">
            <span className="mb-1 block text-sm text-stone-400">Brief</span>
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} className="w-full resize-none border-b border-stone-200 bg-transparent pb-2 text-sm leading-relaxed text-stone-700 outline-none focus-visible:border-stone-500" />
          </label>
          {quiet("Audience", audience, setAudience, AUDIENCES)}
          {quiet("Channel", channel, setChannel, CHANNELS)}
          {quiet("Tone", tone, setTone, TONES)}
          {quiet("Visual style", style, setStyle, STYLES)}
        </div>

        <div className="mt-8 flex items-center gap-5">
          <button onClick={generate} disabled={gen === "loading"} className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 underline-offset-4 transition hover:underline disabled:opacity-50">
            {gen === "loading" && <Loader2 className="size-4 animate-spin" />}{gen === "loading" ? "Refining…" : "Generate"}
          </button>
          <button onClick={() => note("Saved")} className="text-sm text-stone-500 underline-offset-4 hover:underline">Save</button>
          <button onClick={() => note("Exported")} className="text-sm text-stone-500 underline-offset-4 hover:underline">Export</button>
          <span className={`ml-auto text-xs ${gen === "error" ? "text-red-600" : gen === "success" ? "text-emerald-700" : "text-stone-400"}`}>{log[0]}</span>
        </div>
      </div>
    </div>
  )
}
