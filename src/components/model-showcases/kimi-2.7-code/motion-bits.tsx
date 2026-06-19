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
  Megaphone,
  MessageSquare,
  Palette,
  Save,
  Send,
  Sparkles,
  Users,
  Zap,
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
  accent: string
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
  { value: "creator", label: "独立创作者", reach: 0.18, ctr: 0.08, conversion: -0.04 },
  { value: "team", label: "小型团队", reach: 0.08, ctr: 0.04, conversion: 0.12 },
  { value: "agency", label: "创意代理", reach: -0.06, ctr: 0.14, conversion: 0.18 },
  { value: "enterprise", label: "企业增长", reach: -0.12, ctr: 0.06, conversion: 0.26 },
]

const channels: Option[] = [
  { value: "social", label: "社交媒体", reach: 0.26, ctr: 0.06, conversion: 0.04 },
  { value: "landing", label: "落地页", reach: 0.04, ctr: 0.12, conversion: 0.18 },
  { value: "video", label: "短视频", reach: 0.22, ctr: 0.16, conversion: 0.06 },
  { value: "newsletter", label: "邮件通讯", reach: -0.08, ctr: 0.1, conversion: 0.24 },
]

const tones: Option[] = [
  { value: "energetic", label: "活力充沛", reach: 0.14, ctr: 0.1, conversion: 0.02 },
  { value: "curious", label: "好奇探索", reach: 0.1, ctr: 0.12, conversion: 0.08 },
  { value: "bold", label: "大胆宣言", reach: 0.02, ctr: 0.14, conversion: 0.1 },
  { value: "playful", label: "轻松俏皮", reach: 0.18, ctr: 0.04, conversion: 0.04 },
]

const styles: Option[] = [
  { value: "ripple", label: "涟漪脉冲", reach: 0.12, ctr: 0.08, conversion: 0.04 },
  { value: "particle", label: "粒子风暴", reach: 0.18, ctr: 0.1, conversion: -0.02 },
  { value: "neon", label: "霓虹光轨", reach: 0.06, ctr: 0.12, conversion: 0.1 },
  { value: "gradient", label: "渐变涌动", reach: 0.14, ctr: 0.06, conversion: 0.06 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "脉冲发布",
    headline: "让每一次上线，都像一次心跳。",
    accent: "#38bdf8",
    reach: 720,
    ctr: 5.2,
    conversion: 4.1,
  },
  {
    id: "B",
    name: "粒子共振",
    headline: "个体闪光，汇聚成声量。",
    accent: "#a78bfa",
    reach: 680,
    ctr: 5.8,
    conversion: 3.7,
  },
  {
    id: "C",
    name: "霓虹加速",
    headline: "速度感，是增长的第一印象。",
    accent: "#34d399",
    reach: 790,
    ctr: 4.9,
    conversion: 4.4,
  },
]

