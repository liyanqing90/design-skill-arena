"use client"

import { useMemo, useState } from "react"
import {
  Sparkles, Play, Save, Download, Loader2, CheckCircle2, AlertTriangle,
} from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-app-builder"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Confident", "Useful", "Direct"]
const STYLES = ["Clean product", "Soft studio", "Sharp contrast"]

const CONCEPTS = [
  { id: "A", name: "Daily Signal", line: "Hear the work before the room gets loud.", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", name: "Desk Ritual", line: "Start focused, stay reachable.", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", name: "Launch Proof", line: "Fewer pauses between idea and edit.", reach: 910, ctr: 3.9, conv: 2.6 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function StandardBuilder() {
  const [brief, setBrief] = useState("Launch Muse as the campaign studio for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Workspace ready", "Default brief loaded"])

  const c = CONCEPTS[active]
  const note = (m: string) => setLog((p) => [m, ...p].slice(0, 5))
  const metrics = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return {
      reach: Math.round(c.reach * (1 + k)),
      ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1),
      conv: +(c.conv * (1 + k * 0.3)).toFixed(1),
    }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Generate started")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Error: brief too short") }
      else { setGen("success"); note(`Generated 3 concepts for ${audience}`) }
    }, 1100)
  }

  const select = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-indigo-600" />Muse</span>
          <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">{MODEL}</span>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-700">{CHAIN}</span>
          <span className="ml-auto text-xs text-slate-400">Campaign Studio</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-5 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          <label className="block space-y-1">
            <span className="text-xs font-medium text-slate-500">Campaign Brief</span>
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={5}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" />
            <span className="text-[11px] text-slate-400">{brief.trim().length} chars</span>
          </label>
          {select("Target audience", audience, setAudience, AUDIENCES)}
          {select("Channel", channel, setChannel, CHANNELS)}
          {select("Tone", tone, setTone, TONES)}
          {select("Visual style", style, setStyle, STYLES)}
        </aside>

        <section className="space-y-4">
          <div className="flex gap-2">
            {CONCEPTS.map((x, i) => (
              <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id} selected`) }}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${i === active ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}>
                {x.id} · {x.name}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white">
            <div className="space-y-3 p-6 sm:p-8">
              <span className="text-xs uppercase tracking-wider text-indigo-500">{style} · {tone}</span>
              <h1 className="text-2xl font-bold sm:text-3xl">{c.name}</h1>
              <p className="max-w-md text-slate-600">{c.line}</p>
              <p className="text-sm text-slate-400">{brief.slice(0, 90)}{brief.length > 90 ? "…" : ""}</p>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">{channel} → {audience}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[["Reach", `${metrics.reach}K`], ["CTR", `${metrics.ctr}%`], ["Conversion", `${metrics.conv}%`]].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">{l}</p>
                <p className="mt-1 text-xl font-semibold">{v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={generate} disabled={gen === "loading"}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60">
              {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
              {gen === "loading" ? "Generating…" : "Generate"}
            </button>
            <button onClick={() => note("Campaign saved")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"><Save className="size-4" />Save</button>
            <button onClick={() => note("Exported bundle")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"><Download className="size-4" />Export</button>
            {gen === "success" && <span className="inline-flex items-center gap-1 text-sm text-emerald-600"><CheckCircle2 className="size-4" />Ready</span>}
            {gen === "error" && <span className="inline-flex items-center gap-1 text-sm text-red-600"><AlertTriangle className="size-4" />Brief too short</span>}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-medium text-slate-500">Recent activity</p>
            <ul className="space-y-1 text-sm text-slate-600">
              {log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-slate-300">›</span>{l}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
