"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Box,
  CheckCircle2,
  ChevronRight,
  Download,
  FileCode,
  FileText,
  Folder,
  Loader2,
  Package,
  Save,
  Sparkles,
  Terminal,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/showcase"

type ConceptId = "A" | "B" | "C"
type AsyncState = "idle" | "success" | "error"
type BuildStatus = "queued" | "building" | "ready" | "failed"

interface Concept {
  id: ConceptId
  name: string
  artifact: string
  headline: string
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
  { id: "A", name: "单页落地", artifact: "landing.html", headline: "一个自包含的发布落地页", reach: 1290, ctr: 4.5, conversion: 3.0 },
  { id: "B", name: "交互卡片", artifact: "card.html", headline: "可分享的交互式产品卡", reach: 980, ctr: 5.4, conversion: 3.7 },
  { id: "C", name: "故事流", artifact: "story.html", headline: "纵向滚动的故事流 artifact", reach: 1450, ctr: 4.1, conversion: 2.6 },
]

const AUDIENCES = ["前端工程师", "产品经理", "市场运营", "设计师"]
const CHANNELS = ["静态部署", "邮件附件", "内嵌 iframe 占位", "二维码"]
const TONES = ["工程化", "简洁", "活泼", "严谨"]
const STYLES = ["终端绿", "代码暗", "纸张白", "蓝图蓝"]

