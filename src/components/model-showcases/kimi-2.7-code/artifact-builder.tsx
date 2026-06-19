"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Box,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Download,
  Layers,
  LayoutTemplate,
  Loader2,
  Save,
  Sparkles,
  Terminal,
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
  title: string
  description: string
  accent: string
  stack: string[]
  reach: number
  ctr: number
  conversion: number
}

type Activity = { id: string; time: string; label: string }

const concepts: Concept[] = [
  {
    id: "A",
    name: "交互仪表盘",
    title: "Campaign Dashboard",
    description: "一个可交互的数据仪表盘 Artifact，实时展示 Reach、CTR 与 Conversion 趋势。",
    accent: "bg-blue-600",
    stack: ["React", "Recharts", "Tailwind", "shadcn/ui"],
    reach: 1560,
    ctr: 5.2,
    conversion: 3.4,
  },
  {
    id: "B",
    name: "营销落地页",
    title: "Landing Page Kit",
    description: "包含 Hero、Features、Pricing 与 CTA 区块的完整落地页 Artifact。",
    accent: "bg-emerald-600",
    stack: ["Next.js", "Framer Motion", "Tailwind", "Lucide"],
    reach: 1840,
    ctr: 4.8,
    conversion: 3.7,
  },
  {
    id: "C",
    name: "组件库展示",
    title: "Component Gallery",
    description: "一套可复用的按钮、卡片、表单与弹窗组件 Artifact，附带文档与示例。",
    accent: "bg-violet-600",
    stack: ["Storybook", "TypeScript", "Tailwind", "Radix"],
    reach: 1320,
    ctr: 5.5,
    conversion: 3.2,
  },
]

const audiences = ["全栈开发者", "前端架构师", "技术博主", "创业团队"]
const channels = ["文档站点", "GitHub README", "技术博客", "产品官网"]
const tones = ["教程式", "工程式", "探索式", "清单式"]
const styles = ["代码优先", "图文混排", "步骤引导", "API 风格"]

