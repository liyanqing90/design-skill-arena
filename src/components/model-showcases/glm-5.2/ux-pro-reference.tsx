"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
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
  name: string
  headline: string
  reach: number
  ctr: number
  conversion: number
}

interface ActivityEntry {
  id: string
  time: string
  label: string
  status: "ok" | "warn" | "err"
}

const CONCEPTS: Concept[] = [
  { id: "A", name: "路径A·直转化", headline: "三步完成发布到转化", reach: 1180, ctr: 4.9, conversion: 3.4 },
  { id: "B", name: "路径B·教育型", headline: "先理解价值，再引导行动", reach: 980, ctr: 5.3, conversion: 3.8 },
  { id: "C", name: "路径C·社交型", headline: "分享驱动二次传播", reach: 1620, ctr: 4.2, conversion: 2.7 },
]

const AUDIENCES = ["新用户", "回访用户", "高意向用户", "沉睡用户"]
const CHANNELS = ["落地页", "App 引导", "邮件", "推送"]
const TONES = ["引导式", "直接式", "鼓励式", "中性"]
const STYLES = ["规范文档", "流程图", "状态卡", "清单式"]

const STEPS = ["Brief", "受众", "概念", "预览", "导出"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function UxProReferenceShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布设计一条清晰可用的营销路径，覆盖完整状态与可访问性。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "加载 UX 规范", status: "ok" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [currentStep, setCurrentStep] = useState(2)
  const [briefError, setBriefError] = useState<string | null>(null)

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string, status: ActivityEntry["status"] = "ok") => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label, status }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换路径 ${concept.name}`) }, [conceptId, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "直接式" ? 1.06 : tone === "鼓励式" ? 1.03 : 1
    const styleMul = style === "流程图" ? 1.04 : style === "清单式" ? 0.98 : 1
    const channelMul = channel === "落地页" ? 1.07 : channel === "推送" ? 0.93 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); log(`${label} 进行中…`, "warn")
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); log(`${label} 失败`, "err") }
      else { setter("success"); log(`${label} 完成`, "ok") }
      window.setTimeout(() => setter("idle"), 2200)
    }, 900)
  }, [log])

  function handleBriefChange(v: string) {
    setBrief(v)
    if (v.trim().length < 8) { setBriefError("Brief 至少 8 个字符"); if (v.length % 10 === 0) log("Brief 校验未通过", "warn") }
    else { setBriefError(null); if (v.length % 20 === 0) log("Brief 校验通过", "ok") }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 顶栏 */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold"><ClipboardList className="size-4 text-slate-700" /> UX Reference</span>
            <Badge className="rounded-md bg-slate-900 text-white hover:bg-slate-800">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2" onClick={() => runAsync(setGenerateState, "生成方案")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2" onClick={() => runAsync(setExportState, "导出规范", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <Banner kind="success" text="方案已生成，路径与状态已更新。" />}
      {generateState === "error" && <Banner kind="error" text="生成失败，请检查 Brief 后重试。" />}

      <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-6">
        {/* 步骤路径 */}
        <nav aria-label="步骤" className="mb-6 overflow-x-auto">
          <ol className="flex min-w-max items-center gap-1">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(i)}
                  aria-current={currentStep === i ? "step" : undefined}
                  className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900", currentStep === i ? "bg-slate-900 text-white" : i < currentStep ? "text-slate-700 hover:bg-slate-200" : "text-slate-400 hover:bg-slate-100")}
                >
                  <span className={cn("flex size-5 items-center justify-center rounded-full border text-[10px]", currentStep === i ? "border-white" : i < currentStep ? "border-slate-700 text-slate-700" : "border-slate-300")}>{i < currentStep ? "✓" : i + 1}</span>
                  {s}
                </button>
                {i < STEPS.length - 1 && <ArrowRight className="mx-1 size-3 text-slate-300" />}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          {/* 左：主区 */}
          <div className="flex flex-col gap-4">
            {/* Brief + 校验 */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold">Campaign Brief</h3>
                <span className={cn("text-xs", briefError ? "text-red-600" : "text-green-600")}>{briefError ?? "校验通过"}</span>
              </div>
              <Textarea
                value={brief}
                onChange={(e) => handleBriefChange(e.target.value)}
                aria-invalid={!!briefError}
                className={cn("min-h-[80px] resize-y text-sm focus-visible:ring-2 focus-visible:ring-slate-900", briefError && "border-red-400 focus-visible:ring-red-500")}
                placeholder="输入营销目标与核心信息（至少 8 个字符）…"
              />
            </section>

            {/* 流程图主预览 */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold">任务流程 · {concept.name}</h3>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{channel}</span>
              </div>
              {/* 桌面横向流程图 */}
              <div className="hidden items-stretch gap-2 md:flex">
                {["进入", "认知", "兴趣", "行动", "完成"].map((node, i) => (
                  <div key={node} className="flex flex-1 items-center">
                    <div className={cn("flex-1 rounded-lg border p-3 text-center transition-colors", i <= 2 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-600")}>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">step {i + 1}</div>
                      <div className="mt-1 text-sm font-semibold">{node}</div>
                    </div>
                    {i < 4 && <ArrowRight className="mx-1 size-4 shrink-0 text-slate-300" />}
                  </div>
                ))}
              </div>
              {/* 移动端纵向步骤 */}
              <ol className="space-y-2 md:hidden">
                {["进入", "认知", "兴趣", "行动", "完成"].map((node, i) => (
                  <li key={node} className={cn("rounded-lg border p-3", i <= 2 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-600")}>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">step {i + 1}</span>
                    <span className="ml-2 text-sm font-semibold">{node}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">主创意</div>
                <div className="mt-1 text-xl font-bold">{concept.headline}</div>
                <div className="mt-1 text-xs text-slate-500">{audience} · {tone} · {style}</div>
              </div>
            </section>

            {/* 控件 */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-bold">控件</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <UxSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
                <UxSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
                <UxSelect label="语气" value={tone} options={TONES} onChange={setTone} />
                <UxSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
              </div>
            </section>

            {/* 概念切换 */}
            <section className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {CONCEPTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setConceptId(c.id)}
                  aria-pressed={conceptId === c.id}
                  className={cn("rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900", conceptId === c.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-400")}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">{c.id}</div>
                  <div className="mt-1 text-sm font-semibold">{c.name}</div>
                  <div className={cn("mt-1 text-[11px]", conceptId === c.id ? "text-white/70" : "text-slate-500")}>{c.headline}</div>
                </button>
              ))}
            </section>
          </div>

          {/* 右：状态栏 + 指标 + Activity */}
          <aside className="flex flex-col gap-4">
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-bold">状态</h3>
              <div className="flex flex-col gap-2 text-xs">
                <StatusRow label="Brief 校验" state={briefError ? "err" : "ok"} />
                <StatusRow label="生成" state={generateState === "error" ? "err" : generateState === "success" ? "ok" : loading ? "warn" : "ok"} />
                <StatusRow label="保存" state={saveState === "error" ? "err" : saveState === "success" ? "ok" : "ok"} />
                <StatusRow label="导出" state={exportState === "error" ? "err" : exportState === "success" ? "ok" : "ok"} />
                <StatusRow label="可访问性" state="ok" />
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-bold">预测指标</h3>
              <div className="flex flex-col gap-2">
                <UxMetric label="Reach" value={metrics.reach.toLocaleString()} />
                <UxMetric label="CTR" value={`${metrics.ctr}%`} />
                <UxMetric label="Conversion" value={`${metrics.conversion}%`} />
              </div>
              <div className="mt-3 h-1.5 bg-slate-100">
                <div className="h-full bg-slate-900 transition-all duration-700" style={{ width: `${Math.min(metrics.ctr * 16, 100)}%` }} />
              </div>
            </section>

            <section className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-bold">最近操作</h3>
              <div className="max-h-[260px] space-y-1.5 overflow-auto">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded border border-slate-100 px-2 py-1.5 text-xs">
                    <span className="mt-0.5 shrink-0">
                      {a.status === "ok" ? <CheckCircle2 className="size-3 text-green-600" /> : a.status === "warn" ? <AlertCircle className="size-3 text-amber-500" /> : <XCircle className="size-3 text-red-600" />}
                    </span>
                    <span className="shrink-0 text-slate-400">{a.time}</span>
                    <span className="text-slate-700">{a.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

function UxSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm transition-colors hover:border-slate-900 focus-visible:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
      >
        <span className="truncate">{value}</span>
        <span className="text-slate-400">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none", value === opt ? "font-bold text-slate-900" : "text-slate-700")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function UxMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-base font-bold text-slate-900">{value}</span>
    </div>
  )
}

function StatusRow({ label, state }: { label: string; state: "ok" | "warn" | "err" }) {
  return (
    <div className="flex items-center justify-between rounded border border-slate-100 px-2 py-1.5">
      <span className="text-slate-600">{label}</span>
      <span className="flex items-center gap-1">
        {state === "ok" ? <CheckCircle2 className="size-3 text-green-600" /> : state === "warn" ? <AlertCircle className="size-3 text-amber-500" /> : <XCircle className="size-3 text-red-600" />}
        <span className={cn(state === "ok" ? "text-green-700" : state === "warn" ? "text-amber-700" : "text-red-700")}>{state === "ok" ? "正常" : state === "warn" ? "进行中" : "异常"}</span>
      </span>
    </div>
  )
}

function Banner({ kind, text }: { kind: "success" | "error"; text: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-4 py-2 text-sm md:px-6", kind === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>
      {kind === "success" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />} {text}
    </div>
  )
}
