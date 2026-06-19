"use client"

import { useEffect, useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, Check, TriangleAlert } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "ui-ux-pro-max"

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

export default function UxProReference() {
  const [brief, setBrief] = useState("Plan an accessible, well-structured launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState<string[]>(["Form ready"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 5))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  useEffect(() => {
    if (gen !== "loading") return
    const iv = setInterval(() => setProgress((p) => Math.min(100, p + 18)), 160)
    const done = setTimeout(() => {
      clearInterval(iv); setProgress(100)
      if (brief.trim().length < 16) { setGen("error"); note("Validation error: brief too short") }
      else { setGen("success"); note("Forecast generated") }
    }, 1000)
    return () => { clearInterval(iv); clearTimeout(done) }
  }, [gen, brief])

  const valid = brief.trim().length >= 16
  const field = (id: string, label: string, hint: string, val: string, set: (v: string) => void, opts: string[]) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <select id={id} value={val} onChange={(e) => set(e.target.value)} aria-describedby={`${id}-h`}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      <p id={`${id}-h`} className="text-xs text-slate-400">{hint}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-sky-600" />Muse</span>
          <span className="rounded-md bg-slate-900 px-2.5 py-0.5 text-xs text-white">{MODEL}</span>
          <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs text-sky-700">{CHAIN}</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-7 lg:grid-cols-2">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setProgress(0); setGen("loading") }}>
          <fieldset className="space-y-2">
            <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step 1 · Brief</legend>
            <label htmlFor="brief" className="text-sm font-medium text-slate-700">Campaign brief <span className="text-red-500">*</span></label>
            <textarea id="brief" value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} aria-invalid={!valid} aria-describedby="brief-h"
              className={`w-full resize-none rounded-lg border bg-white p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${valid ? "border-slate-300" : "border-red-400"}`} />
            <p id="brief-h" className={`text-xs ${valid ? "text-slate-400" : "text-red-500"}`}>{valid ? `${brief.trim().length} characters` : "Minimum 16 characters required."}</p>
          </fieldset>
          <fieldset className="grid grid-cols-2 gap-4">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Step 2 · Parameters</legend>
            {field("aud", "Target audience", "Primary segment", audience, setAudience, AUDIENCES)}
            {field("chn", "Channel", "Where it runs", channel, setChannel, CHANNELS)}
            {field("ton", "Tone", "Voice of copy", tone, setTone, TONES)}
            {field("sty", "Visual style", "Art direction", style, setStyle, STYLES)}
          </fieldset>
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={gen === "loading"} className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 disabled:opacity-60">
              {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}{gen === "loading" ? "Generating…" : "Generate"}
            </button>
            <button type="button" onClick={() => note("Draft saved")} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"><Save className="size-4" />Save</button>
            <button type="button" onClick={() => note("Exported CSV")} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"><Download className="size-4" />Export</button>
          </div>
          {gen === "loading" && <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-sky-600 transition-all" style={{ width: `${progress}%` }} /></div>}
          <p role="status" aria-live="polite" className="flex items-center gap-1.5 text-sm">
            {gen === "success" && <span className="flex items-center gap-1.5 text-emerald-600"><Check className="size-4" />Forecast generated.</span>}
            {gen === "error" && <span className="flex items-center gap-1.5 text-red-600"><TriangleAlert className="size-4" />Please fix the brief.</span>}
            {gen === "idle" && <span className="text-slate-400">Ready to generate.</span>}
          </p>
        </form>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 p-5">
            <div role="tablist" aria-label="Concepts" className="mb-3 flex gap-2">
              {CONCEPTS.map((x, i) => (
                <button key={x.id} role="tab" aria-selected={i === active} onClick={() => { setActive(i); note(`Concept ${x.id} selected`) }}
                  className={`rounded-lg px-3 py-1.5 text-sm transition ${i === active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{x.id}</button>
              ))}
            </div>
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="mt-1 text-slate-600">{c.line}</p>
            <p className="mt-2 text-xs text-slate-400">{tone} · {style} · {channel}</p>
          </div>
          <table className="w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
            <caption className="sr-only">Predicted performance metrics</caption>
            <tbody>
              {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v], i) => (
                <tr key={l} className={i % 2 ? "bg-slate-50" : ""}><th scope="row" className="px-4 py-3 text-left font-medium text-slate-600">{l}</th><td className="px-4 py-3 text-right font-semibold tabular-nums">{v}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="mb-2 text-sm font-medium text-slate-600">Recent actions</p>
            <ul className="space-y-1 text-sm text-slate-500">{log.map((l, i) => <li key={i}>· {l}</li>)}</ul>
          </div>
        </section>
      </main>
    </div>
  )
}