const FILE_TREE = [
  { name: "artifact/", type: "folder" as const },
  { name: "  index.html", type: "file" as const },
  { name: "  styles.css", type: "file" as const },
  { name: "  preview.png", type: "file" as const },
  { name: "manifest.json", type: "file" as const },
  { name: "README.md", type: "file" as const },
]

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export function ArtifactBuilderShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState("为 GLM 5.2 新品发布构建一个可独立分发的单页 artifact，包含预览与导出。")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [conceptId, setConceptId] = useState<ConceptId>("A")
  const [activity, setActivity] = useState<ActivityEntry[]>([
    { id: "init", time: "09:00:00", label: "artifact 工作区就绪" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<AsyncState>("idle")
  const [saveState, setSaveState] = useState<AsyncState>("idle")
  const [exportState, setExportState] = useState<AsyncState>("idle")
  const [buildStatus, setBuildStatus] = useState<BuildStatus>("ready")
  const [activeFile, setActiveFile] = useState("index.html")

  const concept = useMemo(() => CONCEPTS.find((c) => c.id === conceptId) ?? CONCEPTS[0], [conceptId])

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: nowTime(), label }, ...prev].slice(0, 16))
  }, [])

  useEffect(() => { log(`切换 artifact ${concept.artifact}`) }, [conceptId, concept.artifact, log])
  useEffect(() => { log(`参数 ${audience}/${channel}/${tone}/${style}`) }, [audience, channel, tone, style, log])

  const metrics = useMemo(() => {
    const toneMul = tone === "工程化" ? 1.04 : tone === "活泼" ? 1.06 : 1
    const styleMul = style === "终端绿" ? 1.03 : style === "纸张白" ? 0.98 : 1
    const channelMul = channel === "静态部署" ? 1.08 : channel === "二维码" ? 0.95 : 1
    return {
      reach: Math.round(concept.reach * channelMul),
      ctr: Number((concept.ctr * toneMul).toFixed(1)),
      conversion: Number((concept.conversion * styleMul).toFixed(1)),
    }
  }, [concept, tone, style, channel])

  const runAsync = useCallback((setter: React.Dispatch<React.SetStateAction<AsyncState>>, label: string, failChance = 0) => {
    setLoading(true); setter("idle"); setBuildStatus("building"); log(`${label} 构建中…`)
    window.setTimeout(() => {
      setLoading(false)
      if (Math.random() < failChance) { setter("error"); setBuildStatus("failed"); log(`${label} 构建失败`) }
      else { setter("success"); setBuildStatus("ready"); log(`${label} 构建完成`) }
      window.setTimeout(() => setter("idle"), 2200)
    }, 950)
  }, [log])

  const terminalLines = useMemo(() => [
    "$ muse build --target artifact",
    `> resolving ${concept.artifact}`,
    `> audience=${audience} channel=${channel} tone=${tone} style=${style}`,
    buildStatus === "building" ? "> bundling..." : buildStatus === "ready" ? "> bundled 3 files (12.4kb)" : "> error: build failed",
    buildStatus === "ready" ? `> artifact ready: /out/${concept.artifact}` : "",
  ].filter(Boolean), [concept, audience, channel, tone, style, buildStatus])

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      {/* 顶栏 */}
      <header className="border-b border-white/10 bg-[#161b22]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-mono text-sm text-emerald-400"><Terminal className="size-4" /> muse-artifact</span>
            <Badge className="rounded-md bg-emerald-600 text-white hover:bg-emerald-500">GLM 5.2</Badge>
            <Badge variant="outline" className="rounded-md border-white/20 text-slate-300">{item.skillChainLabel}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161b22]" onClick={() => runAsync(setGenerateState, "生成 artifact")} disabled={loading}>
              {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />} 生成
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setSaveState, "保存", 0.1)} disabled={loading}>
              {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Save className="mr-1 size-4" />} 保存
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30" onClick={() => runAsync(setExportState, "导出 artifact", 0.05)} disabled={loading}>
              {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-emerald-400" /> : <Download className="mr-1 size-4" />} 导出
            </Button>
          </div>
        </div>
      </header>

      {generateState === "success" && <Banner kind="success" text="artifact 已生成，可在右侧预览。" />}
      {generateState === "error" && <Banner kind="error" text="生成失败，请检查 Brief 后重试。" />}

      <main className="mx-auto grid max-w-[1600px] gap-3 p-4 md:grid-cols-[220px_1fr_340px] md:p-6">
        {/* 左：文件树 */}
        <aside className="rounded-lg border border-white/10 bg-[#161b22] p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500"><Folder className="size-3.5" /> 文件树</div>
          <div className="space-y-0.5 font-mono text-xs">
            {FILE_TREE.map((f) => {
              const isFolder = f.type === "folder"
              const name = f.name.trim()
              const indent = f.name.startsWith("  ") ? "pl-4" : ""
              return (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => !isFolder && setActiveFile(name)}
                  className={cn("flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none", indent, activeFile === name && !isFolder && "bg-emerald-500/10 text-emerald-300")}
                >
                  {isFolder ? <Folder className="size-3.5 text-sky-400" /> : name.endsWith(".html") ? <FileCode className="size-3.5 text-orange-400" /> : name.endsWith(".md") ? <FileText className="size-3.5 text-slate-400" /> : <FileText className="size-3.5 text-slate-500" />}
                  <span className="truncate">{name}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-4 border-t border-white/10 pt-3">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Brief</div>
            <Textarea
              value={brief}
              onChange={(e) => { setBrief(e.target.value); if (e.target.value.length % 24 === 0) log("更新 Brief") }}
              className="min-h-[80px] resize-y rounded-md border-white/10 bg-[#0d1117] font-mono text-xs text-slate-200 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
              placeholder="# artifact brief"
            />
          </div>
        </aside>

        {/* 中：构建输出 + 终端 */}
        <section className="flex flex-col gap-3">
          {/* 终端 */}
          <div className="rounded-lg border border-white/10 bg-[#0d1117] p-4 font-mono text-xs">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500"><Terminal className="size-3.5" /> 构建输出</div>
            <div className="space-y-1">
              {terminalLines.map((line, i) => (
                <div key={i} className={cn(line.startsWith("$") ? "text-emerald-400" : line.startsWith(">") ? "text-slate-400" : "text-slate-500")}>{line}</div>
              ))}
              {loading && <div className="text-amber-400">▋ building</div>}
            </div>
          </div>

          {/* 概念切换 */}
          <div className="grid grid-cols-3 gap-2">
            {CONCEPTS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setConceptId(c.id)}
                className={cn("rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400", conceptId === c.id ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 bg-[#161b22] hover:border-white/30")}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500">{c.id}</span>
                  <ChevronRight className="size-3 text-slate-600" />
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-100">{c.name}</div>
                <div className="mt-0.5 font-mono text-[10px] text-emerald-400">{c.artifact}</div>
              </button>
            ))}
          </div>

          {/* 控件 */}
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-[#161b22] p-3 md:grid-cols-4">
            <TermSelect label="audience" value={audience} options={AUDIENCES} onChange={setAudience} />
            <TermSelect label="channel" value={channel} options={CHANNELS} onChange={setChannel} />
            <TermSelect label="tone" value={tone} options={TONES} onChange={setTone} />
            <TermSelect label="style" value={style} options={STYLES} onChange={setStyle} />
          </div>
        </section>

        {/* 右：artifact 预览 + 指标 + Activity */}
        <aside className="flex flex-col gap-3">
          <div className="rounded-lg border border-white/10 bg-[#161b22] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500"><Package className="size-3.5" /> artifact 预览</span>
              <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold", buildStatus === "ready" ? "bg-emerald-500/20 text-emerald-300" : buildStatus === "building" ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300")}>{buildStatus}</span>
            </div>
            <div className="rounded-md border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-4">
              <div className="mb-2 font-mono text-[10px] text-slate-500">{concept.artifact}</div>
              <div className="text-lg font-bold text-slate-100">{concept.headline}</div>
              <div className="mt-1 text-xs text-slate-400">{audience} · {tone} · {style}</div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500"><Box className="size-3" /> self-contained · no backend</div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#161b22] p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">预测指标</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <TermMetric label="Reach" value={metrics.reach.toLocaleString()} />
              <TermMetric label="CTR" value={`${metrics.ctr}%`} />
              <TermMetric label="Conv" value={`${metrics.conversion}%`} />
            </div>
          </div>

          <div className="flex-1 rounded-lg border border-white/10 bg-[#161b22] p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">操作日志</div>
            <div className="max-h-[200px] space-y-1 overflow-auto font-mono text-xs">
              {activity.map((a) => (
                <div key={a.id} className="flex items-start gap-2 text-slate-400">
                  <span className="shrink-0 text-slate-600">{a.time}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

function TermSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <label className="mb-1 block font-mono text-[10px] text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded border border-white/10 bg-[#0d1117] px-2 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:border-emerald-500/50 focus-visible:border-emerald-500 focus-visible:outline-none"
      >
        <span className="truncate">{value}</span>
        <span className="text-slate-500">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded border border-white/10 bg-[#0d1117] py-1 shadow-2xl">
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false) }}
              className={cn("w-full px-2 py-1 text-left font-mono text-xs transition-colors hover:bg-emerald-500/10 focus-visible:bg-emerald-500/10 focus-visible:outline-none", value === opt ? "text-emerald-300" : "text-slate-300")}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TermMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/10 bg-[#0d1117] p-2">
      <div className="font-mono text-[9px] text-slate-500">{label}</div>
      <div className="font-mono text-sm font-bold text-emerald-300">{value}</div>
    </div>
  )
}

function Banner({ kind, text }: { kind: "success" | "error"; text: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-4 py-2 text-sm md:px-6", kind === "success" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300")}>
      {kind === "success" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />} {text}
    </div>
  )
}
