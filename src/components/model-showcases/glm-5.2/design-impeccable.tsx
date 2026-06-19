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

interface Concept {
  id: ConceptId
  edition: string
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
  { id: "A", edition: "Edition Ⅰ", headline: "以秩序承载新品发布", deck: "用严格列与精确留白，让创意总监的判断成为版面主角。", reach: 1410, ctr: 4.8, conversion: 3.4 },
  { id: "B", edition: "Edition Ⅱ", headline: "把发布写成一篇社论", deck: "编辑式层级与衬线标题，赋予营销活动以读物的分量。", reach: 1330, ctr: 5.2, conversion: 3.6 },
  { id: "C", edition: "Edition Ⅲ", headline: "让数据成为封面", deck: "指标前置、证据成栏，理性布局配高级质感。", reach: 1490, ctr: 4.6, conversion: 4.0 },
]

const AUDIENCES = ["资深读者", "品牌主", "创意总监", "市场负责人"]
const CHANNELS = ["专题页", "Newsletter", "社媒长图", "开屏"]
const TONES = ["克制", "理性", "优雅", "笃定"]
const STYLES = ["社论", "档案", "图鉴", "年刊"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function DesignImpeccableShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布打造严格列 + 精致 polish 的编辑式页面：硬网格、精炼字体、精确对比。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "编辑式版面就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换 ${concept.edition}`) }, [conceptId, concept.edition, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "笃定" ? 1.06 : tone === "优雅" ? 1.04 : 1
    const channelMul = channel === "专题页" ? 1.1 : channel === "Newsletter" ? 0.92 : 1
    const styleMul = style === "年刊" ? 1.06 : style === "图鉴" ? 0.97 : 1
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
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900">
      {/* 报头 */}
      <header className="border-b border-stone-300 px-5 py-4 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-serif text-2xl font-bold tracking-tight md:text-3xl" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}>Muse · Editorial</h1>
            <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500">Vol. 5 · GLM 5.2</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-sm bg-emerald-800 text-[#f7f5f0] hover:bg-emerald-700">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-sm border-stone-400 text-stone-600">{item.skillChainLabel}</Badge>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-3">
          <p className="max-w-xl font-serif text-sm italic text-stone-500" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}>{concept.edition} — {concept.deck}</p>
          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-sm bg-emerald-800 text-[#f7f5f0] hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-600/40" onClick={() => runAsync(setGenerateState, "生成版面")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="rounded-sm border-stone-400 bg-transparent text-stone-700 hover:bg-stone-200 focus-visible:ring-2 focus-visible:ring-stone-400/40" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-700" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="rounded-sm border-stone-400 bg-transparent text-stone-700 hover:bg-stone-200 focus-visible:ring-2 focus-visible:ring-stone-400/40" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-700" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <div className="border-b border-emerald-300 bg-emerald-50 px-5 py-2 text-sm text-emerald-800 md:px-10"><CheckCircle2 className="mr-1 inline size-4" />版面已生成，校样已通过。</div>}
      {generateState === "error" && <div className="border-b border-red-300 bg-red-50 px-5 py-2 text-sm text-red-800 md:px-10"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</div>}

      {/* 严格列网格：可见列分隔线 */}
      <div className="grid grid-cols-1 gap-0 px-5 py-6 md:grid-cols-12 md:px-10">
        {/* §01 Brief — 左窄列 */}
        <section className="border-stone-200 pb-6 md:col-span-3 md:border-r md:pr-6 md:pb-0">
          <SectionLabel num="01" title="Campaign Brief" />
          <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[96px] resize-y rounded-sm border-stone-300 bg-white text-sm text-stone-800 focus-visible:border-emerald-700 focus-visible:ring-emerald-700/20" placeholder="撰写本期主旨…" />
          <p className="mt-2 font-serif text-xs italic text-stone-500" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}>编辑提示：Brief 决定本期立意与版面重心。</p>

          <div className="mt-6">
            <SectionLabel num="03" title="参数" />
            <div className="space-y-3">
              <EditorialSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
              <EditorialSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
              <EditorialSelect label="语气" value={tone} options={TONES} onChange={setTone} />
              <EditorialSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
            </div>
          </div>
        </section>

        {/* §02 主版面 — 中宽列 */}
        <section className="border-stone-200 py-6 md:col-span-6 md:border-r md:px-6 md:py-0">
          <SectionLabel num="02" title="主版面" />
          <article className="border border-stone-200 bg-white p-5 md:p-7">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-stone-400">
              <span>{concept.edition}</span>
              <span>{audience} · {channel}</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-[1.1] text-stone-900 md:text-5xl" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}>{concept.headline}</h2>
            <div className="my-4 h-px w-16 bg-emerald-800" />
            <p className="font-serif text-base leading-relaxed text-stone-600 md:text-lg" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}>{concept.deck} {brief.slice(0, 50)}…</p>
            <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-stone-200 bg-stone-200">
              <div className="bg-white p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">Reach</div>
                <div className="mt-1 font-serif text-xl font-bold text-stone-900" style={{ fontFamily: "Georgia, serif" }}>{metrics.reach.toLocaleString()}</div>
              </div>
              <div className="bg-white p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">CTR</div>
                <div className="mt-1 font-serif text-xl font-bold text-emerald-800" style={{ fontFamily: "Georgia, serif" }}>{metrics.ctr}%</div>
              </div>
              <div className="bg-white p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">Conv</div>
                <div className="mt-1 font-serif text-xl font-bold text-stone-900" style={{ fontFamily: "Georgia, serif" }}>{metrics.conversion}%</div>
              </div>
            </div>
          </article>

          {/* 版本切换：编辑式选项 */}
          <div className="mt-4">
            <SectionLabel num="04" title="版本" />
            <div className="grid grid-cols-3 gap-2">
              {CONCEPTS.map((c) => (
                <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                  className={cn("rounded-sm border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30", conceptId === c.id ? "border-emerald-800 bg-emerald-50" : "border-stone-300 bg-white hover:border-stone-400")}>
                  <div className="font-serif text-sm font-bold text-stone-900" style={{ fontFamily: "Georgia, serif" }}>{c.edition}</div>
                  <div className="mt-0.5 text-[11px] text-stone-500">{c.headline.slice(0, 8)}…</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* §05 Activity — 右窄列 */}
        <section className="pt-6 md:col-span-3 md:pl-6 md:pt-0">
          <SectionLabel num="05" title="编务日志" />
          <div className="max-h-[360px] space-y-1.5 overflow-auto pr-1">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-2 border-b border-stone-100 pb-1.5 text-xs">
                <span className="shrink-0 font-mono text-stone-400">{a.time}</span>
                <span className="text-stone-600">{a.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="font-serif text-xs font-bold text-emerald-800" style={{ fontFamily: "Georgia, serif" }}>§{num}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{title}</span>
      <span className="h-px flex-1 bg-stone-200" />
    </div>
  )
}

function EditorialSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-stone-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 transition-colors hover:border-stone-400 focus-visible:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-stone-400 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-sm border border-stone-300 bg-white py-1 shadow-xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none", value === opt ? "font-medium text-emerald-800" : "text-stone-700")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
