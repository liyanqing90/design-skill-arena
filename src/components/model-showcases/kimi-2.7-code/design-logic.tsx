"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlignLeft,
  Box,
  CheckCircle2,
  Download,
  Grid,
  Hash,
  Layers,
  Loader2,
  Save,
  Sparkles,
  Type,
  XCircle,
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
  layout: "classic" | "asymmetric" | "stacked"
  reach: number
  ctr: number
  conversion: number
}

type Activity = { id: string; time: string; label: string }

const concepts: Concept[] = [
  {
    id: "A",
    name: "经典网格",
    headline: "秩序制造可读性",
    body: "基于 12 列网格的严谨排版，让信息层级一目了然。",
    layout: "classic",
    reach: 780,
    ctr: 4.0,
    conversion: 3.1,
  },
  {
    id: "B",
    name: "非对称张力",
    headline: "比例激发注意力",
    body: "通过 2:1 的非对称分栏与红色点缀形成视觉锚点。",
    layout: "asymmetric",
    reach: 830,
    ctr: 4.5,
    conversion: 2.9,
  },
  {
    id: "C",
    name: "垂直堆叠",
    headline: "层级引导浏览",
    body: "大号标题、中号说明、小号标签依次堆叠，节奏分明。",
    layout: "stacked",
    reach: 760,
    ctr: 4.2,
    conversion: 3.0,
  },
]

const audiences = ["字体爱好者", "编辑设计师", "建筑系学生", "极简主义者"]
const channels = ["画册", "展览海报", "网页首屏", "电子杂志"]
const tones = ["冷静客观", "尖锐批判", "理性诗意", "克制内敛"]
const styles = ["黑白红", "纯黑留白", "灰阶克制", "红章点睛"]

