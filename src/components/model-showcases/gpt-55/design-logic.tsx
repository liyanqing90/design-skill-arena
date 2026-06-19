import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "design-logic",
  title: "Design Logic",
  modelName: "GPT 5.5",
  chain: "frontend-design",
  product: "Muse",
  defaultBrief:
    "Use Muse to plan a structured launch campaign for a modular home energy monitor.",
  controlLabels: {
    audience: "Decision maker",
    channel: "Information channel",
    tone: "Argument",
    style: "System view",
  },
  controls: {
    audiences: ["Homeowners", "Energy advisors", "Property managers"],
    channels: ["Explainer page", "Webinar deck", "Installer leave-behind"],
    tones: ["Practical", "Evidence-led", "Calm"],
    styles: ["Blueprint", "Data sheets", "House diagram"],
  },
  concepts: [
    {
      id: "A",
      name: "Usage Map",
      headline: "Show the hidden energy pattern before selling the device.",
      angle: "Problem framing, then product role.",
      line: "Find the load before it becomes the bill.",
      motif: "Room grid",
      reach: 640,
      ctr: 3.8,
      conversion: 3.4,
    },
    {
      id: "B",
      name: "Bill Story",
      headline: "Turn a confusing monthly bill into a campaign path.",
      angle: "Before and after energy decisions.",
      line: "A bill that finally explains itself.",
      motif: "Statement logic",
      reach: 700,
      ctr: 4.1,
      conversion: 3.6,
    },
    {
      id: "C",
      name: "Installer Proof",
      headline: "Give experts the materials to explain the product once.",
      angle: "Trade confidence and clean handoff.",
      line: "Install once, explain clearly.",
      motif: "Checklist map",
      reach: 590,
      ctr: 4.4,
      conversion: 3.9,
    },
  ],
  theme: {
    page: "bg-stone-100 text-stone-950",
    panel: "bg-white text-stone-950",
    mutedPanel: "bg-stone-200/70 text-stone-950",
    preview: "bg-[linear-gradient(90deg,#fafaf9_0_50%,#e7e5e4_50%)] text-stone-950",
    accent: "bg-stone-950 text-white hover:bg-stone-800",
    accentText: "text-stone-950",
    border: "border-stone-300",
    chip: "bg-stone-950 text-white",
    metric: "bg-white text-stone-950",
  },
  previewMode: "blueprint",
  activity: ["Logic grid initialized", "Audience path mapped", "Metrics model ready"],
}

export default function DesignLogic() {
  return <MuseShowcase spec={spec} />
}
