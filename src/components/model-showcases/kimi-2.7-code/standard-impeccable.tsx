"use client"

import { useCallback, useMemo, useState } from "react"
import { ShowcaseItem } from "@/types/showcase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Gem,
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
  cta: string
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
  { value: "buyer", label: "采购决策者", reach: -0.08, ctr: 0.1, conversion: 0.26 },
  { value: "manager", label: "业务经理", reach: 0.04, ctr: 0.06, conversion: 0.14 },
  { value: "specialist", label: "运营专员", reach: 0.12, ctr: 0.02, conversion: 0.1 },
  { value: "director", label: "产品总监", reach: -0.02, ctr: 0.12, conversion: 0.2 },
]

const channels: Option[] = [
  { value: "homepage", label: "官网首页", reach: 0.08, ctr: 0.08, conversion: 0.16 },
  { value: "demo", label: "预约演示", reach: -0.12, ctr: 0.16, conversion: 0.32 },
  { value: "retarget", label: "再营销", reach: -0.02, ctr: 0.14, conversion: 0.22 },
  { value: "content", label: "内容中心", reach: 0.14, ctr: 0.04, conversion: 0.12 },
]

const tones: Option[] = [
  { value: "clear", label: "清晰可信", reach: 0.04, ctr: 0.04, conversion: 0.18 },
  { value: "driven", label: "结果驱动", reach: -0.02, ctr: 0.1, conversion: 0.2 },
  { value: "human", label: "人性化", reach: 0.1, ctr: 0.02, conversion: 0.14 },
  { value: "premium", label: "高端质感", reach: -0.06, ctr: 0.12, conversion: 0.24 },
]

const styles: Option[] = [
  { value: "layered", label: "层叠卡片", reach: 0.06, ctr: 0.08, conversion: 0.1 },
  { value: "split", label: "分屏布局", reach: 0.02, ctr: 0.1, conversion: 0.12 },
  { value: "feature", label: "功能网格", reach: -0.02, ctr: 0.02, conversion: 0.16 },
  { value: "hero", label: "大 Hero", reach: 0.1, ctr: 0.12, conversion: 0.08 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "信任层叠",
    headline: "把信任，叠成一页页清晰的证据。",
    sub: "用客户证言、数据与可验证的功能，降低采购决策风险。",
    cta: "预约演示",
    accent: "#2563eb",
    reach: 560,
    ctr: 4.6,
    conversion: 4.3,
  },
  {
    id: "B",
    name: "效率分屏",
    headline: "左边是问题，右边是答案。",
    sub: "用对比式布局，让访客在 5 秒内理解产品价值。",
    cta: "查看对比",
    accent: "#7c3aed",
    reach: 530,
    ctr: 5.0,
    conversion: 4.1,
  },
  {
    id: "C",
    name: "增长 Hero",
    headline: "增长不是目标，是结果。",
    sub: "以大气的主视觉与数据亮点，建立高端品牌的专业形象。",
    cta: "开始试用",
    accent: "#db2777",
    reach: 640,
    ctr: 4.3,
    conversion: 4.0,
  },
]

