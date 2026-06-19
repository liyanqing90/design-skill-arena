"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, CheckCircle2, ArrowRight } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-app-builder → ui-ux-pro-max → taste-skill → impeccable"
const STEPS = ["Scaffold", "Pattern", "Refine", "Polish"]

const AUDIENCES = ["Product teams", "Urban creators", "Early adopters"]
const CHANNELS = ["In-app", "Paid social", "Launch email"]
const TONES = ["Polished", "Helpful", "Confident"]
const STYLES = ["Product UI", "Dashboard", "Clean"]

const CONCEPTS = [
  { id: "A", name: "Flow State", line: "From idea to shipped, fewer steps in between.", reach: 840, ctr: 4.5, conv: 3.2 },
  { id: "B", name: "Daily Driver", line: "The control surface your team actually keeps open.", reach: 780, ctr: 4.9, conv: 3.5 },
  { id: "C", name: "Ship Proof", line: "Polished states for every edge of the journey.", reach: 910, ctr: 4.2, conv: 2.9 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function ProductPolishChain() {
  const [brief, setBrief] = useState("A polished, product-grade launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [step, setStep] = useState(-1)
  const [log, setLog] = useState<string[]>(["Workspace ready"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 5))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    if (brief.trim().length < 16) { setGen("error"); note("Brief too short"); return }
    setGen("loading"); setStep(0); note("Scaffold · building…")
    let i = 0
    const tick = () => { i += 1; if (i < STEPS.length) { setStep(i); note(`${STEPS[i]} · running…`); setTimeout(tick, 460) } else { setStep(STEPS.length); setGen("success"); note("Pipeline complete") } }
    setTimeout(tick, 460)
  }

  const field = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )

  const pct = gen === "success" ? 100 : step < 0 ? 0 : Math.round((step / STEPS.length) * 100)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-6 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-teal-600" />Muse</span>
          <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs text-white">{MODEL}</span>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs text-teal-700">{CHAIN}</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">{STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${step > i ? "text-teal-700" : step === i ? "bg-teal-600 text-white" : "text-slate-400"}`}>{step === i && gen === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : step > i ? <CheckCircle2 className="size-3.5" /> : <span className="grid size-4 place-items-center rounded-full border border-current text-[10px]">{i + 1}</span>}{s}</span>
              {i < STEPS.length - 1 && <ArrowRight className="size-3.5 shrink-0 text-slate-300" />}
            </div>
          ))}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${pct}%` }} /></div>
        </div>
      </div>

      <main className="mx-auto grid max-w-5xl gap-5 px-6 py-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-4">
          <div className="flex gap-2">{CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${i === active ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200 bg-white hover:border-teal-300"}`}>{x.id} · {x.name}</button>)}</div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-teal-600">{tone} · {style}</span>
            <h1 className="mt-1 text-3xl font-semibold">{c.name}</h1>
            <p className="mt-2 text-slate-600">{c.line}</p>
            <p className="mt-2 text-sm text-slate-400">{brief}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">{[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">{l}</p><p className="mt-1 text-xl font-semibold tabular-nums">{v}</p></div>)}</div>
        </section>

        <aside className="space-y-4">
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">Campaign brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} className="w-full resize-none rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500" /></label>
            {field("Audience", audience, setAudience, AUDIENCES)}{field("Channel", channel, setChannel, CHANNELS)}{field("Tone", tone, setTone, TONES)}{field("Style", style, setStyle, STYLES)}
            <div className="flex gap-2 pt-1">
              <button onClick={generate} disabled={gen === "loading"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Run pipeline</button>
              <button onClick={() => note("Saved")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Save className="size-4" /></button>
              <button onClick={() => note("Exported")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Download className="size-4" /></button>
            </div>
            {gen === "error" && <p className="text-xs text-red-500">Brief needs at least 16 characters.</p>}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="mb-2 text-xs font-medium text-slate-500">Activity</p><ul className="space-y-1 text-sm text-slate-600">{log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-slate-300">›</span>{l}</li>)}</ul></div>
        </aside>
      </main>
    </div>
  )
}
