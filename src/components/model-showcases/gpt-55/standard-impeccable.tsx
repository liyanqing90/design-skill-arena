import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "standard-impeccable",
  title: "Standard + Impeccable",
  modelName: "GPT 5.5",
  chain: "frontend-app-builder + impeccable",
  product: "Muse",
  defaultBrief:
    "Plan a polished Muse campaign for a compact indoor herb garden with complete states.",
  controlLabels: {
    audience: "Home segment",
    channel: "Activation channel",
    tone: "Assurance",
    style: "Scene system",
  },
  controls: {
    audiences: ["Small kitchens", "New cooks", "Gift shoppers"],
    channels: ["Retail demo", "Welcome email", "Recipe partnership"],
    tones: ["Fresh", "Helpful", "Grounded"],
    styles: ["Kitchen closeup", "Growth chart", "Recipe shelf"],
  },
  concepts: [
    {
      id: "A",
      name: "First Sprig",
      headline: "A launch path that turns setup into the first product win.",
      angle: "Setup, first harvest, and meal use.",
      line: "Your first fresh ingredient is already planned.",
      motif: "Growth card",
      reach: 860,
      ctr: 4.9,
      conversion: 4.1,
    },
    {
      id: "B",
      name: "Kitchen Proof",
      headline: "Show that the product earns its counter space.",
      angle: "Size, care, and taste benefits.",
      line: "The counter space that gives back.",
      motif: "Counter frame",
      reach: 830,
      ctr: 4.5,
      conversion: 4.3,
    },
    {
      id: "C",
      name: "Gift Garden",
      headline: "A gift campaign with clear setup and low maintenance.",
      angle: "Recipient confidence and guided care.",
      line: "A living gift with instructions that work.",
      motif: "Care tiles",
      reach: 910,
      ctr: 4.3,
      conversion: 4.0,
    },
  ],
  theme: {
    page: "bg-green-50 text-stone-950",
    panel: "bg-white text-stone-950",
    mutedPanel: "bg-green-100 text-stone-950",
    preview: "bg-[linear-gradient(135deg,#dcfce7,#ffffff_55%,#bbf7d0)] text-stone-950",
    accent: "bg-green-800 text-white hover:bg-green-700",
    accentText: "text-green-950",
    border: "border-green-200",
    chip: "bg-green-800 text-white",
    metric: "bg-white text-stone-950",
  },
  previewMode: "polish",
  activity: ["Polish checklist ready", "Error copy prepared", "Success state visible"],
}

export default function StandardImpeccable() {
  return <MuseShowcase spec={spec} />
}
