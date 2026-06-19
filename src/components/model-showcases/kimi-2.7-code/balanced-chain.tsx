"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Download,
  HeartHandshake,
  Layers,
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
  audience: ["初创公司","成长型企业","成熟品牌","个人创作者"],
  channel: ["官网首页","应用内弹窗","邮件营销","短视频"],
  tone: ["真诚可信","活力进取","稳重专业","幽默轻松"],
  style: ["产品截图","插画场景","真人实拍","极简图形"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "稳扎稳打",
    headline: "一个让团队上下都能快速上手的创意方案",
    angle: "平衡品牌感与转化率，适合追求稳健增长的团队。",
    line: "好创意，不需要冒险。",
    reach: 670,
    ctr: 4.2,
    conversion: 4.6,
  },
  {
    id: "B",
    name: "高效协同",
    headline: "让市场、设计与开发在同一个页面里对齐",
    angle: "突出跨职能协作，强调从 brief 到上线的一站式体验。",
    line: "一人输入，全员对齐。",
    reach: 710,
    ctr: 4.5,
    conversion: 4.4,
  },
  {
    id: "C",
    name: "自然增长",
    headline: "像产品功能一样自然融入用户旅程",
    angle: "弱化广告感，以内容价值驱动自然传播。",
    line: "在用户需要的时候出现。",
    reach: 650,
    ctr: 4.0,
    conversion: 4.9,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 打造一场面向广泛企业用户的均衡型 campaign，兼顾品牌可信度与转化效率。"

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

export function BalancedChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "均衡模式已启动",
    "产品页组件加载完成",
    "默认配置已应用",
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
      reach: concept.reach + weight * 55,
      ctr: concept.ctr + weight * 0.1,
      conversion: concept.conversion + weight * 0.07,
    }
  }, [concept, controls])

  function pushActivity(message: string) {
    setActivity((prev) => [message, ...prev].slice(0, 6))
  }

  function updateControl(key: ControlKey, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }))
    pushActivity(`已设置「${labelMap[key]}」为：${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`正在生成概念 ${selected} 的方案…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("生成失败：Campaign Brief 过短")
        return
      }
      setStatus("success")
      pushActivity(`方案「${concept.name}」已生成`)
    }, 950)
  }

  function save() {
    setStatus("success")
    pushActivity(`已保存「${concept.name}」至项目`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已导出至 ${controls.channel} 资源包`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`切换至概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-zinc-800 text-white hover:bg-zinc-800">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-zinc-500">
              <HeartHandshake className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">均衡全能 · 稳定产品页</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{item.title || "创意产品页"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)_340px]">
          <section className="xl:col-start-1 xl:row-start-1">
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-zinc-800">创意控制</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {(Object.keys(labelMap) as ControlKey[]).map((key) => (
                  <label key={key} className="grid gap-1.5">
                    <span className="text-xs font-medium text-zinc-500">{labelMap[key]}</span>
                    <select
                      value={controls[key]}
                      onChange={(e) => updateControl(key, e.target.value)}
                      className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition hover:border-sky-400 focus-visible:border-sky-500 focus-visible:ring-3 focus-visible:ring-sky-100"
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

          <section className="xl:col-start-3 xl:row-start-1">
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-zinc-800">Campaign Brief</CardTitle>
                  <span className="text-xs text-zinc-400">{brief.length} 字</span>
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
                  className="min-h-36 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm leading-6 text-zinc-900 outline-none transition hover:border-sky-400 focus-visible:border-sky-500 focus-visible:ring-3 focus-visible:ring-sky-100"
                />
                {status === "error" ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="size-3.5" />
                    请补充更多 campaign 背景。
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-1 xl:row-span-2">
            <Card className="h-full border-zinc-200 bg-gradient-to-b from-white to-zinc-50 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                    <Layers className="size-4 text-sky-600" />
                    主视觉预览
                  </CardTitle>
                  <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">概念 {concept.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold leading-snug text-zinc-900 sm:text-3xl">{concept.headline}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{concept.angle}</p>
                </div>

                <div className="relative min-h-72 overflow-hidden rounded-xl border border-zinc-200 bg-white p-0 shadow-sm">
                  <div className="flex h-full min-h-72 flex-col">
                    <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-sky-600" />
                        <span className="text-sm font-semibold text-zinc-800">{concept.name}</span>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600">{controls.channel}</span>
                    </div>
                    <div className="grid flex-1 grid-cols-2 gap-0">
                      <div className="flex flex-col justify-center border-r border-zinc-100 p-5">
                        <span className="text-xs font-medium text-zinc-400">为</span>
                        <span className="mt-1 text-base font-semibold text-zinc-800">{controls.audience}</span>
                        <span className="mt-4 text-xs font-medium text-zinc-400">语气</span>
                        <span className="mt-1 text-sm text-zinc-700">{controls.tone}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 p-5">
                        <div className="grid w-full grid-cols-2 gap-2">
                          <div className="aspect-square rounded-lg bg-sky-50" />
                          <div className="aspect-square rounded-lg bg-zinc-100" />
                          <div className="aspect-square rounded-lg bg-zinc-100" />
                          <div className="aspect-square rounded-lg bg-sky-50" />
                        </div>
                        <span className="text-xs text-zinc-500">{controls.style}</span>
                      </div>
                    </div>
                    <div className="border-t border-zinc-100 px-5 py-3">
                      <div className="text-xs text-zinc-400">Campaign Line</div>
                      <p className="text-sm font-semibold text-zinc-800">{concept.line}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-xs font-medium text-zinc-400">Brief 摘要</div>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-600">{brief}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-2">
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-zinc-800">创意概念 A / B / C</CardTitle>
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
                        "flex items-center gap-3 rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-sky-100",
                        active
                          ? "border-sky-500 bg-sky-50 text-zinc-900"
                          : "border-zinc-200 bg-white text-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-full text-sm font-bold",
                          active ? "bg-sky-600 text-white" : "bg-zinc-100 text-zinc-500"
                        )}
                      >
                        {c.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold">{c.name}</div>
                        <div className="truncate text-xs text-zinc-500">{c.angle}</div>
                      </div>
                      {active ? <CheckCircle2 className="size-4 text-sky-600" /> : null}
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-2">
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <BarChart3 className="size-4 text-sky-600" />
                  预测指标
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Metric label="Reach" value={formatReach(metrics.reach)} valuePercent={Math.min(100, metrics.reach / 10)} color="bg-sky-500" />
                <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} valuePercent={Math.min(100, metrics.ctr * 18)} color="bg-emerald-500" />
                <Metric label="Conversion" value={`${metrics.conversion.toFixed(1)}%`} valuePercent={Math.min(100, metrics.conversion * 20)} color="bg-violet-500" />
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:row-start-3">
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Target className="size-4 text-sky-600" />
                  最近操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-2">
                  {activity.map((entry, index) => (
                    <li key={`${entry}-${index}`} className="rounded-md border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
                      {entry}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:col-span-2 xl:row-start-3">
            <Card className="border-zinc-200 bg-zinc-100 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800">操作区</h3>
                  <p className="mt-1 text-xs text-zinc-500">生成、保存或导出当前方案。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={generate} disabled={status === "loading"} className="bg-zinc-800 hover:bg-zinc-700">
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-zinc-300 hover:bg-white">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-zinc-300 hover:bg-white">
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
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700">
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
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600">
      就绪
    </div>
  )
}

function Metric({
  label,
  value,
  valuePercent,
  color,
}: {
  label: string
  value: string
  valuePercent: number
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{label}</span>
        <span className="font-semibold tabular-nums text-zinc-900">{value}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${valuePercent}%` }} />
      </div>
    </div>
  )
}
