"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  Grid3X3,
  Layers,
  Loader2,
  MousePointer2,
  Palette,
  Save,
  Sparkles,
  Type,
  Wand2,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ShowcaseItem } from "@/types/showcase"

type ConceptKey = "A" | "B" | "C"

type Concept = {
  id: ConceptKey
  name: string
  headline: string
  body: string
  gradient: string
  shape: "circles" | "grid" | "waves"
  reach: number
  ctr: number
  conversion: number
}

type Activity = { id: string; time: string; label: string }

const concepts: Concept[] = [
  {
    id: "A",
    name: "霓虹聚焦",
    headline: "视觉先声夺人",
    body: "用高对比渐变与几何焦点抓住第一眼注意力，适合社媒头图与开屏。",
    gradient: "from-violet-600 via-fuchsia-500 to-rose-500",
    shape: "circles",
    reach: 1120,
    ctr: 5.1,
    conversion: 2.7,
  },
  {
    id: "B",
    name: "结构秩序",
    headline: "网格构建信任",
    body: "以严谨的网格系统传递专业感，适合技术文档与产品落地页。",
    gradient: "from-slate-900 via-cyan-900 to-slate-900",
    shape: "grid",
    reach: 890,
    ctr: 4.4,
    conversion: 3.3,
  },
  {
    id: "C",
    name: "流体律动",
    headline: "动态品牌表达",
    body: "柔和流动的波纹与有机曲线，适合品牌故事页与情感化 campaign。",
    gradient: "from-indigo-500 via-purple-500 to-pink-400",
    shape: "waves",
    reach: 1010,
    ctr: 4.8,
    conversion: 3.0,
  },
]

const audiences = ["品牌设计师", "前端开发者", "创意总监", "增长黑客"]
const channels = ["Instagram", "Dribbble", "落地页", "线下海报"]
const tones = ["大胆张扬", "冷静理性", "诗意浪漫", "幽默反差"]
const styles = ["高饱和渐变", "单色金属", "霓虹暗色", "柔和粉彩"]

