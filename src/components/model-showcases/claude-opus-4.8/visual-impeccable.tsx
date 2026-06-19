"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "visual-frontend + impeccable"

const AUDIENCES = ["Urban creators", "Night owls", "Festival crowd"]
const CHANNELS = ["Paid social", "OOH", "Audio"]
const TONES = ["Bold", "Vivid", "Electric"]
const STYLES = ["Neon", "Chrome", "Spectrum"]

const CONCEPTS = [
  { id: "A", name: "OVERDRIVE", line: "Push past the last quiet hour.", reach: 980, ctr: 5.0, conv: 2.5, grad: "from-fuchsia-600 via-purple-600 to-indigo-700" },
  { id: "B", name: "PULSE CITY", line: "Your soundtrack owns the block.", reach: 910, ctr: 4.5, conv: 3.1, grad: "from-cyan-500 via-blue-600 to-violet-700" },
  { id: "C", name: "AFTERHOURS", line: "Built for the long way home.", reach: 1040, ctr: 4.1, conv: 2.8, grad: "from-amber-500 via-rose-600 to-fuchsia-700" },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function VisualImpeccable() {
  const [brief, setBrief] = useState("A vivid, high-energy launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Stage ready", "Inputs validated"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 5))
  const valid = brief.trim().length >= 16
  const m = useMemo(() => {
    const k = (TONES.indexOf(tone) + STYLES.indexOf(style)) * 0.04
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.4)).toFixed(1), conv: +(c.conv * (1 + k * 0.2)).toFixed(1) }
  }, [tone, style, c])

  const generate = () => {
    if (gen === "loading") return
    if (!valid) { setGen("error"); note("Blocked: brief too short"); return }
    setGen("loading"); note("Rendering concepts…")
    setTimeout(() => { setGen("success"); note("Render complete") }, 1100)
  }

  const banner = {
    idle: { c: "border-white/15 bg-white/5 text-white/70", t: "Ready to render." },
    loading: { c: "border-amber-400/30 bg-amber-400/10 text-amber-200", t: "Rendering concepts…" },
    success: { c: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200", t: "Concepts rendered successfully." },
    error: { c: "border-red-400/30 bg-red-400/10 text-red-200", t: "Brief needs at least 16 characters." },
  }[gen]

  const pill = (val: string, set: (v: string) => void, opts: string[]) => (
    <select value={val} onChange={(e) => set(e.target.value)} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white outline-none transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-white/60">{opts.map((o) => <option key={o} className="text-slate-900">{o}</option>)}</select>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-fuchsia-400" />Muse</span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{MODEL}</span>
        <span className="rounded-full border border-fuchsia-400/40 px-2.5 py-0.5 text-xs text-fuchsia-300">{CHAIN}</span>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
        <div role="status" className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${banner.c}`}>
          {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : gen === "error" ? <XCircle className="size-4" /> : gen === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}{banner.t}
        </div>

        <div className={`relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-8 shadow-2xl transition-all duration-500 sm:p-10`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.3),transparent_60%)]" />
          <span className="relative text-xs uppercase tracking-[0.3em] text-white/75">Concept {c.id} · {tone}</span>
          <h1 className="relative mt-1 text-5xl font-black tracking-tight sm:text-7xl">{c.name}</h1>
          <p className="relative mt-3 max-w-md text-lg text-white/85">{c.line}</p>
        </div>

        <div className="mt-4 flex gap-3">
          {CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${i === active ? "border-fuchsia-400 bg-white/10" : "border-white/10 hover:border-white/30"}`}>{x.id} · {x.name}</button>)}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-white/60">{l}</p><p className="mt-1 text-3xl font-bold tabular-nums">{v}</p></div>)}
        </div>

        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={2} aria-invalid={!valid} className={`mt-5 w-full resize-none rounded-2xl border bg-white/5 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${valid ? "border-white/10" : "border-red-400/60"}`} />
        {!valid && <p className="mt-1 text-xs text-red-300">Minimum 16 characters.</p>}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {pill(audience, setAudience, AUDIENCES)}{pill(channel, setChannel, CHANNELS)}{pill(tone, setTone, TONES)}{pill(style, setStyle, STYLES)}
          <button onClick={generate} disabled={gen === "loading"} className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-2 text-sm font-semibold transition hover:scale-105 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Generate</button>
          <button onClick={() => note("Saved")} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"><Save className="size-4" /></button>
          <button onClick={() => note("Exported")} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"><Download className="size-4" /></button>
        </div>
        <ul className="mt-4 space-y-1 text-xs text-white/50">{log.map((l, i) => <li key={i}>› {l}</li>)}</ul>
      </main>
    </div>
  )
}
