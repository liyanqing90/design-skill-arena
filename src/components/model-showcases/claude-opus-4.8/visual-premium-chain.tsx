"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, ArrowRight } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "visual-frontend → ui-ux-pro-max → impeccable"
const STEPS = ["Compose", "Refine", "Polish"]

const AUDIENCES = ["Luxury buyers", "Design-led buyers", "Collectors"]
const CHANNELS = ["Editorial", "Flagship retail", "Paid social"]
const TONES = ["Premium", "Refined", "Assured"]
const STYLES = ["Gold leaf", "Obsidian", "Velvet"]

const CONCEPTS = [
  { id: "A", name: "AURUM", line: "Sound, finished like fine jewellery.", reach: 720, ctr: 5.2, conv: 3.6, grad: "from-amber-300 via-yellow-500 to-amber-700" },
  { id: "B", name: "NOIR", line: "Quiet luxury for the discerning ear.", reach: 680, ctr: 5.5, conv: 3.9, grad: "from-zinc-400 via-zinc-600 to-zinc-900" },
  { id: "C", name: "VELOUR", line: "A tactile, considered indulgence.", reach: 760, ctr: 4.9, conv: 3.3, grad: "from-rose-300 via-rose-500 to-rose-800" },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function VisualPremiumChain() {
  const [brief, setBrief] = useState("A premium, luxurious launch for a flagship wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [step, setStep] = useState(-1)
  const [log, setLog] = useState<string[]>(["Atelier ready"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (TONES.indexOf(tone) + STYLES.indexOf(style)) * 0.04
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.4)).toFixed(1), conv: +(c.conv * (1 + k * 0.2)).toFixed(1) }
  }, [tone, style, c])

  const generate = () => {
    if (gen === "loading") return
    if (brief.trim().length < 16) { setGen("error"); note("Brief too short"); return }
    setGen("loading"); setStep(0); note("Compose · framing…")
    let i = 0
    const tick = () => { i += 1; if (i < STEPS.length) { setStep(i); note(`${STEPS[i]} · running…`); setTimeout(tick, 520) } else { setStep(STEPS.length); setGen("success"); note("Atelier complete") } }
    setTimeout(tick, 520)
  }

  const pill = (val: string, set: (v: string) => void, opts: string[]) => (
    <select value={val} onChange={(e) => set(e.target.value)} className="rounded-full border border-amber-200/20 bg-white/5 px-3 py-1.5 text-xs text-amber-50 outline-none transition hover:border-amber-200/50 focus-visible:ring-2 focus-visible:ring-amber-300/50">{opts.map((o) => <option key={o} className="text-slate-900">{o}</option>)}</select>
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-amber-50">
      <header className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-6 py-5">
        <span className="flex items-center gap-2 font-serif text-lg"><Sparkles className="size-5 text-amber-300" />Muse</span>
        <span className="rounded-full border border-amber-200/30 px-2.5 py-0.5 text-xs text-amber-200/80">{MODEL}</span>
        <span className="rounded-full border border-amber-200/30 px-2.5 py-0.5 text-xs text-amber-200/80">{CHAIN}</span>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-12">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-amber-200/15 bg-white/5 p-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide transition ${step > i ? "text-amber-300" : step === i ? "bg-amber-300 text-neutral-900" : "text-amber-200/40"}`}>{step === i && gen === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : <span className="grid size-4 place-items-center rounded-full border border-current text-[10px]">{i + 1}</span>}{s}</span>
              {i < STEPS.length - 1 && <ArrowRight className="size-4 shrink-0 text-amber-200/20" />}
            </div>
          ))}
        </div>

        <div className={`relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-10 text-neutral-950 shadow-2xl transition-all duration-500`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          <span className="relative font-serif text-xs uppercase tracking-[0.4em] opacity-70">{tone} · {style}</span>
          <h1 className="relative mt-2 font-serif text-6xl tracking-tight">{c.name}</h1>
          <p className="relative mt-3 max-w-md text-lg opacity-80">{c.line}</p>
        </div>

        <div className="mt-4 flex gap-3">{CONCEPTS.map((x, i) => <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }} className={`flex-1 overflow-hidden rounded-2xl border transition ${i === active ? "border-amber-300" : "border-amber-200/15 hover:border-amber-200/40"}`}><span className={`block h-12 bg-gradient-to-br ${x.grad}`} /><span className="block py-2 font-serif text-sm">{x.name}</span></button>)}</div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">{[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conversion", `${m.conv}%`]].map(([l, v]) => <div key={l} className="rounded-2xl border border-amber-200/15 bg-white/5 p-4"><p className="text-xs text-amber-200/60">{l}</p><p className="mt-1 font-serif text-3xl tabular-nums">{v}</p></div>)}</div>

        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={2} className="mt-5 w-full resize-none rounded-2xl border border-amber-200/15 bg-white/5 p-3 text-sm text-amber-50 outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50" />
        {gen === "error" && <p className="mt-1 text-xs text-rose-300">Minimum 16 characters.</p>}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {pill(audience, setAudience, AUDIENCES)}{pill(channel, setChannel, CHANNELS)}{pill(tone, setTone, TONES)}{pill(style, setStyle, STYLES)}
          <button onClick={generate} disabled={gen === "loading"} className="ml-auto inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-amber-200 disabled:opacity-60">{gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}Run atelier</button>
          <button onClick={() => note("Saved")} className="rounded-full border border-amber-200/30 p-2 transition hover:bg-white/10"><Save className="size-4" /></button>
          <button onClick={() => note("Exported")} className="rounded-full border border-amber-200/30 p-2 transition hover:bg-white/10"><Download className="size-4" /></button>
        </div>
        <ul className="mt-4 space-y-1 text-xs text-amber-200/50">{log.map((l, i) => <li key={i}>› {l}</li>)}</ul>
      </main>
    </div>
  )
}
