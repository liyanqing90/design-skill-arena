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
  Leaf,
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
  body: string
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
  { value: "founder", label: "品牌创始人", reach: -0.06, ctr: 0.1, conversion: 0.22 },
  { value: "pm", label: "产品负责人", reach: 0.04, ctr: 0.06, conversion: 0.16 },
  { value: "designer", label: "设计师", reach: 0.12, ctr: 0.08, conversion: 0.08 },
  { value: "marketer", label: "市场经理", reach: 0.16, ctr: 0.02, conversion: 0.1 },
]

const channels: Option[] = [
  { value: "site", label: "官网首页", reach: 0.06, ctr: 0.1, conversion: 0.18 },
  { value: "blog", label: "品牌博客", reach: 0.1, ctr: 0.06, conversion: 0.12 },
  { value: "event", label: "线下活动", reach: -0.14, ctr: 0.14, conversion: 0.28 },
  { value: "partnership", label: "合作推广", reach: -0.04, ctr: 0.08, conversion: 0.24 },
]

const tones: Option[] = [
  { value: "warm", label: "温暖叙事", reach: 0.1, ctr: 0.02, conversion: 0.14 },
  { value: "quiet", label: "安静克制", reach: 0.02, ctr: 0.08, conversion: 0.18 },
  { value: "confident", label: "从容自信", reach: -0.02, ctr: 0.1, conversion: 0.2 },
  { value: "intimate", label: "亲密对话", reach: 0.14, ctr: 0.04, conversion: 0.1 },
]

const styles: Option[] = [
  { value: "editorial", label: "编辑排版", reach: 0.04, ctr: 0.08, conversion: 0.12 },
  { value: "photographic", label: "摄影大图", reach: 0.1, ctr: 0.1, conversion: 0.06 },
  { value: "typographic", label: "字体为主", reach: -0.04, ctr: 0.12, conversion: 0.16 },
  { value: "minimal", label: "极简留白", reach: 0.02, ctr: 0.06, conversion: 0.2 },
]

const concepts: Concept[] = [
  {
    id: "A",
    name: "晨光纸页",
    headline: "把复杂的流程，写成一篇可读的故事。",
    body: "以温润的编辑感呈现产品价值，让用户在滑动中自然理解。",
    accent: "#d97706",
    reach: 480,
    ctr: 4.4,
    conversion: 4.2,
  },
  {
    id: "B",
    name: "静物留白",
    headline: "留白不是空，是给注意力让路。",
    body: "用克制的视觉语言，把焦点还给产品本身与用户的决策。",
    accent: "#78716c",
    reach: 430,
    ctr: 4.8,
    conversion: 4.5,
  },
  {
    id: "C",
    name: "手写信",
    headline: "像给一位老朋友写信那样做营销。",
    body: "亲密的语气和柔和的版式，让品牌更容易被信任。",
    accent: "#059669",
    reach: 520,
    ctr: 4.1,
    conversion: 4.7,
  },
]

