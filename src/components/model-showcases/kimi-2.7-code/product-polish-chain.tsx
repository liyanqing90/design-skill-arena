"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Component,
  Download,
  Eye,
  Loader2,
  Save,
  Sparkles,
  Target,
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
  audience: ["SaaS 采购决策者", "前端开发者", "产品经理", "设计系统维护者"],
  channel: ["产品后台", "组件文档站", "落地页", "应用内引导"],
  tone: ["清晰直接", "友好引导", "权威可信", "轻松活泼"],
  style: ["组件规范", "浅色系统", "深色系统", "高对比度"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "组件规范",
    headline: "一套可复用、可访问、可交付的组件语言",
    angle: "以真实 Button、Card、Form 组件展示设计系统的一致性与可维护性。",
    line: "从设计到代码，只差一个组件。",
    reach: 620,
    ctr: 4.3,
    conversion: 4.8,
  },
  {
    id: "B",
    name: "无障碍优先",
    headline: "让每一次交互都对所有用户可见、可达、可操作",
    angle: "聚焦焦点状态、对比度、屏幕阅读器友好等可访问性细节。",
    line: "好产品，不挑用户。",
    reach: 580,
    ctr: 4.5,
    conversion: 5.2,
  },
  {
    id: "C",
    name: "界面指南",
    headline: "遵循 Web 界面指南，构建直觉式体验",
    angle: "用标准布局、一致反馈和清晰层级体现界面设计最佳实践。",
    line: "用户无需学习，因为一切本该如此。",
    reach: 650,
    ctr: 4.2,
    conversion: 4.9,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 设计一场面向产品前端团队的 campaign，强调组件系统、无障碍设计与 Web 界面指南的落地能力。"

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

export function ProductPolishChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "组件系统已加载",
    "无障碍检查通过",
    "界面指南已启用",
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
      reach: concept.reach + weight * 50,
      ctr: concept.ctr + weight * 0.09,
      conversion: concept.conversion + weight * 0.07,
    }
  }, [concept, controls])

  const isDark = controls.style === "深色系统"
  const isHighContrast = controls.style === "高对比度"

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
    pushActivity(`正在构建概念 ${selected} 的前端方案…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("构建失败：Brief 描述不足")
        return
      }
      setStatus("success")
      pushActivity(`方案「${concept.name}」构建完成`)
    }, 1000)
  }

  function save() {
    setStatus("success")
    pushActivity(`已保存「${concept.name}」组件方案`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已导出 ${controls.channel} 前端资源`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`切换至概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-700 text-white hover:bg-blue-700">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-slate-300 text-slate-600">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <Component className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">组件系统 · 无障碍 · 界面指南</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{item.title || "产品前端工坊"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-4 xl:grid-cols-[300px_300px_minmax(0,1fr)]">
          <section className="xl:col-start-1 xl:row-start-1">
            <Card className="border-slate-200 bg-white shadow-sm">
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
                  className="min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition hover:border-blue-400 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100"
                />
                {status === "error" ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="size-3.5" />
                    请补充更多产品背景。
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-1">
            <Card className="border-slate-200 bg-white shadow-sm">
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
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition hover:border-blue-400 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100"
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

          <section className="xl:col-start-1 xl:row-start-2 xl:col-span-2">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-800">创意概念 A / B / C</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {CONCEPTS.map((c) => {
                  const active = c.id === selected
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => selectConcept(c.id)}
                      className={cn(
                        "rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-blue-100",
                        active
                          ? "border-blue-500 bg-blue-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold">{c.id}</span>
                        {active ? <CheckCircle2 className="size-4 text-blue-600" /> : null}
                      </div>
                      <div className="mt-1.5 font-semibold">{c.name}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{c.angle}</div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-1 xl:row-span-3">
            <Card className="h-full border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Eye className="size-4 text-blue-600" />
                    主视觉预览
                  </CardTitle>
                  <Badge variant="outline" className="border-slate-300 text-slate-700">
                    概念 {concept.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">{concept.headline}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{concept.angle}</p>
                </div>

                <div
                  className={cn(
                    "relative min-h-80 overflow-hidden rounded-xl border p-5 shadow-sm transition-colors",
                    isHighContrast
                      ? "border-black bg-white"
                      : isDark
                        ? "border-slate-700 bg-slate-900 text-slate-100"
                        : "border-slate-200 bg-white"
                  )}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className={cn("size-3 rounded-full", isHighContrast ? "bg-black" : "bg-blue-600")} />
                    <span className={cn("text-sm font-semibold", isHighContrast ? "text-black" : isDark ? "text-slate-100" : "text-slate-900")}>
                      {concept.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto rounded-full px-2 py-0.5 text-xs",
                        isHighContrast
                          ? "border border-black text-black"
                          : isDark
                            ? "bg-slate-800 text-slate-300"
                            : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {controls.style}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    <div
                      className={cn(
                        "rounded-lg border p-3",
                        isHighContrast
                          ? "border-black bg-white"
                          : isDark
                            ? "border-slate-700 bg-slate-800"
                            : "border-slate-200 bg-slate-50"
                      )}
                    >
                      <div className={cn("text-xs", isHighContrast ? "text-black" : isDark ? "text-slate-400" : "text-slate-500")}>目标人群</div>
                      <div className={cn("text-sm font-medium", isHighContrast ? "text-black" : isDark ? "text-slate-200" : "text-slate-800")}>
                        {controls.audience}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className={cn(
                          "rounded-lg px-3 py-2 text-xs font-medium outline-none ring-offset-2 focus-visible:ring-2",
                          isHighContrast
                            ? "bg-black text-white ring-black"
                            : isDark
                              ? "bg-blue-500 text-white ring-blue-400"
                              : "bg-blue-600 text-white ring-blue-500"
                        )}
                      >
                        主按钮
                      </button>
                      <button
                        type="button"
                        className={cn(
                          "rounded-lg border px-3 py-2 text-xs font-medium outline-none ring-offset-2 focus-visible:ring-2",
                          isHighContrast
                            ? "border-black text-black ring-black"
                            : isDark
                              ? "border-slate-600 text-slate-200 ring-blue-400"
                              : "border-slate-300 text-slate-700 ring-blue-500"
                        )}
                      >
                        次要按钮
                      </button>
                    </div>

                    <div
                      className={cn(
                        "rounded-lg border p-3",
                        isHighContrast
                          ? "border-black bg-white"
                          : isDark
                            ? "border-slate-700 bg-slate-800"
                            : "border-slate-200 bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "size-4 rounded-sm",
                            isHighContrast ? "bg-black" : isDark ? "bg-slate-600" : "bg-slate-300"
                          )}
                        />
                        <div className="flex-1 space-y-1.5">
                          <div className={cn("h-2 w-2/3 rounded-full", isHighContrast ? "bg-black" : isDark ? "bg-slate-600" : "bg-slate-300")} />
                          <div className={cn("h-2 w-1/2 rounded-full", isHighContrast ? "bg-black" : isDark ? "bg-slate-700" : "bg-slate-200")} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[controls.tone, controls.channel, `CTR ${metrics.ctr.toFixed(1)}%`].map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs",
                            isHighContrast
                              ? "border border-black text-black"
                              : isDark
                                ? "border border-slate-600 text-slate-300"
                                : "border border-slate-200 text-slate-600"
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs font-medium text-slate-400">Campaign Line</div>
                  <p className="mt-1 text-base font-semibold text-slate-900">{concept.line}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Target className="size-4 text-blue-600" />
                  预测指标
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Metric label="Reach" value={formatReach(metrics.reach)} tone="bg-blue-50" />
                <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} tone="bg-emerald-50" />
                <Metric label="Conversion" value={`${metrics.conversion.toFixed(1)}%`} tone="bg-violet-50" />
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Component className="size-4 text-blue-600" />
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

          <section className="xl:col-start-1 xl:col-span-3 xl:row-start-4">
            <Card className="border-slate-200 bg-slate-100 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">操作区</h3>
                  <p className="mt-1 text-xs text-slate-500">生成、保存或导出当前产品前端方案。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={generate} disabled={status === "loading"} className="bg-blue-700 hover:bg-blue-600">
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-slate-300 hover:bg-white">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-slate-300 hover:bg-white">
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
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-700">
        <Loader2 className="size-4 animate-spin" />
        构建中
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="size-4" />
        构建成功
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="size-4" />
        构建失败
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
