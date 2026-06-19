"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
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
  palette: string
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
  { id: "A", name: "雾蓝", headline: "把新品浸在一片雾里", palette: "from-slate-200 via-blue-100 to-indigo-100", reach: 1080, ctr: 4.5, conversion: 3.2 },
  { id: "B", name: "陶土", headline: "用温度收住所有锋芒", palette: "from-stone-200 via-amber-100 to-orange-100", reach: 990, ctr: 4.8, conversion: 3.5 },
  { id: "C", name: "墨绿", headline: "安静地，长出一片林", palette: "from-emerald-100 via-teal-100 to-cyan-100", reach: 1150, ctr: 4.2, conversion: 3.0 },
]

const AUDIENCES = ["品味人群", "生活方式", "文化读者", "高端消费"]
const CHANNELS = ["品牌官网", "慢内容", "邮件刊物", "展览物料"]
const TONES = ["安静", "温润", "克制", "从容"]
const STYLES = ["雾蓝", "陶土", "墨绿", "米白"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function VisualTasteShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造一个强视觉但克制的页面，去掉多余 widget。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "视觉场就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 14))
  }, [])

  useEffect(() => { log(`切换视觉 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "安静" ? 1.04 : tone === "温润" ? 1.02 : 1
    const styleMul = style === "陶土" ? 1.03 : style === "米白" ? 0.98 : 1
    const channelMul = channel === "品牌官网" ? 1.05 : channel === "慢内容" ? 0.97 : 1
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
    }, 900)
  }, [log])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* 大视觉场 */}
      <section className={cn("relative flex min-h-[70vh] flex-col justify-between bg-gradient-to-br p-8 transition-all duration-700 md:p-16", concept.palette)}>
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-stone-900/80 text-white backdrop-blur hover:bg-stone-900">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-full border-stone-900/30 bg-white/40 text-stone-800 backdrop-blur">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full bg-stone-900 text-white hover:bg-stone-800 focus-visible:ring-2 focus-visible:ring-stone-900/40" onClick={() => runAsync(setGenerateState, "生成")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="rounded-full border-stone-900/20 bg-white/40 text-stone-800 backdrop-blur hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-stone-900/30" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="rounded-full border-stone-900/20 bg-white/40 text-stone-800 backdrop-blur hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-stone-900/30" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </header>

        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-stone-500">{channel} · {tone}</p>
          <h1 className="text-4xl font-light leading-[1.1] md:text-7xl">{concept.headline}</h1>
          <p className="mt-6 max-w-md text-base leading-loose text-stone-600">{brief.slice(0, 64)}…</p>
        </div>

        {/* 概念切换：极简圆点 */}
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-500">方向</span>
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setConceptId(c.id)}
              aria-label={c.name}
              className={cn("flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/40", conceptId === c.id ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-white/50")}
            >
              <span className={cn("size-2 rounded-full bg-gradient-to-br", c.palette)} />
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {generateState === "success" && <p className="px-8 py-3 text-sm text-stone-600 md:px-16"><CheckCircle2 className="mr-1 inline size-4" />已生成，可在下方微调。</p>}
      {generateState === "error" && <p className="px-8 py-3 text-sm text-red-700 md:px-16"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</p>}

      {/* 下方：精简控件 + 指标 + Activity */}
      <section className="mx-auto grid max-w-[1200px] gap-8 px-8 py-12 md:px-16 md:py-16 lg:grid-cols-[1fr_1fr_1fr]">
        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-400">Campaign Brief</h3>
          <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 20 === 0) log("更新 Brief") }} className="min-h-[80px] resize-y rounded-lg border-stone-300 bg-white text-sm focus-visible:border-stone-800 focus-visible:ring-0" placeholder="写下视觉主旨…" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <QuietSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
            <QuietSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
            <QuietSelect label="语气" value={tone} options={TONES} onChange={setTone} />
            <QuietSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-400">预测</h3>
          <div className="flex flex-col gap-3">
            <QuietMetric label="Reach" value={metrics.reach.toLocaleString()} />
            <QuietMetric label="CTR" value={`${metrics.ctr}%`} />
            <QuietMetric label="Conversion" value={`${metrics.conversion}%`} />
          </div>
          <div className="mt-4 h-1 w-full bg-stone-200">
            <div className="h-full bg-stone-800 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-400">记录</h3>
          <div className="max-h-[220px] space-y-1.5 overflow-auto">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-2 py-1 text-xs">
                <span className="shrink-0 font-mono text-stone-400">{a.time}</span>
                <span className="text-stone-600">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function QuietSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-stone-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm transition-colors hover:border-stone-800 focus-visible:border-stone-800 focus-visible:outline-none"
      >
        <span className="truncate">{value}</span>
        <span className="text-stone-400">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-stone-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-stone-100 focus-visible:bg-stone-100 focus-visible:outline-none", value === opt ? "font-medium text-stone-900" : "text-stone-600")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function QuietMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-stone-200 pb-2">
      <span className="text-xs uppercase tracking-[0.2em] text-stone-400">{label}</span>
      <span className="text-xl font-light text-stone-900">{value}</span>
    </div>
  )
}
