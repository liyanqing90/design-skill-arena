"use client"

import { useCallback, useMemo, useState } from "react"
import { ShowcaseItem } from "@/types/showcase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress, ProgressIndicator, ProgressTrack, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Activity,
  AlertCircle,
  Boxes,
  CheckCircle2,
  Download,
  LayoutGrid,
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
  icon?: React.ReactNode
  reach: number
  ctr: number
  conversion: number
}

type Concept = {
  id: "A" | "B" | "C"
  name: string
  headline: string
  description: string
  cta: string
  reach: number
  ctr: number
  conversion: number
  tags: string[]
}

type ActivityItem = {
  id: string
  time: string
  text: string
  type: "system" | "user" | "success" | "error"
}

const audiences: Option[] = [
  { value: "ops", label: "运营负责人", reach: 0.08, ctr: -0.05, conversion: 0.12 },
  { value: "admin", label: "办公室管理员", reach: -0.04, ctr: 0.06, conversion: 0.18 },
  { value: "hybrid", label: "混合办公团队", reach: 0.12, ctr: 0.04, conversion: -0.02 },
  { value: "executive", label: "企业决策者", reach: -0.08, ctr: 0.1, conversion: 0.22 },
]

const channels: Option[] = [
  { value: "tour", label: "产品导览", reach: 0.06, ctr: 0.08, conversion: 0.1 },
  { value: "sales", label: "销售跟进", reach: -0.1, ctr: 0.14, conversion: 0.28 },
  { value: "webinar", label: "线上研讨会", reach: 0.16, ctr: -0.04, conversion: 0.05 },
  { value: "email", label: "邮件营销", reach: 0.22, ctr: -0.1, conversion: 0.08 },
]

const tones: Option[] = [
  { value: "operational", label: "运营导向", reach: 0.04, ctr: -0.02, conversion: 0.14 },
  { value: "concise", label: "简洁直接", reach: 0.02, ctr: 0.12, conversion: 0.08 },
  { value: "helpful", label: "友好 helpful", reach: 0.1, ctr: 0.04, conversion: 0.1 },
  { value: "authoritative", label: "权威专业", reach: -0.06, ctr: 0.08, conversion: 0.2 },
]

const styles: Option[] = [
  { value: "grid", label: "组件网格", reach: 0.04, ctr: 0.06, conversion: 0.04 },
  { value: "chrome", label: "管理后台", reach: -0.02, ctr: 0.02, conversion: 0.12 },
  { value: "table", label: "表格驱动", reach: -0.04, ctr: -0.04, conversion: 0.16 },
  { value: "card", label: "卡片视图", reach: 0.12, ctr: 0.1, conversion: 0.08 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "工位地图",
    headline: "每一张工位都有状态，无需追问。",
    description: "用地图、策略与预订路径，让团队一眼看懂可用空间。",
    cta: "查看实时地图",
    reach: 540,
    ctr: 3.9,
    conversion: 3.5,
    tags: ["地图组件", "实时状态", "预订路径"],
  },
  {
    id: "B",
    name: "策略同步",
    headline: "从管理员真正需要的规则开始。",
    description: "规则、限额与团队模式，让预订策略变得可执行。",
    cta: "配置团队规则",
    reach: 510,
    ctr: 4.2,
    conversion: 3.8,
    tags: ["规则卡片", "权限控制", "策略引擎"],
  },
  {
    id: "C",
    name: "团队周历",
    headline: "在通勤前，先知道这一周。",
    description: "周历视图与容量透明度，帮助团队规划混合办公节奏。",
    cta: "预览团队周历",
    reach: 610,
    ctr: 4.0,
    conversion: 3.6,
    tags: ["周历表格", "容量条", "出勤模式"],
  },
]

