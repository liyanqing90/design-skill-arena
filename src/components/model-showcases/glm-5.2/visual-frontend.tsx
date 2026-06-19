"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
  Layers,
  Loader2,
  Save,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"

interface Concept {
  id: ConceptId
  name: string
  headline: string
  tag: string
  gradient: string
  shape: string
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
  {
    id: "A",
    name: "霓虹脉冲",
    headline: "让新品像一道光划过时间线",
    tag: "夜场首发",
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-700",
    shape: "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.9), transparent 55%)",
    reach: 1620,
    ctr: 5.8,
    conversion: 3.6,
  },
  {
    id: "B",
    name: "极光流",
    headline: "把品牌色拉成一条流动的河",
    tag: "沉浸叙事",
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    shape: "radial-gradient(circle at 70% 40%, rgba(20,184,166,0.9), transparent 55%)",
    reach: 1380,
    ctr: 6.2,
    conversion: 4.1,
  },
  {
    id: "C",
    name: "熔岩",
    headline: "用温度点燃每一次点击",
    tag: "限时引爆",
    gradient: "from-orange-500 via-red-500 to-rose-700",
    shape: "radial-gradient(circle at 50% 60%, rgba(244,63,94,0.9), transparent 55%)",
    reach: 1750,
    ctr: 5.3,
    conversion: 3.9,
  },
]

