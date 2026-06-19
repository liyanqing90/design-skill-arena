import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "standard-taste",
  title: "Standard + Taste",
  modelName: "GPT 5.5",
  chain: "frontend-app-builder + taste-skill",
  product: "Muse",
  defaultBrief:
    "Use Muse to shape a restrained launch campaign for a repairable everyday backpack.",
  controlLabels: {
    audience: "Buyer context",
    channel: "Quiet channel",
    tone: "Copy stance",
    style: "Material direction",
  },
  controls: {
    audiences: ["Daily commuters", "Design students", "Repair advocates"],
    channels: ["Editorial email", "Product page", "Partner newsletter"],
    tones: ["Plain", "Durable", "Specific"],
    styles: ["Canvas detail", "Repair labels", "Utility photo"],
  },
  concepts: [
    {
      id: "A",
      name: "Carry Longer",
      headline: "A campaign about fewer replacements and better mornings.",
      angle: "Durability without loud outdoor tropes.",
      line: "The bag you keep repairing on purpose.",
      motif: "Material detail",
      reach: 720,
      ctr: 4.4,
      conversion: 3.7,
    },
    {
      id: "B",
      name: "Pocket Logic",
      headline: "Show the design decisions buyers can feel every day.",
      angle: "Functional details and a clean comparison.",
      line: "Every pocket has a reason.",
      motif: "Pocket map",
      reach: 680,
      ctr: 4.6,
      conversion: 3.9,
    },
    {
      id: "C",
      name: "Repair Receipt",
      headline: "Make the service model the memorable campaign asset.",
      angle: "Repair credits and material transparency.",
      line: "A receipt that says keep it.",
      motif: "Receipt grid",
      reach: 750,
      ctr: 4.2,
      conversion: 4.1,
    },
  ],
  theme: {
    page: "bg-zinc-50 text-zinc-950",
    panel: "bg-white text-zinc-950",
    mutedPanel: "bg-zinc-100 text-zinc-950",
    preview: "bg-[linear-gradient(135deg,#fafafa,#d4d4d8)] text-zinc-950",
    accent: "bg-zinc-950 text-white hover:bg-zinc-800",
    accentText: "text-zinc-950",
    border: "border-zinc-200",
    chip: "bg-zinc-950 text-white",
    metric: "bg-white text-zinc-950",
  },
  previewMode: "gallery",
  activity: ["Taste pass applied", "Copy density reduced", "Material cue selected"],
}

export default function StandardTaste() {
  return <MuseShowcase spec={spec} />
}
