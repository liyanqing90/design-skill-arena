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
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"

interface Concept {
  id: ConceptId
  no: string
  name: string
  headline: string
  deck: string
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
  { id: "A", no: "01", name: "秩序", headline: "用网格讲清一个新品", deck: "信息按列流动，留白即节奏。", reach: 980, ctr: 4.1, conversion: 2.9 },
  { id: "B", no: "02", name: "对比", headline: "大字与小字的对话", deck: "字号差即层级差，视线被引导。", reach: 1120, ctr: 4.6, conversion: 3.3 },
  { id: "C", no: "03", name: "节奏", headline: "三段式叙事结构", deck: "起、承、转，每段一个动作。", reach: 860, ctr: 4.8, conversion: 3.6 },
]

const AUDIENCES = ["编辑读者", "设计从业者", "品牌决策者", "大众消费者"]
const CHANNELS = ["专题落地页", "邮件刊物", "杂志内页", "社媒长图"]
const TONES = ["冷静客观", "克制抒情", "锋利直陈", "温和叙事"]
const STYLES = ["黑白印刷", "红黑双色", "米白衬线", "灰阶网格"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function DesignLogicShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 撰写一篇编辑式新品发布稿，用网格与排版承担信息层级。")
  const [audience, setAudience] = useState(AUDIENCES[1])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[2])
  const [style, setStyle] = useState(STYLES[1])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "载入编辑网格" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 14))
  }, [])

  useEffect(() => { log(`切换章节 ${concept.no} · ${concept.name}`) }, [conceptId, concept.no, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "锋利直陈" ? 1.07 : tone === "温和叙事" ? 0.97 : 1
    const styleMul = style === "红黑双色" ? 1.05 : style === "灰阶网格" ? 0.98 : 1
    const channelMul = channel === "专题落地页" ? 1.06 : channel === "邮件刊物" ? 0.96 : 1
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
    }, 900)
  }, [log])

  const accent = style === "红黑双色" ? "#e11d48" : style === "米白衬线" ? "#92400e" : "#111111"

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* 顶部刊头 */}
      <header className="border-b-2 border-neutral-900">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 px-4 py-3 md:px-8">
          <div className="col-span-12 flex flex-wrap items-center justify-between gap-2 md:col-span-8">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black tracking-tight">MUSE</span>
              <span className="text-xs uppercase tracking-[0.4em] text-neutral-500">Campaign Studio</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-none bg-neutral-900 text-white hover:bg-neutral-800">GLM 5.2</Badge>
              <Badge variant="outline" className="rounded-none border-neutral-900">{item.skillChainLabel}</Badge>
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-end gap-2 md:col-span-4">
            <Button size="sm" className="rounded-none bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2" onClick={() => runAsync(setGenerateState, "生成稿件")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="rounded-none border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2" onClick={() => runAsync(setSaveState, "存档", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Save className="mr-1 size-4" />} 存档
            </Button>
            <Button size="sm" variant="outline" className="rounded-none border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2" onClick={() => runAsync(setExportState, "导出排版", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && (
        <div className="border-b border-emerald-700 bg-emerald-50 px-4 py-2 text-sm text-emerald-900 md:px-8">
          <CheckCircle2 className="mr-1 inline size-4" /> 稿件已生成，可在下方调整章节。
        </div>
      )}
      {generateState === "error" && (
        <div className="border-b border-red-700 bg-red-50 px-4 py-2 text-sm text-red-900 md:px-8">
          <XCircle className="mr-1 inline size-4" /> 生成失败，请重试。
        </div>
      )}

      <main className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 px-4 py-6 md:px-8">
        {/* 左栏：编辑控件 */}
        <aside className="col-span-12 flex flex-col gap-4 md:col-span-3">
          <section className="border border-neutral-300 bg-white p-4">
            <h3 className="mb-3 border-b border-neutral-300 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">§ Brief</h3>
            <Textarea
              value={brief}
              onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 20 === 0) log("更新 Brief") }}
              className="min-h-[100px] resize-y rounded-none border-neutral-300 text-sm focus-visible:ring-1 focus-visible:ring-neutral-900"
              placeholder="撰写编辑主旨…"
            />
          </section>
          <section className="border border-neutral-300 bg-white p-4">
            <h3 className="mb-3 border-b border-neutral-300 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">§ 参数</h3>
            <div className="flex flex-col gap-3">
              <EditorSelect label="读者" value={audience} options={AUDIENCES} onChange={setAudience} accent={accent} />
              <EditorSelect label="载体" value={channel} options={CHANNELS} onChange={setChannel} accent={accent} />
              <EditorSelect label="语气" value={tone} options={TONES} onChange={setTone} accent={accent} />
              <EditorSelect label="排版" value={style} options={STYLES} onChange={setStyle} accent={accent} />
            </div>
          </section>
        </aside>

        {/* 中栏：主排版预览（12 列可见网格） */}
        <section className="col-span-12 md:col-span-6">
          <div className="relative border border-neutral-300 bg-white p-5 md:p-8">
            {/* 可见网格线 */}
            <div className="pointer-events-none absolute inset-5 hidden grid-cols-12 gap-4 md:grid md:inset-8">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="border-l border-dashed border-neutral-200 first:border-l-0" />
              ))}
            </div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                <span style={{ color: accent }}>●</span> 章节 {concept.no} / {concept.name} · {channel}
              </div>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl" style={style === "米白衬线" ? { fontFamily: "Georgia, serif" } : undefined}>
                {concept.headline}
              </h1>
              <p className="mt-4 max-w-md text-sm text-neutral-600 md:text-base">{concept.deck}</p>
              <p className="mt-3 max-w-lg text-xs leading-relaxed text-neutral-500">{brief}</p>
              <div className="mt-6 grid grid-cols-12 gap-4 border-t border-neutral-300 pt-4">
                <div className="col-span-12 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 md:col-span-3">面向</div>
                <div className="col-span-12 text-sm md:col-span-9">{audience} · {tone}</div>
                <div className="col-span-12 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 md:col-span-3">载体</div>
                <div className="col-span-12 text-sm md:col-span-9">{channel}</div>
                <div className="col-span-12 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 md:col-span-3">排版</div>
                <div className="col-span-12 text-sm md:col-span-9" style={{ color: accent }}>{style}</div>
              </div>
            </div>
          </div>

          {/* 章节切换 */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setConceptId(c.id)}
                className={`group border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                  conceptId === c.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white hover:border-neutral-900"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">{c.no}</div>
                <div className="mt-1 text-sm font-bold">{c.name}</div>
                <div className={`mt-1 text-[11px] ${conceptId === c.id ? "text-white/70" : "text-neutral-500"}`}>{c.headline}</div>
              </button>
            ))}
          </div>
        </section>

        {/* 右栏：指标 + Activity */}
        <aside className="col-span-12 flex flex-col gap-4 md:col-span-3">
          <section className="border border-neutral-300 bg-white p-4">
            <h3 className="mb-3 border-b border-neutral-300 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">§ 预测</h3>
            <div className="flex flex-col gap-3">
              <EditorMetric label="Reach" value={metrics.reach.toLocaleString()} accent={accent} />
              <EditorMetric label="CTR" value={`${metrics.ctr}%`} accent={accent} />
              <EditorMetric label="Conversion" value={`${metrics.conversion}%`} accent={accent} />
            </div>
            <div className="mt-3 h-1.5 w-full bg-neutral-200">
              <div className="h-full transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%`, background: accent }} />
            </div>
          </section>
          <section className="border border-neutral-300 bg-white p-4">
            <h3 className="mb-3 border-b border-neutral-300 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">§ 操作记录</h3>
            <div className="max-h-[260px] space-y-1.5 overflow-auto">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-2 border-b border-neutral-100 py-1 text-xs last:border-0">
                  <span className="shrink-0 font-mono text-neutral-400">{a.time}</span>
                  <span className="text-neutral-700">{a.label}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}

function EditorSelect({ label, value, options, onChange, accent }: { label: string; value: string; options: string[]; onChange: (v: string) => void; accent: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between border-b-2 border-neutral-300 py-1 text-sm transition-colors hover:border-neutral-900 focus-visible:border-neutral-900 focus-visible:outline-none"
        style={open ? { borderBottomColor: accent } : undefined}
      >
        <span>{value}</span>
        <span className="text-[10px] text-neutral-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full border border-neutral-300 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none ${value === opt ? "font-bold" : ""}`}
              style={value === opt ? { color: accent } : undefined}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EditorMetric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-neutral-100 pb-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">{label}</span>
      <span className="text-xl font-black" style={{ color: accent }}>{value}</span>
    </div>
  )
}
