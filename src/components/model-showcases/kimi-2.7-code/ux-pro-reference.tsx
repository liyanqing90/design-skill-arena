"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Download,
  FileText,
  LayoutGrid,
  Loader2,
  Save,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
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
  status: "ready" | "review" | "draft"
  summary: string
  reach: number
  ctr: number
  conversion: number
  modules: { id: string; name: string; status: "passed" | "warning" | "pending"; note: string }[]
}

type Activity = { id: string; time: string; label: string }

const concepts: Concept[] = [
  {
    id: "A",
    name: "任务流 A",
    title: "Onboarding Flow",
    status: "ready",
    summary: "三步引导用户完成首次代码生成，强调价值感知与快速上手。",
    reach: 920,
    ctr: 4.6,
    conversion: 3.5,
    modules: [
      { id: "m1", name: "价值主张", status: "passed", note: "首屏信息层级清晰" },
      { id: "m2", name: "CTA 可见性", status: "passed", note: "主按钮对比度 7:1" },
      { id: "m3", name: "表单容错", status: "warning", note: "错误提示可更具体" },
      { id: "m4", name: "加载反馈", status: "passed", note: "Skeleton 已覆盖" },
    ],
  },
  {
    id: "B",
    name: "任务流 B",
    title: "Feature Comparison",
    status: "review",
    summary: "通过对比表格展示 Kimi 2.7 Code 相较传统方案的效率提升。",
    reach: 860,
    ctr: 4.3,
    conversion: 3.2,
    modules: [
      { id: "m1", name: "表格可扫描性", status: "passed", note: "斑马纹 + 固定首列" },
      { id: "m2", name: "差异高亮", status: "passed", note: "关键差异已标绿" },
      { id: "m3", name: "移动端适配", status: "warning", note: "横向滚动需优化" },
      { id: "m4", name: "转化路径", status: "pending", note: "等待按钮文案测试" },
    ],
  },
  {
    id: "C",
    name: "任务流 C",
    title: "Live Preview",
    status: "draft",
    summary: "实时预览代码生成结果，支持一键复制与多设备尺寸切换。",
    reach: 1010,
    ctr: 4.9,
    conversion: 3.7,
    modules: [
      { id: "m1", name: "响应式预览", status: "passed", note: "断点切换流畅" },
      { id: "m2", name: "代码高亮", status: "passed", note: "Syntax highlighting OK" },
      { id: "m3", name: "复制反馈", status: "passed", note: "Toast 提示已接入" },
      { id: "m4", name: "性能预算", status: "pending", note: "首屏 < 1.5s 待验证" },
    ],
  },
]

const audiences = ["UX 研究员", "产品设计师", "前端工程师", "项目经理"]
const channels = ["设计系统文档", "Figma 说明页", "PRD 附录", "可用性报告"]
const tones = ["客观数据", "建议驱动", "问题清单", "最佳实践"]
const styles = ["紧凑表格", "模块卡片", "流程图式", "对比矩阵"]

