"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "design-logic + ui-ux-pro-max"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Systematic", "Confident", "Precise"]
const STYLES = ["Bento", "Grid", "Token-led"]

const CONCEPTS = [
  { id: "A", name: "Signal System", line: "A modular identity that scales across every surface.", reach: 880, ctr: 4.4, conv: 2.9 },
  { id: "B", name: "Grid Native", line: "Built on an 8-pt rhythm from hero to footer.", reach: 800, ctr: 4.8, conv: 3.2 },
  { id: "C", name: "Token Proof", line: "One palette, three densities, infinite reuse.", reach: 940, ctr: 4.1, conv: 2.7 },
]

const TOKENS = [
  { name: "--accent", val: "#4f46e5", swatch: "bg-indigo-600" },
  { name: "--surface", val: "#f1f5f9", swatch: "bg-slate-100" },
  { name: "--ink", val: "#0f172a", swatch: "bg-slate-900" },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function DesignUxPro() {
  const [brief, setBrief] = useState("A systematic, scalable launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["System initialised"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Compiling system…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Brief too short") }
      else { setGen("success"); note("System compiled") }
    }, 1050)
  }

  const field = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1"><span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-indigo-600" />Muse</span>
          <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-white">{MODEL}</span>
          <span className="rounded border border-indigo-300 bg-indigo-50 px-2 py-0.5 font-mono text-[11px] text-indigo-700">{CHAIN}</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-6 py-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id} active`) }} className={`rounded-lg border p-3 text-left transition ${i === active ? "border-indigo-500 bg-white shadow-sm" : "border-slate-300 bg-white/60 hover:border-indigo-300"}`}><span className="font-mono text-[11px] text-slate-400">CONCEPT.{x.id}</span><p className="mt-1 font-medium">{x.name}</p></button>)}
          </div>
          <div className="relative rounded-xl border border-dashed border-indigo-300 bg-white p-8">
            <span className="absolute -top-2.5 left-4 bg-white px-2 font-mono text-[11px] text-indigo-500">artboard · {style}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-500">{tone}</span>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight">{c.name}</h1>
            <p className="mt-2 text-slate-600">{c.line}</p>
            <p className="mt-2 text-sm text-slate-400">{brief}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["reach", `${m.reach}K`], ["ctr", `${m.ctr}%`], ["conv", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-lg border border-slate-300 bg-white p-4"><p className="font-mono text-[11px] uppercase text-slate-400">{l}</p><p className="mt-1 text-2xl font-semibold tabular-nums">{v}</p></div>)}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-300 bg-white p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">Tokens</p>
            <ul className="space-y-2">{TOKENS.map((t) => <li key={t.name} className="flex items-center gap-2 font-mono text-xs"><span className={`size-4 rounded ${t.swatch} ring-1 ring-slate-300`} /><span className="text-slate-600">{t.name}</span><span className="ml-auto text-slate-400">{t.val}</span></li>)}</ul>
          </div>
          <div className="space-y-3 rounded-xl border border-slate-300 bg-white p-4">
            <label className="block space-y-1"><span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} className="w-full resize-none rounded-md border border-slate-300 p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" /></label>
            {field("Audience", audience, setAudience, AUDIENCES)}{field("Channel", channel, setChannel, CHANNELS)}{field("Tone", tone, setTone, TONES)}{field("Layout", style, setStyle, STYLES)}
            <div className="flex gap-2 pt-1">
              <button onClick={generate} disabled={gen === "loading"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Compile</button>
              <button onClick={() => note("Saved")} className="rounded-md border border-slate-300 p-2 hover:bg-slate-50"><Save className="size-4" /></button>
              <button onClick={() => note("Exported")} className="rounded-md border border-slate-300 p-2 hover:bg-slate-50"><Download className="size-4" /></button>
            </div>
            <p className={`text-xs ${gen === "error" ? "text-red-600" : gen === "success" ? "text-emerald-700" : "text-slate-400"}`}>{log[0]}</p>
          </div>
        </aside>
      </main>
    </div>
  )
}
