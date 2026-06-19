"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2, Eye, FileText, BarChart3 } from "lucide-react"

const MODEL = "Claude Opus 4.8"
const CHAIN = "web-artifacts-builder / artifacts-builder"

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
type Tab = "preview" | "brief" | "data"

export default function ArtifactBuilder() {
  const [tab, setTab] = useState<Tab>("preview")
  const [brief, setBrief] = useState("Single-file campaign artifact for a premium wearable audio launch.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState(0)
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Artifact mounted"])

  const c = CONCEPTS[active]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (CHANNELS.indexOf(channel) + STYLES.indexOf(style)) * 0.045
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [channel, style, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Rebuilding artifact…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Build failed: brief too short") }
      else { setGen("success"); note("Artifact rebuilt"); setTab("preview") }
    }, 1000)
  }

  const sel = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <label className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-3 py-2">
      <span className="text-xs text-zinc-500">{label}</span>
      <select value={val} onChange={(e) => set(e.target.value)} className="bg-transparent text-sm font-medium text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  const tabs: [Tab, string, typeof Eye][] = [["preview", "Preview", Eye], ["brief", "Brief", FileText], ["data", "Data", BarChart3]]

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-200 p-4 text-zinc-900 sm:p-8">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-xl">
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-sm font-semibold"><Sparkles className="size-4 text-violet-600" />muse.artifact</span>
          <span className="rounded bg-zinc-900 px-2 py-0.5 text-[11px] text-white">{MODEL}</span>
          <span className="hidden truncate rounded border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-700 sm:inline">{CHAIN}</span>
          <div className="ml-auto flex gap-1">
            {tabs.map(([t, label, Icon]) => (
              <button key={t} onClick={() => setTab(t)} className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition ${tab === t ? "bg-white text-violet-700 shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}>
                <Icon className="size-3.5" />{label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[360px] p-5 sm:p-7">
          {tab === "preview" && (
            <div className="space-y-4">
              <div className="flex gap-1.5">
                {CONCEPTS.map((x, i) => (
                  <button key={x.id} onClick={() => { setActive(i); note(`Concept ${x.id}`) }}
                    className={`rounded-md border px-3 py-1 text-xs transition ${i === active ? "border-violet-600 bg-violet-600 text-white" : "border-zinc-200 text-zinc-500 hover:border-violet-300"}`}>{x.id}</button>
                ))}
              </div>
              <div className="rounded-xl bg-gradient-to-br from-violet-50 to-zinc-50 p-6">
                <span className="text-xs uppercase tracking-wider text-violet-500">{style}</span>
                <h1 className="mt-1 text-2xl font-bold">{c.name}</h1>
                <p className="mt-2 text-zinc-600">{c.line}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["Reach", `${m.reach}K`], ["CTR", `${m.ctr}%`], ["Conv", `${m.conv}%`]].map(([l, v]) => (
                  <div key={l} className="rounded-lg border border-zinc-200 py-2"><p className="text-[11px] text-zinc-400">{l}</p><p className="font-semibold tabular-nums">{v}</p></div>
                ))}
              </div>
            </div>
          )}
          {tab === "brief" && (
            <div className="space-y-3">
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4}
                className="w-full resize-none rounded-lg border border-zinc-200 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500" />
              {sel("Audience", audience, setAudience, AUDIENCES)}
              {sel("Channel", channel, setChannel, CHANNELS)}
              {sel("Tone", tone, setTone, TONES)}
              {sel("Visual style", style, setStyle, STYLES)}
            </div>
          )}
          {tab === "data" && (
            <div className="space-y-2 font-mono text-xs">
              <p className="text-zinc-400">{"// recent operations"}</p>
              {log.map((l, i) => <p key={i} className="rounded bg-zinc-50 px-2 py-1 text-zinc-700">{l}</p>)}
              <p className="pt-2 text-zinc-400">{`// forecast ${c.id}`}</p>
              <p className="rounded bg-zinc-900 px-2 py-1 text-violet-300">{`{ reach: ${m.reach}, ctr: ${m.ctr}, conv: ${m.conv} }`}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 bg-zinc-50 px-4 py-3">
          <button onClick={generate} disabled={gen === "loading"} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-60">
            {gen === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}{gen === "loading" ? "Building…" : "Generate"}
          </button>
          <button onClick={() => note("Saved snapshot")} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-100"><Save className="size-4" />Save</button>
          <button onClick={() => note("Exported .html")} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-100"><Download className="size-4" />Export</button>
          <span className={`ml-auto text-xs ${gen === "error" ? "text-red-600" : gen === "success" ? "text-emerald-600" : "text-zinc-400"}`}>{gen === "error" ? "build failed" : gen === "success" ? "build ok" : "idle"}</span>
        </div>
      </div>
    </div>
  )
}
