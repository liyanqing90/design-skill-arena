"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Download,
  Layers,
  Loader2,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type CreativeId = "A" | "B" | "C"
type Status = "idle" | "loading" | "success" | "error"
type ControlKey = "audience" | "channel" | "tone" | "style"

interface CreativeOption {
  id: CreativeId
  name: string
  headline: string
  angle: string
  line: string
  reach: number
  ctr: number
  conversion: number
}

const MODEL_NAME = "Kimi 2.7 Code"

const CONTROL_OPTIONS: Record<ControlKey, string[]> = {
  audience: ["企业技术决策者", "资深开发者", "设计系统团队", "创新实验室"],
  channel: ["品牌官网", "技术大会", "白皮书下载页", "产品内嵌引导"],
  tone: ["自信沉稳", "洞见引领", "务实可信", "开放协作"],
  style: ["杂志编辑风", "数据可视化", "图文混排", "全幅沉浸式"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "权威专刊",
    headline: "像一本技术杂志一样，讲述模型的工程价值",
    angle: "以长文编辑结构融合数据图表，适合建立专业信任。",
    line: "每一页都是经得起推敲的技术陈述。",
    reach: 610,
    ctr: 4.5,
    conversion: 5.0,
  },
  {
    id: "B",
    name: "数据叙事",
    headline: "用可视化把复杂能力变成一目了然的证据",
    angle: "图表、指标、对比共同构建理性说服力。",
    line: "看见性能，也看见可能性。",
    reach: 660,
    ctr: 4.7,
    conversion: 4.8,
  },
  {
    id: "C",
    name: "全域沉浸",
    headline: "从头到脚，把访问者留在品牌叙事里",
    angle: "大图、强对比、完整动线，打造高完成度的品牌体验。",
    line: "进入页面，就是进入品牌。",
    reach: 630,
    ctr: 4.4,
    conversion: 5.3,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 打造最高完成度的品牌 campaign，融合编辑式内容层级、UX 设计原则、无障碍可访问性与精致视觉打磨。"

function formatReach(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}M` : `${Math.round(value)}K`
}

function getControlWeight(controls: Record<ControlKey, string>) {
  let weight = 0
  ;(Object.keys(controls) as ControlKey[]).forEach((key) => {
    weight += Math.max(0, CONTROL_OPTIONS[key].indexOf(controls[key]))
  })
  return weight
}

export function MaxQualityChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "最高质量模式已启用",
    "编辑层级、UX、无障碍、视觉同步校验中",
    "默认概念 A 已呈现",
  ])
  const [controls, setControls] = useState<Record<ControlKey, string>>({
    audience: CONTROL_OPTIONS.audience[0],
    channel: CONTROL_OPTIONS.channel[0],
    tone: CONTROL_OPTIONS.tone[0],
    style: CONTROL_OPTIONS.style[0],
  })
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const concept = CONCEPTS.find((c) => c.id === selected) ?? CONCEPTS[0]
  const metrics = useMemo(() => {
    const weight = getControlWeight(controls)
    return {
      reach: concept.reach + weight * 58,
      ctr: concept.ctr + weight * 0.1,
      conversion: concept.conversion + weight * 0.08,
    }
  }, [concept, controls])

  function pushActivity(message: string) {
    setActivity((prev) => [message, ...prev].slice(0, 6))
  }

  function updateControl(key: ControlKey, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }))
    pushActivity(`已综合调整「${labelMap[key]}」：${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`正在以最高质量合成概念 ${selected}…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("合成中断：Brief 需要更完整的背景")
        return
      }
      setStatus("success")
      pushActivity(`概念「${concept.name}」已完成全链路打磨`)
    }, 1200)
  }

  function save() {
    setStatus("success")
    pushActivity(`已归档「${concept.name}」至高完成度方案库`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已导出 ${controls.channel} 全尺寸素材与规范`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`切换至概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  return (
    <main className="min-h-screen bg-emerald-50/50 text-slate-900">
      <div className="mx-auto flex max-w-[1540px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-700 text-white hover:bg-emerald-700">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-900">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <ShieldCheck className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">最高完成度 · 编辑 + UX + 无障碍 + 精致视觉</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{item.title || "全能创意工作室"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_280px_280px]">
          <section className="xl:col-start-1 xl:row-start-1 xl:row-span-2">
            <Card className="h-full border-emerald-200 bg-white/90 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800">Campaign Brief</CardTitle>
                  <span className="text-xs text-slate-400">{brief.length} 字</span>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value)
                    if (status === "error" && e.target.value.trim().length >= 12) setStatus("idle")
                  }}
                  aria-label="Campaign Brief"
                  aria-invalid={status === "error"}
                  className="min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition hover:border-emerald-400 focus-visible:border-emerald-500 focus-visible:ring-3 focus-visible:ring-emerald-100"
                />
                {status === "error" ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="size-3.5" />
                    请补充更完整的背景描述。
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-1">
            <Card className="h-full border-emerald-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-800">创意控制</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {(Object.keys(labelMap) as ControlKey[]).map((key) => (
                  <label key={key} className="grid gap-1.5">
                    <span className="text-xs font-medium text-slate-500">{labelMap[key]}</span>
                    <select
                      value={controls[key]}
                      onChange={(e) => updateControl(key, e.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition hover:border-emerald-400 focus-visible:border-emerald-500 focus-visible:ring-3 focus-visible:ring-emerald-100"
                    >
                      {CONTROL_OPTIONS[key].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-4 xl:row-start-1">
            <Card className="h-full border-emerald-200 bg-emerald-50/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-800">创意概念 A / B / C</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {CONCEPTS.map((c) => {
                  const active = c.id === selected
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => selectConcept(c.id)}
                      className={cn(
                        "rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-emerald-200",
                        active
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                          : "border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold">{c.id}</span>
                        {active ? <CheckCircle2 className="size-4 text-emerald-600" /> : null}
                      </div>
                      <div className="mt-1.5 font-semibold">{c.name}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{c.angle}</div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-1 xl:row-span-3">
            <Card className="h-full border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Layers className="size-4 text-emerald-600" />
                    主视觉预览
                  </CardTitle>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-800">
                    概念 {concept.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">{concept.headline}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{concept.angle}</p>
                </div>

                <div className="relative min-h-80 overflow-hidden rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <div className="grid h-full min-h-72 grid-cols-12 gap-3">
                    <div className="col-span-12 flex items-center justify-between rounded-lg bg-emerald-100 px-4 py-3">
                      <span className="text-sm font-semibold text-emerald-900">{concept.name}</span>
                      <div className="flex gap-2">
                        <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-xs text-white">{controls.style}</span>
                        <span className="rounded-full border border-emerald-300 bg-white px-2 py-0.5 text-xs text-emerald-800">
                          {controls.channel}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-7 row-span-2 rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div className="text-xs font-medium text-slate-400">编辑层级</div>
                      <div className="mt-4 space-y-3">
                        <div className="h-4 w-3/4 rounded-full bg-emerald-200" />
                        <div className="h-3 w-2/3 rounded-full bg-emerald-100" />
                        <div className="h-3 w-1/2 rounded-full bg-emerald-50" />
                      </div>
                      <div className="mt-6 text-xs text-slate-400">无障碍标注</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {["焦点可见", "对比度 4.5:1", "语义化标签", "键盘可操作"].map((tag) => (
                          <span key={tag} className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-5 row-span-2 grid gap-3">
                      <div className="rounded-lg bg-emerald-700 p-4 text-white">
                        <div className="text-xs opacity-80">目标人群</div>
                        <div className="mt-1 text-sm font-medium">{controls.audience}</div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="text-xs text-slate-400">语气</div>
                        <div className="mt-1 text-sm font-medium text-slate-700">{controls.tone}</div>
                        <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                          <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 grid grid-cols-4 gap-2">
                      {["Reach", "CTR", "Conversion", "Quality"].map((label) => (
                        <div key={label} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-2 text-center">
                          <div className="text-[10px] text-slate-400">{label}</div>
                          <div className="text-xs font-semibold text-slate-700">
                            {label === "Reach" ? formatReach(metrics.reach) : label === "CTR" ? `${metrics.ctr.toFixed(1)}%` : label === "Conversion" ? `${metrics.conversion.toFixed(1)}%` : "A+"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-100 bg-white/70 p-4">
                  <div className="text-xs font-medium text-slate-400">Campaign Line</div>
                  <p className="mt-1 text-base font-semibold text-emerald-900">{concept.line}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{brief}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:col-span-2 xl:row-start-2">
            <Card className="border-emerald-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <BarChart3 className="size-4 text-emerald-600" />
                  预测指标
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                <Metric label="Reach" value={formatReach(metrics.reach)} tone="bg-emerald-50" />
                <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} tone="bg-teal-50" />
                <Metric label="Conversion" value={`${metrics.conversion.toFixed(1)}%`} tone="bg-cyan-50" />
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-3">
            <Card className="border-emerald-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Users className="size-4 text-emerald-600" />
                  最近操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-2">
                  {activity.map((entry, index) => (
                    <li key={`${entry}-${index}`} className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      {entry}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:col-span-2 xl:row-start-3">
            <Card className="border-emerald-200 bg-emerald-100/60 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">操作区</h3>
                  <p className="mt-1 text-xs text-slate-500">生成、保存或导出最高完成度方案。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={generate} disabled={status === "loading"} className="bg-emerald-700 hover:bg-emerald-600">
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-emerald-300 hover:bg-emerald-50">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-emerald-300 hover:bg-emerald-50">
                    <Download className="size-4" />
                    导出
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}

const labelMap: Record<ControlKey, string> = {
  audience: "目标人群",
  channel: "渠道",
  tone: "语气",
  style: "视觉风格",
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-700">
        <Loader2 className="size-4 animate-spin" />
        合成中
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="size-4" />
        完成
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="size-4" />
        需补充
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
      就绪
    </div>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={cn("rounded-lg border border-slate-100 p-3", tone)}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{value}</div>
    </div>
  )
}