export function UxProReferenceShowcase({ item }: { item: ShowcaseItem }) {
  const [brief, setBrief] = useState(
    "为 Kimi 2.7 Code 编写一份 UX 评估参考，帮助团队快速比较不同任务流的可用性与预测指标。"
  )
  const [audience, setAudience] = useState(audiences[0])
  const [channel, setChannel] = useState(channels[0])
  const [tone, setTone] = useState(tones[0])
  const [style, setStyle] = useState(styles[0])
  const [conceptId, setConceptId] = useState<ConceptKey>("A")
  const [activity, setActivity] = useState<Activity[]>([
    { id: "init", time: now(), label: "加载 UX Pro Reference 文档" },
    { id: "check", time: now(), label: "检查清单初始化" },
  ])
  const [loading, setLoading] = useState(false)
  const [generateState, setGenerateState] = useState<"idle" | "success" | "error">("idle")
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">("idle")
  const [exportState, setExportState] = useState<"idle" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "metrics">("overview")
  const [focusedModule, setFocusedModule] = useState<string | null>(null)

  const concept = useMemo(() => concepts.find((c) => c.id === conceptId) ?? concepts[0], [conceptId])

  function now() {
    return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const log = useCallback((label: string) => {
    setActivity((prev) => [{ id: Math.random().toString(36).slice(2), time: now(), label }, ...prev].slice(0, 20))
  }, [])

  useEffect(() => {
    log(`切换任务流 ${concept.id} · ${concept.title}`)
  }, [concept, conceptId, log])

  const metrics = useMemo(() => {
    const base = { reach: concept.reach, ctr: concept.ctr, conversion: concept.conversion }
    const audienceMultiplier = audience === "UX 研究员" ? 1.04 : audience === "产品设计师" ? 1.02 : 1
    const toneMultiplier = tone === "客观数据" ? 1.03 : tone === "建议驱动" ? 1.02 : 1
    const styleMultiplier = style === "对比矩阵" ? 1.04 : style === "紧凑表格" ? 1.02 : 1
    return {
      reach: Math.round(base.reach * audienceMultiplier),
      ctr: Number((base.ctr * toneMultiplier).toFixed(1)),
      conversion: Number((base.conversion * styleMultiplier).toFixed(1)),
    }
  }, [concept, audience, tone, style])

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
      }, 1000)
    },
    [log]
  )

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-sm bg-slate-900 text-white hover:bg-slate-800">Kimi 2.7 Code</Badge>
                <Badge variant="outline" className="rounded-sm">{item.skillChainLabel || "ui-ux-pro-max"}</Badge>
              </div>
              <CardTitle className="pt-2 text-lg">UX Pro Reference</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              专业 UX 文档视图：任务流、检查模块、指标对比与操作日志。
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="size-4" />
                配置
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <UxSelect label="目标人群" value={audience} options={audiences} onChange={setAudience} icon={<Users className="size-4" />} />
              <UxSelect label="渠道" value={channel} options={channels} onChange={setChannel} icon={<FileText className="size-4" />} />
              <UxSelect label="语气" value={tone} options={tones} onChange={setTone} icon={<Search className="size-4" />} />
              <UxSelect label="视觉风格" value={style} options={styles} onChange={setStyle} icon={<LayoutGrid className="size-4" />} />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base">Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value)
                  if (e.target.value.length % 24 === 0) log("编辑 Brief")
                }}
                className="min-h-[120px] resize-y text-sm"
                placeholder="输入评估目标与范围…"
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
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-all focus-visible:ring-3 focus-visible:ring-indigo-500/50 ${
                    conceptId === c.id
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700"
                  }`}
                >
                  <span className="text-xs font-bold">{c.id}</span>
                  {c.name}
                  <StatusDot status={c.status} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-3 focus-visible:ring-indigo-500/50"
                onClick={() => runAsync(setGenerateState, "生成 UX 报告")}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Sparkles className="mr-1 size-4" />}
                生成
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-indigo-500/50"
                onClick={() => runAsync(setSaveState, "保存报告", 0.1)}
                disabled={loading}
              >
                {saveState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Save className="mr-1 size-4" />}
                保存
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="focus-visible:ring-3 focus-visible:ring-indigo-500/50"
                onClick={() => runAsync(setExportState, "导出 PDF", 0.05)}
                disabled={loading}
              >
                {exportState === "success" ? <CheckCircle2 className="mr-1 size-4 text-green-600" /> : <Download className="mr-1 size-4" />}
                导出
              </Button>
            </div>
          </div>

          {generateState === "success" && (
            <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
              <CheckCircle2 className="size-4" /> UX 报告已生成，所有模块检查完成。
            </div>
          )}
          {generateState === "error" && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <XCircle className="size-4" /> 报告生成失败，请检查 Brief 后重试。
            </div>
          )}

          <Card className="flex-1 border-slate-200 bg-white">
            <div className="border-b border-slate-200">
              <div className="flex">
                {[
                  { id: "overview", label: "概览" },
                  { id: "modules", label: "模块检查" },
                  { id: "metrics", label: "指标对比" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/50 ${
                      activeTab === tab.id ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>
            <CardContent className="p-0">
              {activeTab === "overview" && (
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{concept.title}</h2>
                    <StatusBadge status={concept.status} />
                    <Badge variant="outline" className="text-xs">
                      {channel}
                    </Badge>
                  </div>
                  <p className="mb-6 max-w-2xl text-slate-600">{concept.summary}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">目标人群</div>
                      <div className="font-medium">{audience}</div>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">语气</div>
                      <div className="font-medium">{tone}</div>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">视觉风格</div>
                      <div className="font-medium">{style}</div>
                    </div>
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">文档类型</div>
                      <div className="font-medium">{channel}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "modules" && (
                <div className="p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">可用性检查模块</h3>
                  <div className="space-y-2">
                    {concept.modules.map((m) => (
                      <div
                        key={m.id}
                        tabIndex={0}
                        onFocus={() => setFocusedModule(m.id)}
                        onBlur={() => setFocusedModule(null)}
                        className={`flex items-center justify-between rounded-md border p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
                          focusedModule === m.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <ModuleStatus status={m.status} />
                          <div>
                            <div className="text-sm font-medium">{m.name}</div>
                            <div className="text-xs text-slate-500">{m.note}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {m.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="p-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">指标对比</h3>
                  <div className="overflow-hidden rounded-md border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-slate-500">任务流</th>
                          <th className="px-4 py-2 text-right font-medium text-slate-500">Reach</th>
                          <th className="px-4 py-2 text-right font-medium text-slate-500">CTR</th>
                          <th className="px-4 py-2 text-right font-medium text-slate-500">Conversion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {concepts.map((c) => {
                          const isCurrent = c.id === conceptId
                          return (
                            <tr
                              key={c.id}
                              className={`border-t border-slate-100 transition-colors ${isCurrent ? "bg-indigo-50/50" : "hover:bg-slate-50"}`}
                            >
                              <td className="px-4 py-3 font-medium">
                                {c.title} {isCurrent && <span className="ml-1 text-xs text-indigo-600">(当前)</span>}
                              </td>
                              <td className="px-4 py-3 text-right">{c.reach.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">{c.ctr}%</td>
                              <td className="px-4 py-3 text-right">{c.conversion}%</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 text-xs font-semibold uppercase text-slate-500">当前预测</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">{metrics.reach.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">Reach</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">{metrics.ctr}%</div>
                        <div className="text-xs text-slate-500">CTR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">{metrics.conversion}%</div>
                        <div className="text-xs text-slate-500">Conversion</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="size-4" />
                预测指标
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <UxMetric label="Reach" value={metrics.reach.toLocaleString()} />
              <UxMetric label="CTR" value={`${metrics.ctr}%`} />
              <UxMetric label="Conversion" value={`${metrics.conversion}%`} />
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                  style={{ width: `${Math.min(metrics.ctr * 18, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="size-4" />
                最近操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] space-y-1 overflow-auto pr-1">
                {activity.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-2 rounded-md border-l-2 border-indigo-200 bg-slate-50 px-3 py-2 text-sm transition-colors hover:bg-slate-100"
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

function UxSelect({
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
        className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:border-indigo-400 focus-visible:border-indigo-500 focus-visible:ring-3 focus-visible:ring-indigo-500/50"
      >
        {value}
        <svg className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:bg-indigo-50 focus-visible:outline-none ${
                value === opt ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-700"
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

function StatusBadge({ status }: { status: Concept["status"] }) {
  const map = {
    ready: { class: "bg-green-100 text-green-700 border-green-200", label: "已就绪" },
    review: { class: "bg-amber-100 text-amber-700 border-amber-200", label: "评审中" },
    draft: { class: "bg-slate-100 text-slate-700 border-slate-200", label: "草稿" },
  }
  const { class: cls, label } = map[status]
  return (
    <Badge variant="outline" className={`rounded-sm text-xs ${cls}`}>
      {label}
    </Badge>
  )
}

function StatusDot({ status }: { status: Concept["status"] }) {
  const map = {
    ready: "bg-green-500",
    review: "bg-amber-500",
    draft: "bg-slate-400",
  }
  return <span className={`size-2 rounded-full ${map[status]}`} />
}

function ModuleStatus({ status }: { status: Concept["modules"][number]["status"] }) {
  const map = {
    passed: <CheckCircle2 className="size-5 text-green-600" />,
    warning: <Target className="size-5 text-amber-500" />,
    pending: <Activity className="size-5 text-slate-400" />,
  }
  return map[status]
}

function UxMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  )
}
