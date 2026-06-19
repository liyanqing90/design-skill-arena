"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
  Film,
  Loader2,
  Save,
  Sparkles,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"

interface Concept {
  id: ConceptId
  name: string
  headline: string
  scene: string
  overlay: string
  reach: number
  ctr: number
  conversion: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "夜行", headline: "在城市的夜里点亮新品", scene: "from-slate-900 via-indigo-900 to-slate-950", overlay: "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.45), transparent 60%)", reach: 1480, ctr: 5.2, conversion: 3.4 },
  { id: "B", name: "日出", headline: "把发布做成一场日出", scene: "from-rose-900 via-orange-800 to-amber-900", overlay: "radial-gradient(circle at 70% 30%, rgba(251,146,60,0.5), transparent 60%)", reach: 1320, ctr: 5.5, conversion: 3.8 },
  { id: "C", name: "深海", headline: "让新品沉入一片深海", scene: "from-cyan-950 via-teal-900 to-slate-950", overlay: "radial-gradient(circle at 50% 50%, rgba(20,184,166,0.45), transparent 60%)", reach: 1610, ctr: 4.8, conversion: 3.1 },
]

const AUDIENCES = ["潮流先锋", "高净值", "科技尝鲜", "创意行业"]
const CHANNELS = ["沉浸落地页", "开屏", "视频信息流", "KOL"]
const TONES = ["电影感", "克制", "戏剧化", "冷峻"]
const STYLES = ["夜行", "日出", "深海", "雪原"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function VisualImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造电影感分屏页面，左侧视觉舞台 + 右侧 crisp 检查器。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "分屏舞台就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换场景 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "电影感" ? 1.06 : tone === "戏剧化" ? 1.08 : 1
    const styleMul = style === "日出" ? 1.05 : style === "雪原" ? 0.97 : 1
    const channelMul = channel === "沉浸落地页" ? 1.1 : channel === "开屏" ? 0.94 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); log(`${label} 进行中…`)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`) }
      else { setter("success"); log(`${label} 完成`) }
      window.setTimeout(() => setter("idle"), 2200)
    }, 1000)
  }, [log])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 顶部条 */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold"><Film className="size-4" /> Muse · Cinematic</span>
          <Badge className="rounded-md bg-white/10 text-white hover:bg-white/20">GLM 5.2</Badge>
          <Badge variant="outline" className="rounded-md border-white/20 text-slate-300">{item.skillChainLabel}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50" onClick={() => runAsync(setGenerateState, "生成场景")} disabled={loading}>
            {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
            {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />} 保存
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
            {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />} 导出
          </Button>
        </div>
      </header>

      {generateState === "success" && <div className="border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 md:px-6"><CheckCircle2 className="mr-1 inline size-4" />场景已生成。</div>}
      {generateState === "error" && <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 md:px-6"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</div>}

      {/* 分屏：左舞台 + 右检查器 */}
      <div className="grid min-h-[calc(100vh-110px)] lg:grid-cols-[1.4fr_1fr]">
        {/* 左：视觉舞台 */}
        <section className={cn("relative flex flex-col justify-between bg-gradient-to-br p-8 transition-all duration-700 md:p-14", concept.scene)}>
          <div className="pointer-events-none absolute inset-0 transition-all duration-700" style={{ background: concept.overlay }} />
          <div className="relative">
            <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs backdrop-blur">{channel}</span>
          </div>
          <div className="relative max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/60">{audience} · {tone}</p>
            <h1 className="text-4xl font-bold leading-[1.05] drop-shadow-lg md:text-6xl">{concept.headline}</h1>
            <p className="mt-5 max-w-md text-base text-white/80">{brief.slice(0, 60)}…</p>
            <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
              进入场景
            </button>
          </div>
          {/* 概念切换：底部胶片条 */}
          <div className="relative flex items-center gap-2">
            {CONCEPTS.map((c) => (
              <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                className={cn("flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs backdrop-blur transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50", conceptId === c.id ? "border-white bg-white text-slate-900" : "border-white/25 text-white/80 hover:bg-white/10")}>
                <span className={cn("size-2 rounded-full bg-gradient-to-br", c.scene)} />
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* 右：crisp 检查器 */}
        <aside className="flex flex-col gap-4 border-t border-white/10 bg-[#0b0e13] p-6 md:p-8 lg:border-l lg:border-t-0">
          <section>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Campaign Brief</h3>
            <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[80px] resize-y rounded-lg border-white/10 bg-white/5 text-sm text-slate-200 focus-visible:border-white/30 focus-visible:ring-white/10" placeholder="描述场景主旨…" />
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">检查器</h3>
            <div className="grid grid-cols-2 gap-3">
              <CinemaSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
              <CinemaSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
              <CinemaSelect label="语气" value={tone} options={TONES} onChange={setTone} />
              <CinemaSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">预测指标</h3>
            <div className="grid grid-cols-3 gap-2">
              <CinemaMetric label="Reach" value={metrics.reach.toLocaleString()} />
              <CinemaMetric label="CTR" value={`${metrics.ctr}%`} />
              <CinemaMetric label="Conv" value={`${metrics.conversion}%`} />
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
            </div>
          </section>

          <section className="flex-1">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">最近操作</h3>
            <div className="max-h-[220px] space-y-1.5 overflow-auto pr-1">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-2 rounded-md bg-white/5 px-2.5 py-1.5 text-xs">
                  <span className="shrink-0 text-slate-500">{a.time}</span>
                  <span className="text-slate-300">{a.label}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function CinemaSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-white/25 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-slate-500 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-white/10 bg-[#11151c] py-1 shadow-2xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none", value === opt ? "font-medium text-white" : "text-slate-300")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CinemaMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-center">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-base font-bold text-white">{value}</div>
    </div>
  )
}
