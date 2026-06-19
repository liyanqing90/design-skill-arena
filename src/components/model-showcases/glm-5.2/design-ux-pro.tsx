"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CheckCircle2,
  Compass,
  Download,
  Loader2,
  Ruler,
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
  code: string
  name: string
  layout: string
  annotation: string
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
  { id: "A", code: "BP-01", name: "中轴对称", layout: "中心标题 + 两侧证据栏 + 底部 CTA", annotation: "主视觉居中，证据左 3 右 3，CTA 锚定底部基线", reach: 1390, ctr: 4.9, conversion: 3.3 },
  { id: "B", code: "BP-02", name: "黄金分割", layout: "左 62% 视觉 + 右 38% 说明 + 角标 CTA", annotation: "视觉占黄金比，说明栏承载证据，CTA 角标化", reach: 1520, ctr: 5.4, conversion: 3.7 },
  { id: "C", code: "BP-03", name: "模块网格", layout: "4×2 模块矩阵 + 顶部主标 + 每模块独立 CTA", annotation: "信息拆为 8 模块，每模块自带证据与行动点", reach: 1280, ctr: 5.0, conversion: 4.1 },
]

const AUDIENCES = ["决策者", "运营负责人", "创意团队", "增长团队"]
const CHANNELS = ["落地页", "邮件", "社媒", "开屏"]
const TONES = ["理性", "克制", "专业", "可信"]
const STYLES = ["蓝图", "线框", "技术图", "示意"]

