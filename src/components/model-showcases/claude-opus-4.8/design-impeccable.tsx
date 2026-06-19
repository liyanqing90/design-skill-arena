"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, CheckCircle2, XCircle, Circle } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "design-logic + impeccable"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Systematic", "Assured", "Crafted"]
const STYLES = ["Editorial grid", "Modular", "Layered"]

const CONCEPTS = [
  { id: "A", name: "Signal System", line: "A modular identity that scales across every surface.", reach: 880, ctr: 4.4, conv: 2.9 },
  { id: "B", name: "Grid Native", line: "Built on an 8-pt rhythm from hero to footer.", reach: 800, ctr: 4.8, conv: 3.2 },
  { id: "C", name: "Layered Proof", line: "Depth and hierarchy that guide the eye.", reach: 940, ctr: 4.1, conv: 2.7 },
]

const CHECKS = ["Contrast AA", "Touch targets", "Focus order", "Grid aligned"]

type Gen = "idle" | "loading" | "success" | "error"
const STAGES: Gen[] = ["idle", "loading", "success"]

export default function DesignImpeccable() {
  const [brief, setBrief] = useState("A systematic and impeccably finished launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["System ready", "Checks queued"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 5))
  const valid = brief.trim().length >= 16
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    if (!valid) { setGen("error"); note("Blocked: brief too short"); return }
    setGen("loading"); note("Running checks…")
    setTimeout(() => { setGen("success"); note("All checks passed") }, 1100)
  }

  const banner = {
    idle: { c: "border-slate-200 bg-slate-50 text-slate-600", t: "Ready to compile system." },
    loading: { c: "border-amber-200 bg-amber-50 text-amber-700", t: "Running design checks…" },
    success: { c: "border-emerald-200 bg-emerald-50 text-emerald-700", t: "System compiled — all checks passed." },
    error: { c: "border-red-200 bg-red-50 text-red-700", t: "Brief needs at least 16 characters." },
  }[gen]

  const field = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-6 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-emerald-600" />Muse</span>
          <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs text-white">{MODEL}</span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700">{CHAIN}</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-5">
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 p-1.5">
          {STAGES.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize ${gen === s ? "bg-emerald-600 text-white" : "text-slate-400"}`}>{s === "loading" && gen === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : gen === "success" && s !== "idle" ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}{s}</span>
              {i < STAGES.length - 1 && <span className="h-px flex-1 bg-slate-200" />}
            </div>
          ))}
        </div>
        <div role="status" className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${banner.c}`}>{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : gen === "error" ? <XCircle className="size-4" /> : gen === "success" ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}{banner.t}</div>
      </div>

      <main className="mx-auto grid max-w-5xl gap-5 px-6 pb-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-4">
          <div className="flex gap-2">{CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${i === active ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 hover:border-emerald-300"}`}>{x.id} · {x.name}</button>)}</div>
          <div className="rounded-2xl border border-slate-200 p-7 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-emerald-600">{tone} · {style}</span>
            <h1 className="mt-1 text-3xl font-semibold">{c.name}</h1>
            <p className="mt-2 text-slate-600">{c.line}</p>
            <p className="mt-2 text-sm text-slate-400">{brief}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">{CHECKS.map((ck) => <span key={ck} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${gen === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500"}`}>{gen === "success" ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}{ck}</span>)}</div>
          <div className="grid grid-cols-3 gap-3">{[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">{l}</p><p className="mt-1 text-xl font-semibold tabular-nums">{v}</p></div>)}</div>
        </section>

        <aside className="space-y-4">
          <div className="space-y-3 rounded-2xl border border-slate-200 p-5 shadow-sm">
            <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">Campaign brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} aria-invalid={!valid} className={`w-full resize-none rounded-lg border p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${valid ? "border-slate-200" : "border-red-400"}`} />
              {!valid && <span className="text-xs text-red-500">Minimum 16 characters.</span>}</label>
            {field("Audience", audience, setAudience, AUDIENCES)}{field("Channel", channel, setChannel, CHANNELS)}{field("Tone", tone, setTone, TONES)}{field("Layout", style, setStyle, STYLES)}
            <div className="flex gap-2 pt-1">
              <button onClick={generate} disabled={gen === "loading"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Compile</button>
              <button onClick={() => note("Saved")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Save className="size-4" /></button>
              <button onClick={() => note("Exported")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Download className="size-4" /></button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5 shadow-sm"><p className="mb-2 text-xs font-medium text-slate-500">Activity</p><ul className="space-y-1 text-sm text-slate-600">{log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-slate-300">›</span>{l}</li>)}</ul></div>
        </aside>
      </main>
    </div>
  )
}
