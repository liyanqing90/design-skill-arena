import type { SkillTag } from "@/types/showcase"

export const defaultLocale = "zh-CN"

export const messages = {
  "zh-CN": {
    common: {
      siteName: "Design Skill Arena",
      model: "GPT-5.5",
      openResult: "打开页面",
      skillDetails: "技能资料",
      sideBySide: "并排查看",
      skills: "技能资料",
      setup: "展示说明",
    },
    home: {
      title: "Design Skill Arena",
      kicker: "GPT-5.5 中文展示集",
      intro: "同一个 Muse 产品页面题材，展示 18 条前端设计 skill chain 的渲染效果。",
      galleryTitle: "渲染效果墙",
      galleryIntro: "卡片优先展示页面视觉结果。点击打开独立 Muse 页面，新标签查看。",
      docs: "查看技能资料",
      count: "18 个页面",
    },
    card: {
      chain: "使用链路",
      focus: "展示重点",
      pending: "待接入独立页面",
    },
    preview: {
      studio: "AI 活动工作台",
      launch: "新品发布",
      audience: "人群: 城市早期用户",
      channel: "渠道: 社交发布套件",
      tone: "语气: 精准、克制、有动势",
    },
    footer: {
      line1: "Design Skill Arena 使用本地 mock 数据、静态路由和独立结果页。",
      line2: "当前版本不调用模型 API，不接数据库，不使用 Server Actions、KV、Blob 或 ISR。",
    },
    gallery: {
      allModels: "全部模型",
      allCombos: "全部组合",
      combo: "组合",
      coverAlt: "{title} 页面封面",
      empty: "没有匹配页面",
      model: "模型",
      next: "下一页",
      page: "第 {page} / {total} 页",
      previous: "上一页",
      showing: "{count} 个页面",
    },
  },
  "en-US": {
    common: {
      siteName: "Design Skill Arena",
      model: "GPT-5.5",
      openResult: "Open",
      skillDetails: "Skills",
      sideBySide: "Compare",
      skills: "Skills",
      setup: "Method",
    },
    home: {
      title: "Design Skill Arena",
      kicker: "GPT-5.5 gallery",
      intro: "One Muse product surface rendered through 18 frontend design skill chains.",
      galleryTitle: "Gallery",
      galleryIntro: "Open each result as a standalone Muse page.",
      docs: "Skills",
      count: "18 pages",
    },
    card: {
      chain: "Chain",
      focus: "Focus",
      pending: "Standalone page pending",
    },
    preview: {
      studio: "AI campaign studio",
      launch: "Product launch",
      audience: "Audience: urban early users",
      channel: "Channel: social launch kit",
      tone: "Tone: precise, restrained, kinetic",
    },
    footer: {
      line1: "Design Skill Arena uses local mock data, static routes, and standalone result pages.",
      line2: "This version does not call model APIs, databases, Server Actions, KV, Blob, or ISR.",
    },
    gallery: {
      allModels: "All models",
      allCombos: "All chains",
      combo: "Chain",
      coverAlt: "{title} cover",
      empty: "No matching pages",
      model: "Model",
      next: "Next",
      page: "Page {page} / {total}",
      previous: "Previous",
      showing: "{count} pages",
    },
  },
} as const

export const t = messages[defaultLocale]

export const tagLabels: Record<SkillTag, string> = {
  Baseline: "基线",
  Visual: "视觉",
  Design: "设计",
  Taste: "审美",
  Polish: "精修",
  UX: "体验",
  Component: "组件",
  Artifact: "Artifact",
  Motion: "动效",
  Product: "产品",
  MaxQuality: "综合链路",
}
