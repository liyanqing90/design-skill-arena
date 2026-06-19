"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, CheckCircle2, XCircle, Circle } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-app-builder + impeccable"

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
const STAGES: Gen[] = ["idle", "loading", "success"]

export default function StandardImpeccable() {
  const [brief, setBrief] = useState("A polished, dependable launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Workspace ready", "Validation passed"])

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
    setGen("loading"); note("Generating…")
    setTimeout(() => { setGen("success"); note("Concepts generated") }, 1100)
  }

  const banner = {
    idle: { c: "bg-slate-100 text-slate-600 border-slate-200", t: "Ready to generate." },
    loading: { c: "bg-amber-50 text-amber-700 border-amber-200", t: "Generating concepts — please wait." },
    success: { c: "bg-emerald-50 text-emerald-700 border-emerald-200", t: "Concepts generated successfully." },
    error: { c: "bg-red-50 text-red-700 border-red-200", t: "Brief needs at least 16 characters." },
  }[gen]

  const sel = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-indigo-600" />Muse</span>
          <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs text-white">{MODEL}</span>
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-700">{CHAIN}</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 pt-5">
        <div className="mb-4 flex items-center gap-2 rounded-xl border bg-white p-1.5">
          {STAGES.map((s, i) => {
            const reached = STAGES.indexOf(gen === "error" ? "idle" : gen) >= i || gen === "error"
            return (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium capitalize ${gen === s ? "bg-indigo-600 text-white" : reached ? "text-indigo-600" : "text-slate-400"}`}>
                  {s === "loading" && gen === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : gen === "success" && s !== "idle" ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}{s}
                </span>
                {i < STAGES.length - 1 && <span className="h-px flex-1 bg-slate-200" />}
              </div>
            )
          })}
        </div>
        <div role="status" className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${banner.c}`}>
          {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : gen === "error" ? <XCircle className="size-4" /> : gen === "success" ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}{banner.t}
        </div>
      </div>

      <main className="mx-auto grid max-w-5xl gap-5 px-5 pb-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-4">
          <div className="flex gap-2">{CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${i === active ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white hover:border-indigo-300"}`}>{x.id} · {x.name}</button>)}</div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-indigo-500">{tone} · {style}</span>
            <h1 className="mt-1 text-3xl font-semibold">{c.name}</h1>
            <p className="mt-2 text-slate-600">{c.line}</p>
            <p className="mt-2 text-sm text-slate-400">{brief}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">{[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">{l}</p><p className="mt-1 text-xl font-semibold tabular-nums">{v}</p></div>)}</div>
        </section>

        <aside className="space-y-4">
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block space-y-1"><span className="text-xs font-medium text-slate-500">Campaign brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} aria-invalid={!valid} className={`w-full resize-none rounded-lg border p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${valid ? "border-slate-200" : "border-red-400"}`} />
              {!valid && <span className="text-xs text-red-500">Minimum 16 characters.</span>}
            </label>
            {sel("Audience", audience, setAudience, AUDIENCES)}{sel("Channel", channel, setChannel, CHANNELS)}{sel("Tone", tone, setTone, TONES)}{sel("Visual style", style, setStyle, STYLES)}
            <div className="flex gap-2 pt-1">
              <button onClick={generate} disabled={gen === "loading"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Generate</button>
              <button onClick={() => note("Saved")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Save className="size-4" /></button>
              <button onClick={() => note("Exported")} className="rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50"><Download className="size-4" /></button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="mb-2 text-xs font-medium text-slate-500">Activity</p><ul className="space-y-1 text-sm text-slate-600">{log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-slate-300">›</span>{l}</li>)}</ul></div>
        </aside>
      </main>
    </div>
  )
}