export function ArtifactBuilderShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 生成一个可运行的营销 Artifact，展示从需求到代码的完整交付。"
  )
  const [audience, setAudience] = useState(audiences[0])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<ConceptKey>("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "Artifact Studio 初始化" },
    { id: "deps", time: now(), label: "依赖解析完成" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ code: true, preview: true, export: false })

  const concept = useMemo(() => concepts.find((c) => c.id === conceptId) ?? concepts[0], [conceptId])

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`切换 Artifact 概念 ${concept.id} · ${concept.name}`)
  }, [concept, conceptId, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const audienceMultiplier = audience === "技术博主" ? 1.1 : audience === "创业团队" ? 1.06 : 1
    const channelMultiplier = channel === "GitHub README" ? 1.08 : channel === "产品官网" ? 1.05 : 1
    const toneMultiplier = tone === "教程式" ? 1.04 : tone === "清单式" ? 1.03 : 1
    const styleMultiplier = style === "代码优先" ? 1.05 : style === "API 风格" ? 1.03 : 1
    return {
      reach: Math.round(base.reach * audienceMultiplier * channelMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, audience, channel, tone, style])

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
        setTimeout(() => setter("idle"), 2400)
      }, 1000)
    },
    [log]
  )

  const generatedCode = useMemo(
    () =>
      `export function ${concept.title.replace(/\s/g, "")}() {
  return (
    <section className="p-8 bg-slate-50">
      <h1 className="text-3xl font-bold">${concept.title}</h1>
      <p className="mt-2 text-slate-600">${concept.description}</p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        ${["Reach", "CTR", "Conversion"]
          .map(
            (m) => `<Card key="${m}" className="p-4">
          <div className="text-sm text-slate-500">${m}</div>
          <div className="text-2xl font-semibold">—</div>
        </Card>`
          )
          .join("\n        ")}
      </div>
    </section>
  )
}`,
    [concept]
  )

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[300px_1fr_340px]">
        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-md bg-slate-900 text-white hover:bg-slate-800">Kimi 2.7 Code</Badge>
                <Badge variant="outline" className="rounded-md">
                  {item.skillChainLabel || "artifacts-builder"}
                </Badge>
              </div>
              <CardTitle className="pt-2 text-lg">Artifact Builder</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              把 Campaign 需求直接编译成可运行的单页 Artifact，支持代码与预览双视图。
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <LayoutTemplate className="size-4" />
                Artifact 配置
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ArtifactSelect label="目标人群" value={audience} options={audiences} onChange={setAudience} icon={<Box className="size-4" />} />
              <ArtifactSelect label="渠道" value={channel} options={channels} onChange={setChannel} icon={<Layers className="size-4" />} />
              <ArtifactSelect label="语气" value={tone} options={tones} onChange={setTone} icon={<Code2 className="size-4" />} />
              <ArtifactSelect label="视觉风格" value={style} options={styles} onChange={setStyle} icon={<Terminal className="size-4" />} />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 26 === 0) log("编辑 Brief")
                }}
                className="min-h-[120px] resize-y text-sm"
                placeholder="描述你想生成的 Artifact…"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {concepts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:ring-3 focus-visible:ring-blue-500/50 ${
                    conceptId === c.id
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <span className="flex size-5 items-center justify-center rounded border border-current text-xs">{c.id}</span>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setGenerateState, "生成 Artifact")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />}
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setSaveState, "保存版本", 0.1)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-blue-500/50"
                onClick={() => runAsync(setExportState, "导出 ZIP", 0.05)}
                disabled={loading}
              >
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
              <CheckCircle2 className="size-4" /> Artifact 生成完成，代码与预览已同步。
            </div>
          )}
          {generateState === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <XCircle className="size-4" /> 生成失败，依赖解析出错。
            </div>
          )}

          <Card className="relative flex-1 overflow-hidden border-slate-200 bg-white">
            <div className="absolute left-1/2 top-0 h-full w-px bg-slate-100" />
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  {[
                    { rotate: "-6deg", z: 30, opacity: "opacity-60", y: 24, scale: "scale-90" },
                    { rotate: "-3deg", z: 20, opacity: "opacity-80", y: 12, scale: "scale-95" },
                    { rotate: "0deg", z: 10, opacity: "opacity-100", y: 0, scale: "scale-100" },
                  ].map((layer, i) => (
                    <div
                      key={i}
                      className={`absolute left-0 right-0 ${layer.opacity} transition-transform duration-500 hover:scale-[1.02]`}
                      style={{
                        transform: `rotate(${layer.rotate}) translateY(${layer.y}px) ${layer.scale}`,
                        zIndex: layer.z,
                      }}
                    >
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                        <div className="mb-3 flex items-center gap-2">
                          <div className={`size-3 rounded-full ${concept.accent}`} />
                          <span className="text-xs font-semibold text-slate-500">{concept.title} · v{3 - i}.0</span>
                        </div>
                        <div className="h-2 w-3/4 rounded bg-slate-100" />
                        <div className="mt-2 h-2 w-1/2 rounded bg-slate-100" />
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((n) => (
                            <div key={n} className="h-10 rounded bg-slate-50" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="invisible rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`size-3 rounded-full ${concept.accent}`} />
                      <span className="text-xs font-semibold text-slate-500">{concept.title}</span>
                    </div>
                    <div className="h-2 w-3/4 rounded bg-slate-100" />
                    <div className="mt-2 h-2 w-1/2 rounded bg-slate-100" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="h-10 rounded bg-slate-50" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {concept.stack.map((tech) => (
                  <span key={tech} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex-1 space-y-3">
                <Collapsible
                  title="预览"
                  open={expanded.preview}
                  onToggle={() => setExpanded((p) => ({ ...p, preview: !p.preview }))}
                >
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">{concept.title}</span>
                      <Badge variant="secondary" className="text-xs">{audience}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{concept.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        { label: "Reach", value: metrics.reach },
                        { label: "CTR", value: `${metrics.ctr}%` },
                        { label: "CVR", value: `${metrics.conversion}%` },
                      ].map((m) => (
                        <div key={m.label} className="rounded-lg bg-white p-3 text-center shadow-sm">
                          <div className="text-xs text-slate-500">{m.label}</div>
                          <div className="text-lg font-semibold text-slate-900">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapsible>

                <Collapsible
                  title="代码"
                  open={expanded.code}
                  onToggle={() => setExpanded((p) => ({ ...p, code: !p.code }))}
                >
                  <div className="relative rounded-lg border border-slate-200 bg-slate-950 p-4">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(generatedCode)
                        log("复制代码到剪贴板")
                      }}
                      className="absolute right-2 top-2 rounded-md border border-slate-700 bg-slate-900 p-1.5 text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                      <Copy className="size-4" />
                    </button>
                    <pre className="overflow-x-auto text-xs leading-relaxed text-slate-300">
                      <code>{generatedCode}</code>
                    </pre>
                  </div>
                </Collapsible>

                <Collapsible
                  title="导出结果"
                  open={expanded.export}
                  onToggle={() => setExpanded((p) => ({ ...p, export: !p.export }))}
                >
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    {exportState === "success" ? (
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle2 className="size-4" />
                        {concept.title}.zip 已准备就绪（{concept.stack.length} 个文件）
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">点击“导出”按钮生成 {concept.title}.zip</div>
                    )}
                  </div>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Terminal className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Metric label="Reach" value={metrics.reach.toLocaleString()} />
              <Metric label="CTR" value={`${metrics.ctr}%`} />
              <Metric label="Conversion" value={`${metrics.conversion}%`} />
            </CardContent>
          </Card>

          <Card className="flex-1 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[320px] space-y-2 overflow-auto pr-1">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                  >
                    <span className="shrink-0 text-xs text-slate-400">{a.time}</span>
                    <span className="text-slate-700">{a.label}</span>
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

function ArtifactSelect({
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
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/50"
      >
        {value}
        <ChevronDown className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:bg-blue-50 focus-visible:outline-none ${
                value === opt ? "bg-blue-50 font-medium text-blue-700" : "text-slate-700"
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

function Collapsible({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        {title}
        <ChevronDown className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-slate-100 p-4">{children}</div>}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}
