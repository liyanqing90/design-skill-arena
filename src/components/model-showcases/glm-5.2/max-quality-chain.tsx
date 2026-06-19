"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Download,
  Gauge,
  Loader2,
  Save,
  ShieldCheck,
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

interface Concept {
  id: ConceptId
  name: string
  headline: string
  reach: number
  ctr: number
  conversion: number
  quality: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
}

interface QualityGate {
  id: string
  label: string
  status: "pass" | "warn" | "fail"
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "旗舰", headline: "把发布做成一次旗舰级质量交付", reach: 1520, ctr: 5.3, conversion: 3.8, quality: 96 },
  { id: "B", name: "均衡", headline: "在质量与速度之间取最优解", reach: 1410, ctr: 5.0, conversion: 3.6, quality: 92 },
  { id: "C", name: "实验", headline: "用驾驶舱验证一个大胆假设", reach: 1380, ctr: 5.5, conversion: 4.1, quality: 88 },
]

const AUDIENCES = ["高净值", "决策层", "专业用户", "早期采用者"]
const CHANNELS = ["旗舰落地页", "品牌开屏", "深度专题", "KOL 矩阵"]
const TONES = ["权威", "精密", "克制", "笃定"]
const STYLES = ["驾驶舱", "仪表盘", "控制台", "指挥中心"]

