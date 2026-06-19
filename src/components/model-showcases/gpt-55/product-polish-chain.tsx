import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "product-polish-chain",
  title: "Product Polish Chain",
  modelName: "GPT 5.5",
  chain: "frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable",
  product: "Muse",
  defaultBrief:
    "Use Muse to craft a product-polished campaign for a developer observability tool launch.",
  controlLabels: {
    audience: "Technical buyer",
    channel: "Product channel",
    tone: "Technical stance",
    style: "Interface proof",
  },
  controls: {
    audiences: ["Platform engineers", "SRE leads", "Engineering managers"],
    channels: ["Docs banner", "Launch webinar", "Sales sandbox"],
    tones: ["Precise", "Operational", "Evidence-led"],
    styles: ["Dashboard proof", "Trace table", "Incident timeline"],
  },
  concepts: [
    {
      id: "A",
      name: "Trace First",
      headline: "Start with the trace that explains the outage fastest.",
      angle: "Concrete workflow and time-to-cause.",
      line: "Find the span before the status meeting.",
      motif: "Trace table",
      reach: 520,
      ctr: 4.1,
      conversion: 4.2,
    },
    {
      id: "B",
      name: "Incident Room",
      headline: "Sell the launch through a calmer incident workflow.",
      angle: "Role clarity, timeline, and handoff.",
      line: "One timeline for everyone on call.",
      motif: "Incident board",
      reach: 480,
      ctr: 4.5,
      conversion: 4.5,
    },
    {
      id: "C",
      name: "Deploy Proof",
      headline: "Show what changed before asking teams to change tools.",
      angle: "Deployment comparison and clear rollback story.",
      line: "Know the deploy that moved the metric.",
      motif: "Deploy rail",
      reach: 560,
      ctr: 4.0,
      conversion: 4.4,
    },
  ],
  theme: {
    page: "bg-slate-100 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-slate-200 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] text-slate-950",
    accent: "bg-slate-950 text-white hover:bg-slate-800",
    accentText: "text-slate-950",
    border: "border-slate-300",
    chip: "bg-slate-950 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "workbench",
  activity: ["Component rules applied", "Guideline states checked", "Polish pass ready"],
}

export default function ProductPolishChain() {
  return <MuseShowcase spec={spec} />
}