export function MotionBitsShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为一款创作者工具打造一场以动效为记忆的发布战役。")
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
    { id: "1", time: "刚刚", text: "MotionBits Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: "CSS 动画资源已就位", type: "system" },
    { id: "3", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
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
      setTimeout(() => setIsGenerating(false), 700)
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
          setBanner({ type: "error", message: "模拟异常：动效渲染超时。" })
          addActivity("操作失败：渲染超时", "error")
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
    <div className="min-h-full bg-[#070816] p-4 text-slate-100 md:p-6 lg:p-8">
      <style>{`
        @keyframes mb-ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes mb-pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes mb-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-12px) translateX(6px); }
          66% { transform: translateY(8px) translateX(-6px); }
        }
        @keyframes mb-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes mb-orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        .mb-ripple-ring { animation: mb-ripple 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
        .mb-pulse-core { animation: mb-pulse-glow 2.2s ease-in-out infinite; }
        .mb-float-1 { animation: mb-float 5s ease-in-out infinite; }
        .mb-float-2 { animation: mb-float 6s ease-in-out infinite 1s; }
        .mb-float-3 { animation: mb-float 7s ease-in-out infinite 2s; }
        .mb-shimmer { background-size: 200% 100%; animation: mb-shimmer 3s linear infinite; }
        .mb-orbit-1 { animation: mb-orbit 8s linear infinite; }
        .mb-orbit-2 { animation: mb-orbit 12s linear infinite reverse; }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 border-slate-700 bg-slate-900 text-sky-300">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1 border-slate-700 text-slate-300">
                <Zap className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white md:text-3xl">{item.title}</h1>
            <p className="max-w-2xl text-sm text-slate-400">{item.focus}</p>
          </div>
          {banner && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                banner.type === "success"
                  ? "border-emerald-500/30 bg-emerald-950/60 text-emerald-300"
                  : "border-red-500/30 bg-red-950/60 text-red-300"
              )}
            >
              {banner.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
              {banner.message}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-3">
            <Card className="border-slate-800 bg-slate-900/60 text-slate-100 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-200">战役 Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  onBlur={() => addActivity("更新 Campaign Brief")}
                  className="min-h-[120px] resize-none border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-sky-500 focus-visible:ring-sky-500/30"
                  placeholder="输入战役 brief..."
                />
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/60 text-slate-100 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-200">创意参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ControlGroup label="目标人群" icon={<Users className="size-3.5" />} options={audiences} value={audience} onChange={(val, label) => handleControlChange("audience", val, label)} />
                <Separator className="bg-slate-800" />
                <ControlGroup label="渠道" icon={<Megaphone className="size-3.5" />} options={channels} value={channel} onChange={(val, label) => handleControlChange("channel", val, label)} />
                <Separator className="bg-slate-800" />
                <ControlGroup label="语气" icon={<MessageSquare className="size-3.5" />} options={tones} value={tone} onChange={(val, label) => handleControlChange("tone", val, label)} />
                <Separator className="bg-slate-800" />
                <ControlGroup label="视觉风格" icon={<Palette className="size-3.5" />} options={styles} value={style} onChange={(val, label) => handleControlChange("style", val, label)} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5 lg:col-span-6">
            <div className="flex items-center gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleConceptChange(c.id)}
                  className={cn(
                    "relative flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all outline-none focus-visible:ring-3 focus-visible:ring-sky-500/40",
                    conceptId === c.id
                      ? "border-sky-500/50 bg-sky-500/15 text-sky-200 shadow-[0_0_20px_-6px_rgba(56,189,248,0.4)]"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  )}
                >
                  <span className="block text-xs opacity-70">概念 {c.id}</span>
                  <span className="block">{c.name}</span>
                </button>
              ))}
            </div>

            <Card
              key={conceptId + style}
              className="relative min-h-[420px] overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900 to-[#0b1025] text-slate-100"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#070816]/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
                    <div className="size-6 animate-spin rounded-full border-2 border-slate-700 border-t-sky-400" />
                    正在渲染动效预览…
                  </div>
                </div>
              )}

              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${selectedConcept.accent}22 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="mb-ripple-ring absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                      style={{
                        borderColor: selectedConcept.accent,
                        opacity: 0.25,
                        animationDelay: `${i * 0.7}s`,
                      }}
                    />
                  ))}
                  <div
                    className="mb-pulse-core relative size-24 rounded-full shadow-[0_0_60px_-10px_currentColor]"
                    style={{ color: selectedConcept.accent, background: `radial-gradient(circle, ${selectedConcept.accent} 0%, transparent 70%)` }}
                  />
                </div>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={cn("absolute rounded-full", i % 2 ? "mb-orbit-1" : "mb-orbit-2")}
                    style={{
                      left: "50%",
                      top: "50%",
                      width: 4 + i * 2,
                      height: 4 + i * 2,
                      background: selectedConcept.accent,
                      opacity: 0.35,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
                <div className="absolute left-[10%] top-[15%] size-2 rounded-full bg-sky-400/60 mb-float-1" />
                <div className="absolute right-[12%] top-[22%] size-3 rounded-full bg-violet-400/50 mb-float-2" />
                <div className="absolute bottom-[18%] left-[18%] size-2 rounded-full bg-emerald-400/50 mb-float-3" />
              </div>

              <div className="relative z-10 flex h-full min-h-[420px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 backdrop-blur">
                  <Zap className="size-3" style={{ color: selectedConcept.accent }} />
                  {selectedStyle.label}
                </div>
                <h2
                  className="max-w-md font-heading text-3xl font-semibold tracking-tight text-white transition-all duration-700 md:text-4xl"
                  style={{ textShadow: `0 0 40px ${selectedConcept.accent}40` }}
                >
                  {selectedConcept.headline}
                </h2>
                <p className="mt-3 max-w-sm text-sm text-slate-400 transition-all duration-700">
                  {selectedAudience.label} · {selectedChannel.label} · {selectedTone.label}
                </p>
              </div>

              <div className="relative z-10 grid divide-y divide-slate-800 border-t border-slate-800 bg-slate-900/40 backdrop-blur md:grid-cols-3 md:divide-x md:divide-y-0">
                <MetricBox label="预计 Reach" value={metrics.reach.toLocaleString()} accent={selectedConcept.accent} max={900} />
                <MetricBox label="预计 CTR" value={`${metrics.ctr}%`} accent={selectedConcept.accent} max={7} />
                <MetricBox label="预计 Conversion" value={`${metrics.conversion}%`} accent={selectedConcept.accent} max={6} />
              </div>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => runAction("generate", "动效创意已重新生成")} disabled={buttonStates.generate === "loading"} className="gap-1.5 bg-sky-500 text-white hover:bg-sky-600">
                {buttonStates.generate === "loading" ? <Spinner /> : <Send className="size-4" />}
                生成
              </Button>
              <Button variant="secondary" onClick={() => runAction("save", "动效方案已保存")} disabled={buttonStates.save === "loading"} className="gap-1.5 border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700">
                {buttonStates.save === "loading" ? <Spinner /> : <Save className="size-4" />}
                保存
              </Button>
              <Button variant="outline" onClick={() => runAction("export", "动效导出包已生成")} disabled={buttonStates.export === "loading"} className="gap-1.5 border-slate-700 text-slate-100 hover:bg-slate-800">
                {buttonStates.export === "loading" ? <Spinner /> : <Download className="size-4" />}
                导出
              </Button>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-3">
            <Card className="h-full border-slate-800 bg-slate-900/60 text-slate-100">
              <CardHeader className="border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-slate-400" />
                  <CardTitle className="text-sm text-slate-200">最近操作</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[560px] overflow-auto">
                  <ul className="divide-y divide-slate-800">
                    {activity.map((act) => (
                      <li key={act.id} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-800/50">
                        <div
                          className={cn(
                            "mt-0.5 size-2 rounded-full",
                            act.type === "success" && "bg-emerald-400",
                            act.type === "error" && "bg-red-400",
                            act.type === "system" && "bg-slate-500",
                            act.type === "user" && "bg-sky-400"
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-slate-200">{act.text}</p>
                          <p className="text-xs text-slate-500">{act.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div className="border-t border-slate-800 p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200" onClick={() => setActivity([])}>
                  清空记录
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlGroup({
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
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        {icon}
        {label}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value, opt.label)}
            className={cn(
              "rounded-lg border px-2.5 py-2 text-left text-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-sky-500/40",
              value === opt.value
                ? "border-sky-500/40 bg-sky-500/15 text-sky-100"
                : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MetricBox({ label, value, accent, max }: { label: string; value: string; accent: string; max: number }) {
  const num = parseFloat(value.replace(/,/g, ""))
  const pct = Math.min(100, (num / max) * 100)
  return (
    <div className="p-4 transition-colors hover:bg-slate-800/30">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 font-heading text-2xl font-semibold text-white">{value}</div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: accent, boxShadow: `0 0 12px ${accent}` }} />
      </div>
    </div>
  )
}

function Spinner() {
  return <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
}
