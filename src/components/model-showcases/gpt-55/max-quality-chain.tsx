import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "max-quality-chain",
  title: "Max Quality Chain",
  modelName: "GPT 5.5",
  chain: "frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable",
  product: "Muse",
  defaultBrief:
    "Create the highest-detail Muse campaign studio for a clinical-grade hydration wearable launch.",
  controlLabels: {
    audience: "Health audience",
    channel: "Clinical channel",
    tone: "Evidence tone",
    style: "Quality system",
  },
  controls: {
    audiences: ["Endurance athletes", "Clinical partners", "Wellness teams"],
    channels: ["Clinical brief", "Athlete launch", "Partner deck"],
    tones: ["Measured", "Credible", "Actionable"],
    styles: ["Evidence dashboard", "Body signal map", "Protocol cards"],
  },
  concepts: [
    {
      id: "A",
      name: "Signal Protocol",
      headline: "Explain the body signal with enough clarity to act.",
      angle: "Evidence, protocol, and next action.",
      line: "Hydration guidance before performance drops.",
      motif: "Signal map",
      reach: 690,
      ctr: 4.8,
      conversion: 4.8,
    },
    {
      id: "B",
      name: "Race Window",
      headline: "Frame the launch around the hour decisions matter most.",
      angle: "Athlete readiness and timing.",
      line: "Drink for the next split, not the last one.",
      motif: "Race window",
      reach: 760,
      ctr: 5.0,
      conversion: 4.5,
    },
    {
      id: "C",
      name: "Care Team",
      headline: "Give clinical partners a campaign they can validate.",
      angle: "Protocol clarity and patient-safe wording.",
      line: "A signal that fits the care plan.",
      motif: "Protocol deck",
      reach: 620,
      ctr: 4.7,
      conversion: 5.1,
    },
  ],
  theme: {
    page: "bg-cyan-50 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-cyan-100 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#ecfeff,#ffffff_45%,#a5f3fc)] text-slate-950",
    accent: "bg-cyan-800 text-white hover:bg-cyan-700",
    accentText: "text-cyan-950",
    border: "border-cyan-200",
    chip: "bg-cyan-800 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "command",
  activity: ["Quality chain loaded", "Clinical wording checked", "Responsive state ready"],
}

export default function MaxQualityChain() {
  return <MuseShowcase spec={spec} />
}