export function VisualFrontendShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 打造一张高视觉冲击力的海报，突出 AI 生成前端代码的速度与美感。"
  )
  const [audience, setAudience] = useState(audiences[0])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<ConceptKey>("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "加载 Visual Frontend 编辑器" },
    { id: "canvas", time: now(), label: "画布初始化完成" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")
  const [hoveredShape, setHoveredShape] = useState(false)

  const concept = useMemo(() => concepts.find((c) => c.id === conceptId) ?? concepts[0], [conceptId])

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`选择视觉概念 ${concept.id} · ${concept.name}`)
  }, [concept, conceptId, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const audienceMultiplier = audience === "增长黑客" ? 1.08 : audience === "创意总监" ? 1.04 : 1
    const channelMultiplier = channel === "Instagram" ? 1.06 : channel === "Dribbble" ? 1.03 : 1
    const toneMultiplier = tone === "大胆张扬" ? 1.05 : tone === "幽默反差" ? 1.02 : 1
    const styleMultiplier = style === "高饱和渐变" ? 1.04 : style === "霓虹暗色" ? 1.03 : 1
    return {
      reach: Math.round(base.reach * audienceMultiplier * channelMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, audience, channel, tone, style])

  useEffect(() => {
    log(`调整参数：${audience} / ${channel} / ${tone} / ${style}`)
  }, [audience, channel, tone, style, log])

  const runAsync = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<"idle" | "success" | "error">>,
      label: string,
      failChance = 0
    ) => {
      setLoading(true)
      setter("idle")
      log(`${label} 中…`)
      setTimeout(() => {
        setLoading(false)
        if (Math.random() < failChance) {
          setter("error")
          log(`${label} 出错`)
        } else {
          setter("success")
          log(`${label} 成功`)
        }
        setTimeout(() => setter("idle"), 2400)
      }, 1100)
    },
    [log]
  )

  const shapeElements = useMemo(() => {
    switch (concept.shape) {
      case "circles":
        return (
          <>
            <div className="absolute -right-20 -top-20 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-black/20 blur-2xl" />
            <div className="absolute left-1/4 top-1/3 size-40 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-transform duration-700 hover:scale-110" />
            <div className="absolute right-1/4 top-1/4 size-24 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-700 hover:scale-110" />
          </>
        )
      case "grid":
        return (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute right-10 top-10 size-32 rotate-12 border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-sm" />
            <div className="absolute bottom-20 left-20 size-20 -rotate-6 border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-sm" />
          </>
        )
      case "waves":
        return (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40">
              <svg viewBox="0 0 1440 320" className="h-full w-full" preserveAspectRatio="none">
                <path
                  fill="rgba(255,255,255,0.2)"
                  d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
            </div>
            <div className="absolute left-10 top-10 size-40 rounded-full border border-white/20 bg-white/5 blur-sm" />
            <div className="absolute bottom-32 right-20 size-28 rounded-full border border-white/20 bg-white/10" />
          </>
        )
    }
  }, [concept.shape])

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-md bg-white text-slate-950 hover:bg-slate-200">Kimi 2.7 Code</Badge>
              <Badge variant="outline" className="rounded-md border-slate-700 text-slate-300">
                {item.skillChainLabel || "frontend-skill"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 focus-visible:ring-3 focus-visible:ring-fuchsia-500/50"
                onClick={() => runAsync(setGenerateState, "渲染视觉方案")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Wand2 className="mr-1 size-4" />}
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800 focus-visible:ring-3 focus-visible:ring-fuchsia-500/50"
                onClick={() => runAsync(setSaveState, "保存到画板", 0.1)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-400" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800 focus-visible:ring-3 focus-visible:ring-fuchsia-500/50"
                onClick={() => runAsync(setExportState, "导出 PNG", 0.05)}
                disabled={loading}
              >
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-400" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              <AlertCircle className="size-4" /> 渲染失败，请检查图层与 Brief。
            </div>
          )}
          {generateState === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-200">
              <CheckCircle2 className="size-4" /> 视觉方案已渲染完成。
            </div>
          )}

          <Card
            className={`relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border-slate-800 bg-gradient-to-br ${concept.gradient} p-8 text-white shadow-2xl transition-all duration-700 md:min-h-[560px] md:p-12`}
            onMouseEnter={() => setHoveredShape(true)}
            onMouseLeave={() => setHoveredShape(false)}
          >
            {shapeElements}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                hoveredShape ? "opacity-20" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />
            </div>
            <div className="relative z-10 flex items-start justify-between">
              <div className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                {channel} · {audience}
              </div>
              <div className="rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-md">
                <Eye className="size-5" />
              </div>
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-80">{tone}</div>
              <h2 className="mb-4 text-4xl font-black leading-none tracking-tight md:text-7xl">{concept.headline}</h2>
              <p className="mb-8 max-w-lg text-base opacity-90 md:text-xl">{concept.body}</p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
                  {style}
                </span>
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
                  {concept.name}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {concepts.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setConceptId(c.id)}
                className={`group flex min-w-[120px] flex-col gap-1 rounded-xl border p-3 text-left transition-all focus-visible:ring-3 focus-visible:ring-fuchsia-500/50 ${
                  conceptId === c.id
                    ? "border-fuchsia-500 bg-slate-900 text-white"
                    : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800"
                }`}
              >
                <span className="text-xs opacity-60">Concept {c.id}</span>
                <span className="font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Palette className="size-4" />
                检查器
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <InspectorGroup label="目标人群" value={audience} options={audiences} onChange={setAudience} icon={<MousePointer2 className="size-4" />} />
              <InspectorGroup label="渠道" value={channel} options={channels} onChange={setChannel} icon={<Layers className="size-4" />} />
              <InspectorGroup label="语气" value={tone} options={tones} onChange={setTone} icon={<Type className="size-4" />} />
              <InspectorGroup label="视觉风格" value={style} options={styles} onChange={setStyle} icon={<Grid3X3 className="size-4" />} />
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 25 === 0) log("编辑 Brief")
                }}
                className="min-h-[120px] resize-y border-slate-700 bg-slate-950 text-slate-200 placeholder:text-slate-500 focus-visible:ring-fuchsia-500/50"
                placeholder="描述视觉目标、品牌调性与关键信息…"
              />
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Metric label="Reach" value={metrics.reach.toLocaleString()} />
              <Metric label="CTR" value={`${metrics.ctr}%`} />
              <Metric label="Conversion" value={`${metrics.conversion}%`} />
            </CardContent>
          </Card>

          <Card className="flex-1 border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[240px] space-y-2 overflow-auto pr-1">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm transition-colors hover:border-slate-700"
                  >
                    <span className="shrink-0 text-xs text-slate-500">{a.time}</span>
                    <span className="text-slate-300">{a.label}</span>
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

function InspectorGroup({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  icon: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 focus-visible:border-fuchsia-500 focus-visible:ring-3 focus-visible:ring-fuchsia-500/50"
      >
        {value}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 py-1 shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-900 focus-visible:bg-slate-800 focus-visible:outline-none ${
                value === opt ? "font-medium text-fuchsia-400" : "text-slate-300"
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-4 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-lg font-semibold text-slate-100">{value}</span>
    </div>
  )
}
