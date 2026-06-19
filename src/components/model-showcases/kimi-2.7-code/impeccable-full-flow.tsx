"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Accessibility,
  AlertTriangle,
  CheckCircle2,
  Crown,
  Download,
  Eye,
  Layers,
  Loader2,
  Moon,
  Save,
  Sparkles,
  Sun,
  Target,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ShowcaseItem } from "@/types/showcase"

type ConceptKey = "A" | "B" | "C"

type Concept = {
  id: ConceptKey
  name: string
  headline: string
  body: string
  glow: string
  reach: number
  ctr: number
  conversion: number
}

type Activity = { id: string; time: string; label: string }

const concepts: Concept[] = [
  {
    id: "A",
    name: "极光玻璃",
    headline: "为每一次生成镀上光泽",
    body: "多层磨砂玻璃与极光渐变结合，呈现高端产品的精密质感。",
    glow: "from-emerald-400 via-cyan-400 to-violet-500",
    reach: 1350,
    ctr: 5.4,
    conversion: 3.6,
  },
  {
    id: "B",
    name: "暗夜鎏金",
    headline: "低调中的锋芒",
    body: "深色玻璃面板配以金色微光，适合奢侈品与金融级产品调性。",
    glow: "from-amber-300 via-orange-300 to-yellow-200",
    reach: 1180,
    ctr: 4.9,
    conversion: 3.8,
  },
  {
    id: "C",
    name: "冷焰紫晶",
    headline: "冷感科技，炽热表达",
    body: "紫色辉光穿透半透明层，传递前沿技术的冷静与能量。",
    glow: "from-fuchsia-400 via-purple-500 to-indigo-400",
    reach: 1280,
    ctr: 5.1,
    conversion: 3.5,
  },
]

const audiences = ["高端用户", "企业决策者", "发烧友", "设计鉴赏家"]
const channels = ["官网首屏", "App 启动页", "线下发布会", "私域社群"]
const tones = ["尊贵克制", "自信锋芒", "沉稳可信", "未来主义"]
const styles = ["玻璃极光", "暗夜鎏金", "冷焰紫晶", "极简白金"]