const AUDIENCES = ["潮流先锋", "生活方式人群", "科技尝鲜者", "高净值用户"]
const CHANNELS = ["沉浸式落地页", "短视频信息流", "开屏广告", "KOL 合作"]
const TONES = ["张扬热烈", "克制高级", "俏皮跳脱", "冷峻未来"]
const STYLES = ["霓虹紫", "极光青", "熔岩红", "深空蓝"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function VisualFrontendShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 GLM 5.2 新品发布打造一场视觉先行的营销活动，用一张主视觉撑起全渠道传播。"
  )
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "视觉舞台就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [inspectorOpen, setInspectorOpen] = useState(true)

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换视觉概念 ${conceptId} · ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数更新 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "张扬热烈" ? 1.08 : tone === "冷峻未来" ? 0.96 : 1
    const styleMul = style === "霓虹紫" ? 1.06 : style === "深空蓝" ? 0.98 : 1
    const channelMul = channel === "沉浸式落地页" ? 1.1 : channel === "开屏广告" ? 0.92 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); log(`${label} 开始…`)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`) }
      else { setter("success"); log(`${label} 完成`) }
      window.setTimeout(() => setter("idle"), 2200)
    }, 950)
  }, [log])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* 背景舞台 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} transition-all duration-700`} />
      <div className="absolute inset-0 transition-all duration-700" style={{ background: concept.shape }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6))]" />

      {/* 顶部标签条 */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-md bg-white/15 text-white backdrop-blur hover:bg-white/25">GLM 5.2</Badge>
          <Badge variant="outline" className="rounded-md border-white/30 bg-white/10 text-white backdrop-blur">{item.skillChainLabel}</Badge>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">Visual Frontend</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setGenerateState, "生成视觉")} disabled={loading}>
            {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
          </Button>
          <Button size="sm" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setSaveState, "保存视觉", 0.1)} disabled={loading}>
            {saveState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Save className="mr-1 size-4" />} 保存
          </Button>
          <Button size="sm" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/40" onClick={() => runAsync(setExportState, "导出视觉包", 0.05)} disabled={loading}>
            {exportState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Download className="mr-1 size-4" />} 导出
          </Button>
        </div>
      </div>

      {generateState === "success" && (
        <div className="relative z-10 mx-4 mb-2 flex items-center gap-2 rounded-lg border border-emerald-300/40 bg-emerald-500/20 px-3 py-2 text-sm text-emerald-100 backdrop-blur md:mx-6">
          <CheckCircle2 className="size-4" /> 视觉已生成，可在检查器中微调。
        </div>
      )}
      {generateState === "error" && (
        <div className="relative z-10 mx-4 mb-2 flex items-center gap-2 rounded-lg border border-red-300/40 bg-red-500/20 px-3 py-2 text-sm text-red-100 backdrop-blur md:mx-6">
          <XCircle className="size-4" /> 生成失败，请调整 Brief 后重试。
        </div>
      )}

      {/* 主视觉舞台 */}
      <div className="relative z-10 flex min-h-[60vh] flex-col justify-center px-6 py-10 md:px-16 md:py-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <span className="size-1.5 rounded-full bg-white" /> {concept.tag} · {channel}
          </div>
          <h1 className="text-4xl font-black leading-[1.05] drop-shadow-lg md:text-7xl">{concept.headline}</h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{brief.slice(0, 60)}…</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
              立即参与
            </button>
            <span className="text-xs text-white/60">面向 {audience} · {tone}</span>
          </div>
        </div>
      </div>

      {/* 左侧浮动控件条（桌面）/ 底部 Tab（移动） */}
      <div className="relative z-10 mx-4 mb-4 md:mx-6">
        <div className="grid gap-3 rounded-2xl border border-white/15 bg-slate-900/60 p-4 backdrop-blur-xl md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="md:col-span-1">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/50">Campaign Brief</label>
            <Textarea
              value={brief}
              onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 30 === 0) log("更新 Brief") }}
              className="min-h-[64px] resize-none border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 focus-visible:border-white/40 focus-visible:ring-white/20"
              placeholder="描述新品与目标…"
            />
          </div>
          <Pill label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
          <Pill label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
          <Pill label="语气" value={tone} options={TONES} onChange={setTone} />
          <Pill label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
        </div>
      </div>

      {/* 概念切换 + 检查器 */}
      <div className="relative z-10 mx-4 mb-6 grid gap-3 md:mx-6 md:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/15 bg-slate-900/60 p-3 backdrop-blur-xl">
          <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">概念</span>
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setConceptId(c.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${
                conceptId === c.id ? "border-white bg-white text-slate-900" : "border-white/25 text-white/80 hover:border-white/60 hover:bg-white/10"
              }`}
            >
              <span className={`size-2 rounded-full bg-gradient-to-br ${c.gradient}`} />
              {c.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setInspectorOpen((p) => !p)}
          className="flex items-center justify-between rounded-2xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm backdrop-blur-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
        >
          <span className="flex items-center gap-2 font-semibold"><Layers className="size-4" /> 检查器 {inspectorOpen ? "▾" : "▸"}</span>
          <span className="text-xs text-white/50">{inspectorOpen ? "收起" : "展开"}</span>
        </button>
      </div>

      {inspectorOpen && (
        <div className="relative z-10 mx-4 mb-6 grid gap-3 md:mx-6 md:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/15 bg-slate-900/60 p-4 backdrop-blur-xl">
            <Stat icon={<Users className="size-4" />} label="Reach" value={metrics.reach.toLocaleString()} />
            <Stat icon={<TrendingUp className="size-4" />} label="CTR" value={`${metrics.ctr}%`} />
            <Stat icon={<Sparkles className="size-4" />} label="Conversion" value={`${metrics.conversion}%`} />
          </div>
          <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50"><Layers className="size-3.5" /> 最近操作</div>
            <div className="max-h-[180px] space-y-1.5 overflow-auto pr-1">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-2 rounded-md bg-white/5 px-2 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10">
                  <span className="shrink-0 text-white/40">{a.time}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Pill({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/50">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:border-white/40 focus-visible:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <span className="truncate">{value}</span>
        <span className={`text-white/50 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-white/15 bg-slate-900 py-1 shadow-2xl backdrop-blur-xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none ${value === opt ? "bg-white/10 font-medium text-white" : "text-white/70"}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">{icon}{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  )
}
