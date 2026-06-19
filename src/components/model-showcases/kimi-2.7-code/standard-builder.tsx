"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Download,
  Layers,
  Loader2,
  RefreshCw,
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
import { ShowcaseItem } from "@/types/showcase"

type Concept = {
  id: "A" | "B" | "C"
  name: string
  headline: string
  subline: string
  accent: string
  reach: number
  ctr: number
  conversion: number
}

type Activity = {
  id: string
  time: string
  label: string
}

const concepts: Concept[] = [
  {
    id: "A",
    name: "功能优先",
    headline: "把你的创意变成可上线的页面",
    subline: "Kimi 2.7 Code 帮你从需求描述直接生成可运行的组件代码。",
    accent: "bg-blue-600",
    reach: 842,
    ctr: 4.2,
    conversion: 2.9,
  },
  {
    id: "B",
    name: "协作提效",
    headline: "让设计与开发用同一种语言沟通",
    subline: "统一组件规范，减少返工，把迭代周期从周缩短到天。",
    accent: "bg-indigo-600",
    reach: 765,
    ctr: 4.7,
    conversion: 3.2,
  },
  {
    id: "C",
    name: "品质交付",
    headline: "一次生成，接近生产级的代码",
    subline: "内置样式系统、响应式与可访问性，代码开箱即可进入评审。",
    accent: "bg-slate-900",
    reach: 921,
    ctr: 3.9,
    conversion: 2.6,
  },
]

const audiences = ["产品经理", "前端工程师", "独立开发者", "创意设计师"]
const channels = ["落地页", "社交媒体", "邮件营销", "产品内弹窗"]
const tones = ["专业可信", "轻快友好", "直接有力", "沉静高级"]
const styles = ["清爽蓝白", "温暖橙调", "深邃暗色", "活泼渐变"]

