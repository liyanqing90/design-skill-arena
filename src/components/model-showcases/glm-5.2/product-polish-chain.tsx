"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Download,
  FileText,
  LayoutDashboard,
  Loader2,
  Monitor,
  Save,
  Settings2,
  Smartphone,
  Sparkles,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"
type Viewport = "desktop" | "mobile"
type Section = "brief" | "controls" | "variants" | "metrics" | "activity"

interface Concept {
  id: ConceptId
  name: string
  component: string
  headline: string
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
  { id: "A", name: "Primary", component: "<HeroCampaign />", headline: "主推活动组件，首屏即转化", reach: 1380, ctr: 4.9, conversion: 3.5 },
  { id: "B", name: "Secondary", component: "<FeatureGrid />", headline: "特性网格组件，信息密度优先", reach: 1260, ctr: 5.1, conversion: 3.8 },
  { id: "C", name: "Tertiary", component: "<StoryFlow />", headline: "叙事流组件，节奏引导决策", reach: 1440, ctr: 4.7, conversion: 3.3 },
]

const AUDIENCES = ["新客", "回访", "付费", "流失"]
const CHANNELS = ["Web", "App", "小程序", "H5"]
const TONES = ["产品化", "营销化", "品牌化", "功能化"]
const STYLES = ["组件化", "区块化", "卡片化", "列表化"]

