import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "impeccable-full-flow",
  title: "Impeccable Full Flow",
  modelName: "GPT 5.5",
  chain: "impeccable",
  product: "Muse",
  defaultBrief:
    "Plan a complete Muse campaign for a premium sleep lamp, with polished states and precise handoff.",
  controlLabels: {
    audience: "Primary segment",
    channel: "Handoff channel",
    tone: "Copy tone",
    style: "Visual system",
  },
  controls: {
    audiences: ["New parents", "Shift workers", "Wellness buyers"],
    channels: ["Retail launch", "Lifecycle email", "Paid social"],
    tones: ["Reassuring", "Precise", "Quiet"],
    styles: ["Soft contrast", "Warm shadow", "Clinical calm"],
  },
  concepts: [
    {
      id: "A",
      name: "Night Reset",
      headline: "Make the product promise visible in the first glance.",
      angle: "Gentle rhythm, clear claims, low cognitive load.",
      line: "A softer signal for the end of the day.",
      motif: "Light gradient",
      reach: 730,
      ctr: 4.9,
      conversion: 4.0,
    },
    {
      id: "B",
      name: "Room Tone",
      headline: "A campaign that feels as considered as the lamp.",
      angle: "Lifestyle stills with precise control detail.",
      line: "Set the room before sleep has to arrive.",
      motif: "Dimmer rail",
      reach: 690,
      ctr: 5.0,
      conversion: 4.2,
    },
    {
      id: "C",
      name: "Sleep Cue",
      headline: "Use one repeated cue from ad to checkout.",
      angle: "Consistent interaction language across surfaces.",
      line: "One cue, every night.",
      motif: "Cue stack",
      reach: 760,
      ctr: 4.7,
      conversion: 4.4,
    },
  ],
  theme: {
    page: "bg-neutral-950 text-neutral-50",
    panel: "bg-neutral-900 text-neutral-50",
    mutedPanel: "bg-neutral-800 text-neutral-50",
    preview: "bg-[linear-gradient(145deg,#171717,#3f3f46_55%,#525252)] text-neutral-50",
    accent: "bg-lime-200 text-neutral-950 hover:bg-lime-100",
    accentText: "text-neutral-950",
    border: "border-white/12",
    chip: "bg-lime-200 text-neutral-950",
    metric: "bg-white/10 text-neutral-50",
  },
  previewMode: "studio",
  activity: ["Flow states checked", "Focus rings visible", "Export handoff staged"],
}

export default function ImpeccableFullFlow() {
  return <MuseShowcase spec={spec} />
}