export function ComponentSystemShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为 B2B 工位预订平台上线打造一场组件化、可复用的 Muse 推广战役。")
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
    { id: "1", time: "刚刚", text: "组件系统 Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
    { id: "3", time: "刚刚", text: "导出按钮已就绪", type: "system" },
  ])

  const selectedAudience = useMemo(() => audiences.find((o) => o.value === audience)!, [audience])
  const selectedChannel = useMemo(() => channels.find((o) => o.value === channel)!, [channel])
  const selectedTone = useMemo(() => tones.find((o) => o.value === tone)!, [tone])
  const selectedStyle = useMemo(() => styles.find((o) => o.value === style)!, [style])
  const selectedConcept = useMemo(() => concepts.find((c) => c.id === conceptId)!, [conceptId])

  const metrics = useMemo(() => {
    const modifier =
      selectedAudience.reach +
      selectedChannel.reach +
      selectedTone.reach +
      selectedStyle.reach
    const reach = Math.max(0, Math.round(selectedConcept.reach * (1 + modifier)))
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
      setTimeout(() => setIsGenerating(false), 600)
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
          setBanner({ type: "error", message: "网络模拟异常，请重试。" })
          addActivity("操作失败：模拟网络异常", "error")
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

  const ControlGroup = useCallback(
    ({
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
    }) => (
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
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
                "rounded-lg border px-2.5 py-2 text-left text-sm transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                value === opt.value
                  ? "border-foreground/20 bg-foreground text-background shadow-sm"
                  : "border-border bg-card text-card-foreground hover:border-foreground/20 hover:bg-muted"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    ),
    []
  )

  return (
    <div className="min-h-full bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Boxes className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">{item.focus}</p>
          </div>
          <div className="flex items-center gap-2">
            {banner && (
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm animate-in fade-in slide-in-from-top-2",
                  banner.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                )}
              >
                {banner.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
                {banner.message}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">战役 Brief</CardTitle>
                <CardDescription>描述推广目标与核心信息</CardDescription>
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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">创意参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <ControlGroup
                  label="目标人群"
                  icon={<Users className="size-3.5" />}
                  options={audiences}
                  value={audience}
                  onChange={(val, label) => handleControlChange("audience", val, label)}
                />
                <Separator />
                <ControlGroup
                  label="渠道"
                  icon={<Megaphone className="size-3.5" />}
                  options={channels}
                  value={channel}
                  onChange={(val, label) => handleControlChange("channel", val, label)}
                />
                <Separator />
                <ControlGroup
                  label="语气"
                  icon={<MessageSquare className="size-3.5" />}
                  options={tones}
                  value={tone}
                  onChange={(val, label) => handleControlChange("tone", val, label)}
                />
                <Separator />
                <ControlGroup
                  label="视觉风格"
                  icon={<Palette className="size-3.5" />}
                  options={styles}
                  value={style}
                  onChange={(val, label) => handleControlChange("style", val, label)}
                />
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
                    "relative flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    conceptId === c.id
                      ? "border-foreground bg-foreground text-background shadow-sm"
                      : "border-border bg-card text-card-foreground hover:border-foreground/20 hover:bg-muted"
                  )}
                >
                  <span className="block text-xs opacity-70">概念 {c.id}</span>
                  <span className="block">{c.name}</span>
                </button>
              ))}
            </div>

            <Card className="relative overflow-hidden">
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
                    正在生成创意预览…
                  </div>
                </div>
              )}
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="size-4 text-muted-foreground" />
                    <CardTitle className="text-sm">创意预览 · {selectedConcept.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {selectedStyle.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-[linear-gradient(135deg,var(--card)_0%,var(--muted)_100%)] p-6 md:p-8">
                  <div className="rounded-xl border bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-all">
                    <div className="mb-4 flex items-center gap-2">
                      {selectedConcept.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                      {selectedConcept.headline}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{selectedConcept.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <Button className="gap-1.5">
                        <Sparkles className="size-4" />
                        {selectedConcept.cta}
                      </Button>
                      <Button variant="outline">了解详情</Button>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "实时状态", value: "94%" },
                        { label: "本周预订", value: "1,240" },
                        { label: "团队覆盖", value: "32 个" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border bg-background p-3 transition-all hover:border-foreground/20 hover:shadow-sm"
                        >
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                          <div className="font-heading text-lg font-semibold">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground">预计 Reach</div>
                    <div className="mt-1 font-heading text-2xl font-semibold">{metrics.reach.toLocaleString()}</div>
                    <Progress value={Math.min(100, (metrics.reach / 800) * 100)} className="mt-2">
                      <ProgressLabel />
                      <ProgressValue />
                      <ProgressTrack>
                        <ProgressIndicator />
                      </ProgressTrack>
                    </Progress>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground">预计 CTR</div>
                    <div className="mt-1 font-heading text-2xl font-semibold">{metrics.ctr}%</div>
                    <Progress value={Math.min(100, (metrics.ctr / 6) * 100)} className="mt-2">
                      <ProgressLabel />
                      <ProgressValue />
                      <ProgressTrack>
                        <ProgressIndicator />
                      </ProgressTrack>
                    </Progress>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground">预计 Conversion</div>
                    <div className="mt-1 font-heading text-2xl font-semibold">{metrics.conversion}%</div>
                    <Progress value={Math.min(100, (metrics.conversion / 6) * 100)} className="mt-2">
                      <ProgressLabel />
                      <ProgressValue />
                      <ProgressTrack>
                        <ProgressIndicator />
                      </ProgressTrack>
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => runAction("generate", "创意方案已重新生成")}
                disabled={buttonStates.generate === "loading"}
                className="gap-1.5"
              >
                {buttonStates.generate === "loading" ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    生成中…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    生成
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => runAction("save", "方案已保存到草稿")}
                disabled={buttonStates.save === "loading"}
                className="gap-1.5"
              >
                {buttonStates.save === "loading" ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    保存中…
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    保存
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => runAction("export", "导出包已生成")}
                disabled={buttonStates.export === "loading"}
                className="gap-1.5"
              >
                {buttonStates.export === "loading" ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    导出中…
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    导出
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">最近操作</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[560px] overflow-auto">
                  {activity.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">暂无操作记录</div>
                  ) : (
                    <ul className="divide-y">
                      {activity.map((act) => (
                        <li key={act.id} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50">
                          <div
                            className={cn(
                              "mt-0.5 size-2 rounded-full",
                              act.type === "success" && "bg-emerald-500",
                              act.type === "error" && "bg-red-500",
                              act.type === "system" && "bg-muted-foreground",
                              act.type === "user" && "bg-primary"
                            )}
                          />
                          <div className="flex-1">
                            <p className="text-sm">{act.text}</p>
                            <p className="text-xs text-muted-foreground">{act.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
              <div className="border-t p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setActivity([])}>
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
