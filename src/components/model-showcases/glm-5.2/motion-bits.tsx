"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
  Loader2,
  Save,
  Sparkles,
  Waves,
  Zap,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"

interface Concept {
  id: ConceptId
  name: string
  headline: string
  motion: string
  accent: string
  reach: number
  ctr: number
  conversion: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
}

interface Ripple {
  id: string
  x: number
  y: number
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "脉冲", headline: "每一次点击都激起一圈涟漪", motion: "pulse", accent: "from-violet-500 to-fuchsia-500", reach: 1310, ctr: 5.0, conversion: 3.3 },
  { id: "B", name: "滑入", headline: "内容像潮水一样涌进来", motion: "slide", accent: "from-sky-500 to-cyan-500", reach: 1150, ctr: 5.4, conversion: 3.7 },
  { id: "C", name: "弹跳", headline: "让注意力轻轻落地", motion: "bounce", accent: "from-amber-500 to-orange-500", reach: 1420, ctr: 4.6, conversion: 3.0 },
]

const AUDIENCES = ["年轻潮流", "科技极客", "创意工作者", "大众消费者"]
const CHANNELS = ["动效落地页", "短视频", "App 启动页", "H5 互动"]
const TONES = ["活力", "克制", "俏皮", "未来感"]
const STYLES = ["脉冲紫", "滑入青", "弹跳橙", "极简白"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function MotionBitsShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布设计一场以动效为核心的营销活动，用微交互引导注意力。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "动效引擎就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [ripples, setRipples] = useState<Ripple[]>([])

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换动效 ${concept.motion}`) }, [conceptId, concept.motion, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "活力" ? 1.07 : tone === "未来感" ? 1.03 : 1
    const styleMul = style === "脉冲紫" ? 1.05 : style === "极简白" ? 0.97 : 1
    const channelMul = channel === "动效落地页" ? 1.09 : channel === "H5 互动" ? 1.04 : 1
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
    }, 1000)
  }, [log])

  function addRipple(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const x = event.detail === 0 ? rect.width / 2 : event.clientX - rect.left
    const y = event.detail === 0 ? rect.height / 2 : event.clientY - rect.top
    setRipples((prev) => [
      ...prev,
      { id, x, y },
    ])
    log("触发涟漪")
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @keyframes mb-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.04);opacity:.85} }
        @keyframes mb-ripple { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(3);opacity:0} }
        @keyframes mb-slide { 0%{transform:translateY(12px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes mb-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes mb-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes mb-bar { 0%{width:0} 100%{width:var(--w)} }
        .mb-pulse{animation:mb-pulse 1.8s ease-in-out infinite}
        .mb-slide{animation:mb-slide .5s ease-out both}
        .mb-bounce{animation:mb-bounce 1.2s ease-in-out infinite}
        .mb-shimmer{background:linear-gradient(90deg,rgba(255,255,255,.05) 25%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.05) 75%);background-size:200% 100%;animation:mb-shimmer 1.5s infinite}
      `}</style>

      <div className="mx-auto max-w-[1500px] p-4 md:p-6">
        {/* 顶栏 */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-base font-bold"><Waves className="size-4 animate-pulse text-fuchsia-400" /> Motion Bits</span>
            <Badge className="rounded-md bg-slate-900 text-white hover:bg-slate-800">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-white/20 text-slate-200">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-fuchsia-600 text-white hover:bg-fuchsia-500" onClick={() => runAsync(setGenerateState, "生成动效方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-400" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10" onClick={() => runAsync(setExportState, "导出动效", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-400" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </header>

        {generateState === "success" && <MotionBanner kind="success" text="动效方案已生成，预览正在播放。" />}
        {generateState === "error" && <MotionBanner kind="error" text="生成失败，请重试。" />}

        <div className="grid gap-4 lg:grid-cols-[300px_1fr_300px]">
          {/* 左：Brief + 控件 */}
          <div className="flex flex-col gap-4">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Campaign Brief</h3>
              <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[90px] resize-y rounded-lg border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 focus-visible:border-fuchsia-500/50 focus-visible:ring-fuchsia-500/20" placeholder="描述动效目标…" />
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">控件</h3>
              <div className="flex flex-col gap-3">
                <MotionSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                <MotionSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                <MotionSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                <MotionSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
              </div>
            </section>
          </div>

          {/* 中：动效主预览 */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-10">
              {/* 动效背景层 */}
              <div className={cn("pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gradient-to-br opacity-30 blur-3xl", concept.accent, concept.motion === "pulse" && "mb-pulse")} />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">{channel}</span>
                  <span className="flex items-center gap-1 text-xs text-white/50"><Zap className="size-3" /> {concept.motion}</span>
                </div>
                <h2 key={concept.id} className={cn("mb-3 text-3xl font-black leading-tight md:text-5xl", concept.motion === "slide" && "mb-slide", concept.motion === "bounce" && "mb-bounce")}>{concept.headline}</h2>
                <p className="mb-6 max-w-lg text-sm text-white/70 md:text-base">{brief.slice(0, 60)}…</p>
                <button
                  onClick={addRipple}
                  className={cn("relative overflow-hidden rounded-full bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 active:scale-95", concept.accent)}
                >
                  <span className="relative z-10">点击触发涟漪</span>
                  {ripples.map((r) => (
                    <span
                      key={r.id}
                      className="pointer-events-none absolute size-12 rounded-full bg-white/40"
                      style={{
                        left: r.x - 24,
                        top: r.y - 24,
                        animation: "mb-ripple .9s ease-out forwards",
                      }}
                    />
                  ))}
                </button>
                <div className="mt-4 text-xs text-white/40">{audience} · {tone} · {style}</div>
              </div>
            </div>

            {/* 概念切换（带动效） */}
            <div className="grid grid-cols-3 gap-3">
              {CONCEPTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  className={cn("group rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-500/40", conceptId === c.id ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10")}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">{c.id}</span>
                    <span className={cn("size-2 rounded-full bg-gradient-to-br", c.accent, conceptId === c.id && "mb-pulse")} />
                  </div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="mt-1 text-[11px] text-white/50">{c.headline}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 右：指标（带动画条） + Activity */}
          <div className="flex flex-col gap-4">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">预测指标</h3>
              <div className="flex flex-col gap-3">
                <MotionMetric label="Reach" value={metrics.reach.toLocaleString()} pct={Math.min(metrics.reach / 20, 100)} color="from-violet-500 to-fuchsia-500" />
                <MotionMetric label="CTR" value={`${metrics.ctr}%`} pct={Math.min(metrics.ctr * 16, 100)} color="from-sky-500 to-cyan-500" />
                <MotionMetric label="Conversion" value={`${metrics.conversion}%`} pct={Math.min(metrics.conversion * 20, 100)} color="from-amber-500 to-orange-500" />
              </div>
            </section>
            <section className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">最近操作</h3>
              <div className="max-h-[240px] space-y-1.5 overflow-auto pr-1">
                {activity.map((a) => (
                  <div key={a.id} className="mb-slide flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">
                    <span className="shrink-0 text-white/40">{a.time}</span>
                    <span className="text-white/80">{a.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function MotionSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:border-fuchsia-500/50 focus-visible:border-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/30"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-white/40 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="mb-slide absolute z-20 mt-1 w-full rounded-lg border border-white/15 bg-slate-900/95 py-1 shadow-2xl backdrop-blur">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-fuchsia-500/10 focus-visible:bg-fuchsia-500/10 focus-visible:outline-none", value === opt ? "font-medium text-fuchsia-300" : "text-white/70")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MotionMetric({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function MotionBanner({ kind, text }: { kind: "success" | "error"; text: string }) {
  return (
    <div className={cn("mb-4 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm backdrop-blur mb-slide", kind === "success" ? "border-green-400/30 bg-green-500/10 text-green-200" : "border-red-400/30 bg-red-500/10 text-red-200")}>
      {kind === "success" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />} {text}
    </div>
  )
}