export function StandardBuilderShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 设计一场面向前端开发者的营销活动，突出从自然语言到可运行组件的能力。"
  )
  const [audience, setAudience] = useState(audiences[1])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<"A" | "B" | "C">("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "加载默认 Campaign Brief" },
    { id: "ready", time: now(), label: "预测模型就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [hoveredConcept, setHoveredConcept] = useState<"A" | "B" | "C" | null>(null)

  const concept = useMemo(
    () => concepts.find((c) => c.id === conceptId) ?? concepts[0],
    [conceptId]
  )

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`切换概念至 ${conceptId} · ${concept.name}`)
  }, [conceptId, concept.name, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const toneMultiplier = tone === "直接有力" ? 1.05 : tone === "轻快友好" ? 1.02 : 1
    const styleMultiplier = style === "活泼渐变" ? 1.04 : style === "深邃暗色" ? 0.98 : 1
    const channelMultiplier = channel === "落地页" ? 1.06 : channel === "社交媒体" ? 0.96 : 1
    return {
      reach: Math.round(base.reach * channelMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  useEffect(() => {
    log(`控制项更新：${audience} / ${channel} / ${tone} / ${style}`)
  }, [audience, channel, tone, style, log])

  const runAsync = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<"idle" | "success" | "error">>,
      label: string,
      failChance = 0
    ) => {
      setLoading(true)
      setter("idle")
      log(`${label} 开始…`)
      setTimeout(() => {
        setLoading(false)
        if (Math.random() < failChance) {
          setter("error")
          log(`${label} 失败，请重试`)
        } else {
          setter("success")
          log(`${label} 完成`)
        }
        setTimeout(() => setter("idle"), 2200)
      }, 900)
    },
    [log]
  )

  const styleTheme = useMemo(() => {
    switch (style) {
      case "温暖橙调":
        return "from-orange-50 to-amber-100 text-amber-950"
      case "深邃暗色":
        return "from-slate-900 to-slate-800 text-slate-100"
      case "活泼渐变":
        return "from-fuchsia-50 to-cyan-100 text-slate-900"
      default:
        return "from-blue-50 to-slate-100 text-slate-900"
    }
  }, [style])

  const previewButtonColor = useMemo(() => {
    switch (style) {
      case "温暖橙调":
        return "bg-amber-600 hover:bg-amber-700"
      case "深邃暗色":
        return "bg-slate-100 text-slate-900 hover:bg-white"
      case "活泼渐变":
        return "bg-fuchsia-600 hover:bg-fuchsia-700"
      default:
        return "bg-blue-600 hover:bg-blue-700"
    }
  }, [style])

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr_300px]">
        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-md bg-slate-900 text-white hover:bg-slate-800">
                  Kimi 2.7 Code
                </Badge>
                <Badge variant="outline" className="rounded-md">
                  {item.skillChainLabel || "frontend-app-builder"}
                </Badge>
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
                <Settings2 className="size-4" />
                创意控制
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ControlGroup label="目标人群" value={audience} options={audiences} onChange={setAudience} />
              <ControlGroup label="渠道" value={channel} options={channels} onChange={setChannel} />
              <ControlGroup label="语气" value={tone} options={tones} onChange={setTone} />
              <ControlGroup label="视觉风格" value={style} options={styles} onChange={setStyle} />
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
                  if (e.target.value.length % 20 === 0) log("更新 Campaign Brief")
                }}
                className="min-h-[128px] resize-y text-sm"
                placeholder="输入营销活动目标、受众与核心信息…"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  onMouseEnter={() => setHoveredConcept(c.id)}
                  onMouseLeave={() => setHoveredConcept(null)}
                  className={`relative flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:ring-3 focus-visible:ring-blue-500/50 ${
                    conceptId === c.id
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <span className="flex size-5 items-center justify-center rounded-full border border-current text-xs">
                    {c.id}
                  </span>
                  {c.name}
                  {hoveredConcept === c.id && conceptId !== c.id && (
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white">
                      点击预览
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setGenerateState, "生成创意")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />}
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setSaveState, "保存方案", 0.1)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setExportState, "导出素材包", 0.05)}
                disabled={loading}
              >
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

          <Card
            className={`relative flex-1 overflow-hidden bg-gradient-to-br ${styleTheme} transition-colors duration-500`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute left-0 top-0 h-full w-px bg-current" />
              <div className="absolute left-1/4 top-0 h-full w-px bg-current" />
              <div className="absolute left-2/4 top-0 h-full w-px bg-current" />
              <div className="absolute left-3/4 top-0 h-full w-px bg-current" />
              <div className="absolute right-0 top-0 h-full w-px bg-current" />
            </div>
            <CardContent className="relative flex h-full flex-col justify-between p-6 md:p-10">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-white/80 px-2 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                  {channel}
                </div>
                <div className="rounded-full bg-white/80 p-2 backdrop-blur">
                  <Target className="size-5" />
                </div>
              </div>
              <div className="max-w-xl">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-70">
                  {audience} · {tone}
                </div>
                <h2 className="mb-3 text-3xl font-bold leading-tight md:text-5xl">{concept.headline}</h2>
                <p className="mb-6 text-base opacity-80 md:text-lg">{concept.subline}</p>
                <button
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02] focus-visible:ring-3 focus-visible:ring-white/50 active:scale-[0.98] ${previewButtonColor}`}
                >
                  立即体验 <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["组件生成", "响应式", "可访问性"].map((tag) => (
                  <span key={tag} className="rounded-full border border-current/20 bg-white/60 px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Metric label="Reach" value={metrics.reach.toLocaleString()} suffix="" />
              <Metric label="CTR" value={metrics.ctr} suffix="%" />
              <Metric label="Conversion" value={metrics.conversion} suffix="%" />
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[360px] space-y-2 overflow-auto pr-1">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                  >
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
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:border-blue-400 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/50"
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
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:bg-blue-50 focus-visible:outline-none ${
                value === opt ? "bg-blue-50 font-medium text-blue-700" : "text-slate-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, suffix }: { label: string; value: string | number; suffix: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">
        {value}
        {suffix}
      </span>
    </div>
  )
}
