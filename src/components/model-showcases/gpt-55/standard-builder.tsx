import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "standard-builder",
  title: "Standard Builder",
  modelName: "GPT 5.5",
  chain: "frontend-app-builder",
  product: "Muse",
  defaultBrief:
    "Launch Muse as the campaign studio for creative directors planning a premium wearable audio product.",
  controlLabels: {
    audience: "Target audience",
    channel: "Channel",
    tone: "Tone",
    style: "Visual style",
  },
  controls: {
    audiences: ["Urban creators", "Remote teams", "Early adopters"],
    channels: ["Paid social", "Launch email", "Retail display"],
    tones: ["Confident", "Useful", "Direct"],
    styles: ["Clean product", "Soft studio", "Sharp contrast"],
  },
  concepts: [
    {
      id: "A",
      name: "Daily Signal",
      headline: "A launch system that makes the first touch clear.",
      angle: "Product utility first, then proof.",
      line: "Hear the work before the room gets loud.",
      motif: "Signal cards",
      reach: 820,
      ctr: 4.2,
      conversion: 2.8,
    },
    {
      id: "B",
      name: "Desk Ritual",
      headline: "A calm campaign for the first ten minutes of focus.",
      angle: "Morning routine and team use cases.",
      line: "Start focused, stay reachable.",
      motif: "Workspace grid",
      reach: 760,
      ctr: 4.6,
      conversion: 3.1,
    },
    {
      id: "C",
      name: "Launch Proof",
      headline: "A proof-led campaign built around creative throughput.",
      angle: "Metrics, endorsements, and concise claims.",
      line: "Fewer pauses between idea and edit.",
      motif: "Evidence stack",
      reach: 910,
      ctr: 3.9,
      conversion: 2.6,
    },
  ],
  theme: {
    page: "bg-slate-100 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-slate-50 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#e2e8f0,#ffffff)] text-slate-950",
    accent: "bg-slate-950 text-white hover:bg-slate-800",
    accentText: "text-slate-950",
    border: "border-slate-200",
    chip: "bg-slate-950 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "poster",
  activity: ["Brief loaded", "Default audience selected", "Forecast ready"],
}

export default function StandardBuilder() {
  return <MuseShowcase spec={spec} />
}
