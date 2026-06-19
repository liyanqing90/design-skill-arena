"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  BarChart3,
  CheckCircle2,
  Download,
  History,
  Loader2,
  Save,
  Send,
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
type MobileTab = "controls" | "preview" | "metrics"

interface Concept {
  id: ConceptId
  name: string
  headline: string
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
  { id: "A", name: "精炼版", headline: "标准结构，精修收尾", reach: 1260, ctr: 4.7, conversion: 3.2 },
  { id: "B", name: "完整版", headline: "覆盖全部状态与路径", reach: 1090, ctr: 5.0, conversion: 3.5 },
  { id: "C", name: "极简版", headline: "只保留必要动作", reach: 1180, ctr: 4.4, conversion: 2.9 },
]

const AUDIENCES = ["产品团队", "市场团队", "增长团队", "运营团队"]
const CHANNELS = ["品牌官网", "App", "邮件", "广告"]
const TONES = ["专业", "清晰", "稳重", "高效"]
const STYLES = ["深空灰", "午夜蓝", "炭黑", "石墨"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function StandardImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造标准结构 + 高完成度精修的营销活动页面。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [mobileTab, setMobileTab] = useState<MobileTab>("preview")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "精修工作台就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换方案 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "高效" ? 1.05 : tone === "清晰" ? 1.03 : 1
    const styleMul = style === "午夜蓝" ? 1.04 : style === "炭黑" ? 0.98 : 1
    const channelMul = channel === "品牌官网" ? 1.06 : channel === "广告" ? 0.96 : 1
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
    }, 950)
  }, [log])

  const shellAccent = style === "午夜蓝" ? "#3b82f6" : style === "石墨" ? "#64748b" : "#475569"

  return (
    <div className="min-h-screen bg-[#0b0e13] text-slate-200">
      <div className="mx-auto max-w-[1500px] p-4 md:p-6">
        {/* 顶栏 */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#11151c] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white">Muse · Refined</span>
            <Badge className="rounded-md bg-white/10 text-white hover:bg-white/20">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-white/15 text-slate-300">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </header>

        {/* 状态条 */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <StateChip label="生成" state={generateState} loading={loading} />
          <StateChip label="保存" state={saveState} />
          <StateChip label="导出" state={exportState} />
        </div>
        {generateState === "error" && <Banner kind="error" text="生成失败，请重试。" />}

        {/* 移动端 Tab */}
        <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-[#11151c] p-1 lg:hidden">
          {([["controls", "控件"], ["preview", "预览"], ["metrics", "指标"]] as const).map(([k, l]) => (
            <button key={k} type="button" onClick={() => setMobileTab(k)} className={cn("rounded-md py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40", mobileTab === k ? "bg-white/10 text-white" : "text-slate-400")}>{l}</button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr_300px]">
          {/* 左：控件 */}
          <section className={cn("flex flex-col gap-4", mobileTab !== "controls" && "hidden lg:flex")}>
            <div className="rounded-xl border border-white/10 bg-[#11151c] p-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Campaign Brief</h3>
              <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[90px] resize-y rounded-lg border-white/10 bg-[#0b0e13] text-sm text-slate-200 focus-visible:border-white/30 focus-visible:ring-white/10" placeholder="输入活动目标…" />
            </div>
            <div className="rounded-xl border border-white/10 bg-[#11151c] p-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">控件</h3>
              <div className="flex flex-col gap-3">
                <DarkSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                <DarkSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                <DarkSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                <DarkSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
              </div>
            </div>
          </section>

          {/* 中：预览 */}
          <section className={cn("flex flex-col gap-4", mobileTab !== "preview" && "hidden lg:flex")}>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#11151c] to-[#0b0e13] p-6 md:p-10">
              <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full blur-3xl" style={{ background: `${shellAccent}22` }} />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs">{channel}</span>
                  <span className="text-xs text-slate-500">{audience} · {tone}</span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">{concept.headline}</h2>
                <p className="mt-4 max-w-lg text-sm text-slate-400">{brief.slice(0, 70)}…</p>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95">
                    <Send className="size-4" /> 立即投放
                  </button>
                  <span className="text-xs text-slate-500">{style}</span>
                </div>
              </div>
            </div>

            {/* 概念切换 */}
            <div className="grid grid-cols-3 gap-2">
              {CONCEPTS.map((c) => (
                <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                  className={cn("rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40", conceptId === c.id ? "border-white/40 bg-white/10" : "border-white/10 bg-[#11151c] hover:border-white/25")}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{c.id}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{c.name}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">{c.headline}</div>
                </button>
              ))}
            </div>
          </section>

          {/* 右：指标 + Activity */}
          <section className={cn("flex flex-col gap-4", mobileTab !== "metrics" && "hidden lg:flex")}>
            <div className="rounded-xl border border-white/10 bg-[#11151c] p-4">
              <h3 className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500"><BarChart3 className="size-3.5" /> 预测指标</h3>
              <div className="flex flex-col gap-3">
                <DarkMetric label="Reach" value={metrics.reach.toLocaleString()} accent={shellAccent} />
                <DarkMetric label="CTR" value={`${metrics.ctr}%`} accent={shellAccent} />
                <DarkMetric label="Conversion" value={`${metrics.conversion}%`} accent={shellAccent} />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%`, background: shellAccent }} />
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-white/10 bg-[#11151c] p-4">
              <h3 className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500"><History className="size-3.5" /> 最近操作</h3>
              <div className="max-h-[260px] space-y-1.5 overflow-auto pr-1">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded-md bg-white/5 px-2.5 py-1.5 text-xs">
                    <span className="shrink-0 text-slate-500">{a.time}</span>
                    <span className="text-slate-300">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function DarkSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0b0e13] px-3 py-2 text-sm text-slate-200 transition-colors hover:border-white/25 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
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

function DarkMetric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-lg font-bold" style={{ color: accent }}>{value}</span>
    </div>
  )
}

function StateChip({ label, state, loading }: { label: string; state: AsyncState; loading?: boolean }) {
  return (
    <span className={cn("flex items-center gap-1 rounded-full border px-2.5 py-1", state === "error" ? "border-red-500/30 bg-red-500/10 text-red-300" : state === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-slate-400")}>
      {state === "error" ? <XCircle className="size-3" /> : state === "success" ? <CheckCircle2 className="size-3" /> : loading ? <Loader2 className="size-3 animate-spin" /> : <span className="size-1.5 rounded-full bg-current" />}
      {label}
    </span>
  )
}

function Banner({ kind, text }: { kind: "success" | "error"; text: string }) {
  return (
    <div className={cn("mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm", kind === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-red-500/30 bg-red-500/10 text-red-200")}>
      {kind === "success" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />} {text}
    </div>
  )
}
