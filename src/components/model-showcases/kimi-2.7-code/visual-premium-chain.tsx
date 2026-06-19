"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Clapperboard,
  Download,
  Loader2,
  MonitorPlay,
  Save,
  Sparkles,
  Trophy,
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
  audience: ["高端消费者", "创意总监", "科技爱好者", "生活方式 KOL"],
  channel: ["品牌大片", "影院前贴片", "社交媒体开屏", "户外广告"],
  tone: ["电影叙事", "极简留白", "戏剧张力", "静谧高级"],
  style: ["暗调光影", "金属质感", "柔焦胶片", "霓虹未来"],
}

const CONCEPTS: CreativeOption[] = [
  {
    id: "A",
    name: "午夜开场",
    headline: "在城市的暗处，点亮一行代码的光芒",
    angle: "以电影级夜景与城市光影讲述技术的隐秘力量。",
    line: "深夜的屏幕，从不孤独。",
    reach: 480,
    ctr: 4.6,
    conversion: 5.3,
  },
  {
    id: "B",
    name: "金属诗篇",
    headline: "把逻辑的锋利，锻造成视觉的柔和",
    angle: "金属与流体元素交织，表现技术精度与人文触感。",
    line: "代码有棱有角，体验温润如玉。",
    reach: 530,
    ctr: 4.8,
    conversion: 5.0,
  },
  {
    id: "C",
    name: "聚光灯下",
    headline: "让产品本身，成为舞台上唯一的主角",
    angle: "极简舞台光效聚焦核心信息，营造高级感与仪式感。",
    line: "一束光，只说一件事。",
    reach: 500,
    ctr: 4.4,
    conversion: 5.5,
  },
]

const DEFAULT_BRIEF =
  "为 Kimi 2.7 Code 打造一支具有电影质感的品牌视觉 campaign，突出代码之美、智能之锐与创作之自由。"

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