export function ImpeccableFullFlowShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 打造一款高端玻璃质感营销方案，强调品质、可访问性与全状态覆盖。"
  )
  const [audience, setAudience] = useState(audiences[0])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<ConceptKey>("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "进入 Premium Glass 模式" },
    { id: "a11y", time: now(), label: "可访问性检查通过" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")
  const [focusedControl, setFocusedControl] = useState<string | null>(null)

  const concept = useMemo(() => concepts.find((c) => c.id === conceptId) ?? concepts[0], [conceptId])

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`切换概念 ${concept.id} · ${concept.name}`)
  }, [concept, conceptId, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const audienceMultiplier = audience === "高端用户" ? 1.05 : audience === "企业决策者" ? 1.08 : 1
    const toneMultiplier = tone === "尊贵克制" ? 1.04 : tone === "未来主义" ? 1.03 : 1
    const styleMultiplier = style === "极简白金" ? 1.05 : 1
    return {
      reach: Math.round(base.reach * audienceMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, audience, tone, style])

  useEffect(() => {
    log(`参数变更：${audience} / ${channel} / ${tone} / ${style}`)
  }, [audience, channel, tone, style, log])

  const runAsync = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<"idle" | "success" | "error">>,
      label: string,
      failChance = 0
    ) => {
      setLoading(true)
      setter("idle")
      log(`${label} 中…`)
      setTimeout(() => {
        setLoading(false)
        if (Math.random() < failChance) {
          setter("error")
          log(`${label} 异常`)
        } else {
          setter("success")
          log(`${label} 成功`)
        }
        setTimeout(() => setter("idle"), 2500)
      }, 1200)
    },
    [log]
  )

  const glassClass = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-4 text-slate-100 md:p-6">
      <div className={`absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${concept.glow} opacity-25 blur-[120px] transition-all duration-1000`} />
      <div className={`absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl ${concept.glow} opacity-20 blur-[100px] transition-all duration-1000`} />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[300px_1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card className={`${glassClass} rounded-2xl`}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20">Kimi 2.7 Code</Badge>
                <Badge variant="outline" className="rounded-full border-white/20 text-slate-300">
                  {item.skillChainLabel || "impeccable"}
                </Badge>
              </div>
              <CardTitle className="pt-2 text-lg font-light">Impeccable Full Flow</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400">
              全状态覆盖：加载、成功、错误、选中、悬停、焦点。每个交互都有反馈。
            </CardContent>
          </Card>

          <Card className={`${glassClass} rounded-2xl`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="size-4" />
                控制
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <GlassSelect label="目标人群" value={audience} options={audiences} onChange={setAudience} focused={focusedControl === "audience"} onFocus={() => setFocusedControl("audience")} onBlur={() => setFocusedControl(null)} icon={<Eye className="size-4" />} />
              <GlassSelect label="渠道" value={channel} options={channels} onChange={setChannel} focused={focusedControl === "channel"} onFocus={() => setFocusedControl("channel")} onBlur={() => setFocusedControl(null)} icon={<Layers className="size-4" />} />
              <GlassSelect label="语气" value={tone} options={tones} onChange={setTone} focused={focusedControl === "tone"} onFocus={() => setFocusedControl("tone")} onBlur={() => setFocusedControl(null)} icon={<Zap className="size-4" />} />
              <GlassSelect label="视觉风格" value={style} options={styles} onChange={setStyle} focused={focusedControl === "style"} onFocus={() => setFocusedControl("style")} onBlur={() => setFocusedControl(null)} icon={<Moon className="size-4" />} />
            </CardContent>
          </Card>

          <Card className={`${glassClass} rounded-2xl`}>
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 24 === 0) log("编辑 Brief")
                }}
                className="min-h-[120px] resize-y rounded-xl border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus-visible:border-white/30 focus-visible:ring-2 focus-visible:ring-white/20"
                placeholder="输入高端营销目标…"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:ring-3 focus-visible:ring-white/30 ${
                    conceptId === c.id
                      ? "border-white/30 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {conceptId === c.id && <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${c.glow} opacity-20 blur-md transition-opacity`} />}
                  <span className="relative z-10">{c.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className={`relative overflow-hidden rounded-full border border-white/20 bg-gradient-to-r ${concept.glow} px-4 text-white shadow-lg hover:opacity-90 focus-visible:ring-3 focus-visible:ring-white/30`}
                onClick={() => runAsync(setGenerateState, "生成高端方案")}
                disabled={loading}
              >
                {loading && <span className="absolute inset-0 flex items-center justify-center bg-black/20"><Loader2 className="size-4 animate-spin" /></span>}
                <Sparkles className="mr-1 size-4" />
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/30"
                onClick={() => runAsync(setSaveState, "保存方案", 0.08)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/30"
                onClick={() => runAsync(setExportState, "导出资源包", 0.05)}
                disabled={loading}
              >
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "success" && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur-sm">
              <CheckCircle2 className="size-4" /> 高端方案已生成，所有状态均通过检查。
            </div>
          )}
          {generateState === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 backdrop-blur-sm">
              <AlertTriangle className="size-4" /> 生成异常，已回滚到上一稳定版本。
            </div>
          )}

          <Card className={`relative flex-1 overflow-hidden rounded-3xl ${glassClass}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${concept.glow} opacity-10`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
            <CardContent className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full bg-gradient-to-r ${concept.glow} p-2`}>
                    <Crown className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-300">{channel}</div>
                    <div className="text-xs text-slate-500">{audience}</div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-md">
                  {tone}
                </div>
              </div>

              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <Sun className="size-3" />
                  <span>{style}</span>
                </div>
                <h2 className="mb-4 text-4xl font-light leading-tight md:text-6xl">{concept.headline}</h2>
                <p className="mb-8 max-w-lg text-base text-slate-300 md:text-lg">{concept.body}</p>
                <button
                  className={`group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${concept.glow} px-6 py-3 text-sm font-medium text-white shadow-xl transition-all hover:shadow-2xl focus-visible:ring-3 focus-visible:ring-white/30 active:scale-[0.98]`}
                >
                  探索完整方案
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {[
                  { label: "可访问性", value: "AAA", icon: <Accessibility className="size-4" /> },
                  { label: "动效帧率", value: "60fps", icon: <Zap className="size-4" /> },
                  { label: "响应式", value: "Full", icon: <Sun className="size-4" /> },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:bg-white/10"
                  >
                    <div className="mb-1 flex justify-center text-slate-400">{item.icon}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                    <div className="text-sm font-semibold text-slate-200">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className={`${glassClass} rounded-2xl`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <GlassMetric label="Reach" value={metrics.reach.toLocaleString()} />
              <GlassMetric label="CTR" value={`${metrics.ctr}%`} />
              <GlassMetric label="Conversion" value={`${metrics.conversion}%`} />
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${concept.glow} transition-all duration-700`}
                  style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className={`flex-1 ${glassClass} rounded-2xl`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] space-y-2 overflow-auto pr-1">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10"
                  >
                    <span className="shrink-0 text-xs text-slate-500">{a.time}</span>
                    <span className="text-slate-300">{a.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function GlassSelect({
  label,
  value,
  options,
  onChange,
  focused,
  onFocus,
  onBlur,
  icon,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  focused: boolean
  onFocus: () => void
  onBlur: () => void
  icon: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex w-full items-center justify-between rounded-xl border bg-white/5 px-3 py-2 text-sm text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none ${
          focused || open ? "border-white/30 ring-2 ring-white/20" : "border-white/10"
        }`}
      >
        {value}
        <svg className={`size-4 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-white/10 bg-slate-900/95 py-1 shadow-2xl backdrop-blur-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none ${
                value === opt ? "font-medium text-white" : "text-slate-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GlassMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-lg font-semibold text-slate-100">{value}</span>
    </div>
  )
}
