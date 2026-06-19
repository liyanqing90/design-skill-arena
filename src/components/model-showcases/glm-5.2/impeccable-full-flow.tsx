"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Download,
  History,
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
  glow: string
  reach: number
  ctr: number
  conversion: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
  kind: "info" | "success" | "error"
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "晨雾", headline: "新品像晨雾一样铺开", glow: "from-sky-400/30 to-indigo-500/20", reach: 1340, ctr: 4.7, conversion: 3.2 },
  { id: "B", name: "琥珀", headline: "把温度收进一颗琥珀", glow: "from-amber-400/30 to-rose-500/20", reach: 1180, ctr: 5.2, conversion: 3.8 },
  { id: "C", name: "墨夜", headline: "在墨夜里点亮一行字", glow: "from-violet-400/30 to-fuchsia-500/20", reach: 1520, ctr: 4.4, conversion: 3.5 },
]

const AUDIENCES = ["高净值客户", "创意行业", "企业决策者", "年轻家庭"]
const CHANNELS = ["品牌官网", "私域社群", "高端展会", "内容专栏"]
const TONES = ["沉静高级", "温暖克制", "理性专业", "优雅从容"]
const STYLES = ["晨雾玻璃", "琥珀暖光", "墨夜深空", "雪原冷调"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function ImpeccableFullFlowShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造一场高完成度营销活动，覆盖从生成到导出的完整状态。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "工作台初始化", kind: "info" },
    { id: "ready", time: "09:00:00", label: "状态机就绪", kind: "success" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [focused, setFocused] = useState<string | null>(null)

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string, kind: ActivityEntry["kind"] = "info") => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label, kind }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换概念 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "沉静高级" ? 1.05 : tone === "温暖克制" ? 1.02 : 1
    const styleMul = style === "琥珀暖光" ? 1.06 : style === "雪原冷调" ? 0.97 : 1
    const channelMul = channel === "品牌官网" ? 1.07 : channel === "高端展会" ? 0.94 : 1
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
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`, "error") }
      else { setter("success"); log(`${label} 完成`, "success") }
      window.setTimeout(() => setter("idle"), 2400)
    }, 1000)
  }, [log])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* 背景光晕 */}
      <div className={cn("pointer-events-none absolute -inset-40 bg-gradient-to-br transition-all duration-1000", concept.glow)} />
      <div className="pointer-events-none absolute left-1/2 top-0 size-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1500px] p-4 md:p-8">
        {/* 顶栏 */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-full border-white/20 bg-white/5 text-white/90 backdrop-blur">{item.skillChainLabel}</Badge>
            <span className="ml-1 text-xs uppercase tracking-[0.3em] text-white/40">Impeccable Full Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full bg-white text-slate-900 hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/15 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setSaveState, "保存", 0.12)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/15 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setExportState, "导出", 0.06)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </header>

        {/* 状态横幅 */}
        <StatusBanner state={generateState} />
        <StatusBanner state={saveState} label="保存" />
        <StatusBanner state={exportState} label="导出" />

        <div className="grid gap-4 lg:grid-cols-[320px_1fr_320px]">
          {/* 左：Brief + 控件 */}
          <div className="flex flex-col gap-4">
            <GlassPanel title="Campaign Brief">
              <Textarea
                value={brief}
                onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }}
                onFocus={() => setFocused("brief")} onBlur={() => setFocused(null)}
                className={cn("min-h-[110px] resize-y rounded-xl border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 focus-visible:border-white/40 focus-visible:ring-white/20", focused === "brief" && "ring-2 ring-white/30")}
                placeholder="描述新品发布目标…"
              />
            </GlassPanel>
            <GlassPanel title="创意控制">
              <div className="flex flex-col gap-3">
                <GlassSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} onFocus={() => setFocused("audience")} onBlur={() => setFocused(null)} active={focused === "audience"} />
                <GlassSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} onFocus={() => setFocused("channel")} onBlur={() => setFocused(null)} active={focused === "channel"} />
                <GlassSelect label="语气" value={tone} options={TONES} onChange={setTone} onFocus={() => setFocused("tone")} onBlur={() => setFocused(null)} active={focused === "tone"} />
                <GlassSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} onFocus={() => setFocused("style")} onBlur={() => setFocused(null)} active={focused === "style"} />
              </div>
            </GlassPanel>
          </div>

          {/* 中：主预览 */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">{channel}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">{audience} · {tone}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">{concept.headline}</h2>
              <p className="mt-4 max-w-lg text-sm text-white/70 md:text-base">{brief.slice(0, 70)}…</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
                  查看方案
                </button>
                <span className="text-xs text-white/40">{style}</span>
              </div>
            </div>

            {/* 概念切换 */}
            <div className="grid grid-cols-3 gap-3">
              {CONCEPTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  className={cn(
                    "group rounded-2xl border p-4 text-left backdrop-blur-xl transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40",
                    conceptId === c.id ? "border-white/40 bg-white/15" : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">{c.id}</span>
                    <span className={cn("size-2 rounded-full bg-gradient-to-br", c.glow)} />
                  </div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="mt-1 text-[11px] text-white/50">{c.headline}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 右：指标 + Activity */}
          <div className="flex flex-col gap-4">
            <GlassPanel title="预测指标">
              <div className="grid grid-cols-3 gap-2">
                <GlassMetric icon={<BarChart3 className="size-3.5" />} label="Reach" value={metrics.reach.toLocaleString()} />
                <GlassMetric icon={<Sparkles className="size-3.5" />} label="CTR" value={`${metrics.ctr}%`} />
                <GlassMetric icon={<CheckCircle2 className="size-3.5" />} label="Conv" value={`${metrics.conversion}%`} />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
              </div>
            </GlassPanel>
            <GlassPanel title="最近操作">
              <div className="max-h-[320px] space-y-1.5 overflow-auto pr-1">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs transition-colors hover:bg-white/10">
                    <span className="mt-0.5 shrink-0">
                      {a.kind === "success" ? <CheckCircle2 className="size-3 text-emerald-400" /> : a.kind === "error" ? <XCircle className="size-3 text-rose-400" /> : <History className="size-3 text-white/40" />}
                    </span>
                    <span className="shrink-0 text-white/40">{a.time}</span>
                    <span className="text-white/80">{a.label}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

function GlassPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{title}</h3>
      {children}
    </section>
  )
}

function GlassSelect({ label, value, options, onChange, onFocus, onBlur, active }: { label: string; value: string; options: string[]; onChange: (v: string) => void; onFocus: () => void; onBlur: () => void; active: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onFocus={onFocus} onBlur={onBlur}
        className={cn("flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:border-white/30 focus-visible:border-white/40 focus-visible:outline-none", active && "ring-2 ring-white/30")}
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-white/40 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-white/15 bg-slate-900/95 py-1 shadow-2xl backdrop-blur-xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none", value === opt ? "bg-white/10 font-medium text-white" : "text-white/70")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GlassMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-2.5 text-center">
      <div className="mb-1 flex items-center justify-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-white/40">{icon}{label}</div>
      <div className="text-base font-bold text-white">{value}</div>
    </div>
  )
}

function StatusBanner({ state, label = "生成" }: { state: AsyncState; label?: string }) {
  if (state === "idle") return null
  if (state === "success")
    return (
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 backdrop-blur">
        <CheckCircle2 className="size-4" /> {label}完成，可继续调整。
      </div>
    )
  return (
    <div className="mb-3 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 backdrop-blur">
      <AlertTriangle className="size-4" /> {label}失败，请重试。
    </div>
  )
}
