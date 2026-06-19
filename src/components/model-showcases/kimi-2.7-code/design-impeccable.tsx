"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Feather,
  Loader2,
  Palette,
  Save,
  Sparkles,
  Timer,
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
  audience: ["设计驱动型团队", "前端工程师", "品牌创意总监", "独立设计师"],
  channel: ["设计周刊", "落地页头图", "社交媒体", "线下展览"],
  tone: ["诗意克制", "理性优雅", "温暖人文", "冷峻精确"],
  style: ["编辑式留白", "柔和网格", "衬线标题", "手工质感"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "纸间留白",
    headline: "少即是多：让每一寸留白都成为设计陈述",
    angle: "以大量留白与精致排版突出核心信息，传递克制的高级感。",
    line: "在留白里，看见思考的深度。",
    reach: 520,
    ctr: 3.9,
    conversion: 5.1,
  },
  {
    id: "B",
    name: "理性网格",
    headline: "秩序之美：用 invisible grid 承载复杂叙事",
    angle: "隐性的编辑网格组织图文，构建理性而优雅的阅读节奏。",
    line: "看不见的网格，看得见的信任。",
    reach: 590,
    ctr: 4.3,
    conversion: 4.8,
  },
  {
    id: "C",
    name: "手作温度",
    headline: "把数字产品的精密，藏进一点人文触感",
    angle: "柔和色调与手写元素结合，营造亲近而不失专业的氛围。",
    line: "精密代码，温润表达。",
    reach: 560,
    ctr: 4.0,
    conversion: 5.0,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 打造一场编辑式 campaign，强调设计的精致度、排版的秩序感，以及技术与审美的平衡。"

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

export function DesignImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "编辑网格已加载",
    "字体排印系统就绪",
    "留白参数已校准",
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
      reach: concept.reach + weight * 46,
      ctr: concept.ctr + weight * 0.08,
      conversion: concept.conversion + weight * 0.06,
    }
  }, [concept, controls])

  function pushActivity(message: string) {
    setActivity((prev) => [message, ...prev].slice(0, 6))
  }

  function updateControl(key: ControlKey, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }))
    pushActivity(`已调整「${labelMap[key]}」：${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`正在为概念 ${selected} 渲染精致方案…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("渲染中断：Brief 内容过短")
        return
      }
      setStatus("success")
      pushActivity(`方案「${concept.name}」已完成精修`)
    }, 1000)
  }

  function save() {
    setStatus("success")
    pushActivity(`已收藏「${concept.name}」至灵感库`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已导出 ${controls.channel} 尺寸素材包`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`已选中概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-7 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-stone-800 text-stone-50 hover:bg-stone-800">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-stone-300 text-stone-600">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-2 text-stone-400">
              <Palette className="size-4" />
              <span className="text-[11px] font-medium uppercase tracking-widest">编辑网格 · 精致打磨</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl">{item.title || "创意编辑室"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_340px_340px]">
          <section className="xl:col-start-1 xl:row-start-1 xl:row-span-3">
            <Card className="h-full overflow-hidden border-stone-200 bg-white shadow-sm">
              <CardHeader className="border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-stone-500">
                    <Feather className="size-4" />
                    主视觉预览
                  </CardTitle>
                  <Badge variant="outline" className="border-stone-300 font-serif text-stone-600">
                    {concept.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-6 p-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">{concept.name}</p>
                  <h2 className="font-serif text-3xl font-medium leading-tight text-stone-900 sm:text-4xl">
                    {concept.headline}
                  </h2>
                  <p className="max-w-xl text-sm leading-7 text-stone-600">{concept.angle}</p>
                </div>

                <div className="relative min-h-80 overflow-hidden rounded-none border border-stone-200 bg-[#fbfaf9] p-6">
                  <div className="absolute inset-y-0 left-1/3 w-px bg-stone-200" />
                  <div className="absolute inset-x-0 top-1/3 h-px bg-stone-200" />
                  <div className="grid h-full min-h-72 grid-cols-3 grid-rows-3 gap-3">
                    <div className="col-span-2 row-span-2 flex flex-col justify-end p-4">
                      <span className="font-serif text-4xl font-medium leading-none text-stone-900">{concept.name}</span>
                      <p className="mt-3 max-w-xs text-sm leading-5 text-stone-500">{concept.line}</p>
                    </div>
                    <div className="flex flex-col items-end justify-start p-3">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400">Tone</span>
                      <span className="mt-1 text-right text-xs font-medium text-stone-700">{controls.tone}</span>
                    </div>
                    <div className="flex flex-col items-end justify-start p-3">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400">Style</span>
                      <span className="mt-1 text-right text-xs font-medium text-stone-700">{controls.style}</span>
                    </div>
                    <div className="col-span-3 row-start-3 flex items-center justify-between border-t border-stone-200 p-3">
                      <div className="flex gap-6">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-stone-400">Audience</span>
                          <div className="text-xs font-medium text-stone-700">{controls.audience}</div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-stone-400">Channel</span>
                          <div className="text-xs font-medium text-stone-700">{controls.channel}</div>
                        </div>
                      </div>
                      <div className="text-xs tabular-nums text-stone-500">CTR {metrics.ctr.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-stone-300 pl-4">
                  <div className="text-[10px] uppercase tracking-widest text-stone-400">Campaign Line</div>
                  <p className="mt-1 font-serif text-lg italic text-stone-800">“{concept.line}”</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-1">
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-stone-700">Campaign Brief</CardTitle>
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
                  className="min-h-28 w-full resize-y border-b border-stone-200 bg-transparent px-1 py-2 text-sm leading-6 text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus-visible:border-stone-500"
                />
                <div className="mt-2 flex items-center justify-between">
                  {status === "error" ? (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="size-3.5" />
                      请补充更完整的 brief。
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-stone-400">{brief.length} chars</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-1">
            <Card className="border-stone-200 bg-[#f5f3f0] shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-stone-700">创意控制</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {(Object.keys(labelMap) as ControlKey[]).map((key) => (
                  <label key={key} className="grid gap-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">{labelMap[key]}</span>
                    <select
                      value={controls[key]}
                      onChange={(e) => updateControl(key, e.target.value)}
                      className="h-9 w-full border-b border-stone-300 bg-transparent px-1 text-sm text-stone-900 outline-none transition hover:border-stone-400 focus-visible:border-stone-600"
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

          <section className="xl:col-start-2 xl:row-start-2 xl:col-span-2">
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-stone-700">创意概念 A / B / C</CardTitle>
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
                        "group rounded-none border p-4 text-left outline-none transition hover:bg-stone-50 focus-visible:ring-2 focus-visible:ring-stone-300",
                        active
                          ? "border-stone-800 bg-stone-100 text-stone-900"
                          : "border-stone-200 bg-white text-stone-600"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-medium">{c.id}</span>
                        {active ? <span className="text-[10px] uppercase tracking-widest text-stone-500">Selected</span> : null}
                      </div>
                      <div className="mt-3 font-medium">{c.name}</div>
                      <div className="mt-1 text-xs leading-5 text-stone-500">{c.angle}</div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-3">
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Timer className="size-4" />
                  预测指标
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                <Metric label="Reach" value={formatReach(metrics.reach)} />
                <Metric label="CTR" value={`${metrics.ctr.toFixed(1)}%`} />
                <Metric label="Conv." value={`${metrics.conversion.toFixed(1)}%`} />
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-3 xl:row-start-3">
            <Card className="border-stone-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Feather className="size-4" />
                  最近操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-2">
                  {activity.map((entry, index) => (
                    <li
                      key={`${entry}-${index}`}
                      className="border-b border-stone-100 py-2 text-xs text-stone-500 last:border-0"
                    >
                      {entry}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-1 xl:col-span-3 xl:row-start-4">
            <Card className="border-stone-200 bg-[#f5f3f0] shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-stone-800">操作区</h3>
                  <p className="mt-1 text-xs text-stone-500">渲染、保存或导出当前编辑方案。</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={generate}
                    disabled={status === "loading"}
                    className="bg-stone-800 text-stone-50 hover:bg-stone-700"
                  >
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    渲染生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-stone-300 hover:bg-stone-100">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-stone-300 hover:bg-stone-100">
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
      <div className="inline-flex items-center gap-2 rounded-none border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700">
        <Loader2 className="size-4 animate-spin" />
        渲染中
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-none border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="size-4" />
        已完成
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-none border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
        <AlertCircle className="size-4" />
        渲染失败
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-none border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-500">
      待编辑
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-stone-200 pl-3 first:border-0 first:pl-0">
      <div className="text-[10px] uppercase tracking-widest text-stone-400">{label}</div>
      <div className="mt-1 text-xl font-medium tabular-nums text-stone-900">{value}</div>
    </div>
  )
}
