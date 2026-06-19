import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "ux-pro-reference",
  title: "UX Pro Reference",
  modelName: "GPT 5.5",
  chain: "ui-ux-pro-max",
  product: "Muse",
  defaultBrief:
    "Use Muse to create a measurable launch plan for a family finance app with trust and onboarding states.",
  controlLabels: {
    audience: "User group",
    channel: "Acquisition channel",
    tone: "Trust stance",
    style: "UX pattern",
  },
  controls: {
    audiences: ["New families", "Shared households", "Financial coaches"],
    channels: ["App store", "Advisor webinar", "Referral email"],
    tones: ["Transparent", "Supportive", "Plainspoken"],
    styles: ["Journey map", "Checklist", "Trust markers"],
  },
  concepts: [
    {
      id: "A",
      name: "First Budget",
      headline: "Guide the user from anxiety to one clear next action.",
      angle: "Onboarding-first campaign with clear safety cues.",
      line: "Start with the bill everyone can agree on.",
      motif: "Step ladder",
      reach: 620,
      ctr: 4.0,
      conversion: 4.5,
    },
    {
      id: "B",
      name: "Shared Wallet",
      headline: "Make shared spending feel visible without judgment.",
      angle: "Household roles and permissions.",
      line: "See the shared plan before the shared stress.",
      motif: "Permission map",
      reach: 670,
      ctr: 4.2,
      conversion: 4.2,
    },
    {
      id: "C",
      name: "Coach Handoff",
      headline: "Give advisors a campaign that explains the first session.",
      angle: "Expert-led trust and activation.",
      line: "A plan your clients can open before they arrive.",
      motif: "Coach path",
      reach: 580,
      ctr: 4.8,
      conversion: 4.7,
    },
  ],
  theme: {
    page: "bg-sky-50 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-sky-100 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#e0f2fe,#ffffff_52%,#bae6fd)] text-slate-950",
    accent: "bg-sky-700 text-white hover:bg-sky-600",
    accentText: "text-sky-950",
    border: "border-sky-200",
    chip: "bg-sky-700 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "journey",
  activity: ["Accessibility states checked", "Journey step selected", "Trust copy reviewed"],
}

export default function UxProReference() {
  return <MuseShowcase spec={spec} />
}
