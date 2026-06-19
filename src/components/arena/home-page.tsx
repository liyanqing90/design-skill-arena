"use client"

import { type ReactNode, useEffect, useMemo, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Copy, ExternalLink, Heart, Maximize2 } from "lucide-react"

import { ShowcaseCard } from "@/components/arena/showcase-card"
import { ArenaTopNav } from "@/components/layout/arena-top-nav"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { skills } from "@/data/skills"
import { allModels, showcases } from "@/data/showcases"
import { defaultLocale, messages } from "@/i18n"

const pageSize = 20
const votedStorageKey = "design-skill-arena:voted"
type Locale = keyof typeof messages
type FilterOption = { value: string; label: string }
type VoteResponse = {
  counts?: Record<string, number>
  count?: number
  voted?: string[] | boolean
}
const handoffPrompts: Record<Locale, string> = {
  "zh-CN": `{MODEL_NAME} = 当前模型名称
{MODEL_SLUG} = 当前模型标识

当前使用模型是：{MODEL_NAME}
当前模型标识是：{MODEL_SLUG}

你现在接手已有项目：Design Skill Arena。

你的任务范围非常严格：

只允许新增当前模型的一套独立 showcase 页面。
不要修改首页。
不要修改首页卡片。
不要修改模型筛选。
不要修改分页。
不要修改 i18n。
不要修改全局展示逻辑。
不要覆盖已有 showcase 页面。
不要重构项目架构。

最后由另一个维护者统一汇总接入首页。

你只需要做：
1. 为当前模型生成 18 个独立 Muse showcase 页面
2. 每个页面中显式显示模型名称标签：{MODEL_NAME}
3. 每个页面中显式显示对应 skills / chain 名称
4. 每个页面必须能独立打开
5. 每个页面必须有真实交互
6. 每个页面必须适配移动端

推荐新增目录：

src/components/model-showcases/{MODEL_SLUG}/

每个组合一个文件，例如：

src/components/model-showcases/{MODEL_SLUG}/standard-builder.tsx
src/components/model-showcases/{MODEL_SLUG}/visual-frontend.tsx
src/components/model-showcases/{MODEL_SLUG}/design-logic.tsx
...
src/components/model-showcases/{MODEL_SLUG}/max-quality-chain.tsx

推荐新增独立预览路由：

/model-showcase/{MODEL_SLUG}/{showcaseId}

例如：
/model-showcase/{MODEL_SLUG}/standard-builder
/model-showcase/{MODEL_SLUG}/visual-frontend
/model-showcase/{MODEL_SLUG}/max-quality-chain

如果当前项目已有其他适合的独立预览路由，可以沿用，但必须满足：
- 不覆盖已有页面
- URL 能区分模型和 showcaseId
- 页面可直接打开

截图建议保存到：

public/model-screenshots/{MODEL_SLUG}/{showcaseId}/desktop.png

不要改现有 public/screenshots，避免覆盖其他模型封面。

基础产品需求固定：

创建一个名为 Muse 的单页面 AI Campaign Studio。
用户是一名创意总监，需要用它为新品发布生成营销活动方案。

每个 Muse 结果页必须包含：
- Campaign Brief 输入
- 目标人群、渠道、语气、视觉风格等控件
- 大型主创意预览
- 三个可切换创意方案
- Reach、CTR、Conversion 预测指标
- Activity / 最近操作
- Generate、Save、Export 操作
- Loading、Success、Error、Selected、Hover、Focus 状态
- Desktop 和 Mobile 响应式布局

必须实现：
- 点击 A / B / C 创意方案后，主预览和指标变化
- 点击 Generate 后显示生成中，再进入成功或错误状态
- 修改控件后，主预览内容有可见变化
- 使用本地 mock data，不连接后端
- 每个结果页独立展示，不 iframe 嵌套

最重要规则：

当前模型的 18 个组合必须当成 18 个独立新项目生成。

也就是说：
- 18 个组合只共享同一个 Muse 产品需求
- 每个组合必须独立做需求理解、交互拆解、布局规划和视觉方向
- 不允许复用其他模型的页面实现
- 不允许复用当前项目已有 showcase 页面实现
- 不允许 18 个组合套同一个模板
- 不允许只是换颜色、换背景、换标题
- 每个页面都应该像当前模型独立设计出来的结果
- skills / chain 的差异必须体现在：
  - 页面结构
  - 信息架构
  - 主视觉方式
  - 控件组织
  - 交互状态
  - 响应式策略

18 个组合如下：

01 Standard Builder
frontend-app-builder

02 Visual Frontend
frontend-skill

03 Design Logic
frontend-design

04 Impeccable Full Flow
impeccable

05 Artifact Builder
web-artifacts-builder / artifacts-builder

06 UX Pro Reference
ui-ux-pro-max

07 Component System
shadcn-best-practices / shadcn

08 Motion Bits
react-bits

09 Standard + Taste
frontend-app-builder + taste-skill

10 Standard + Impeccable
frontend-app-builder + impeccable

11 Visual + Taste
frontend-skill + taste-skill

12 Visual + Impeccable
frontend-skill + impeccable

13 Design + UX Pro
frontend-design + ui-ux-pro-max

14 Design + Impeccable
frontend-design + impeccable

15 Balanced Chain
frontend-app-builder + taste-skill + impeccable

16 Visual Premium Chain
frontend-skill + taste-skill + impeccable

17 Product Polish Chain
frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable

18 Max Quality Chain
frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable

页面内要求：
- 每个页面顶部或明显位置必须有模型名称标签：{MODEL_NAME}
- 每个页面顶部或明显位置必须有 skills / chain 标签
- 不要写评分
- 不要写排名
- 不要写结论
- 不要写“最佳”
- 不要把需求分析写成 UI 说明文

执行流程：

1. 先阅读当前项目结构，只为确认技术栈和可新增目录。
2. 新增当前模型专属目录。
3. 新增当前模型专属独立路由。
4. 生成 18 个独立页面。
5. 每个页面都显示 {MODEL_NAME} 标签和对应 skills / chain 标签。
6. 每个页面都实现真实交互。
7. 每个页面都适配移动端。
8. 不修改首页。
9. 不修改现有 showcase 数据。
10. 不覆盖现有截图。
11. 为 18 个页面保存截图到 public/model-screenshots/{MODEL_SLUG}/{showcaseId}/desktop.png。
12. 输出新增页面 URL 列表，方便后续汇总接入。
13. 运行 typecheck、lint、build。

限制：
- 不要修改首页
- 不要修改首页展示数据
- 不要修改模型筛选
- 不要修改分页
- 不要修改 i18n
- 不要覆盖现有页面
- 不要覆盖现有截图
- 不要重新初始化项目
- 不要 iframe
- 不要评分、排名、结论
- 不要做普通 Landing Page
- 不要把 18 个页面做成同一套模板`,
  "en-US": `{MODEL_NAME} = current model name
{MODEL_SLUG} = current model slug

Current model: {MODEL_NAME}
Current model slug: {MODEL_SLUG}

You are taking over an existing project: Design Skill Arena.

Your scope is intentionally strict:

Only add one independent set of showcase pages for the current model.
Do not modify the homepage.
Do not modify homepage cards.
Do not modify model filtering.
Do not modify pagination.
Do not modify i18n.
Do not modify global display logic.
Do not overwrite existing showcase pages.
Do not restructure the project.

Another maintainer will connect the results to the homepage later.

You only need to:
1. Generate 18 independent Muse showcase pages for the current model.
2. Display the model name label on every page: {MODEL_NAME}
3. Display the corresponding skills / chain label on every page.
4. Make every page directly openable.
5. Implement real local interaction on every page.
6. Make every page responsive on desktop and mobile.

Recommended directory:

src/components/model-showcases/{MODEL_SLUG}/

One file per combination, for example:

src/components/model-showcases/{MODEL_SLUG}/standard-builder.tsx
src/components/model-showcases/{MODEL_SLUG}/visual-frontend.tsx
src/components/model-showcases/{MODEL_SLUG}/design-logic.tsx
...
src/components/model-showcases/{MODEL_SLUG}/max-quality-chain.tsx

Recommended standalone preview route:

/model-showcase/{MODEL_SLUG}/{showcaseId}

Examples:
/model-showcase/{MODEL_SLUG}/standard-builder
/model-showcase/{MODEL_SLUG}/visual-frontend
/model-showcase/{MODEL_SLUG}/max-quality-chain

If the project already has a suitable independent preview route, you may reuse it, but it must:
- Not overwrite existing pages
- Make the model and showcaseId distinguishable in the URL
- Open directly as a standalone page

Suggested screenshot path:

public/model-screenshots/{MODEL_SLUG}/{showcaseId}/desktop.png

Do not modify existing public/screenshots, to avoid overwriting another model's covers.

Fixed product requirement:

Create a single-page AI Campaign Studio named Muse.
The user is a creative director creating a launch campaign for a new product.

Every Muse result page must include:
- Campaign Brief input
- Controls for target audience, channel, tone, and visual style
- A large main creative preview
- Three switchable creative variations
- Reach, CTR, and Conversion prediction metrics
- Activity / recent actions
- Generate, Save, and Export actions
- Loading, Success, Error, Selected, Hover, and Focus states
- Desktop and Mobile responsive layouts

Required behavior:
- Clicking creative options A / B / C updates the main preview and metrics
- Clicking Generate shows a generating state, then success or error
- Changing controls visibly updates the preview content
- Use local mock data only, with no backend
- Each result page is standalone, not nested in an iframe

Most important rule:

Treat the 18 combinations for the current model as 18 independent new projects.

This means:
- The 18 combinations only share the same Muse product requirement
- Each combination must independently analyze the requirement, break down interaction, plan layout, and define visual direction
- Do not reuse another model's page implementation
- Do not reuse existing showcase pages in this project
- Do not make the 18 combinations from one shared template
- Do not merely change colors, backgrounds, or titles
- Each page should feel like an independently designed result from the current model
- The skills / chain differences must appear in:
  - Page structure
  - Information architecture
  - Main visual treatment
  - Control organization
  - Interaction states
  - Responsive strategy

18 combinations:

01 Standard Builder
frontend-app-builder

02 Visual Frontend
frontend-skill

03 Design Logic
frontend-design

04 Impeccable Full Flow
impeccable

05 Artifact Builder
web-artifacts-builder / artifacts-builder

06 UX Pro Reference
ui-ux-pro-max

07 Component System
shadcn-best-practices / shadcn

08 Motion Bits
react-bits

09 Standard + Taste
frontend-app-builder + taste-skill

10 Standard + Impeccable
frontend-app-builder + impeccable

11 Visual + Taste
frontend-skill + taste-skill

12 Visual + Impeccable
frontend-skill + impeccable

13 Design + UX Pro
frontend-design + ui-ux-pro-max

14 Design + Impeccable
frontend-design + impeccable

15 Balanced Chain
frontend-app-builder + taste-skill + impeccable

16 Visual Premium Chain
frontend-skill + taste-skill + impeccable

17 Product Polish Chain
frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable

18 Max Quality Chain
frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable

In-page requirements:
- Every page must clearly show the model name label: {MODEL_NAME}
- Every page must clearly show the skills / chain label
- Do not include scoring
- Do not include rankings
- Do not include conclusions
- Do not write "best"
- Do not turn requirement analysis into explanatory UI copy

Execution flow:

1. Read the current project structure only to confirm the stack and safe places to add files.
2. Add the current model's dedicated directory.
3. Add the current model's standalone route.
4. Generate 18 independent pages.
5. Show {MODEL_NAME} and the corresponding skills / chain label on every page.
6. Implement real interaction on every page.
7. Make every page responsive.
8. Do not modify the homepage.
9. Do not modify existing showcase data.
10. Do not overwrite existing screenshots.
11. Save screenshots for all 18 pages to public/model-screenshots/{MODEL_SLUG}/{showcaseId}/desktop.png.
12. Output the new page URL list for later integration.
13. Run typecheck, lint, and build.

Restrictions:
- Do not modify the homepage
- Do not modify homepage display data
- Do not modify model filtering
- Do not modify pagination
- Do not modify i18n
- Do not overwrite existing pages
- Do not overwrite existing screenshots
- Do not reinitialize the project
- Do not use iframe
- Do not include scoring, rankings, or conclusions
- Do not make a generic landing page
- Do not turn the 18 pages into one repeated template`,
}

