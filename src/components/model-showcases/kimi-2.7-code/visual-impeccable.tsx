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
  Crown,
  Download,
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
  { value: "vip", label: "高净值用户", reach: -0.12, ctr: 0.14, conversion: 0.3 },
  { value: "early", label: "早期尝鲜者", reach: 0.14, ctr: 0.12, conversion: 0.08 },
  { value: "enterprise", label: "企业客户", reach: -0.08, ctr: 0.08, conversion: 0.28 },
  { value: "collector", label: "收藏家", reach: -0.04, ctr: 0.16, conversion: 0.18 },
]

const channels: Option[] = [
  { value: "drops", label: "限量发售页", reach: -0.06, ctr: 0.18, conversion: 0.26 },
  { value: "invite", label: "邀请制", reach: -0.16, ctr: 0.22, conversion: 0.34 },
  { value: "premium", label: "Premium 渠道", reach: 0.02, ctr: 0.12, conversion: 0.22 },
  { value: "live", label: "直播发布", reach: 0.18, ctr: 0.1, conversion: 0.12 },
]

const tones: Option[] = [
  { value: "exclusive", label: "专属尊贵", reach: -0.04, ctr: 0.12, conversion: 0.22 },
  { value: "audacious", label: "大胆前卫", reach: 0.1, ctr: 0.16, conversion: 0.08 },
  { value: "refined", label: "精致内敛", reach: -0.08, ctr: 0.14, conversion: 0.26 },
  { value: "future", label: "未来感", reach: 0.12, ctr: 0.1, conversion: 0.1 },
]

const styles: Option[] = [
  { value: "chrome", label: "镀铬质感", reach: 0.06, ctr: 0.12, conversion: 0.1 },
  { value: "glass", label: "玻璃拟态", reach: 0.1, ctr: 0.1, conversion: 0.08 },
  { value: "neon", label: "霓虹辉光", reach: 0.14, ctr: 0.14, conversion: 0.04 },
  { value: "carbon", label: "碳纤维暗纹", reach: -0.04, ctr: 0.08, conversion: 0.2 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "暗金序章",
    headline: "不是所有开端，都需要喧哗。",
    sub: "暗调金色与碳纤维纹理，为限量发布营造仪式感。",
    primary: "#f59e0b",
    secondary: "#78350f",
    reach: 520,
    ctr: 5.8,
    conversion: 5.1,
  },
  {
    id: "B",
    name: "霓虹裁决",
    headline: "未来属于敢于定义它的人。",
    sub: "高对比霓虹与玻璃折射，塑造强烈的科技先锋气质。",
    primary: "#22d3ee",
    secondary: "#a855f7",
    reach: 580,
    ctr: 6.2,
    conversion: 4.6,
  },
  {
    id: "C",
    name: "极夜紫晶",
    headline: "在极夜里，只有品质会发光。",
    sub: "深紫与铬银交织，呈现高端会员体验的稀缺感。",
    primary: "#c084fc",
    secondary: "#4c1d95",
    reach: 490,
    ctr: 5.5,
    conversion: 5.4,
  },
]

