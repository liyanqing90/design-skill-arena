"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "visual-frontend → design-logic → ui-ux-pro-max → taste-skill → impeccable"
const STEPS = ["Compose", "Structure", "Pattern", "Refine", "Polish"]

const AUDIENCES = ["Urban creators", "Design-led buyers", "Early adopters"]
const CHANNELS = ["Paid social", "Editorial", "Flagship retail"]
const TONES = ["Definitive", "Refined", "Bold"]
const STYLES = ["Aurora", "Editorial", "Spectrum"]

const CONCEPTS = [
  { id: "A", name: "ZENITH", line: "The high point of everything we know about sound.", reach: 980, ctr: 5.4, conv: 3.7, grad: "from-indigo-500 via-violet-600 to-fuchsia-600" },
  { id: "B", name: "APEX", line: "Engineered, refined, and finished without compromise.", reach: 910, ctr: 5.8, conv: 4.0, grad: "from-cyan-500 via-blue-600 to-indigo-700" },
  { id: "C", name: "SUMMIT", line: "Every surface considered, every state resolved.", reach: 1020, ctr: 5.1, conv: 3.4, grad: "from-rose-500 via-fuchsia-600 to-violet-700" },
]

const CHECKS = ["Contrast AA", "Focus order", "Motion-safe", "Grid aligned", "Copy reviewed", "States resolved"]

type Gen = "idle" | "loading" | "success" | "error"

export default function MaxQualityChain() {
  const [brief, setBrief] = useState("A definitive, no-compromise flagship launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [step, setStep] = useState(-1)
  const [log, setLog] = useState<string[]>(["Studio ready", "All skills loaded"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 6))
  const valid = brief.trim().length >= 16
  const m = useMemo(() => {
    const k = (TONES.indexOf(tone) + STYLES.indexOf(style) + AUDIENCES.indexOf(audience)) * 0.035
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.4)).toFixed(1), conv: +(c.conv * (1 + k * 0.25)).toFixed(1) }
  }, [tone, style, audience, c])

  const generate = () => {
    if (gen === "loading") return
    if (!valid) { setGen("error"); note("Blocked: brief too short"); return }
    setGen("loading"); setStep(0); note(`${STEPS[0]} · running…`)
    let i = 0
    const tick = () => { i += 1; if (i < STEPS.length) { setStep(i); note(`${STEPS[i]} · running…`); setTimeout(tick, 440) } else { setStep(STEPS.length); setGen("success"); note("Max-quality pass complete") } }
    setTimeout(tick, 440)
  }

  const pct = gen === "success" ? 100 : step < 0 ? 0 : Math.round((step / STEPS.length) * 100)
  const pill = (val: string, set: (v: string) => void, opts: string[]) => (
    <select value={val} onChange={(e) => set(e.target.value)} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white outline-none transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-violet-400">{opts.map((o) => <option key={o} className="text-slate-900">{o}</option>)}</select>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-5">
        <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-violet-400" />Muse</span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">{MODEL}</span>
        <span className="rounded-full border border-violet-400/40 px-2.5 py-0.5 text-xs text-violet-300">{CHAIN}</span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-12">
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-wrap items-center gap-2">{STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${step > i ? "text-violet-300" : step === i ? "bg-violet-500 text-white" : "text-white/40"}`}>{step === i && gen === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : step > i ? <CheckCircle2 className="size-3.5" /> : <span className="grid size-4 place-items-center rounded-full border border-current text-[10px]">{i + 1}</span>}{s}</span>
              {i < STEPS.length - 1 && <ArrowRight className="size-3.5 text-white/20" />}
            </div>
          ))}</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${pct}%` }} /></div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <section className="space-y-4">
            <div className={`relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-9 shadow-2xl transition-all duration-500`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
              <span className="relative text-xs uppercase tracking-[0.35em] text-white/75">{tone} · {style}</span>
              <h1 className="relative mt-1 text-6xl font-black tracking-tight">{c.name}</h1>
              <p className="relative mt-3 max-w-md text-lg text-white/85">{c.line}</p>
            </div>
            <div className="flex gap-3">{CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 overflow-hidden rounded-2xl border transition ${i === active ? "border-violet-400" : "border-white/10 hover:border-white/30"}`}><span className={`block h-10 bg-gradient-to-br ${x.grad}`} /><span className="block py-2 text-sm font-medium">{x.name}</span></button>)}</div>
            <div className="grid grid-cols-3 gap-4">{[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-white/60">{l}</p><p className="mt-1 text-3xl font-bold tabular-nums">{v}</p></div>)}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{CHECKS.map((ck) => <span key={ck} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${gen === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/10 text-white/50"}`}>{gen === "success" ? <CheckCircle2 className="size-3.5" /> : <span className="size-3.5 rounded-full border border-current" />}{ck}</span>)}</div>
          </section>

          <aside className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <label className="block space-y-1"><span className="text-xs font-medium text-white/60">Campaign brief</span>
                <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={3} aria-invalid={!valid} className={`w-full resize-none rounded-lg border bg-white/5 p-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${valid ? "border-white/10" : "border-red-400/60"}`} />
                {!valid && <span className="text-xs text-red-300">Minimum 16 characters.</span>}</label>
              <div className="flex flex-wrap gap-2">{pill(audience, setAudience, AUDIENCES)}{pill(channel, setChannel, CHANNELS)}{pill(tone, setTone, TONES)}{pill(style, setStyle, STYLES)}</div>
              <div className="flex gap-2 pt-1">
                <button onClick={generate} disabled={gen === "loading"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Run full chain</button>
                <button onClick={() => note("Saved")} className="rounded-lg border border-white/20 p-2.5 transition hover:bg-white/10"><Save className="size-4" /></button>
                <button onClick={() => note("Exported")} className="rounded-lg border border-white/20 p-2.5 transition hover:bg-white/10"><Download className="size-4" /></button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="mb-2 flex items-center gap-2 text-xs font-medium text-white/60">{gen === "error" ? <XCircle className="size-3.5 text-red-300" /> : <Sparkles className="size-3.5" />}Activity</p><ul className="space-y-1 text-sm text-white/60">{log.map((l, i) => <li key={i} className="flex gap-2"><span className="text-white/30">›</span>{l}</li>)}</ul></div>
          </aside>
        </div>
      </main>
    </div>
  )
}