export function VisualPremiumChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(DEFAULT_BRIEF)
  const [selected, setSelected] = useState<CreativeId>("A")
  const [status, setStatus] = useState<Status>("idle")
  const [activity, setActivity] = useState<string[]>([
    "影院模式已就绪",
    "高级视觉资源加载完成",
    "默认概念 A 预览中",
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
      reach: concept.reach + weight * 42,
      ctr: concept.ctr + weight * 0.09,
      conversion: concept.conversion + weight * 0.06,
    }
  }, [concept, controls])

  function pushActivity(message: string) {
    setActivity((prev) => [message, ...prev].slice(0, 6))
  }

  function updateControl(key: ControlKey, value: string) {
    setControls((prev) => ({ ...prev, [key]: value }))
    pushActivity(`已设定「${labelMap[key]}」：${value}`)
  }

  function generate() {
    if (status === "loading") return
    setStatus("loading")
    pushActivity(`正在渲染概念 ${selected} 的影院级画面…`)
    timerRef.current = window.setTimeout(() => {
      if (brief.trim().length < 12) {
        setStatus("error")
        pushActivity("渲染失败：Brief 缺少叙事背景")
        return
      }
      setStatus("success")
      pushActivity(`概念「${concept.name}」渲染完成`)
    }, 1100)
  }

  function save() {
    setStatus("success")
    pushActivity(`已收藏「${concept.name}」至视觉库`)
  }

  function exportPlan() {
    setStatus("success")
    pushActivity(`已导出 ${controls.channel} 高清素材包`)
  }

  function selectConcept(id: CreativeId) {
    setSelected(id)
    pushActivity(`切换至概念 ${id}：${CONCEPTS.find((c) => c.id === id)?.name}`)
  }

  const toneGradient: Record<string, string> = {
    "电影叙事": "from-violet-900 via-indigo-900 to-slate-900",
    "极简留白": "from-slate-900 via-zinc-800 to-neutral-900",
    "戏剧张力": "from-amber-900 via-orange-900 to-purple-950",
    "静谧高级": "from-slate-800 via-slate-900 to-black",
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-zinc-100 text-zinc-950 hover:bg-zinc-100">{MODEL_NAME}</Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                {item.skillChainLabel}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-zinc-500">
              <Clapperboard className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">高级视觉 · 影院质感</span>
            </div>
            <h1 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">{item.title || "视觉大片工坊"}</h1>
          </div>
          <StatusBadge status={status} />
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_320px_320px]">
          <section className="xl:col-start-1 xl:row-start-1 xl:row-span-4">
            <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900 shadow-lg">
              <CardHeader className="border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <MonitorPlay className="size-4" />
                    主视觉预览
                  </CardTitle>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                    Concept {concept.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-6 p-5">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{concept.name}</p>
                  <h2 className="text-3xl font-light leading-tight sm:text-4xl">{concept.headline}</h2>
                  <p className="max-w-xl text-sm leading-6 text-zinc-400">{concept.angle}</p>
                </div>

                <div
                  className={cn(
                    "relative min-h-80 overflow-hidden rounded-xl bg-gradient-to-br p-6 shadow-2xl",
                    toneGradient[controls.tone] ?? toneGradient["电影叙事"]
                  )}
                >
                  <div className="absolute -right-12 -top-12 size-64 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative flex h-full min-h-72 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">
                        {controls.channel}
                      </span>
                      <span className="text-xs text-white/60">{controls.style}</span>
                    </div>
                    <div>
                      <p className="text-lg font-light text-white/90">{concept.line}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[controls.audience, controls.tone, `概念 ${concept.id}`].map((tag) => (
                          <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">Campaign Line</div>
                  <p className="mt-1 text-lg font-light text-zinc-100">{concept.line}</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-1 xl:col-span-2">
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-300">Campaign Brief</CardTitle>
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
                  className="min-h-24 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 hover:border-zinc-500 focus-visible:border-zinc-400 focus-visible:ring-3 focus-visible:ring-zinc-800"
                />
                <div className="mt-2 flex items-center justify-between">
                  {status === "error" ? (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <AlertCircle className="size-3.5" />
                      请补充更完整的叙事背景。
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-zinc-600">{brief.length} chars</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-2">
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-300">创意控制</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {(Object.keys(labelMap) as ControlKey[]).map((key) => (
                  <label key={key} className="grid gap-1.5">
                    <span className="text-xs text-zinc-500">{labelMap[key]}</span>
                    <select
                      value={controls[key]}
                      onChange={(e) => updateControl(key, e.target.value)}
                      className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none transition hover:border-zinc-500 focus-visible:border-zinc-400 focus-visible:ring-3 focus-visible:ring-zinc-800"
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

          <section className="xl:col-start-3 xl:row-start-2">
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-300">创意概念 A / B / C</CardTitle>
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
                        "rounded-lg border p-3 text-left outline-none transition hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-zinc-700",
                        active
                          ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                          : "border-zinc-800 bg-zinc-950 text-zinc-400"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{c.id}</span>
                        {active ? <span className="text-xs text-zinc-300">Selected</span> : null}
                      </div>
                      <div className="mt-2 font-medium">{c.name}</div>
                      <div className="mt-1 text-xs leading-5 text-zinc-500">{c.angle}</div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:row-start-3">
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Trophy className="size-4 text-amber-500" />
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
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <MonitorPlay className="size-4" />
                  最近操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-2">
                  {activity.map((entry, index) => (
                    <li key={`${entry}-${index}`} className="border-b border-zinc-800 py-2 text-xs text-zinc-500 last:border-0">
                      {entry}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-start-2 xl:col-span-2 xl:row-start-4">
            <Card className="border-zinc-800 bg-zinc-900 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-zinc-200">操作区</h3>
                  <p className="mt-1 text-xs text-zinc-500">渲染、保存或导出影院级素材。</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={generate} disabled={status === "loading"} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200">
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    渲染生成
                  </Button>
                  <Button variant="outline" onClick={save} className="border-zinc-700 text-zinc-100 hover:bg-zinc-800">
                    <Save className="size-4" />
                    保存
                  </Button>
                  <Button variant="outline" onClick={exportPlan} className="border-zinc-700 text-zinc-100 hover:bg-zinc-800">
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
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300">
        <Loader2 className="size-4 animate-spin" />
        渲染中
      </div>
    )
  }
  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-950 px-3 py-1.5 text-sm font-medium text-emerald-400">
        <CheckCircle2 className="size-4" />
        已完成
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-red-900 bg-red-950 px-3 py-1.5 text-sm font-medium text-red-400">
        <AlertCircle className="size-4" />
        渲染失败
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-500">
      待渲染
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-light tabular-nums text-zinc-100">{value}</div>
    </div>
  )
}
