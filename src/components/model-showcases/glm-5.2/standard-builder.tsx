"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Activity as ActivityIcon,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Download,
  Loader2,
  Save,
  Settings2,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"

interface Concept {
  id: ConceptId
  name: string
  headline: string
  subline: string
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
  {
    id: "A",
    name: "效率首发",
    headline: "把新品发布压缩到一个下午",
    subline: "GLM 5.2 从一句 Brief 生成完整活动方案，让创意总监把时间留给判断。",
    reach: 1280,
    ctr: 4.6,
    conversion: 3.1,
  },
  {
    id: "B",
    name: "渠道联动",
    headline: "一个创意，铺满每个触点",
    subline: "自动适配落地页、社媒与邮件三套尺寸，保持品牌语气一致。",
    reach: 1045,
    ctr: 5.1,
    conversion: 3.4,
  },
  {
    id: "C",
    name: "数据驱动",
    headline: "先看预测，再决定投放",
    subline: "Reach、CTR、Conversion 在生成时同步给出，降低试错成本。",
    reach: 1410,
    ctr: 4.2,
    conversion: 2.8,
  },
]

const AUDIENCES = ["新锐品牌主理人", "增长团队", "电商运营", "市场总监"]
const CHANNELS = ["品牌官网", "社交媒体", "邮件营销", "产品内弹窗"]
const TONES = ["专业可信", "轻快友好", "直接有力", "沉静高级"]
const STYLES = ["清爽蓝白", "温暖橙调", "深邃暗色", "活泼渐变"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function StandardBuilderShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 GLM 5.2 设计一场面向增长团队的新品发布活动，突出从 Brief 到可投放方案的端到端能力。"
  )
  const [audience, setAudience] = useState(AUDIENCES[1])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "加载默认 Campaign Brief" },
    { id: "ready", time: "09:00:00", label: "预测模型就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [hovered, setHovered] = useState<ConceptId | null>(null)

  const concept = useMemo(
    () => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0],
    [conceptId]
  )

  const log = useCallback((label: string) => {
    setActivity((prev) =>
      [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 18)
    )
  }, [])

  useEffect(() => {
    log(`切换概念至 ${conceptId} · ${concept.name}`)
  }, [conceptId, concept.name, log])

  useEffect(() => {
    log(`控制项更新：${audience} / ${channel} / ${tone} / ${style}`)
  }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "直接有力" ? 1.06 : tone === "轻快友好" ? 1.02 : 1
    const styleMul = style === "活泼渐变" ? 1.05 : style === "深邃暗色" ? 0.97 : 1
    const channelMul = channel === "品牌官网" ? 1.08 : channel === "社交媒体" ? 0.95 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback(
    (setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
      setLoading(true)
      setter("idle")
      log(`${label} 开始…`)
      window.setTimeout(() => {
        setLoading(false)
        if (Math.random() < failChance) {
          setter("error")
          log(`${label} 失败，请重试`)
        } else {
          setter("success")
          log(`${label} 完成`)
        }
        window.setTimeout(() => setter("idle"), 2200)
      }, 900)
    },
    [log]
  )

  const previewTheme = useMemo(() => {
    switch (style) {
      case "温暖橙调":
        return { bg: "from-orange-50 to-amber-100", text: "text-amber-950", cta: "bg-amber-600 hover:bg-amber-700" }
      case "深邃暗色":
        return { bg: "from-slate-900 to-slate-800", text: "text-slate-100", cta: "bg-slate-100 text-slate-900 hover:bg-white" }
      case "活泼渐变":
        return { bg: "from-fuchsia-50 to-cyan-100", text: "text-slate-900", cta: "bg-fuchsia-600 hover:bg-fuchsia-700" }
      default:
        return { bg: "from-blue-50 to-slate-100", text: "text-slate-900", cta: "bg-blue-600 hover:bg-blue-700" }
    }
  }, [style])

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-4 text-slate-900 md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr_300px]">
        {/* 左栏：控件 */}
        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-md bg-slate-900 text-white hover:bg-slate-800">GLM 5.2</Badge>
                <Badge variant="outline" className="rounded-md">{item.skillChainLabel}</Badge>
              </div>
              <CardTitle className="pt-2 text-lg">Standard Builder</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              三步搭建营销创意：定义受众与渠道，选择视觉方案，预览并导出。
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings2 className="size-4" /> 创意控制
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ControlGroup label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
              <ControlGroup label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
              <ControlGroup label="语气" value={tone} options={TONES} onChange={setTone} />
              <ControlGroup label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 24 === 0) log("更新 Campaign Brief")
                }}
                className="min-h-[120px] resize-y text-sm"
                placeholder="输入营销活动目标、受众与核心信息…"
              />
            </CardContent>
          </Card>
        </div>

        {/* 中栏：预览 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {CONCEPTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 ${
                    conceptId === c.id
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <span className="flex size-5 items-center justify-center rounded-full border border-current text-xs">{c.id}</span>
                  {c.name}
                  {hovered === c.id && conceptId !== c.id && (
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white">点击预览</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-500/40"
                onClick={() => runAsync(setGenerateState, "生成创意")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />}
                生成
              </Button>
              <Button size="sm" variant="outline" className="focus-visible:ring-4 focus-visible:ring-blue-500/40" onClick={() => runAsync(setSaveState, "保存方案", 0.1)} disabled={loading}>
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button size="sm" variant="outline" className="focus-visible:ring-4 focus-visible:ring-blue-500/40" onClick={() => runAsync(setExportState, "导出素材包", 0.05)} disabled={loading}>
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
              <CheckCircle2 className="size-4" /> 创意已生成，可继续调整控制项。
            </div>
          )}
          {generateState === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <XCircle className="size-4" /> 生成失败，请检查 Brief 并重试。
            </div>
          )}
          {saveState === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <XCircle className="size-4" /> 保存失败，请重试。
            </div>
          )}

          <Card className={`relative flex-1 overflow-hidden bg-gradient-to-br ${previewTheme.bg} ${previewTheme.text} transition-colors duration-500`}>
            <CardContent className="relative flex h-full min-h-[360px] flex-col justify-between p-6 md:p-10">
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-white/80 px-2 py-1 text-xs font-semibold text-slate-700 backdrop-blur">{channel}</span>
                <span className="rounded-full bg-white/80 p-2 backdrop-blur"><Target className="size-5" /></span>
              </div>
              <div className="max-w-xl">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-70">{audience} · {tone}</div>
                <h2 className="mb-3 text-3xl font-bold leading-tight md:text-5xl">{concept.headline}</h2>
                <p className="mb-6 text-base opacity-80 md:text-lg">{concept.subline}</p>
                <button className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-[0.98] ${previewTheme.cta}`}>
                  立即体验 <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["Brief 到方案", "多渠道适配", "预测指标"].map((tag) => (
                  <span key={tag} className="rounded-full border border-current/20 bg-white/60 px-3 py-1 text-xs">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右栏：指标 + Activity */}
        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="size-4" /> 预测指标</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Metric label="Reach" value={metrics.reach.toLocaleString()} />
              <Metric label="CTR" value={`${metrics.ctr}%`} />
              <Metric label="Conversion" value={`${metrics.conversion}%`} />
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><ActivityIcon className="size-4" /> 最近操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[340px] space-y-2 overflow-auto pr-1">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm transition-colors hover:bg-slate-100">
                    <span className="shrink-0 text-xs text-slate-400">{a.time}</span>
                    <span className="text-slate-700">{a.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ControlGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:border-blue-400 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
      >
        {value}
        <ChevronDown className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:bg-blue-50 focus-visible:outline-none ${value === opt ? "bg-blue-50 font-medium text-blue-700" : "text-slate-700"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}