const STEPS = ["Brief", "人群", "渠道", "语气", "风格", "生成"]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function DesignUxProShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布绘制蓝图工作流：表单优先 + 步骤路径 + 证据导向预览。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activeStep, setActiveStep] = useState(5)
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "蓝图工作流就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换蓝图 ${concept.code} · ${concept.name}`) }, [conceptId, concept.code, concept.name, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "可信" ? 1.07 : tone === "理性" ? 1.04 : 1
    const channelMul = channel === "落地页" ? 1.12 : channel === "邮件" ? 0.9 : 1
    const styleMul = style === "蓝图" ? 1.05 : style === "线框" ? 0.98 : 1
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
    <div className="min-h-screen bg-[#0c2a3f] text-cyan-50">
      {/* 蓝图网格背景 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,200,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,200,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 顶部条 */}
      <header className="relative flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300/30 px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold"><Compass className="size-4" /> Muse · Blueprint</span>
          <Badge className="rounded-md bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30">GLM 5.2</Badge>
          <Badge variant="outline" className="rounded-md border-cyan-300/40 text-cyan-200">{item.skillChainLabel}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-cyan-400 text-[#0c2a3f] hover:bg-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-200/60" onClick={() => runAsync(setGenerateState, "生成蓝图")} disabled={loading}>
            {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
          </Button>
          <Button size="sm" variant="outline" className="border-cyan-300/40 bg-transparent text-cyan-100 hover:bg-cyan-400/10 focus-visible:ring-2 focus-visible:ring-cyan-200/40" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
            {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-300" /> : <Save className="mr-1 size-4" />} 保存
          </Button>
          <Button size="sm" variant="outline" className="border-cyan-300/40 bg-transparent text-cyan-100 hover:bg-cyan-400/10 focus-visible:ring-2 focus-visible:ring-cyan-200/40" onClick={() => runAsync(setExportState, "导出", 0.05)} disabled={loading}>
            {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-300" /> : <Download className="mr-1 size-4" />} 导出
          </Button>
        </div>
      </header>

      {generateState === "success" && <div className="relative border-b border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 md:px-6"><CheckCircle2 className="mr-1 inline size-4" />蓝图已生成，证据链已校验。</div>}
      {generateState === "error" && <div className="relative border-b border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200 md:px-6"><XCircle className="mr-1 inline size-4" />生成失败，请检查 Brief 与参数后重试。</div>}

      {/* 步骤路径：桌面横向节点 / 移动进度条 */}
      <div className="relative border-b border-cyan-300/20 px-4 py-3 md:px-6">
        <div className="hidden items-center gap-1 md:flex">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50",
                  i <= activeStep ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-50" : "border-cyan-300/20 text-cyan-300/60 hover:border-cyan-300/40",
                )}
              >
                <span className={cn("flex size-5 items-center justify-center rounded-full text-[10px] font-bold", i <= activeStep ? "bg-cyan-400 text-[#0c2a3f]" : "bg-cyan-300/10 text-cyan-300/60")}>{i + 1}</span>
                {s}
              </button>
              {i < STEPS.length - 1 && <span className={cn("h-px w-6", i < activeStep ? "bg-cyan-300/60" : "bg-cyan-300/20")} />}
            </div>
          ))}
        </div>
        {/* 移动端进度条 */}
        <div className="md:hidden">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-cyan-200">
            <span>步骤 {activeStep + 1} / {STEPS.length} · {STEPS[activeStep]}</span>
            <span>{Math.round(((activeStep + 1) / STEPS.length) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cyan-300/15">
            <div className="h-full rounded-full bg-cyan-400 transition-all duration-500" style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* 主体：左表单 + 右证据预览 */}
      <div className="relative grid gap-4 p-4 md:p-6 lg:grid-cols-[360px_1fr]">
        {/* 左：表单优先 */}
        <section className="flex flex-col gap-4 rounded-lg border border-cyan-300/25 bg-[#0a2436]/80 p-4 backdrop-blur">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">
              <Ruler className="size-3.5" /> 01 · Campaign Brief
            </div>
            <Textarea value={brief} onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }} className="min-h-[88px] resize-y rounded-md border-cyan-300/25 bg-[#0a2436] text-sm text-cyan-50 focus-visible:border-cyan-300/60 focus-visible:ring-cyan-300/20" placeholder="描述蓝图主旨…" />
            <p className="mt-1.5 text-[11px] text-cyan-300/60">证据提示：Brief 越具体，蓝图标注越精确。</p>
          </div>

          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">02 · 参数</div>
            <div className="grid grid-cols-2 gap-3">
              <BlueprintSelect label="目标人群" value={audience} options={AUDIENCES} onChange={setAudience} />
              <BlueprintSelect label="渠道" value={channel} options={CHANNELS} onChange={setChannel} />
              <BlueprintSelect label="语气" value={tone} options={TONES} onChange={setTone} />
              <BlueprintSelect label="视觉风格" value={style} options={STYLES} onChange={setStyle} />
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">03 · 蓝图方案</div>
            <div className="space-y-2">
              {CONCEPTS.map((c) => (
                <button key={c.id} type="button" onClick={() => setConceptId(c.id)}
                  className={cn("flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50", conceptId === c.id ? "border-cyan-300/70 bg-cyan-400/15 text-cyan-50" : "border-cyan-300/20 text-cyan-200/80 hover:border-cyan-300/40 hover:bg-cyan-400/5")}>
                  <span className="flex items-center gap-2">
                    <span className={cn("flex size-6 items-center justify-center rounded text-[10px] font-bold", conceptId === c.id ? "bg-cyan-400 text-[#0c2a3f]" : "bg-cyan-300/10 text-cyan-300/70")}>{c.id}</span>
                    <span>{c.name}</span>
                  </span>
                  <span className="font-mono text-[10px] text-cyan-300/60">{c.code}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 右：证据导向预览（蓝图标注） */}
        <section className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-lg border border-cyan-300/30 bg-[#0a2436]/70 p-5 md:p-8">
            {/* 蓝图标题块 */}
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-cyan-300/25 pb-3">
              <div>
                <div className="font-mono text-[11px] text-cyan-300/70">DRAWING · {concept.code} · {audience}/{channel}</div>
                <h2 className="mt-1 text-2xl font-bold text-cyan-50 md:text-3xl">{concept.name} 蓝图</h2>
              </div>
              <div className="font-mono text-[11px] text-cyan-300/60">SCALE 1:1 · {tone}/{style}</div>
            </div>

            {/* 蓝图主视觉：带标注的布局示意 */}
            <div className="relative rounded-md border border-dashed border-cyan-300/40 p-4 md:min-h-[280px]">
              <div className="absolute left-2 top-2 font-mono text-[10px] text-cyan-300/50">[ LAYOUT SCHEMATIC ]</div>
              <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr]">
                <div className="rounded border border-cyan-300/30 bg-cyan-400/5 p-3">
                  <div className="font-mono text-[10px] text-cyan-300/60">A · 主视觉</div>
                  <div className="mt-1 text-sm text-cyan-50">{brief.slice(0, 28)}…</div>
                </div>
                <div className="rounded border border-cyan-300/30 bg-cyan-400/5 p-3">
                  <div className="font-mono text-[10px] text-cyan-300/60">B · 证据栏</div>
                  <div className="mt-1 text-sm text-cyan-50">{concept.layout}</div>
                </div>
              </div>
              {/* 标注引线 */}
              <div className="mt-3 flex items-start gap-2 rounded border border-cyan-300/20 bg-[#0c2a3f]/60 p-2.5">
                <span className="mt-0.5 font-mono text-[10px] text-cyan-300/70">↳ NOTE</span>
                <span className="text-xs text-cyan-100/90">{concept.annotation}</span>
              </div>
            </div>

            {/* 指标 + Activity */}
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">预测指标</div>
                <div className="grid grid-cols-3 gap-2">
                  <BlueprintMetric label="Reach" value={metrics.reach.toLocaleString()} />
                  <BlueprintMetric label="CTR" value={`${metrics.ctr}%`} />
                  <BlueprintMetric label="Conv" value={`${metrics.conversion}%`} />
                </div>
              </div>
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">最近操作</div>
                <div className="max-h-[120px] space-y-1 overflow-auto pr-1">
                  {activity.map((a) => (
                    <div key={a.id} className="flex items-start gap-2 rounded bg-cyan-400/5 px-2 py-1 font-mono text-[11px]">
                      <span className="shrink-0 text-cyan-300/50">{a.time}</span>
                      <span className="text-cyan-100/80">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function BlueprintSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-cyan-300/60">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-md border border-cyan-300/25 bg-[#0a2436] px-3 py-2 text-sm text-cyan-50 transition-colors hover:border-cyan-300/50 focus-visible:border-cyan-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/20"
      >
        <span className="truncate">{value}</span>
        <span className={cn("text-cyan-300/60 transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-cyan-300/30 bg-[#0a2436] py-1 shadow-2xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-cyan-400/15 focus-visible:bg-cyan-400/15 focus-visible:outline-none", value === opt ? "font-medium text-cyan-50" : "text-cyan-200/80")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BlueprintMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-cyan-300/25 bg-cyan-400/5 p-2.5 text-center">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-cyan-300/60">{label}</div>
      <div className="mt-0.5 text-base font-bold text-cyan-50">{value}</div>
    </div>
  )
}