export function DesignLogicShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 设计一版瑞士风格编辑版面，用网格、比例与字体层级传达代码的结构之美。"
  )
  const [audience, setAudience] = useState(audiences[0])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<ConceptKey>("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "初始化编辑网格系统" },
    { id: "baseline", time: now(), label: "基线网格 8pt 对齐" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")

  const concept = useMemo(() => concepts.find((c) => c.id === conceptId) ?? concepts[0], [conceptId])

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`切换版式概念 ${concept.id} · ${concept.name}`)
  }, [concept, conceptId, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const layoutMultiplier = concept.layout === "asymmetric" ? 1.04 : 1
    const toneMultiplier = tone === "尖锐批判" ? 1.05 : tone === "冷静客观" ? 1.02 : 1
    const styleMultiplier = style === "红章点睛" ? 1.03 : style === "黑白红" ? 1.02 : 1
    return {
      reach: Math.round(base.reach * layoutMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, tone, style])

  useEffect(() => {
    log(`参数更新：${audience} / ${channel} / ${tone} / ${style}`)
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
          log(`${label} 失败`)
        } else {
          setter("success")
          log(`${label} 完成`)
        }
        setTimeout(() => setter("idle"), 2300)
      }, 950)
    },
    [log]
  )

  const accentColor = style === "红章点睛" ? "bg-red-600" : style === "纯黑留白" ? "bg-black" : "bg-red-600"
  const borderColor = "border-black"

  return (
    <div className="min-h-screen bg-white p-4 font-mono text-black md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[260px_1fr_280px]">
        <div className="flex flex-col gap-4">
          <Card className="rounded-none border-2 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-none border border-black bg-black text-white hover:bg-black">Kimi 2.7 Code</Badge>
                <Badge variant="outline" className="rounded-none border-black text-black">
                  {item.skillChainLabel || "frontend-design"}
                </Badge>
              </div>
              <CardTitle className="pt-2 text-lg uppercase tracking-tight">Design Logic</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-black/70">
              以网格、比例与字体层级驱动创意，所有元素严格对齐 8pt 基线。
            </CardContent>
          </Card>

          <Card className="rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Grid className="size-4" />
                参数
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <EditorialSelect label="目标人群" value={audience} options={audiences} onChange={setAudience} icon={<Box className="size-4" />} />
              <EditorialSelect label="渠道" value={channel} options={channels} onChange={setChannel} icon={<Layers className="size-4" />} />
              <EditorialSelect label="语气" value={tone} options={tones} onChange={setTone} icon={<Type className="size-4" />} />
              <EditorialSelect label="视觉风格" value={style} options={styles} onChange={setStyle} icon={<Hash className="size-4" />} />
            </CardContent>
          </Card>

          <Card className="rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 22 === 0) log("编辑 Brief")
                }}
                className="min-h-[120px] resize-y rounded-none border-2 border-black text-sm focus-visible:ring-black/30"
                placeholder="输入设计目标…"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  className={`flex items-center gap-2 border-2 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600/30 ${
                    conceptId === c.id
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black/5"
                  }`}
                >
                  <span className="flex size-5 items-center justify-center border border-current text-xs">{c.id}</span>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="rounded-none border-2 border-black bg-red-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-red-600/30"
                onClick={() => runAsync(setGenerateState, "生成版式")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />}
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-none border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black/5 focus-visible:ring-4 focus-visible:ring-red-600/30"
                onClick={() => runAsync(setSaveState, "保存版式", 0.1)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-black" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-none border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black/5 focus-visible:ring-4 focus-visible:ring-red-600/30"
                onClick={() => runAsync(setExportState, "导出 PDF", 0.05)}
                disabled={loading}
              >
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-black" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "success" && (
            <div className="flex items-center gap-2 border-2 border-black bg-black px-3 py-2 text-sm text-white shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
              <CheckCircle2 className="size-4" /> 版式已生成，网格与字体层级已应用。
            </div>
          )}
          {generateState === "error" && (
            <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-sm text-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <XCircle className="size-4" /> 版式生成失败，请重试。
            </div>
          )}

          <Card className="relative flex-1 overflow-hidden rounded-none border-2 border-black bg-white p-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
              <div className="absolute left-1/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-2/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-3/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-4/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-5/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-6/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-7/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-8/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-9/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-10/12 top-0 h-full w-px bg-black" />
              <div className="absolute left-11/12 top-0 h-full w-px bg-black" />
            </div>
            <CardContent className="relative z-10 flex h-full flex-col p-6 md:p-10">
              <div className="mb-6 flex items-center justify-between border-b-2 border-black pb-2">
                <span className="text-xs font-bold uppercase tracking-widest">{channel}</span>
                <span className="text-xs font-bold">{audience}</span>
              </div>

              {concept.layout === "classic" && (
                <div className="grid flex-1 grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">01 / 主标题</div>
                    <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">{concept.headline}</h2>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">02 / 副标题</div>
                    <p className="text-sm leading-relaxed text-black/80">{concept.body}</p>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">03 / 标签</div>
                    <div className="flex flex-wrap gap-2">
                      {[style, tone, concept.name].map((tag) => (
                        <span key={tag} className="border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 mt-auto flex items-end justify-between border-t-2 border-black pt-4">
                    <div className={`h-3 w-24 ${accentColor}`} />
                    <span className="text-xs font-bold">Kimi 2.7 Code</span>
                  </div>
                </div>
              )}

              {concept.layout === "asymmetric" && (
                <div className="grid flex-1 grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-8">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">01</div>
                    <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tight md:text-7xl">
                      {concept.headline.split(" ")[0]}
                      <br />
                      {concept.headline.split(" ").slice(1).join(" ")}
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:row-span-2">
                    <div className="flex h-full flex-col justify-between border-l-2 border-black pl-4 md:pl-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-red-600">02</div>
                      <p className="text-sm leading-relaxed text-black/80">{concept.body}</p>
                      <div className={`mt-4 h-16 w-full ${accentColor}`} />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-600">03</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[style, tone, concept.name].map((tag) => (
                        <span key={tag} className="border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 mt-auto flex items-end justify-between border-t-2 border-black pt-4">
                    <span className="text-xs font-bold">{channel}</span>
                    <span className="text-xs font-bold">{audience}</span>
                  </div>
                </div>
              )}

              {concept.layout === "stacked" && (
                <div className="flex flex-1 flex-col gap-6">
                  <div>
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">01 / 标签</div>
                    <div className="flex flex-wrap gap-2">
                      {[channel, audience, style].map((tag) => (
                        <span key={tag} className="border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">02 / 主标题</div>
                    <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">{concept.headline}</h2>
                  </div>
                  <div className="max-w-xl">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600">03 / 正文</div>
                    <p className="text-base leading-relaxed text-black/80">{concept.body}</p>
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t-2 border-black pt-4">
                    <div className={`h-4 w-32 ${accentColor}`} />
                    <span className="text-xs font-bold">Concept {concept.id}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlignLeft className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Metric label="Reach" value={metrics.reach.toLocaleString()} />
              <Metric label="CTR" value={`${metrics.ctr}%`} />
              <Metric label="Conversion" value={`${metrics.conversion}%`} />
            </CardContent>
          </Card>

          <Card className="flex-1 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] space-y-1 overflow-auto">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 border-b border-black/10 px-1 py-2 text-sm transition-colors hover:bg-black/5"
                  >
                    <span className="shrink-0 text-xs font-bold text-red-600">{a.time}</span>
                    <span className="text-black/80">{a.label}</span>
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

function EditorialSelect({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  icon: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black/60">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between border-2 border-black bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600/30"
      >
        {value}
        <svg className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full border-2 border-black bg-white py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm font-bold transition-colors hover:bg-black/5 focus-visible:bg-black/5 focus-visible:outline-none ${
                value === opt ? "bg-black text-white" : "text-black"
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-2 border-black px-3 py-2">
      <span className="text-xs font-bold uppercase tracking-widest text-black/60">{label}</span>
      <span className="text-lg font-black">{value}</span>
    </div>
  )
}
