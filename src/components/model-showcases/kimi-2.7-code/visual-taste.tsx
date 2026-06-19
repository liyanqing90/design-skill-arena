"use client"

import { useCallback, useMemo, useState } from "react"
import { ShowcaseItem } from "@/types/showcase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Download,
  ImageIcon,
  Megaphone,
  MessageSquare,
  Palette,
  Save,
  Send,
  Sparkles,
  Users,
} from "lucide-react"

type Option = {
  value: string
  label: string
  reach: number
  ctr: number
  conversion: number
}

type Concept = {
  id: "A" | "B" | "C"
  name: string
  headline: string
  sub: string
  primary: string
  secondary: string
  reach: number
  ctr: number
  conversion: number
}

type ActivityItem = {
  id: string
  time: string
  text: string
  type: "system" | "user" | "success" | "error"
}

const audiences: Option[] = [
  { value: "visionary", label: "视觉先锋", reach: 0.1, ctr: 0.12, conversion: 0.06 },
  { value: "curator", label: "内容策展人", reach: 0.04, ctr: 0.1, conversion: 0.12 },
  { value: "brand", label: "品牌团队", reach: -0.04, ctr: 0.08, conversion: 0.18 },
  { value: "studio", label: "设计工作室", reach: -0.08, ctr: 0.14, conversion: 0.14 },
]

const channels: Option[] = [
  { value: "gallery", label: "作品画廊", reach: 0.08, ctr: 0.1, conversion: 0.1 },
  { value: "portfolio", label: "作品集", reach: -0.04, ctr: 0.12, conversion: 0.16 },
  { value: "launch", label: "发布页", reach: 0.12, ctr: 0.08, conversion: 0.12 },
  { value: "story", label: "品牌故事", reach: 0.02, ctr: 0.06, conversion: 0.18 },
]

const tones: Option[] = [
  { value: "poetic", label: "诗意", reach: 0.08, ctr: 0.08, conversion: 0.08 },
  { value: "precise", label: "精准", reach: -0.02, ctr: 0.12, conversion: 0.16 },
  { value: "open", label: "开放", reach: 0.12, ctr: 0.04, conversion: 0.1 },
  { value: "confident", label: "自信", reach: 0.02, ctr: 0.14, conversion: 0.12 },
]

const styles: Option[] = [
  { value: "balanced", label: "均衡构图", reach: 0.04, ctr: 0.06, conversion: 0.14 },
  { value: "asymmetric", label: "非对称", reach: 0.1, ctr: 0.12, conversion: 0.06 },
  { value: "centered", label: "中心聚焦", reach: 0.02, ctr: 0.08, conversion: 0.16 },
  { value: "diagonal", label: "对角动态", reach: 0.14, ctr: 0.1, conversion: 0.04 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "柔光几何",
    headline: "用形状说话，而不是用噪音。",
    sub: "柔和渐变与几何色块，让视觉成为信息的容器。",
    primary: "#8b5cf6",
    secondary: "#f472b6",
    reach: 590,
    ctr: 5.1,
    conversion: 3.9,
  },
  {
    id: "B",
    name: "自然呼吸",
    headline: "像植物生长一样展开内容。",
    sub: "有机曲线与自然色调，营造放松而专注的阅读氛围。",
    primary: "#10b981",
    secondary: "#f59e0b",
    reach: 560,
    ctr: 4.7,
    conversion: 4.3,
  },
  {
    id: "C",
    name: "深海留白",
    headline: "在安静的深海里，听见重点。",
    sub: "低饱和蓝调与大面积留白，强化信息的层次感。",
    primary: "#3b82f6",
    secondary: "#64748b",
    reach: 620,
    ctr: 4.5,
    conversion: 4.1,
  },
]

