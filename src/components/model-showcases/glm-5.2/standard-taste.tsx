"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Download,
  Feather,
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
  { id: "A", name: "留白", headline: "少一点，深一点", deck: "把信息收进呼吸里，让品牌自己说话。", reach: 920, ctr: 4.3, conversion: 3.1 },
  { id: "B", name: "质感", headline: "克制的温度", deck: "暖灰与衬线，去掉所有多余的装饰。", reach: 880, ctr: 4.6, conversion: 3.4 },
  { id: "C", name: "节奏", headline: "一段慢下来的叙事", deck: "用排版节奏代替视觉噪音。", reach: 1010, ctr: 4.1, conversion: 2.9 },
]

const AUDIENCES = ["品味消费者", "高端品牌", "文化读者", "设计从业者"]
const CHANNELS = ["品牌官网", "邮件刊物", "慢内容专栏", "纸质物料"]
const TONES = ["沉静", "温润", "克制", "从容"]
const STYLES = ["暖灰", "米白", "墨绿", "陶土"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function StandardTasteShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布撰写一段克制的品牌叙事，去除通用 AI 视觉习惯。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[1])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "载入编辑稿" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 14))
  }, [])

  useEffect(() => { log(`切换章节 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "沉静" ? 1.04 : tone === "温润" ? 1.02 : 1
    const styleMul = style === "米白" ? 1.03 : style === "墨绿" ? 0.98 : 1
    const channelMul = channel === "品牌官网" ? 1.05 : channel === "邮件刊物" ? 0.97 : 1
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

  const palette = useMemo(() => {
    switch (style) {
      case "米白": return { bg: "bg-[#faf7f2]", text: "text-stone-800", accent: "#8a6d3b" }
      case "墨绿": return { bg: "bg-[#f2f5f1]", text: "text-stone-800", accent: "#3f5e4f" }
      case "陶土": return { bg: "bg-[#f5f0ec]", text: "text-stone-800", accent: "#9c5b3a" }
      default: return { bg: "bg-[#f4f1ec]", text: "text-stone-800", accent: "#6b5d4f" }
    }
  }, [style])

  return (
    <div className={cn("min-h-screen", palette.bg, palette.text)}>
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-12 md:py-20">
        {/* 顶栏：极简 */}
        <header className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-stone-300/60 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 font-serif text-xl" style={{ fontFamily: "Georgia, 'Songti SC', serif" }}><Feather className="size-4" /> Muse</span>
            <Badge className="rounded-none bg-stone-800 text-stone-50 hover:bg-stone-700">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-none border-stone-400">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="rounded-none font-serif focus-visible:ring-2 focus-visible:ring-stone-800" onClick={() => runAsync(setGenerateState, "生成")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="ghost" className="rounded-none font-serif focus-visible:ring-2 focus-visible:ring-stone-800" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="ghost" className="rounded-none font-serif focus-visible:ring-2 focus-visible:ring-stone-800" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </header>

        {generateState === "success" && <p className="mb-8 text-sm text-stone-500"><CheckCircle2 className="mr-1 inline size-4" />已生成，可在下方调整。</p>}
        {generateState === "error" && <p className="mb-8 text-sm text-red-700"><XCircle className="mr-1 inline size-4" />生成失败，请重试。</p>}

        <div className="grid gap-12 md:grid-cols-[1fr_280px]">
          {/* 主区：编辑式叙事 */}
          <div className="flex flex-col gap-10">
            <section>
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-stone-400">Campaign Brief</p>
              <Textarea
                value={brief}
                onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 20 === 0) log("更新 Brief") }}
                className="min-h-[80px] resize-y rounded-none border-stone-300 bg-transparent font-serif text-lg leading-relaxed focus-visible:border-stone-800 focus-visible:ring-0"
                style={{ fontFamily: "Georgia, 'Songti SC', serif" }}
                placeholder="写下你的品牌叙事…"
              />
            </section>

            <section className="border-t border-stone-300/60 pt-8">
              <p className="mb-2 text-xs uppercase tracking-[0.4em] text-stone-400">主创意 · {concept.name}</p>
              <h1 className="text-4xl font-normal leading-tight md:text-6xl" style={{ fontFamily: "Georgia, 'Songti SC', serif", color: palette.accent }}>{concept.headline}</h1>
              <p className="mt-5 max-w-xl text-base leading-loose text-stone-600">{concept.deck}</p>
              <p className="mt-4 max-w-xl text-sm leading-loose text-stone-500">{brief}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                <span>面向 · {audience}</span>
                <span>载体 · {channel}</span>
                <span>语气 · {tone}</span>
                <span style={{ color: palette.accent }}>{style}</span>
              </div>
            </section>

            {/* 概念切换：极简文字列表 */}
            <section className="border-t border-stone-300/60 pt-8">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-stone-400">三个方向</p>
              <div className="flex flex-col gap-1">
                {CONCEPTS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setConceptId(c.id)}
                    className={cn("group flex items-baseline gap-4 border-b border-stone-200 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-800", conceptId === c.id && "border-stone-800")}
                  >
                    <span className="font-mono text-xs text-stone-400">{c.id}</span>
                    <span className="font-serif text-lg" style={{ fontFamily: "Georgia, 'Songti SC', serif", color: conceptId === c.id ? palette.accent : undefined }}>{c.name}</span>
                    <span className={cn("text-sm", conceptId === c.id ? "text-stone-700" : "text-stone-400")}>— {c.headline}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 侧栏：控件 + 指标 + Activity */}
          <aside className="flex flex-col gap-8">
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-stone-400">参数</p>
              <div className="flex flex-col gap-4">
                <TasteSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} accent={palette.accent} />
                <TasteSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} accent={palette.accent} />
                <TasteSelect label="语气" value={tone} options={TONES} onChange={setTone} accent={palette.accent} />
                <TasteSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} accent={palette.accent} />
              </div>
            </section>

            <section className="border-t border-stone-300/60 pt-6">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-stone-400">预测</p>
              <div className="flex flex-col gap-3">
                <TasteMetric label="Reach" value={metrics.reach.toLocaleString()} accent={palette.accent} />
                <TasteMetric label="CTR" value={`${metrics.ctr}%`} accent={palette.accent} />
                <TasteMetric label="Conversion" value={`${metrics.conversion}%`} accent={palette.accent} />
              </div>
            </section>

            <section className="border-t border-stone-300/60 pt-6">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-stone-400">记录</p>
              <div className="max-h-[200px] space-y-1.5 overflow-auto">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 py-1 text-xs">
                    <span className="shrink-0 font-mono text-stone-400">{a.time}</span>
                    <span className="text-stone-600">{a.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

function TasteSelect({ label, value, options, onChange, accent }: { label: string; value: string; options: string[]; onChange: (v: string) => void; accent: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-stone-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between border-b border-stone-300 py-1 font-serif text-base transition-colors hover:border-stone-800 focus-visible:border-stone-800 focus-visible:outline-none"
        style={{ fontFamily: "Georgia, 'Songti SC', serif" }}
      >
        <span>{value}</span>
        <span className="text-[10px] text-stone-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full border border-stone-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className="w-full px-3 py-1.5 text-left font-serif text-sm transition-colors hover:bg-stone-100 focus-visible:bg-stone-100 focus-visible:outline-none"
              style={{ fontFamily: "Georgia, 'Songti SC', serif", color: value === opt ? accent : undefined }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TasteMetric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-stone-200 pb-1.5">
      <span className="text-xs uppercase tracking-[0.2em] text-stone-400">{label}</span>
      <span className="font-serif text-xl" style={{ fontFamily: "Georgia, 'Songti SC', serif", color: accent }}>{value}</span>
    </div>
  )
}