export function VisualImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为一场高端限量发布打造暗黑、高保真、充满细节的 Muse 视觉战役。")
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
    { id: "1", time: "刚刚", text: "Visual Impeccable Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
    { id: "3", time: "刚刚", text: "高保真视觉状态已就绪", type: "system" },
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
      setTimeout(() => setIsGenerating(false), 800)
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
          setBanner({ type: "error", message: "高保真渲染失败，请重试。" })
          addActivity("操作失败：渲染异常", "error")
        } else {
          setButtonStates((prev) => ({ ...prev, [key]: "success" }))
          setBanner({ type: "success", message: successMessage })
          addActivity(successMessage, "success")
          setTimeout(() => setButtonStates((prev) => ({ ...prev, [key]: "idle" })), 1600)
        }
      }, 1000)
    },
    [addActivity]
  )

  return (
    <div className="min-h-full bg-[#05050a] p-4 text-slate-100 md:p-6 lg:p-8">
      <style>{`
        @keyframes vi-sweep {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        @keyframes vi-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes vi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes vi-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .vi-sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          transform: translateX(-100%) rotate(25deg);
          animation: vi-sweep 5s ease-in-out infinite;
          pointer-events: none;
        }
        .vi-pulse { animation: vi-pulse 3s ease-in-out infinite; }
        .vi-float-1 { animation: vi-float 6s ease-in-out infinite; }
        .vi-float-2 { animation: vi-float 7s ease-in-out infinite 1.5s; }
        .vi-shimmer { background-size: 200% 100%; animation: vi-shimmer 2.5s linear infinite; }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 border-slate-700 bg-slate-900 text-amber-300">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1 border-slate-700 text-slate-300">
                <Crown className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white md:text-3xl">{item.title}</h1>
            <p className="max-w-2xl text-sm text-slate-400">{item.focus}</p>
          </div>
          {banner && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm backdrop-blur",
                banner.type === "success"
                  ? "border-emerald-500/30 bg-emerald-950/60 text-emerald-300"
                  : "border-red-500/30 bg-red-950/60 text-red-300"
              )}
            >
              {banner.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
              {banner.message}
            </div>
          )}
        </header>

        <section className="grid gap-6 lg:grid-cols-12">
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
                  className="min-h-[120px] resize-none border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-slate-500 focus-visible:ring-slate-500/30"
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
            <div className="grid grid-cols-3 gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleConceptChange(c.id)}
                  className={cn(
                    "relative overflow-hidden rounded-xl border px-3 py-3 text-left text-sm transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-slate-500/40",
                    conceptId === c.id
                      ? "border-slate-600 bg-slate-100 text-slate-900 shadow-[0_0_24px_-8px_rgba(255,255,255,0.2)]"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  )}
                >
                  <span className="block text-xs opacity-70">概念 {c.id}</span>
                  <span className="block font-medium">{c.name}</span>
                </button>
              ))}
            </div>

            <Card
              key={conceptId + style}
              className="relative min-h-[480px] overflow-hidden border-slate-800 bg-slate-950 text-slate-100 vi-sweep"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05050a]/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
                    <div className="size-6 animate-spin rounded-full border-2 border-slate-700 border-t-white" />
                    正在渲染高保真视觉…
                  </div>
                </div>
              )}

              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selectedConcept.primary}30 0%, transparent 55%), radial-gradient(circle at 70% 70%, ${selectedConcept.secondary}20 0%, transparent 55%)`,
                  }}
                />
                <div
                  className="vi-pulse absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                  style={{ background: selectedConcept.primary }}
                />
                <div
                  className="vi-float-1 absolute right-[15%] top-[20%] size-4 rounded-full"
                  style={{ background: selectedConcept.primary, boxShadow: `0 0 20px ${selectedConcept.primary}` }}
                />
                <div
                  className="vi-float-2 absolute bottom-[25%] left-[12%] size-3 rounded-full"
                  style={{ background: selectedConcept.secondary, boxShadow: `0 0 16px ${selectedConcept.secondary}` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-between p-6 md:p-10">
                <div>
                  <div
                    className="mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: `${selectedConcept.primary}50`, color: selectedConcept.primary, background: `${selectedConcept.primary}12` }}
                  >
                    <Crown className="size-3" />
                    {selectedStyle.label}
                  </div>
                  <h2
                    className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl"
                    style={{ textShadow: `0 0 60px ${selectedConcept.primary}40` }}
                  >
                    {selectedConcept.headline}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-slate-400">{selectedConcept.sub}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    className="gap-1.5 border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ background: selectedConcept.primary, color: "#05050a" }}
                  >
                    <Send className="size-4" />
                    立即获取
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-1.5 border-slate-700 bg-slate-900/50 text-slate-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800"
                  >
                    了解权益
                  </Button>
                </div>
              </div>

              <div className="relative z-10 grid divide-y divide-slate-800 border-t border-slate-800 bg-slate-900/40 backdrop-blur md:grid-cols-3 md:divide-x md:divide-y-0">
                <MetricBox label="预计 Reach" value={metrics.reach.toLocaleString()} accent={selectedConcept.primary} max={700} />
                <MetricBox label="预计 CTR" value={`${metrics.ctr}%`} accent={selectedConcept.primary} max={7.5} />
                <MetricBox label="预计 Conversion" value={`${metrics.conversion}%`} accent={selectedConcept.primary} max={6.5} />
              </div>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => runAction("generate", "高保真视觉方案已生成")}
                disabled={buttonStates.generate === "loading"}
                className="gap-1.5 bg-slate-100 text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                {buttonStates.generate === "loading" ? <Spinner /> : <Send className="size-4" />}
                生成
              </Button>
              <Button
                variant="outline"
                onClick={() => runAction("save", "方案已保存至 Premium 库")}
                disabled={buttonStates.save === "loading"}
                className="gap-1.5 border-slate-700 bg-slate-900/50 text-slate-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800"
              >
                {buttonStates.save === "loading" ? <Spinner /> : <Save className="size-4" />}
                保存
              </Button>
              <Button
                variant="outline"
                onClick={() => runAction("export", "4K 导出包已生成")}
                disabled={buttonStates.export === "loading"}
                className="gap-1.5 border-slate-700 bg-slate-900/50 text-slate-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800"
              >
                {buttonStates.export === "loading" ? <Spinner /> : <Download className="size-4" />}
                导出
              </Button>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-3">
            <Card className="h-full border-slate-800 bg-slate-900/60 text-slate-100 backdrop-blur">
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
                            act.type === "user" && "bg-amber-400"
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
        </section>
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
              "rounded-lg border px-2.5 py-2 text-left text-sm transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-slate-500/40",
              value === opt.value
                ? "border-slate-500 bg-slate-100 text-slate-900 shadow-sm"
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