export function StandardTasteShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(item.reason || "为一款注重品质感的 SaaS 产品设计一场温润、克制、可信赖的 Muse 推广战役。")
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
    { id: "1", time: "刚刚", text: "Standard Taste Showcase 已加载", type: "system" },
    { id: "2", time: "刚刚", text: `默认概念：${concepts[0].name}`, type: "system" },
    { id: "3", time: "刚刚", text: "设计 token 已同步", type: "system" },
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
          setBanner({ type: "error", message: "操作未成功，请稍后重试。" })
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
    <div className="min-h-full bg-[#fbf9f6] p-4 text-stone-800 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 border-stone-200 bg-stone-800 text-stone-50">
                <Sparkles className="size-3" />
                Kimi 2.7 Code
              </Badge>
              <Badge variant="outline" className="gap-1 border-stone-300 text-stone-600">
                <Leaf className="size-3" />
                {item.skillChainLabel}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl font-medium tracking-tight text-stone-900 md:text-4xl">{item.title}</h1>
            <p className="max-w-2xl text-stone-500">{item.focus}</p>
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

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-8">
            <div className="flex items-center gap-3">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleConceptChange(c.id)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-stone-400",
                    conceptId === c.id
                      ? "border-stone-800 bg-stone-800 text-stone-50 shadow-sm"
                      : "border-stone-300 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-800"
                  )}
                >
                  概念 {c.id} · {c.name}
                </button>
              ))}
            </div>

            <Card
              key={conceptId}
              className="relative overflow-hidden rounded-3xl border-stone-200 bg-white shadow-sm"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#fbf9f6]/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm text-stone-500">
                    <div className="size-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
                    正在生成…
                  </div>
                </div>
              )}
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="flex flex-col justify-between p-8 md:p-10">
                    <div>
                      <div className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${selectedConcept.accent}15`, color: selectedConcept.accent }}>
                        {selectedStyle.label}
                      </div>
                      <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-stone-900 md:text-4xl">
                        {selectedConcept.headline}
                      </h2>
                      <p className="mt-4 max-w-sm text-stone-500">{selectedConcept.body}</p>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Button className="rounded-full bg-stone-800 text-stone-50 hover:bg-stone-700">
                        探索方案
                      </Button>
                      <Button variant="outline" className="rounded-full border-stone-300 text-stone-700 hover:bg-stone-100">
                        阅读故事
                      </Button>
                    </div>
                  </div>
                  <div
                    className="relative min-h-[280px] bg-gradient-to-br from-stone-100 to-stone-200 p-8 md:min-h-[380px]"
                    style={{ background: `linear-gradient(135deg, #f5f5f4 0%, ${selectedConcept.accent}12 100%)` }}
                  >
                    <div className="absolute right-8 top-8 h-24 w-16 rounded-lg bg-white/70 shadow-sm" />
                    <div className="absolute bottom-12 left-8 h-32 w-24 rounded-lg bg-white/80 shadow-sm" />
                    <div
                      className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
                      style={{ background: selectedConcept.accent }}
                    />
                    <div className="absolute bottom-8 right-8 max-w-[160px] text-xs leading-relaxed text-stone-500">
                      {selectedAudience.label} · {selectedChannel.label} · {selectedTone.label}
                    </div>
                  </div>
                </div>

                <div className="grid divide-y divide-stone-100 border-t border-stone-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                  <div className="p-6 transition-colors hover:bg-stone-50">
                    <div className="text-xs text-stone-400">预计 Reach</div>
                    <div className="mt-1 font-heading text-2xl font-medium text-stone-900">{metrics.reach.toLocaleString()}</div>
                  </div>
                  <div className="p-6 transition-colors hover:bg-stone-50">
                    <div className="text-xs text-stone-400">预计 CTR</div>
                    <div className="mt-1 font-heading text-2xl font-medium text-stone-900">{metrics.ctr}%</div>
                  </div>
                  <div className="p-6 transition-colors hover:bg-stone-50">
                    <div className="text-xs text-stone-400">预计 Conversion</div>
                    <div className="mt-1 font-heading text-2xl font-medium text-stone-900">{metrics.conversion}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => runAction("generate", "创意方案已生成")} disabled={buttonStates.generate === "loading"} className="rounded-full bg-stone-800 text-stone-50 hover:bg-stone-700">
                {buttonStates.generate === "loading" ? <Spinner /> : <Send className="mr-1.5 size-4" />}
                生成
              </Button>
              <Button variant="outline" onClick={() => runAction("save", "方案已保存")} disabled={buttonStates.save === "loading"} className="rounded-full border-stone-300 text-stone-700 hover:bg-stone-100">
                {buttonStates.save === "loading" ? <Spinner /> : <Save className="mr-1.5 size-4" />}
                保存
              </Button>
              <Button variant="outline" onClick={() => runAction("export", "导出包已生成")} disabled={buttonStates.export === "loading"} className="rounded-full border-stone-300 text-stone-700 hover:bg-stone-100">
                {buttonStates.export === "loading" ? <Spinner /> : <Download className="mr-1.5 size-4" />}
                导出
              </Button>
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-4">
            <Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-stone-900">战役 Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  onBlur={() => addActivity("更新 Campaign Brief")}
                  className="min-h-[100px] resize-none rounded-xl border-stone-200 bg-[#fbf9f6] text-stone-800 placeholder:text-stone-400 focus-visible:border-stone-400 focus-visible:ring-stone-400/30"
                  placeholder="输入战役 brief..."
                />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-stone-900">创意参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <ControlGroup label="目标人群" icon={<Users className="size-3.5" />} options={audiences} value={audience} onChange={(val, label) => handleControlChange("audience", val, label)} />
                <Separator className="bg-stone-100" />
                <ControlGroup label="渠道" icon={<Megaphone className="size-3.5" />} options={channels} value={channel} onChange={(val, label) => handleControlChange("channel", val, label)} />
                <Separator className="bg-stone-100" />
                <ControlGroup label="语气" icon={<MessageSquare className="size-3.5" />} options={tones} value={tone} onChange={(val, label) => handleControlChange("tone", val, label)} />
                <Separator className="bg-stone-100" />
                <ControlGroup label="视觉风格" icon={<Palette className="size-3.5" />} options={styles} value={style} onChange={(val, label) => handleControlChange("style", val, label)} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
              <CardHeader className="border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-stone-400" />
                  <CardTitle className="text-sm font-medium text-stone-900">最近操作</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[260px] overflow-auto">
                  <ul className="divide-y divide-stone-100">
                    {activity.map((act) => (
                      <li key={act.id} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-stone-50">
                        <div
                          className={cn(
                            "mt-0.5 size-2 rounded-full",
                            act.type === "success" && "bg-emerald-500",
                            act.type === "error" && "bg-red-500",
                            act.type === "system" && "bg-stone-400",
                            act.type === "user" && "bg-stone-800"
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-stone-700">{act.text}</p>
                          <p className="text-xs text-stone-400">{act.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div className="border-t border-stone-100 p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs text-stone-500 hover:bg-stone-100 hover:text-stone-800" onClick={() => setActivity([])}>
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
      <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
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
              "rounded-lg border px-2.5 py-2 text-left text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-stone-400",
              value === opt.value
                ? "border-stone-800 bg-stone-800 text-stone-50"
                : "border-stone-200 bg-[#fbf9f6] text-stone-600 hover:border-stone-400 hover:text-stone-900"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Spinner() {
  return <div className="mr-1.5 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
}