const QUALITY_GATES: QualityGate[] = [
  { id: "g1", label: "可访问性 AA", status: "pass" },
  { id: "g2", label: "响应式断点", status: "pass" },
  { id: "g3", label: "状态覆盖完整", status: "pass" },
  { id: "g4", label: "焦点环可见", status: "pass" },
  { id: "g5", label: "对比度 ≥ 4.5:1", status: "warn" },
  { id: "g6", label: "动效降级", status: "pass" },
]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function MaxQualityChainShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造最高复杂度质量驾驶舱：密集质量面板 + 双侧栏 + 质量栈 + 指标 + Activity + 完整本地状态。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "质量驾驶舱在线 · 全栈就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 18))
  }, [])

  useEffect(() => { log(`切换方案 ${concept.name} · 质量分 ${concept.quality}`) }, [conceptId, concept.name, concept.quality, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "权威" ? 1.06 : tone === "精密" ? 1.04 : 1
    const channelMul = channel === "旗舰落地页" ? 1.12 : channel === "深度专题" ? 0.95 : 1
    const styleMul = style === "驾驶舱" ? 1.05 : style === "控制台" ? 0.98 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, channel, style])

  const passedGates = QUALITY_GATES.filter((g) => g.status === "pass").length
  const qualityPct = Math.round((passedGates / QUALITY_GATES.length) * 100)

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
    <div className="min-h-screen bg-[#0a0e14] text-slate-200">
      {/* 指挥栏 */}
      <header className="border-b border-white/10 px-4 py-2.5 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-white"><Gauge className="size-4 text-cyan-400" /> Muse · Cockpit</span>
            <Badge className="rounded-md bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-white/20 text-slate-300">{item.skillChainLabel}</Badge>
            <span className="hidden items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 sm:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> 全栈在线
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button size="sm" className="bg-cyan-500 text-[#0a0e14] hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300/50" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <div className="border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-200 md:px-5"><CheckCircle2 className="mr-1 inline size-4" />方案已生成，质量门全部通过。</div>}
      {generateState === "error" && <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-200 md:px-5"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</div>}

      {/* 三栏驾驶舱：左控制 + 中预览 + 右指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px]">
        {/* 左侧栏：Brief + 控件 + 质量门 */}
        <aside className={cn("border-b border-white/10 bg-[#0d1219] lg:border-b-0 lg:border-r", !leftOpen && "hidden lg:block")}>
          <div className="space-y-4 p-4">
            <div>
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Brief</h3>
              <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[72px] resize-y rounded-md border-white/10 bg-white/5 text-xs text-slate-200 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20" placeholder="描述方案主旨…" />
            </div>
            <div>
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">控件</h3>
              <div className="grid grid-cols-2 gap-2">
                <CockpitSelect label="人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                <CockpitSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                <CockpitSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                <CockpitSelect label="风格" value={style} options={STYLES} onChange={setStyle} />
              </div>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500"><ShieldCheck className="size-3" /> 质量门</h3>
              <div className="space-y-1">
                {QUALITY_GATES.map((g) => (
                  <div key={g.id} className="flex items-center justify-between rounded bg-white/5 px-2 py-1.5 text-[11px]">
                    <span className="text-slate-300">{g.label}</span>
                    <span className={cn("flex items-center gap-1 font-medium", g.status === "pass" && "text-emerald-400", g.status === "warn" && "text-amber-400", g.status === "fail" && "text-red-400")}>
                      <span className={cn("size-1.5 rounded-full", g.status === "pass" && "bg-emerald-400", g.status === "warn" && "bg-amber-400", g.status === "fail" && "bg-red-400")} />
                      {g.status === "pass" ? "PASS" : g.status === "warn" ? "WARN" : "FAIL"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 中栏：主预览 + 质量栈 + 概念切换 */}
        <main className="min-w-0 p-4">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1219]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="text-xs font-semibold text-slate-300">主预览 · {concept.name}</span>
              <span className="text-[11px] text-slate-500">{audience} · {channel} · {tone}</span>
            </div>
            <div className="relative p-6 md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">CONCEPT {concept.id}</span>
                  <span className="text-[11px] text-slate-500">质量分 {concept.quality}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">{concept.headline}</h2>
                <p className="mt-3 max-w-xl text-sm text-slate-400">{brief.slice(0, 64)}…</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">{style}</span>
                  <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300">{tone}</span>
                  <span className="rounded-md bg-cyan-500/15 px-2.5 py-1 text-xs text-cyan-300">{channel}</span>
                </div>
              </div>
            </div>
            {/* 质量栈条 */}
            <div className="border-t border-white/10 px-4 py-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">质量栈</span>
                <span className="font-mono text-cyan-300">{passedGates}/{QUALITY_GATES.length} · {qualityPct}%</span>
              </div>
              <div className="flex gap-1">
                {QUALITY_GATES.map((g) => (
                  <div key={g.id} className={cn("h-2 flex-1 rounded-sm", g.status === "pass" && "bg-emerald-500/70", g.status === "warn" && "bg-amber-500/70", g.status === "fail" && "bg-red-500/70")} title={g.label} />
                ))}
              </div>
            </div>
          </div>

          {/* 概念切换 */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {CONCEPTS.map((c) => (
              <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                className={cn("rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40", conceptId === c.id ? "border-cyan-500/60 bg-cyan-500/10" : "border-white/10 hover:border-white/25")}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{c.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">Q{c.quality}</span>
                </div>
                <div className="mt-0.5 truncate text-[11px] text-slate-400">{c.headline}</div>
              </button>
            ))}
          </div>
        </main>

        {/* 右侧栏：指标 + Activity */}
        <aside className={cn("border-t border-white/10 bg-[#0d1219] lg:border-l lg:border-t-0", !rightOpen && "hidden lg:block")}>
          <div className="space-y-4 p-4">
            <div>
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">预测指标</h3>
              <div className="space-y-2">
                <CockpitMetric label="Reach" value={metrics.reach.toLocaleString()} pct={Math.min(metrics.reach / 18, 100)} />
                <CockpitMetric label="CTR" value={`${metrics.ctr}%`} pct={metrics.ctr * 16} />
                <CockpitMetric label="Conversion" value={`${metrics.conversion}%`} pct={metrics.conversion * 22} />
              </div>
            </div>
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500"><ActivityIcon className="size-3" /> 操作日志</h3>
              <div className="max-h-[260px] space-y-1 overflow-auto pr-1">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded bg-white/5 px-2 py-1.5 text-[11px]">
                    <span className="shrink-0 font-mono text-slate-500">{a.time}</span>
                    <span className="text-slate-300">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />} 保存
              </Button>
              <Button size="sm" variant="outline" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />} 导出
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* 移动端侧栏折叠按钮 */}
      <div className="flex gap-2 border-t border-white/10 p-2 lg:hidden">
        <button type="button" onClick={() => setLeftOpen((p) => !p)} className="flex-1 rounded-md border border-white/10 bg-white/5 py-2 text-xs text-slate-300">{leftOpen ? "隐藏" : "显示"}控制栏</button>
        <button type="button" onClick={() => setRightOpen((p) => !p)} className="flex-1 rounded-md border border-white/10 bg-white/5 py-2 text-xs text-slate-300">{rightOpen ? "隐藏" : "显示"}指标栏</button>
      </div>
    </div>
  )
}

function CockpitSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 transition-colors hover:border-white/25 focus-visible:border-cyan-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-slate-500 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-md border border-white/10 bg-[#11161f] py-1 shadow-2xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-cyan-500/15 focus-visible:bg-cyan-500/15 focus-visible:outline-none", value === opt ? "font-medium text-cyan-300" : "text-slate-300")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CockpitMetric({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-2.5">
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}
