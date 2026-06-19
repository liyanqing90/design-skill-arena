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
  desc: string
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
  { id: "A", name: "稳健版", headline: "把发布做成一次稳妥的上线", desc: "结构清晰、信息完整、风险最低，适合大多数渠道。", reach: 1320, ctr: 4.7, conversion: 3.3 },
  { id: "B", name: "增长版", headline: "把发布做成一次增长实验", desc: "强化 CTA 与指标前置，牺牲部分留白换取转化。", reach: 1450, ctr: 5.3, conversion: 3.9 },
  { id: "C", name: "品牌版", headline: "把发布做成一次品牌叙事", desc: "弱化指标、强化故事，留白与节奏优先。", reach: 1280, ctr: 4.4, conversion: 3.1 },
]

const AUDIENCES = ["新用户", "活跃用户", "沉睡用户", "高价值用户"]
const CHANNELS = ["落地页", "推送", "邮件", "信息流"]
const TONES = ["友好", "专业", "热情", "沉稳"]
const STYLES = ["均衡", "紧凑", "舒展", "卡片化"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function BalancedChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造均衡型产品页：表单 / 预览 / 变体 / 指标 / 时间线，无单一极端。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "均衡工作区就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换变体 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "热情" ? 1.06 : tone === "专业" ? 1.03 : 1
    const channelMul = channel === "落地页" ? 1.1 : channel === "推送" ? 0.95 : 1
    const styleMul = style === "紧凑" ? 1.04 : style === "舒展" ? 0.98 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, channel, style])

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
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* 顶部条 */}
      <header className="border-b border-stone-200 bg-white px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-stone-900">Muse · Balanced</span>
            <Badge className="rounded-md bg-amber-600 text-white hover:bg-amber-500">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-stone-300 text-stone-500">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400/50" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-stone-300 bg-white text-stone-700 hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-stone-300/50" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-600" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-stone-300 bg-white text-stone-700 hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-stone-300/50" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-600" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 md:px-8"><CheckCircle2 className="mr-1 inline size-4" />方案已生成。</div>}
      {generateState === "error" && <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 md:px-8"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</div>}

      <div className="mx-auto max-w-6xl space-y-4 p-4 md:p-6">
        {/* Row 1：Brief + 控件 并排均衡 */}
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">Campaign Brief</h3>
            <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[88px] resize-y rounded-md border-stone-200 bg-stone-50 text-sm text-stone-800 focus-visible:border-amber-500 focus-visible:ring-amber-500/20" placeholder="描述活动主旨…" />
          </section>
          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">控件</h3>
            <div className="grid grid-cols-2 gap-3">
              <BalancedSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
              <BalancedSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
              <BalancedSelect label="语气" value={tone} options={TONES} onChange={setTone} />
              <BalancedSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
            </div>
          </section>
        </div>

        {/* Row 2：主预览 60% + 变体 40% */}
        <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
          <section className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <div className="flex items-center justify-between border-b border-stone-100 px-4 py-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">主预览</span>
              <span className="text-[11px] text-stone-400">{concept.name} · {audience}/{channel}</span>
            </div>
            <div className="p-5 md:p-7">
              <h2 className="text-2xl font-bold leading-tight text-stone-900 md:text-3xl">{concept.headline}</h2>
              <p className="mt-2 text-sm text-stone-500">{concept.desc}</p>
              <p className="mt-3 text-sm text-stone-600">{brief.slice(0, 60)}…</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs text-stone-600">{tone}</span>
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs text-stone-600">{style}</span>
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs text-amber-700">{channel}</span>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">创意变体</h3>
            <div className="space-y-2">
              {CONCEPTS.map((c) => (
                <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                  className={cn("flex w-full items-start gap-3 rounded-md border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40", conceptId === c.id ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50")}>
                  <span className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold", conceptId === c.id ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-500")}>{c.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-stone-900">{c.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-stone-500">{c.headline}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Row 3：指标 + 时间线 + 操作 均衡三列 */}
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">预测指标</h3>
            <div className="space-y-2.5">
              <BalancedMetricRow label="Reach" value={metrics.reach.toLocaleString()} pct={Math.min(metrics.reach / 18, 100)} />
              <BalancedMetricRow label="CTR" value={`${metrics.ctr}%`} pct={metrics.ctr * 16} />
              <BalancedMetricRow label="Conversion" value={`${metrics.conversion}%`} pct={metrics.conversion * 22} />
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">最近操作</h3>
            <div className="max-h-[180px] space-y-1.5 overflow-auto pr-1">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-2 rounded-md bg-stone-50 px-2.5 py-1.5 text-xs">
                  <span className="shrink-0 font-mono text-stone-400">{a.time}</span>
                  <span className="text-stone-600">{a.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">操作</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400/50" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
                {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />} 生成方案
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300 bg-white text-stone-700 hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-stone-300/50" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
                {saveState === "success" ? <CheckCircle2 className="mr-2 size-4 text-emerald-600" /> : <Save className="mr-2 size-4" />} 保存草稿
              </Button>
              <Button variant="outline" className="w-full justify-start border-stone-300 bg-white text-stone-700 hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-stone-300/50" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
                {exportState === "success" ? <CheckCircle2 className="mr-2 size-4 text-emerald-600" /> : <Download className="mr-2 size-4" />} 导出素材
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function BalancedSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-stone-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 transition-colors hover:border-stone-300 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-stone-400 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-stone-200 bg-white py-1 shadow-xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-amber-50 focus-visible:bg-amber-50 focus-visible:outline-none", value === opt ? "font-medium text-amber-700" : "text-stone-700")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BalancedMetricRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-stone-500">{label}</span>
        <span className="font-bold text-stone-900">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
        <div className="h-full rounded-full bg-amber-500 transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}
