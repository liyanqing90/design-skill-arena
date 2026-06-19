"use client"

import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "frontend-design"

const AUDIENCES = ["Urban creators", "Studio pros", "Commuters"]
const CHANNELS = ["Paid social", "Editorial PR", "Retail"]
const TONES = ["Confident", "Considered", "Plain"]
const STYLES = ["Editorial", "Technical", "Minimal"]

const CONCEPTS = [
  { id: "A", name: "Daily Signal", angle: "Utility first, proof second", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", name: "Desk Ritual", angle: "Morning focus & team use", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", name: "Launch Proof", angle: "Throughput & evidence", reach: 910, ctr: 3.9, conv: 2.6 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function DesignLogic() {
  const [brief, setBrief] = useState("Position Muse as the disciplined planning surface for a premium wearable audio launch.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Document initialized"])

  const c = CONCEPTS[active]
  const note = (m: string) => setLog((p) => [m, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + STYLES.indexOf(style)) * 0.04
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, style, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Composing layout grid…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Brief fails minimum length rule") }
      else { setGen("success"); note("Concepts typeset") }
    }, 1000)
  }

  const field = (n: string, label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <div className="grid grid-cols-[2rem_1fr] items-center gap-2 border-b border-neutral-200 py-2">
      <span className="font-mono text-xs text-neutral-400">{n}</span>
      <label className="flex items-center justify-between gap-3">
        <span className="text-sm text-neutral-500">{label}</span>
        <select value={val} onChange={(e) => set(e.target.value)}
          className="bg-transparent text-right text-sm font-medium text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
          {opts.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-neutral-900 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Muse — Campaign Specification</h1>
          <div className="flex gap-2 font-mono text-xs">
            <span className="border border-neutral-900 px-2 py-0.5">{MODEL}</span>
            <span className="bg-neutral-900 px-2 py-0.5 text-white">{CHAIN}</span>
          </div>
        </header>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">01 — Brief</h2>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4}
                className="w-full resize-none border-b border-neutral-300 bg-transparent pb-2 text-sm leading-relaxed outline-none focus-visible:border-neutral-900" />
              <p className="mt-1 font-mono text-[11px] text-neutral-400">{brief.trim().length} / min 16</p>
            </section>
            <section>
              <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-400">02 — Parameters</h2>
              {field("a", "Audience", audience, setAudience, AUDIENCES)}
              {field("b", "Channel", channel, setChannel, CHANNELS)}
              {field("c", "Tone", tone, setTone, TONES)}
              {field("d", "Visual style", style, setStyle, STYLES)}
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">03 — Concepts</h2>
              <table className="w-full border-collapse text-sm">
                <thead><tr className="border-b border-neutral-900 text-left font-mono text-[11px] uppercase text-neutral-400">
                  <th className="py-1.5">#</th><th>Concept</th><th>Angle</th><th className="text-right">Reach</th></tr></thead>
                <tbody>
                  {CONCEPTS.map((x, i) => (
                    <tr key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id} selected`) }}
                      className={`cursor-pointer border-b border-neutral-200 transition ${i === active ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"}`}>
                      <td className="py-2 font-mono">{x.id}</td><td className="font-medium">{x.name}</td>
                      <td className={i === active ? "text-white/70" : "text-neutral-500"}>{x.angle}</td>
                      <td className="text-right font-mono">{x.reach}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="border-t border-neutral-900 pt-4">
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">04 — Forecast · {c.name}</h2>
              <div className="grid grid-cols-3 divide-x divide-neutral-200">
                {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => (
                  <div key={l} className="px-3 first:pl-0"><p className="font-mono text-[11px] uppercase text-neutral-400">{l}</p><p className="text-3xl font-bold tabular-nums">{v}</p></div>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-4">
              <button onClick={generate} disabled={gen === "loading"}
                className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60">
                {gen === "loading" && <Loader2 className="size-4 animate-spin" />}{gen === "loading" ? "Composing…" : "Generate"}
              </button>
              <button onClick={() => note("Spec saved")} className="border border-neutral-900 px-4 py-2 text-sm hover:bg-neutral-100">Save</button>
              <button onClick={() => note("Exported PDF spec")} className="border border-neutral-900 px-4 py-2 text-sm hover:bg-neutral-100">Export</button>
              <span className={`font-mono text-xs ${gen === "error" ? "text-red-600" : gen === "success" ? "text-emerald-600" : "text-neutral-400"}`}>
                {gen === "error" ? "✗ failed" : gen === "success" ? "✓ typeset" : log[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