export function StandardImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为一款 B2B SaaS 产品设计高完成度的标准结构推广页面，强调可信度与转化率。")
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
    { id: "1", time: "刚刚", text: "Standard Impeccable Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
    { id: "3", time: "刚刚", text: "高精度状态已就绪", type: "system" },
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
    <div className="min-h-full bg-slate-50 p-4 text-slate-900 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 bg-slate-900 text-white">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1 border-slate-300 text-slate-600">
                <Gem className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h1>
            <p className="max-w-2xl text-sm text-slate-500">{item.focus}</p>
          </div>
          {banner && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm",
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

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="space-y-5 lg:col-span-3">
            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">战役 Brief</CardTitle>
                <CardDescription>定义目标与核心信息</CardDescription>
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

            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">创意参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <ControlGroup label="目标人群" icon={<Users className="size-3.5" />} options={audiences} value={audience} onChange={(val, label) => handleControlChange("audience", val, label)} />
                <Separator />
                <ControlGroup label="渠道" icon={<Megaphone className="size-3.5" />} options={channels} value={channel} onChange={(val, label) => handleControlChange("channel", val, label)} />
                <Separator />
                <ControlGroup label="语气" icon={<MessageSquare className="size-3.5" />} options={tones} value={tone} onChange={(val, label) => handleControlChange("tone", val, label)} />
                <Separator />
                <ControlGroup label="视觉风格" icon={<Palette className="size-3.5" />} options={styles} value={style} onChange={(val, label) => handleControlChange("style", val, label)} />
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-5 lg:col-span-6">
            <div className="grid grid-cols-3 gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleConceptChange(c.id)}
                  className={cn(
                    "relative rounded-xl border px-3 py-3 text-left text-sm transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    conceptId === c.id
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  <span className="block text-xs opacity-70">概念 {c.id}</span>
                  <span className="block font-medium">{c.name}</span>
                </button>
              ))}
            </div>

            <Card
              key={conceptId}
              className="relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-500 hover:shadow-lg"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
                    <div className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
                    正在生成高精度预览…
                  </div>
                </div>
              )}
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">创意预览 · {selectedConcept.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {selectedStyle.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white p-6 md:p-10">
                  <div
                    className="absolute -right-16 -top-16 size-64 rounded-full opacity-10 blur-3xl"
                    style={{ background: selectedConcept.accent }}
                  />
                  <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
                    <div className="space-y-5">
                      <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${selectedConcept.accent}40`, color: selectedConcept.accent, background: `${selectedConcept.accent}08` }}>
                        <Sparkles className="size-3" />
                        {selectedTone.label}
                      </div>
                      <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                        {selectedConcept.headline}
                      </h2>
                      <p className="text-sm text-slate-500">{selectedConcept.sub}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="gap-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ background: selectedConcept.accent }}>
                          <Send className="size-4" />
                          {selectedConcept.cta}
                        </Button>
                        <Button variant="outline" className="transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50">
                          查看详情
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="aspect-[4/3] rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-5 shadow-sm transition-all duration-500"
                        style={{ boxShadow: `0 20px 40px -20px ${selectedConcept.accent}30` }}
                      >
                        <div className="mb-4 flex items-center gap-2">
                          <div className="size-3 rounded-full bg-slate-200" />
                          <div className="size-3 rounded-full bg-slate-200" />
                          <div className="size-3 rounded-full bg-slate-200" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-3 w-3/4 rounded bg-slate-200" />
                          <div className="h-3 w-1/2 rounded bg-slate-200" />
                          <div className="h-24 rounded-lg bg-slate-100" />
                        </div>
                      </div>
                      <div className="absolute -bottom-4 -right-4 rounded-xl border border-slate-100 bg-white p-3 shadow-lg transition-transform duration-300 hover:scale-105">
                        <div className="text-xs text-slate-400">转化率提升</div>
                        <div className="font-heading text-xl font-semibold" style={{ color: selectedConcept.accent }}>
                          +{metrics.conversion}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid divide-y divide-slate-100 border-t border-slate-100 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
                  <MetricBox label="预计 Reach" value={metrics.reach.toLocaleString()} accent={selectedConcept.accent} max={750} />
                  <MetricBox label="预计 CTR" value={`${metrics.ctr}%`} accent={selectedConcept.accent} max={6.5} />
                  <MetricBox label="预计 Conversion" value={`${metrics.conversion}%`} accent={selectedConcept.accent} max={6} />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => runAction("generate", "高精度方案已生成")} disabled={buttonStates.generate === "loading"} className="gap-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                {buttonStates.generate === "loading" ? <Spinner /> : <Send className="size-4" />}
                生成
              </Button>
              <Button variant="secondary" onClick={() => runAction("save", "方案已保存")} disabled={buttonStates.save === "loading"} className="gap-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                {buttonStates.save === "loading" ? <Spinner /> : <Save className="size-4" />}
                保存
              </Button>
              <Button variant="outline" onClick={() => runAction("export", "导出包已生成")} disabled={buttonStates.export === "loading"} className="gap-1.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md">
                {buttonStates.export === "loading" ? <Spinner /> : <Download className="size-4" />}
                导出
              </Button>
            </div>
          </section>

          <aside className="space-y-5 lg:col-span-3">
            <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-slate-400" />
                  <CardTitle className="text-sm">最近操作</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[560px] overflow-auto">
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
          </aside>
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
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
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
              "rounded-lg border px-2.5 py-2 text-left text-sm transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              value === opt.value
                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
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
    <div className="p-5 transition-colors hover:bg-slate-50">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 font-heading text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: accent }} />
      </div>
    </div>
  )
}

function Spinner() {
  return <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
}
