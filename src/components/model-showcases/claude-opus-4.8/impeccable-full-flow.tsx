"use client"

import { useEffect, useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, Check, CircleAlert } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "impeccable"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Confident", "Warm", "Direct"]
const STYLES = ["Clean product", "Soft studio", "Editorial"]

const CONCEPTS = [
  { id: "A", name: "Daily Signal", line: "Hear the work before the room gets loud.", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", name: "Desk Ritual", line: "Start focused, stay reachable.", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", name: "Launch Proof", line: "Fewer pauses between idea and edit.", reach: 910, ctr: 3.9, conv: 2.6 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function ImpeccableFullFlow() {
  const [brief, setBrief] = useState("Introduce Muse as a calm, dependable studio for planning a premium wearable audio launch.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [toast, setToast] = useState<string | null>(null)
  const [log, setLog] = useState<string[]>(["Session restored", "Forecast cached"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 5))
  const flash = (msg: string) => { setToast(msg); note(msg) }
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t) }, [toast])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Generating concepts…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); flash("Brief needs at least 16 characters") }
      else { setGen("success"); flash("Concepts ready") }
    }, 1100)
  }

  const field = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-stone-600">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition focus-visible:border-teal-500 focus-visible:ring-4 focus-visible:ring-teal-500/15">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-teal-600" />Muse</span>
          <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">{MODEL}</span>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700">{CHAIN}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-stone-400">
            <span className={`size-2 rounded-full ${gen === "loading" ? "bg-amber-500 animate-pulse" : gen === "error" ? "bg-red-500" : "bg-emerald-500"}`} />
            {gen === "loading" ? "Working" : gen === "error" ? "Needs attention" : "Ready"}
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-5 py-7 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex gap-1.5 border-b border-stone-100 p-3">
              {CONCEPTS.map((x, i) => (
                <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id} selected`) }}
                  className={`rounded-lg px-3 py-1.5 text-sm transition ${i === active ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-100"}`}>{x.id}</button>
              ))}
              <span className="ml-auto self-center pr-1 text-xs text-stone-400">{tone} · {style}</span>
            </div>
            <div className="space-y-3 p-7">
              <span className="text-xs uppercase tracking-wider text-teal-600">Key concept</span>
              <h1 className="text-3xl font-semibold tracking-tight">{c.name}</h1>
              <p className="max-w-md text-stone-600">{c.line}</p>
              <p className="text-sm leading-relaxed text-stone-400">{brief}</p>
              <span className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">{channel} · {audience}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => (
              <div key={l} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <p className="text-xs text-stone-500">{l}</p><p className="mt-1 text-2xl font-semibold tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-stone-600">Campaign brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3}
                className="w-full resize-none rounded-xl border border-stone-200 bg-white p-3 text-sm shadow-sm outline-none transition focus-visible:border-teal-500 focus-visible:ring-4 focus-visible:ring-teal-500/15" />
            </label>
            {field("Target audience", audience, setAudience, AUDIENCES)}
            {field("Channel", channel, setChannel, CHANNELS)}
            {field("Tone", tone, setTone, TONES)}
            {field("Visual style", style, setStyle, STYLES)}
            <div className="flex gap-2 pt-1">
              <button onClick={generate} disabled={gen === "loading"}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-60">
                {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}{gen === "loading" ? "Generating…" : "Generate"}
              </button>
              <button onClick={() => flash("Saved")} className="rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:bg-stone-50"><Save className="size-4" /></button>
              <button onClick={() => flash("Exported")} className="rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:bg-stone-50"><Download className="size-4" /></button>
            </div>
            {gen === "error" && <p className="flex items-center gap-1.5 text-sm text-red-600"><CircleAlert className="size-4" />Brief needs at least 16 characters.</p>}
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-sm font-medium text-stone-600">Activity</p>
            <ul className="space-y-1.5 text-sm text-stone-500">{log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-stone-300">•</span>{l}</li>)}</ul>
          </div>
        </aside>
      </main>

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-sm text-white shadow-lg">
          <span className="inline-flex items-center gap-2"><Check className="size-4 text-teal-400" />{toast}</span>
        </div>
      )}
    </div>
  )
}
