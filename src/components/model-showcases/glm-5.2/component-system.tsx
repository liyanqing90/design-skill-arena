"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Blocks,
  CheckCircle2,
  Download,
  Loader2,
  Palette,
  Save,
  Sparkles,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"
type Variant = "default" | "secondary" | "outline"

interface Concept {
  id: ConceptId
  name: string
  headline: string
  variant: Variant
  reach: number
  ctr: number
  conversion: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "Default", headline: "默认变体，开箱即用", variant: "default", reach: 1240, ctr: 4.4, conversion: 3.0 },
  { id: "B", name: "Secondary", headline: "次级变体，弱化主操作", variant: "secondary", reach: 1080, ctr: 4.8, conversion: 3.3 },
  { id: "C", name: "Outline", headline: "描边变体，强调结构", variant: "outline", reach: 1390, ctr: 4.1, conversion: 2.8 },
]

const AUDIENCES = ["组件使用者", "设计系统团队", "前端架构师", "产品工程师"]
const CHANNELS = ["组件库站点", "Storybook", "内部设计稿", "代码仓库"]
const TONES = ["一致", "克制", "功能", "中性"]
const STYLES = ["neutral", "zinc", "stone", "slate"]

const TOKENS = [
  { name: "--radius", value: "0.5rem", usage: "圆角" },
  { name: "--primary", value: "oklch(0.21 0.01 286)", usage: "主色" },
  { name: "--background", value: "oklch(1 0 0)", usage: "背景" },
  { name: "--border", value: "oklch(0.92 0 0)", usage: "边框" },
  { name: "--ring", value: "oklch(0.55 0.01 286)", usage: "焦点环" },
]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function ComponentSystemShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布搭建一套基于 shadcn 组件系统的营销活动页面，强调一致性与复用。")
  const [audience, setAudience] = useState(AUDIENCES[1])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [tab, setTab] = useState<"preview" | "tokens" | "variants">("preview")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "组件系统加载" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换变体 ${concept.variant}`) }, [conceptId, concept.variant, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "功能" ? 1.04 : tone === "克制" ? 1.02 : 1
    const styleMul = style === "zinc" ? 1.03 : style === "stone" ? 0.98 : 1
    const channelMul = channel === "组件库站点" ? 1.06 : channel === "代码仓库" ? 0.95 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); log(`${label} 进行中…`)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`) }
      else { setter("success"); log(`${label} 完成`) }
      window.setTimeout(() => setter("idle"), 2200)
    }, 900)
  }, [log])

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-base font-bold"><Blocks className="size-4" /> Component System</span>
                <Badge className="rounded-md bg-slate-900 text-white hover:bg-slate-800">GLM 5.2</Badge>
                <Badge variant="outline" className="rounded-md">{item.skillChainLabel}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => runAsync(setGenerateState, "生成组件方案")} disabled={loading}>
                  {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
                </Button>
                <Button size="sm" variant="outline" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
                  {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />} 保存
                </Button>
                <Button size="sm" variant="outline" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
                  {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Download className="mr-1 size-4" />} 导出
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {generateState === "success" && <StateBanner kind="success" text="组件方案已生成。" />}
        {generateState === "error" && <StateBanner kind="error" text="生成失败，请重试。" />}

        <div className="grid gap-4 lg:grid-cols-[300px_1fr_300px]">
          {/* 左：Brief + 控件 */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Campaign Brief</CardTitle></CardHeader>
              <CardContent>
                <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[100px] resize-y text-sm" placeholder="输入活动目标…" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Palette className="size-4" /> 控件</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-3">
                <SysSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                <SysSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                <SysSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                <SysSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
              </CardContent>
            </Card>
          </div>

          {/* 中：自定义 Tabs 主区 */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-slate-200 bg-white">
              <div role="tablist" className="flex border-b border-slate-200">
                {([["preview", "主预览"], ["tokens", "设计 Token"], ["variants", "变体"]] as const).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={cn("flex-1 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900", tab === key ? "border-b-2 border-slate-900 text-slate-900" : "text-slate-500 hover:text-slate-800")}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "preview" && (
                <div className="p-6 md:p-10">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="secondary">{channel}</Badge>
                    <span className="text-xs text-slate-500">{audience} · {tone}</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight md:text-4xl">{concept.headline}</h2>
                  <p className="mt-3 max-w-lg text-sm text-slate-600">{brief.slice(0, 70)}…</p>
                  <div className="my-5 h-px bg-slate-200" />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant={concept.variant}>主操作</Button>
                    <Button variant="outline">次操作</Button>
                    <Button variant="ghost">幽灵</Button>
                    <Badge>新</Badge>
                    <Badge variant="outline">beta</Badge>
                  </div>
                </div>
              )}

              {tab === "tokens" && (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-xs text-slate-500">
                          <th className="py-2 pr-4 font-medium">Token</th>
                          <th className="py-2 pr-4 font-medium">值</th>
                          <th className="py-2 font-medium">用途</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOKENS.map((t) => (
                          <tr key={t.name} className="border-b last:border-0">
                            <td className="py-2 pr-4 font-mono text-xs">{t.name}</td>
                            <td className="py-2 pr-4 font-mono text-xs text-slate-600">{t.value}</td>
                            <td className="py-2 text-slate-600">{t.usage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === "variants" && (
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
                  {CONCEPTS.map((c) => (
                    <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                      className={cn("rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900", conceptId === c.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 hover:border-slate-400")}>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">{c.id}</div>
                      <div className="mt-1 text-sm font-semibold">{c.name}</div>
                      <div className={cn("mt-1 text-[11px]", conceptId === c.id ? "text-white/70" : "text-slate-500")}>{c.headline}</div>
                      <div className="mt-2"><Button size="sm" variant={c.variant} disabled>示例</Button></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右：指标 + Activity */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">预测指标</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-3">
                <MetricRow label="Reach" value={metrics.reach.toLocaleString()} />
                <MetricRow label="CTR" value={`${metrics.ctr}%`} />
                <MetricRow label="Conversion" value={`${metrics.conversion}%`} />
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-900 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader><CardTitle className="text-base">最近操作</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[260px] space-y-2 overflow-auto pr-3">
                  {activity.map((a) => (
                    <div key={a.id} className="flex items-start gap-2 rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-xs">
                      <span className="shrink-0 text-slate-400">{a.time}</span>
                      <span className="text-slate-700">{a.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function SysSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-8 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors hover:border-slate-400 focus-visible:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
      >
        <span className="truncate">{value}</span>
        <span className="text-slate-400">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none", value === opt ? "font-bold text-slate-900" : "text-slate-700")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}

function StateBanner({ kind, text }: { kind: "success" | "error"; text: string }) {
  return (
    <div className={cn("mb-4 flex items-center gap-2 rounded-md border px-3 py-2 text-sm", kind === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800")}>
      {kind === "success" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />} {text}
    </div>
  )
}
