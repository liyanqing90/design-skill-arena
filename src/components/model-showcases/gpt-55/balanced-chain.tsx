import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "balanced-chain",
  title: "Balanced Chain",
  modelName: "GPT 5.5",
  chain: "frontend-app-builder + taste-skill + impeccable",
  product: "Muse",
  defaultBrief:
    "Build a balanced Muse campaign for a sustainable cleaning concentrate launch across retail and email.",
  controlLabels: {
    audience: "Household",
    channel: "Launch lane",
    tone: "Claim style",
    style: "Visual proof",
  },
  controls: {
    audiences: ["Busy households", "Eco switchers", "Retail buyers"],
    channels: ["Retail endcap", "Refill email", "Social proof"],
    tones: ["Practical", "Low-waste", "Confident"],
    styles: ["Refill system", "Shelf comparison", "Usage sequence"],
  },
  concepts: [
    {
      id: "A",
      name: "Refill Math",
      headline: "Make the switch feel easier than buying another bottle.",
      angle: "Cost, storage, and refill cadence.",
      line: "One small bottle, fewer repeat decisions.",
      motif: "Refill sequence",
      reach: 930,
      ctr: 4.7,
      conversion: 4.2,
    },
    {
      id: "B",
      name: "Cabinet Reset",
      headline: "Show the after-state buyers can picture at home.",
      angle: "Cabinet simplicity and clean labels.",
      line: "A cabinet with room to breathe.",
      motif: "Shelf reset",
      reach: 880,
      ctr: 4.9,
      conversion: 4.0,
    },
    {
      id: "C",
      name: "Store Proof",
      headline: "Give retail teams a campaign that explains the refill fast.",
      angle: "Endcap clarity and repeat purchase logic.",
      line: "The refill story fits on the shelf.",
      motif: "Endcap frame",
      reach: 970,
      ctr: 4.4,
      conversion: 4.3,
    },
  ],
  theme: {
    page: "bg-teal-50 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-teal-100 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#ccfbf1,#ffffff_55%,#99f6e4)] text-slate-950",
    accent: "bg-teal-800 text-white hover:bg-teal-700",
    accentText: "text-teal-950",
    border: "border-teal-200",
    chip: "bg-teal-800 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "ops",
  activity: ["Balanced chain loaded", "Taste pass complete", "Polish states visible"],
}

export default function BalancedChain() {
  return <MuseShowcase spec={spec} />
}