export function VisualTasteShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为一场视觉主导的 Muse 战役创作强视觉但克制的落地页。")
  const [audience, setAudience] = useState(audiences[0].value)
  const [channel, setChannel] = useState(channels[0].value)
  const [tone, setTone] = useState(tones[0].value)
  const [style, setStyle] = useState(styles[0].value)
  const [conceptId, setConceptId] = useState<"A" | "B" | "C">("A")
  const [isGenerating, setIsGenerating] = useState(false)
  const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [buttonStates, setButtonStates] = useState({
    generate: "idle" as "idle" | "loading" | "success" | "error",
    save: "idle" as "idle" | "loading" | "success" | "error",
    export: "idle" as "idle" | "loading" | "success" | "error",
  })
  const [activity, setActivity] = useState<ActivityItem[]>([
    { id: "1", time: "刚刚", text: "Visual Taste Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
    { id: "3", time: "刚刚", text: "视觉资源已准备", type: "system" },
  ])

  const selectedAudience = useMemo(() => audiences.find((o) => o.value === audience)!, [audience])
  const selectedChannel = useMemo(() => channels.find((o) => o.value === channel)!, [channel])
  const selectedTone = useMemo(() => tones.find((o) => o.value === tone)!, [tone])
  const selectedStyle = useMemo(() => styles.find((o) => o.value === style)!, [style])
  const selectedConcept = useMemo(() => concepts.find((c) => c.id === conceptId)!, [conceptId])

  const metrics = useMemo(() => {
    const reach = Math.max(0, Math.round(selectedConcept.reach * (1 + selectedAudience.reach + selectedChannel.reach + selectedTone.reach + selectedStyle.reach)))
    const ctr = Math.max(0, +(selectedConcept.ctr * (1 + selectedAudience.ctr + selectedChannel.ctr + selectedTone.ctr + selectedStyle.ctr)).toFixed(1))
    const conversion = Math.max(0, +(selectedConcept.conversion * (1 + selectedAudience.conversion + selectedChannel.conversion + selectedTone.conversion + selectedStyle.conversion)).toFixed(1))
    return { reach, ctr, conversion }
  }, [selectedAudience, selectedChannel, selectedTone, selectedStyle, selectedConcept])

  const addActivity = useCallback((text: string, type: ActivityItem["type"] = "user") => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time, text, type }, ...prev].slice(0, 50))
  }, [])

  const handleControlChange = useCallback(
    (kind: string, value: string, label: string) => {
      if (kind === "audience") setAudience(value)
      if (kind === "channel") setChannel(value)
      if (kind === "tone") setTone(value)
      if (kind === "style") setStyle(value)
      addActivity(`调整 ${kind === "audience" ? "目标人群" : kind === "channel" ? "渠道" : kind === "tone" ? "语气" : "视觉风格"} 为「${label}」`)
    },
    [addActivity]
  )

  const handleConceptChange = useCallback(
    (id: "A" | "B" | "C") => {
      setConceptId(id)
      setIsGenerating(true)
      addActivity(`切换创意概念 ${id}：${concepts.find((c) => c.id === id)?.name}`)
      setTimeout(() => setIsGenerating(false), 650)
    },
    [addActivity]
  )

  const runAction = useCallback(
    (key: "generate" | "save" | "export", successMessage: string) => {
      setButtonStates((prev) => ({ ...prev, [key]: "loading" }))
      setBanner(null)
      addActivity(`点击${key === "generate" ? "生成" : key === "save" ? "保存" : "导出"}...`)
      setTimeout(() => {
        const failed = Math.random() < 0.08
        if (failed) {
          setButtonStates((prev) => ({ ...prev, [key]: "error" }))
          setBanner({ type: "error", message: "操作失败，请重试。" })
          addActivity("操作失败：模拟异常", "error")
        } else {
          setButtonStates((prev) => ({ ...prev, [key]: "success" }))
          setBanner({ type: "success", message: successMessage })
          addActivity(successMessage, "success")
          setTimeout(() => setButtonStates((prev) => ({ ...prev, [key]: "idle" })), 1600)
        }
      }, 900)
    },
    [addActivity]
  )

  return (
    <div className="min-h-full bg-[#f7f6fa] p-4 text-slate-800 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 bg-slate-900 text-white">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1 border-slate-300 text-slate-600">
                <ImageIcon className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h1>
            <p className="max-w-2xl text-sm text-slate-500">{item.focus}</p>
          </div>
          {banner && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                banner.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              )}
            >
              {banner.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
              {banner.message}
            </div>
          )}
        </header>

        <section className="relative">
          <Card
            key={conceptId}
            className="relative min-h-[480px] overflow-hidden rounded-3xl border-none bg-white shadow-sm"
          >
            {isGenerating && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
                  <div className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
                  正在生成视觉预览…
                </div>
              </div>
            )}

            <div className="absolute inset-0">
              <VisualGraphic concept={selectedConcept} style={selectedStyle.value} />
            </div>

            <div className="absolute left-6 top-6 z-10 md:left-10 md:top-10">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                {selectedStyle.label}
              </div>
              <h2 className="max-w-md font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl" style={{ textShadow: "0 2px 20px rgba(255,255,255,0.6)" }}>
                {selectedConcept.headline}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-slate-600">{selectedConcept.sub}</p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 md:bottom-6 md:left-auto md:right-6 md:w-80">
              <Card className="border-white/60 bg-white/80 shadow-lg backdrop-blur">
                <CardContent className="space-y-3 p-4">
                  <ControlRow label="目标人群" icon={<Users className="size-3" />} options={audiences} value={audience} onChange={(val, label) => handleControlChange("audience", val, label)} />
                  <Separator className="bg-slate-200" />
                  <ControlRow label="渠道" icon={<Megaphone className="size-3" />} options={channels} value={channel} onChange={(val, label) => handleControlChange("channel", val, label)} />
                  <Separator className="bg-slate-200" />
                  <ControlRow label="语气" icon={<MessageSquare className="size-3" />} options={tones} value={tone} onChange={(val, label) => handleControlChange("tone", val, label)} />
                  <Separator className="bg-slate-200" />
                  <ControlRow label="视觉风格" icon={<Palette className="size-3" />} options={styles} value={style} onChange={(val, label) => handleControlChange("style", val, label)} />
                </CardContent>
              </Card>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {concepts.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleConceptChange(c.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                conceptId === c.id
                  ? "border-slate-900 bg-slate-900 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <div
                className="absolute right-0 top-0 size-20 -translate-y-1/2 translate-x-1/2 rounded-full opacity-20 transition-transform group-hover:scale-110"
                style={{ background: c.primary }}
              />
              <span className="relative block text-xs opacity-70">概念 {c.id}</span>
              <span className="relative block font-medium">{c.name}</span>
            </button>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">战役 Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  onBlur={() => addActivity("更新 Campaign Brief")}
                  className="min-h-[120px] resize-none"
                  placeholder="输入战役 brief..."
                />
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-slate-400" />
                  <CardTitle className="text-sm">最近操作</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[260px] overflow-auto">
                  <ul className="divide-y divide-slate-100">
                    {activity.map((act) => (
                      <li key={act.id} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50">
                        <div
                          className={cn(
                            "mt-0.5 size-2 rounded-full",
                            act.type === "success" && "bg-emerald-500",
                            act.type === "error" && "bg-red-500",
                            act.type === "system" && "bg-slate-400",
                            act.type === "user" && "bg-slate-900"
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{act.text}</p>
                          <p className="text-xs text-slate-400">{act.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div className="border-t border-slate-100 p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-900" onClick={() => setActivity([])}>
                  清空记录
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-5 lg:col-span-8">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">预测数据</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <MetricBox label="预计 Reach" value={metrics.reach.toLocaleString()} color={selectedConcept.primary} max={750} />
                  <MetricBox label="预计 CTR" value={`${metrics.ctr}%`} color={selectedConcept.primary} max={6.5} />
                  <MetricBox label="预计 Conversion" value={`${metrics.conversion}%`} color={selectedConcept.primary} max={5} />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => runAction("generate", "视觉创意已生成")} disabled={buttonStates.generate === "loading"} className="gap-1.5">
                {buttonStates.generate === "loading" ? <Spinner /> : <Send className="size-4" />}
                生成
              </Button>
              <Button variant="secondary" onClick={() => runAction("save", "视觉方案已保存")} disabled={buttonStates.save === "loading"} className="gap-1.5">
                {buttonStates.save === "loading" ? <Spinner /> : <Save className="size-4" />}
                保存
              </Button>
              <Button variant="outline" onClick={() => runAction("export", "视觉导出包已生成")} disabled={buttonStates.export === "loading"} className="gap-1.5">
                {buttonStates.export === "loading" ? <Spinner /> : <Download className="size-4" />}
                导出
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function VisualGraphic({ concept, style }: { concept: Concept; style: string }) {
  const id = `vt-gradient-${concept.id}`
  const positions =
    style === "asymmetric"
      ? [20, 60, 35]
      : style === "centered"
      ? [50, 50, 50]
      : style === "diagonal"
      ? [15, 75, 45]
      : [30, 55, 40]
  return (
    <svg viewBox="0 0 800 480" className="size-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={concept.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor={concept.secondary} stopOpacity="0.08" />
        </linearGradient>
        <filter id="vt-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
      </defs>
      <rect width="800" height="480" fill={`url(#${id})`} />
      <circle cx={positions[0] * 8} cy="120" r="90" fill={concept.primary} opacity="0.12" filter="url(#vt-blur)" />
      <circle cx={positions[1] * 8} cy="320" r="120" fill={concept.secondary} opacity="0.14" filter="url(#vt-blur)" />
      <rect x={positions[2] * 8 - 60} y="180" width="160" height="160" rx="24" fill={concept.primary} opacity="0.08" transform={`rotate(${style === "diagonal" ? 12 : 0} ${positions[2] * 8 + 20} 260)`} />
      <rect x="60" y="360" width="120" height="8" rx="4" fill={concept.primary} opacity="0.15" />
      <rect x="60" y="380" width="80" height="8" rx="4" fill={concept.secondary} opacity="0.15" />
    </svg>
  )
}

function ControlRow({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  options: Option[]
  value: string
  onChange: (val: string, label: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        {icon}
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value, opt.label)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              value === opt.value
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MetricBox({ label, value, color, max }: { label: string; value: string; color: string; max: number }) {
  const num = parseFloat(value.replace(/,/g, ""))
  const pct = Math.min(100, (num / max) * 100)
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 font-heading text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function Spinner() {
  return <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
}
