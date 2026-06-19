"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
  Loader2,
  Save,
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
type InspectorTab = "controls" | "metrics" | "activity"

interface Concept {
  id: ConceptId
  name: string
  mood: string
  headline: string
  mesh: string
  glow: string
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
  { id: "A", name: "极光", mood: "Aurora", headline: "让新品发布像极光一样铺开", mesh: "radial-gradient(at 20% 20%, rgba(16,185,129,0.55), transparent 50%), radial-gradient(at 80% 30%, rgba(20,184,166,0.5), transparent 55%), radial-gradient(at 50% 80%, rgba(5,150,105,0.45), transparent 60%)", glow: "rgba(16,185,129,0.5)", reach: 1560, ctr: 5.4, conversion: 3.7 },
  { id: "B", name: "日落", mood: "Sunset", headline: "把发布做成一场日落", mesh: "radial-gradient(at 25% 25%, rgba(236,72,153,0.55), transparent 50%), radial-gradient(at 75% 35%, rgba(251,146,60,0.5), transparent 55%), radial-gradient(at 50% 85%, rgba(219,39,119,0.45), transparent 60%)", glow: "rgba(236,72,153,0.5)", reach: 1420, ctr: 5.7, conversion: 4.0 },
  { id: "C", name: "银灰", mood: "Monochrome", headline: "让新品沉入一片银灰", mesh: "radial-gradient(at 20% 20%, rgba(148,163,184,0.5), transparent 50%), radial-gradient(at 80% 30%, rgba(203,213,225,0.45), transparent 55%), radial-gradient(at 50% 80%, rgba(100,116,139,0.4), transparent 60%)", glow: "rgba(203,213,225,0.5)", reach: 1680, ctr: 4.9, conversion: 3.3 },
]

