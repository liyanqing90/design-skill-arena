"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Download,
  Layers,
  LayoutTemplate,
  Loader2,
  Save,
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
  audience: ["Z 世代开发者", "全栈工程师", "技术团队负责人", "独立创业者"],
  channel: ["技术博客", "开发者社区", "产品落地页", "邮件周刊"],
  tone: ["专业严谨", "轻松亲和", "挑战激励", "极简克制"],
  style: ["信息架构图", "流程示意图", "模块化卡片", "数据仪表盘"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "结构优先",
    headline: "用清晰的信息层级，把复杂功能讲简单",
    angle: "面向开发者的结构化功能说明，强调可读与可维护。",
    line: "每一行代码都有它的位置，每一段文案都有它的逻辑。",
    reach: 580,
    ctr: 4.1,
    conversion: 4.7,
  },
  {
    id: "B",
    name: "场景驱动",
    headline: "从真实场景出发，构建可验证的交互路径",
    angle: "用用户旅程图串联功能点，降低理解成本。",
    line: "不是展示功能，而是展示功能如何解决具体问题。",
    reach: 640,
    ctr: 4.4,
    conversion: 4.5,
  },
  {
    id: "C",
    name: "模块拼贴",
    headline: "把创意拆成可复用模块，快速组合迭代",
    angle: "模块化组件系统，让创意产出像搭积木一样稳定。",
    line: "组件即答案，组合即策略。",
    reach: 610,
    ctr: 4.2,
    conversion: 4.9,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 设计一场面向开发者群体的产品发布 campaign，突出代码生成、结构化思考与 UI 实现能力。"

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

export function DesignUxProShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "工作区已初始化",
    "默认概念 A 已加载",
    "信息架构模式就绪",
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
      reach: concept.reach + weight * 52,
      ctr: concept.ctr + weight * 0.09,
      conversion: concept.conversion + weight * 0.07,
    }
  }, [concept, controls])

  function pushActivity(message: string) {
    setActivity((prev) => [message, ...prev].slice(0, 6))
  }

  function updateControl(key: ControlKey, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }))
    pushActivity(`已更新「${labelMap[key]}」为：${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`正在生成概念 ${selected} 的创意方案…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("生成失败：Campaign Brief 需要更多上下文")
        return
      }
      setStatus("success")
      pushActivity(`生成成功：${concept.name} 已刷新`)
    }, 900)
  }

  function save() {
    setStatus("success")
    pushActivity(`已保存「${concept.name}」草稿`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已加入导出队列：${controls.channel}`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`切换至概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  return (
    <main className="min-h-screen bg-indigo-50/70 text-slate-900">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-xl border border-indigo-200 bg-white/80 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-indigo-700 text-white hover:bg-indigo-700">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-indigo-300 text-indigo-900">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <LayoutTemplate className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">结构化 UX 布局 · 强信息层级</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{item.title || "创意工作区"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
          <section className="xl:col-start-1 xl:row-start-1">
            <Card className="border-indigo-200 bg-white/90 shadow-sm">
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
                  className="min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition hover:border-indigo-300 focus-visible:border-indigo-500 focus-visible:ring-3 focus-visible:ring-indigo-200"
                />
                {status === "error" ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="size-3.5" />
                    请补充更多产品/场景描述后再生成。
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-1">
            <Card className="border-indigo-200 bg-indigo-100/60 shadow-sm">
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
                      className="h-10 w-full rounded-lg border border-indigo-200 bg-white px-3 text-sm text-slate-900 outline-none transition hover:border-indigo-400 focus-visible:border-indigo-500 focus-visible:ring-3 focus-visible:ring-indigo-200"
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

          <section className="xl:col-start-2 xl:row-start-1 xl:row-span-2">
            <Card className="h-full border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Layers className="size-4 text-indigo-600" />
                    主视觉预览
                  </CardTitle>
                  <Badge variant="outline" className="border-indigo-300 text-indigo-800">
                    概念 {concept.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">{concept.headline}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{concept.angle}</p>
                </div>

                <div className="relative min-h-72 overflow-hidden rounded-xl border border-indigo-200 bg-white p-4 shadow-sm">
                  <div className="grid h-full min-h-64 grid-cols-12 gap-2">
                    <div className="col-span-12 flex items-center justify-between rounded-lg bg-indigo-100 px-4 py-3">
                      <span className="text-sm font-semibold text-indigo-900">{concept.name}</span>
                      <span className="rounded-full bg-indigo-700 px-2 py-0.5 text-xs text-white">{controls.style}</span>
                    </div>
                    <div className="col-span-8 row-span-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-medium text-slate-400">信息层级</div>
                      <div className="mt-3 space-y-2">
                        <div className="h-3 w-3/4 rounded-full bg-indigo-200" />
                        <div className="h-3 w-1/2 rounded-full bg-indigo-100" />
                        <div className="h-3 w-2/3 rounded-full bg-indigo-50" />
                      </div>
                    </div>
                    <div className="col-span-4 row-span-2 grid gap-2">
                      <div className="rounded-lg bg-indigo-700 p-3 text-white">
                        <div className="text-xs opacity-80">目标人群</div>
                        <div className="mt-1 text-sm font-medium">{controls.audience}</div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-3">
                        <div className="text-xs text-slate-400">渠道</div>
                        <div className="mt-1 text-sm font-medium text-slate-700">{controls.channel}</div>
                      </div>
                    </div>
                    <div className="col-span-12 grid grid-cols-4 gap-2">
                      {[
                        controls.tone,
                        controls.style,
                        `概念 ${concept.id}`,
                        `CTR ${metrics.ctr.toFixed(1)}%`,
                      ].map((cell) => (
                        <span key={cell} className="rounded-md border border-slate-200 bg-white px-2 py-2 text-center text-xs text-slate-600">
                          {cell}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-indigo-100 bg-white/70 p-4">
                  <div className="text-xs font-medium text-slate-400">Campaign Line</div>
                  <p className="mt-1 text-base font-semibold text-indigo-900">{concept.line}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{brief}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-2">
            <Card className="border-indigo-200 bg-white/90 shadow-sm">
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
                        "rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 hover:bg-indigo-50/70 focus-visible:ring-3 focus-visible:ring-indigo-200",
                        active
                          ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                          : "border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold">{c.id}</span>
                        {active ? <CheckCircle2 className="size-4 text-indigo-600" /> : null}
                      </div>
                      <div className="mt-1.5 font-semibold">{c.name}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{c.angle}</div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-2">
            <Card className="border-indigo-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <BarChart3 className="size-4 text-indigo-600" />
                  预测指标
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Metric label="Reach" value={formatReach(metrics.reach)} tone="bg-indigo-50" />
                <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} tone="bg-blue-50" />
                <Metric label="Conversion" value={`${metrics.conversion.toFixed(1)}%`} tone="bg-violet-50" />
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-3">
            <Card className="border-indigo-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Users className="size-4 text-indigo-600" />
                  最近操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-2">
                  {activity.map((entry, index) => (
                    <li
                      key={`${entry}-${index}`}
                      className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                    >
                      {entry}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:col-span-2 xl:row-start-3">
            <Card className="border-indigo-200 bg-indigo-100/60 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">操作区</h3>
                  <p className="mt-1 text-xs text-slate-500">生成、保存或导出当前选中的创意方案。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={generate} disabled={status === "loading"} className="bg-indigo-700 hover:bg-indigo-600">
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-indigo-300 hover:bg-indigo-50">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-indigo-300 hover:bg-indigo-50">
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
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700">
        <Loader2 className="size-4 animate-spin" />
        生成中
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="size-4" />
        成功
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="size-4" />
        错误
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