export function HomePage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [model, setModel] = useState("all")
  const [combo, setCombo] = useState("all")
  const [page, setPage] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [promptOpen, setPromptOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [previewScale, setPreviewScale] = useState(0.818)
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({})
  const [loadedVoteIds, setLoadedVoteIds] = useState<Set<string>>(new Set())
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [votingId, setVotingId] = useState<string | null>(null)
  const [votesAvailable, setVotesAvailable] = useState(true)
  const text = messages[locale]
  const handoffPrompt = handoffPrompts[locale]
  const combos = useMemo(
    () => Array.from(new Map(showcases.map((item) => [item.sourceUrl ?? item.id, item.title])).entries()),
    []
  )

  const filtered = useMemo(
    () =>
      showcases.filter(
        (item) =>
          (model === "all" || item.model === model) &&
          (combo === "all" || (item.sourceUrl ?? item.id) === combo)
      ),
    [combo, model]
  )
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)
  const selectedItem = selectedIndex === null ? null : filtered[selectedIndex]

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        setVotedIds(new Set(JSON.parse(localStorage.getItem(votedStorageKey) || "[]")))
      } catch {
        localStorage.removeItem(votedStorageKey)
      }
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const updatePreviewScale = () => {
      setPreviewScale(Math.max(0.24, Math.min(0.818, (window.innerWidth - 32) / 1440)))
    }

    updatePreviewScale()
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [])

  function changeModel(nextModel: string) {
    setModel(nextModel)
    setPage(1)
    setSelectedIndex(null)
  }

  function changeCombo(nextCombo: string) {
    setCombo(nextCombo)
    setPage(1)
    setSelectedIndex(null)
  }

  function moveSelection(offset: number) {
    setSelectedIndex((current) => {
      if (current === null || filtered.length === 0) return current
      const next = (current + offset + filtered.length) % filtered.length
      void loadVotesFor([filtered[next].id])
      return next
    })
  }

  function openPreview(index: number) {
    setSelectedIndex(index)
    void loadVotesFor([filtered[index].id])
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(handoffPrompt)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = handoffPrompt
      textarea.setAttribute("readonly", "")
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopiedPrompt(true)
    window.setTimeout(() => setCopiedPrompt(false), 1400)
  }

  async function loadVotesFor(itemIds: string[]) {
    const ids = itemIds.filter((id) => !loadedVoteIds.has(id)).slice(0, 20)
    if (!votesAvailable || ids.length === 0) return

    try {
      const response = await fetch(`/api/votes?ids=${encodeURIComponent(ids.join(","))}`)
      const data = (await response.json()) as VoteResponse & { enabled?: boolean }
      if (!response.ok) throw new Error("Vote load failed")

      setVoteCounts((current) => {
        const next = { ...current }
        ids.forEach((id) => {
          next[id] = Number(data.counts?.[id] ?? 0)
        })
        return next
      })
      setLoadedVoteIds((current) => new Set([...current, ...ids]))
      setVotesAvailable(data.enabled !== false)
      if (Array.isArray(data.voted)) {
        const voted = data.voted
        setVotedIds((current) => {
          const next = new Set([...current, ...voted])
          localStorage.setItem(votedStorageKey, JSON.stringify([...next]))
          return next
        })
      }
    } catch {
      setVotesAvailable(false)
    }
  }

  async function voteFor(itemId: string) {
    if (!votesAvailable || votedIds.has(itemId) || votingId) return

    setVotingId(itemId)
    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: itemId }),
      })
      const data = (await response.json()) as VoteResponse
      if (!response.ok) throw new Error("Vote failed")

      setVoteCounts((current) => ({
        ...current,
        [itemId]: Number(data.count ?? current[itemId] ?? 0),
      }))
      setLoadedVoteIds((current) => new Set(current).add(itemId))
      setVotedIds((current) => {
        const next = new Set(current).add(itemId)
        localStorage.setItem(votedStorageKey, JSON.stringify([...next]))
        return next
      })
    } catch {
      setVotesAvailable(false)
    } finally {
      setVotingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-zinc-950">
      <section className="mx-auto flex min-h-screen max-w-[1760px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <ArenaTopNav
          locale={locale}
          onLocaleChange={setLocale}
          onPromptOpen={() => setPromptOpen(true)}
          onSkillsOpen={() => setSkillsOpen(true)}
          labels={{
            siteName: text.common.siteName,
            generatedBy: text.common.generatedBy,
            prompt: text.common.prompt,
            skillsSummary: text.common.skillsSummary,
          }}
          showGenerationMeta
        />

        <div className="arena-enter relative z-30 grid gap-6 border-b border-zinc-950/15 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="grid gap-3">
            <h1 className="max-w-5xl text-6xl font-semibold leading-[0.9] sm:text-8xl lg:text-9xl 2xl:text-[9rem]">
              {text.home.title}
            </h1>
          </div>

          <div className="relative z-20 grid border-y border-zinc-950/15 sm:grid-cols-2 lg:w-[520px] lg:justify-self-end">
            <div className="grid gap-1 border-b border-zinc-950/15 py-3 sm:border-r sm:border-b-0 sm:pr-4">
              <FilterMenu
                label={text.gallery.model}
                value={model}
                options={[
                  { value: "all", label: text.gallery.allModels },
                  ...allModels.map((modelName) => ({ value: modelName, label: modelName })),
                ]}
                onChange={changeModel}
              />
            </div>
            <div className="grid gap-1 py-3 sm:pl-4">
              <FilterMenu
                label={text.gallery.combo}
                value={combo}
                options={[
                  { value: "all", label: text.gallery.allCombos },
                  ...combos.map(([comboId, comboTitle]) => ({ value: comboId, label: comboTitle })),
                ]}
                onChange={changeCombo}
              />
            </div>
          </div>
        </div>

        <div className="relative z-0 grid flex-1 auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-5 gap-y-8 py-6">
          {pageItems.map((item, index) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              index={index}
              coverAlt={text.gallery.coverAlt.replace("{title}", `${item.model} ${item.title}`)}
              onOpen={() => openPreview((page - 1) * pageSize + index)}
              onLoadVotes={() => loadVotesFor([item.id])}
              onVote={() => voteFor(item.id)}
              voteCount={loadedVoteIds.has(item.id) ? voteCounts[item.id] ?? 0 : undefined}
              voteLabel={
                votesAvailable
                  ? votedIds.has(item.id)
                    ? text.common.liked
                    : text.common.like
                  : text.common.likesUnavailable
              }
              voted={votedIds.has(item.id)}
              voting={!votesAvailable || votingId === item.id}
            />
          ))}
          {pageItems.length === 0 ? (
            <div className="min-h-64 border border-zinc-950/15 p-8 text-lg text-zinc-500">
              {text.gallery.empty}
            </div>
          ) : null}
        </div>

        <div className="arena-enter flex min-h-16 flex-col items-center justify-center gap-3 border-t border-zinc-950/15 py-4 sm:flex-row sm:justify-between">
          <span className="font-mono text-sm tabular-nums text-zinc-500">
            {text.gallery.page.replace("{page}", String(page)).replace("{total}", String(pageCount))}
          </span>
          <Pagination aria-label={locale === "zh-CN" ? "分页" : "pagination"} className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text={text.gallery.previous}
                  aria-label={text.gallery.previous}
                  aria-disabled={page === 1}
                  tabIndex={page === 1 ? -1 : undefined}
                  className={`h-11! min-w-11! ${page === 1 ? "pointer-events-none opacity-35" : ""}`}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((value) => Math.max(1, value - 1))
                  }}
                />
              </PaginationItem>
              {pages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    className="size-11!"
                    aria-label={`${text.gallery.page.replace("{page}", String(pageNumber)).replace("{total}", String(pageCount))}`}
                    onClick={(event) => {
                      event.preventDefault()
                      setPage(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text={text.gallery.next}
                  aria-label={text.gallery.next}
                  aria-disabled={page === pageCount}
                  tabIndex={page === pageCount ? -1 : undefined}
                  className={`h-11! min-w-11! ${page === pageCount ? "pointer-events-none opacity-35" : ""}`}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((value) => Math.min(pageCount, value + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        {selectedItem ? (
          <DialogContent className="w-[min(1180px,calc(100vw_-_1.5rem))] max-w-none overflow-hidden border-zinc-950/15 bg-[#f7f7f2] p-0 sm:max-w-none">
            <div className="flex max-h-[calc(100vh-1.5rem)] flex-col">
              <DialogHeader className="grid gap-4 border-b border-zinc-950/15 p-4 pr-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:p-5 sm:pr-14">
                <div className="min-w-0 pr-2">
                  <DialogDescription className="font-mono text-xs text-zinc-500">
                    {selectedItem.numericId} · {selectedItem.model} · {selectedItem.skillChainLabel}
                  </DialogDescription>
                  <DialogTitle className="mt-2 text-3xl leading-none tracking-[-0.02em] sm:text-4xl">
                    {selectedItem.title}
                  </DialogTitle>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <PreviewDialogAction
                    type="button"
                    disabled={!votesAvailable || votedIds.has(selectedItem.id) || votingId === selectedItem.id}
                    onClick={() => voteFor(selectedItem.id)}
                  >
                    <Heart size={15} aria-hidden="true" className={votedIds.has(selectedItem.id) ? "fill-current" : ""} />
                    {voteCounts[selectedItem.id] ?? 0}
                  </PreviewDialogAction>
                  <PreviewDialogAction type="button" onClick={() => moveSelection(-1)}>
                    <ChevronLeft size={15} aria-hidden="true" />
                    {text.common.previous}
                  </PreviewDialogAction>
                  <PreviewDialogAction type="button" onClick={() => moveSelection(1)}>
                    {text.common.next}
                    <ChevronRight size={15} aria-hidden="true" />
                  </PreviewDialogAction>
                  <PreviewDialogAction href={selectedItem.demoUrl}>
                    {text.common.openResult}
                    <Maximize2 size={15} aria-hidden="true" />
                  </PreviewDialogAction>
                </div>
              </DialogHeader>

              <div
                className="mx-auto overflow-hidden bg-zinc-100"
                style={{
                  width: `${1440 * previewScale}px`,
                  height: `${900 * previewScale}px`,
                }}
              >
                <iframe
                  key={selectedItem.id}
                  src={selectedItem.demoUrl}
                  title={`${selectedItem.model} ${selectedItem.title}`}
                  className="h-[900px] w-[1440px] max-w-none origin-top-left border-0 bg-white"
                  style={{
                    transform: `scale(${previewScale})`,
                  }}
                />
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>

      <Dialog open={promptOpen} onOpenChange={setPromptOpen}>
        <DialogContent className="w-[min(980px,calc(100vw_-_2rem))] max-w-none gap-5 border-zinc-950/15 bg-[#f7f7f2] p-5 sm:max-w-none">
          <DialogHeader className="border-b border-zinc-950/15 pb-4">
            <DialogDescription className="font-mono text-xs uppercase text-zinc-500">
              {text.common.promptHint}
            </DialogDescription>
            <DialogTitle className="text-4xl leading-none">{text.common.promptTitle}</DialogTitle>
          </DialogHeader>
          <pre className="max-h-[62vh] overflow-auto border-y border-zinc-950/15 py-4 font-mono text-xs leading-5 whitespace-pre-wrap text-zinc-700">
            {handoffPrompt}
          </pre>
          <div className="flex justify-end">
            <Button type="button" onClick={copyPrompt}>
              {copiedPrompt ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
              {copiedPrompt ? text.common.copied : text.common.copyPrompt}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={skillsOpen} onOpenChange={setSkillsOpen}>
        <DialogContent className="w-[min(920px,calc(100vw_-_2rem))] max-w-none gap-5 border-zinc-950/15 bg-[#f7f7f2] p-5 sm:max-w-none">
          <DialogHeader className="border-b border-zinc-950/15 pb-4">
            <DialogDescription className="font-mono text-xs text-zinc-500">
              {text.common.skillSource}
            </DialogDescription>
            <DialogTitle className="text-4xl leading-none">{text.common.skillsSummary}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[64vh] overflow-auto border-b border-zinc-950/15">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="grid gap-3 border-t border-zinc-950/15 py-4 sm:grid-cols-[48px_minmax(170px,260px)_minmax(0,1fr)]"
              >
                <div className="font-mono text-xs tabular-nums text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="grid content-start gap-1">
                  <h3 className="text-lg font-semibold leading-tight">{skill.name}</h3>
                  {skill.aliases?.length ? (
                    <p className="font-mono text-xs text-zinc-500">{skill.aliases.join(" / ")}</p>
                  ) : null}
                </div>
                <div className="grid content-start gap-2">
                  <p className="text-sm leading-6 text-zinc-700">
                    {locale === "en-US" ? skill.summaryEn ?? skill.summary : skill.summary}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
                    {skill.officialUrl ? <SmallSourceLink href={skill.officialUrl} label={text.common.official} /> : null}
                    {skill.githubUrl ? <SmallSourceLink href={skill.githubUrl} label="GitHub" /> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function SmallSourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-8 items-center gap-1 text-zinc-700 underline decoration-zinc-950/25 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
    >
      {label}
      <ExternalLink size={12} aria-hidden="true" />
    </a>
  )
}

type PreviewDialogActionProps =
  | {
      children: ReactNode
      href: string
      onClick?: never
      type?: never
    }
  | {
      children: ReactNode
      href?: never
      onClick: () => void
      type: "button"
      disabled?: boolean
    }

function PreviewDialogAction(props: PreviewDialogActionProps) {
  const className =
    "inline-flex min-h-10 items-center gap-2 border border-zinc-950/15 px-3 font-mono text-xs text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 disabled:cursor-default disabled:opacity-45 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"

  if (props.href) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer" className={className}>
        {props.children}
      </a>
    )
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={"disabled" in props ? props.disabled : undefined}
      className={className}
    >
      {props.children}
    </button>
  )
}

function FilterMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}) {
  const selected = options.find((option) => option.value === value) ?? options[0]

  return (
    <details
      className="group relative"
      onBlur={(event) => {
        const next = event.relatedTarget
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          event.currentTarget.removeAttribute("open")
        }
      }}
    >
      <summary
        className="grid min-h-16 cursor-pointer list-none gap-1 outline-none [&::-webkit-details-marker]:hidden"
        aria-label={label}
      >
        <span className="font-mono text-[11px] uppercase text-zinc-500">{label}</span>
        <span className="flex min-h-11 items-center justify-between gap-4 text-left text-sm font-medium">
          <span className="min-w-0 break-words">{selected?.label}</span>
          <span className="font-mono text-xs text-zinc-500 transition group-open:rotate-180" aria-hidden="true">
            ↓
          </span>
        </span>
      </summary>
      <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-72 overflow-auto border border-zinc-950/15 bg-[#f7f7f2] shadow-[0_24px_60px_rgba(24,24,27,0.12)]">
        {options.map((option) => {
          const selectedOption = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selectedOption}
              onClick={(event) => {
                onChange(option.value)
                event.currentTarget.closest("details")?.removeAttribute("open")
              }}
              className={`flex min-h-11 w-full items-center border-b border-zinc-950/10 px-3 py-2 text-left text-sm last:border-b-0 ${
                selectedOption
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-700 transition hover:bg-zinc-950/5 hover:text-zinc-950"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </details>
  )
}