const NAV: { id: Section; label: string; icon: typeof FileText }[] = [
  { id: "brief", label: "Brief", icon: FileText },
  { id: "controls", label: "控件", icon: Settings2 },
  { id: "variants", label: "变体", icon: LayoutDashboard },
  { id: "metrics", label: "指标", icon: ActivityIcon },
  { id: "activity", label: "操作日志", icon: ActivityIcon },
]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function ProductPolishChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造真实产品前端链路：导航 + 组件化工作流 + 响应式模式切换 + 生产状态指示。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [section, setSection] = useState<Section>("brief")
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "产品工作台就绪 · build ready" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换组件 ${concept.component}`) }, [conceptId, concept.component, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "营销化" ? 1.06 : tone === "产品化" ? 1.03 : 1
    const channelMul = channel === "Web" ? 1.1 : channel === "小程序" ? 0.96 : 1
    const styleMul = style === "卡片化" ? 1.04 : style === "列表化" ? 0.98 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, channel, style])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); log(`${label} 进行中…`)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`) }
      else { setter("success"); log(`${label} 完成`) }
      window.setTimeout(() => setter("idle"), 2200)
    }, 1000)
  }, [log])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {/* 顶部导航：产品 app shell */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Muse</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500">Campaign Studio</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-700">{concept.name}</span>
            <Badge className="ml-1 rounded-md bg-violet-600 text-white hover:bg-violet-500">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-slate-300 text-slate-500">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            {/* 生产状态指示 */}
            <span className="hidden items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" /> build: ready
            </span>
            {/* 视口模式切换 */}
            <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5">
              <button type="button" onClick={() => setViewport("desktop")} className={cn("flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40", viewport === "desktop" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>
                <Monitor className="size-3.5" /> 桌面
              </button>
              <button type="button" onClick={() => setViewport("mobile")} className={cn("flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40", viewport === "mobile" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}>
                <Smartphone className="size-3.5" /> 移动
              </button>
            </div>
            <Button size="sm" className="bg-violet-600 text-white hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-400/50" onClick={() => runAsync(setGenerateState, "构建")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-300/50" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-600" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-300/50" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-600" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 md:px-6"><CheckCircle2 className="mr-1 inline size-4" />构建完成，组件已就绪。</div>}
      {generateState === "error" && <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 md:px-6"><XCircle className="mr-1 inline size-4" />构建失败，请检查配置后重试。</div>}

      {/* 主体：左导航 + 中工作区 + 右检查器 */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* 左侧导航 */}
        <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 bg-white p-2 lg:w-48 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-3">
          {NAV.map((n) => {
            const Icon = n.icon
            return (
              <button key={n.id} type="button" onClick={() => setSection(n.id)}
                className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 lg:w-full", section === n.id ? "bg-violet-50 font-medium text-violet-700" : "text-slate-600 hover:bg-slate-100")}>
                <Icon className="size-4 shrink-0" /> {n.label}
              </button>
            )
          })}
        </nav>

        {/* 中工作区：组件预览（受视口模式控制） */}
        <main className="flex-1 overflow-auto bg-slate-100 p-4 md:p-6">
          <div className="mx-auto transition-all duration-300" style={{ maxWidth: viewport === "desktop" ? "none" : "390px" }}>
            <div className={cn("overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm", viewport === "mobile" && "mx-auto")}>
              {/* 组件标题栏 */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-violet-600">{concept.component}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{viewport}</span>
                </div>
                <span className="text-[11px] text-slate-400">{audience} · {channel}</span>
              </div>

              {/* 组件预览内容 */}
              <div className="p-5 md:p-7">
                {section === "brief" && (
                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Brief</h3>
                    <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[120px] resize-y rounded-md border-slate-200 bg-slate-50 text-sm text-slate-800 focus-visible:border-violet-500 focus-visible:ring-violet-500/20" placeholder="描述组件需求…" />
                    <div className="mt-4 rounded-md border border-slate-200 p-4">
                      <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{concept.headline}</h2>
                      <p className="mt-2 text-sm text-slate-500">{brief.slice(0, 60)}…</p>
                    </div>
                  </div>
                )}
                {section === "controls" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ProductSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                    <ProductSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                    <ProductSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                    <ProductSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
                  </div>
                )}
                {section === "variants" && (
                  <div className="space-y-2">
                    {CONCEPTS.map((c) => (
                      <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                        className={cn("flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40", conceptId === c.id ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300")}>
                        <span className="flex items-center gap-3">
                          <span className={cn("flex size-7 items-center justify-center rounded text-xs font-bold", conceptId === c.id ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500")}>{c.id}</span>
                          <span>
                            <span className="block text-sm font-semibold text-slate-900">{c.name}</span>
                            <span className="font-mono text-[11px] text-slate-400">{c.component}</span>
                          </span>
                        </span>
                        <span className="text-xs text-slate-400">CTR {c.ctr}%</span>
                      </button>
                    ))}
                  </div>
                )}
                {section === "metrics" && (
                  <div className="grid grid-cols-3 gap-3">
                    <ProductMetric label="Reach" value={metrics.reach.toLocaleString()} />
                    <ProductMetric label="CTR" value={`${metrics.ctr}%`} />
                    <ProductMetric label="Conv" value={`${metrics.conversion}%`} />
                  </div>
                )}
                {section === "activity" && (
                  <div className="max-h-[320px] space-y-1.5 overflow-auto">
                    {activity.map((a) => (
                      <div key={a.id} className="flex items-start gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 text-xs">
                        <span className="shrink-0 font-mono text-slate-400">{a.time}</span>
                        <span className="text-slate-600">{a.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* 右检查器：状态 + 指标速览 */}
        <aside className="shrink-0 border-t border-slate-200 bg-white p-4 lg:w-64 lg:border-l lg:border-t-0">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">检查器</h3>
          <div className="space-y-3">
            <div className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">当前组件</span>
                <span className="font-mono text-violet-600">{concept.component}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Reach</span><span className="font-bold text-slate-900">{metrics.reach.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">CTR</span><span className="font-bold text-slate-900">{metrics.ctr}%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Conv</span><span className="font-bold text-slate-900">{metrics.conversion}%</span></div>
              </div>
            </div>
            <div className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">生产状态</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between"><span className="text-slate-500">构建</span><span className="flex items-center gap-1 text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" />ready</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">视口</span><span className="text-slate-700">{viewport}</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">区块</span><span className="text-slate-700">{section}</span></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ProductSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:border-slate-300 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-slate-400 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-violet-50 focus-visible:bg-violet-50 focus-visible:outline-none", value === opt ? "font-medium text-violet-700" : "text-slate-700")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProductMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  )
}