const AUDIENCES = ["视觉敏感型", "潮流引领者", "高端消费", "创意圈层"]
const CHANNELS = ["沉浸落地页", "开屏", "视频信息流", "KOL"]
const TONES = ["沉浸", "戏剧", "克制", "梦幻"]
const STYLES = ["极光", "日落", "银灰", "深空"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function VisualPremiumChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造沉浸式视觉画布：全屏渐变网格 + 浮动玻璃检查器 + 高级动效感。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [tab, setTab] = useState<InspectorTab>("controls")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "沉浸画布就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换氛围 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "戏剧" ? 1.07 : tone === "沉浸" ? 1.05 : 1
    const channelMul = channel === "沉浸落地页" ? 1.12 : channel === "开屏" ? 0.94 : 1
    const styleMul = style === "日落" ? 1.05 : style === "深空" ? 0.97 : 1
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* 沉浸式画布背景：随概念切换的渐变网格 + 动效 */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-1000" style={{ background: concept.mesh }} />
      <div className="vpc-shimmer pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 50% 50%, ${concept.glow}, transparent 70%)` }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* 顶部浮动条 */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold drop-shadow">Muse · Immersive</span>
          <Badge className="rounded-md bg-white/15 text-white backdrop-blur hover:bg-white/25">GLM 5.2</Badge>
          <Badge variant="outline" className="rounded-md border-white/30 text-white/80 backdrop-blur">{item.skillChainLabel}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-white text-slate-900 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50" onClick={() => runAsync(setGenerateState, "生成氛围")} disabled={loading}>
            {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
          </Button>
          <Button size="sm" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
            {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-300" /> : <Save className="mr-1 size-4" />} 保存
          </Button>
          <Button size="sm" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
            {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-300" /> : <Download className="mr-1 size-4" />} 导出
          </Button>
        </div>
      </header>

      {generateState === "success" && <div className="relative z-10 border-b border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur md:px-8"><CheckCircle2 className="mr-1 inline size-4" />氛围已生成。</div>}
      {generateState === "error" && <div className="relative z-10 border-b border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200 backdrop-blur md:px-8"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</div>}

      {/* 主舞台：沉浸画布 + 浮动玻璃检查器 */}
      <div className="relative z-10 grid min-h-[calc(100vh-110px)] gap-4 p-4 md:p-8 lg:grid-cols-[1fr_360px]">
        {/* 沉浸画布主视觉 */}
        <section className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-10">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-xs backdrop-blur">{concept.mood} · {channel}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">{audience} · {tone}</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-[1.05] drop-shadow-2xl md:text-6xl">{concept.headline}</h1>
            <p className="mt-5 max-w-md text-base text-white/80 drop-shadow">{brief.slice(0, 64)}…</p>
            <button className="mt-8 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-95">
              进入沉浸
            </button>
          </div>
          {/* 氛围切换：底部圆点 */}
          <div className="flex items-center gap-3">
            {CONCEPTS.map((c) => (
              <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                className={cn("flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50", conceptId === c.id ? "border-white bg-white text-slate-900" : "border-white/25 text-white/80 hover:bg-white/10")}>
                <span className="size-2.5 rounded-full" style={{ background: c.glow }} />
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* 浮动玻璃检查器（桌面右侧 / 移动底部抽屉） */}
        <aside className="hidden flex-col rounded-2xl border border-white/15 bg-slate-950/50 p-4 backdrop-blur-xl lg:flex">
          <InspectorTabs tab={tab} setTab={setTab} />
          <div className="mt-4 flex-1 overflow-auto pr-1">
            {tab === "controls" && (
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Campaign Brief</h4>
                  <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[72px] resize-y rounded-lg border-white/15 bg-white/5 text-sm text-white focus-visible:border-white/40 focus-visible:ring-white/10" placeholder="描述沉浸主旨…" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ImmersiveSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                  <ImmersiveSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                  <ImmersiveSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                  <ImmersiveSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
                </div>
              </div>
            )}
            {tab === "metrics" && (
              <div className="space-y-3">
                <ImmersiveMetric label="Reach" value={metrics.reach.toLocaleString()} pct={Math.min(metrics.reach / 18, 100)} />
                <ImmersiveMetric label="CTR" value={`${metrics.ctr}%`} pct={metrics.ctr * 16} />
                <ImmersiveMetric label="Conversion" value={`${metrics.conversion}%`} pct={metrics.conversion * 22} />
              </div>
            )}
            {tab === "activity" && (
              <div className="space-y-1.5">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">
                    <span className="shrink-0 font-mono text-white/40">{a.time}</span>
                    <span className="text-white/80">{a.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* 移动端抽屉触发 */}
        <button
          type="button"
          onClick={() => setDrawerOpen((p) => !p)}
          className="fixed bottom-4 left-4 right-4 z-20 rounded-full border border-white/25 bg-slate-950/70 px-4 py-3 text-center text-sm font-semibold backdrop-blur-xl lg:hidden"
        >
          {drawerOpen ? "收起检查器" : "展开检查器"}
        </button>
        {drawerOpen && (
          <div className="fixed inset-x-0 bottom-16 z-20 max-h-[60vh] overflow-auto rounded-t-2xl border border-white/15 bg-slate-950/85 p-4 backdrop-blur-xl lg:hidden">
            <InspectorTabs tab={tab} setTab={setTab} />
            <div className="mt-3">
              {tab === "controls" && (
                <div className="space-y-3">
                  <Textarea value={brief} onChange={(e) => setBrief(e.target.value)} className="min-h-[60px] resize-y rounded-lg border-white/15 bg-white/5 text-sm text-white focus-visible:border-white/40" />
                  <div className="grid grid-cols-2 gap-2">
                    <ImmersiveSelect label="人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                    <ImmersiveSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                    <ImmersiveSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                    <ImmersiveSelect label="风格" value={style} options={STYLES} onChange={setStyle} />
                  </div>
                </div>
              )}
              {tab === "metrics" && (
                <div className="space-y-2">
                  <ImmersiveMetric label="Reach" value={metrics.reach.toLocaleString()} pct={Math.min(metrics.reach / 18, 100)} />
                  <ImmersiveMetric label="CTR" value={`${metrics.ctr}%`} pct={metrics.ctr * 16} />
                  <ImmersiveMetric label="Conversion" value={`${metrics.conversion}%`} pct={metrics.conversion * 22} />
                </div>
              )}
              {tab === "activity" && (
                <div className="space-y-1.5">
                  {activity.map((a) => (
                    <div key={a.id} className="flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">
                      <span className="shrink-0 font-mono text-white/40">{a.time}</span>
                      <span className="text-white/80">{a.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes vpc-shimmer-kf { 0% { transform: scale(1); opacity: 0.5 } 50% { transform: scale(1.15); opacity: 0.7 } 100% { transform: scale(1); opacity: 0.5 } }
        .vpc-shimmer { animation: vpc-shimmer-kf 8s ease-in-out infinite }
      `}</style>
    </div>
  )
}

function InspectorTabs({ tab, setTab }: { tab: InspectorTab; setTab: (t: InspectorTab) => void }) {
  const tabs: { id: InspectorTab; label: string }[] = [
    { id: "controls", label: "控件" },
    { id: "metrics", label: "指标" },
    { id: "activity", label: "操作" },
  ]
  return (
    <div className="flex gap-1 rounded-lg bg-white/5 p-1">
      {tabs.map((t) => (
        <button key={t.id} type="button" onClick={() => setTab(t.id)}
          className={cn("flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40", tab === t.id ? "bg-white text-slate-900" : "text-white/70 hover:text-white")}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

function ImmersiveSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/50">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:border-white/30 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-white/50 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-white/15 bg-slate-900 py-1 shadow-2xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none", value === opt ? "font-medium text-white" : "text-white/80")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ImmersiveMetric({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-white/60">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-white/80 to-white transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}
