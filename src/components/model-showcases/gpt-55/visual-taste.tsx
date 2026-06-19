import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "visual-taste",
  title: "Visual + Taste",
  modelName: "GPT 5.5",
  chain: "frontend-skill + taste-skill",
  product: "Muse",
  defaultBrief:
    "Shape a strong but restrained Muse campaign for a limited-run vinyl listening bar opening.",
  controlLabels: {
    audience: "Crowd",
    channel: "Cultural channel",
    tone: "Voice",
    style: "Visual restraint",
  },
  controls: {
    audiences: ["Music collectors", "Date night planners", "Local press"],
    channels: ["Poster drop", "Invite email", "Street projection"],
    tones: ["Selective", "Warm", "Matter-of-fact"],
    styles: ["Record sleeve", "Low light", "Type-led poster"],
  },
  concepts: [
    {
      id: "A",
      name: "Needle Drop",
      headline: "A launch that sounds specific before anyone hears it.",
      angle: "Record culture with edited visual detail.",
      line: "A room for one side at a time.",
      motif: "Sleeve grid",
      reach: 690,
      ctr: 5.2,
      conversion: 3.8,
    },
    {
      id: "B",
      name: "Side B",
      headline: "Make the secondary night feel like the thing to find.",
      angle: "Limited seat drops and quiet urgency.",
      line: "The second side starts at nine.",
      motif: "Seat list",
      reach: 620,
      ctr: 5.6,
      conversion: 4.0,
    },
    {
      id: "C",
      name: "Listening Note",
      headline: "A press-ready campaign built from one memorable note.",
      angle: "Editorial tone and precise venue cues.",
      line: "No playlist, just the room.",
      motif: "Note card",
      reach: 660,
      ctr: 5.0,
      conversion: 3.9,
    },
  ],
  theme: {
    page: "bg-neutral-950 text-stone-50",
    panel: "bg-stone-900 text-stone-50",
    mutedPanel: "bg-red-950/50 text-stone-50",
    preview: "bg-[linear-gradient(145deg,#1c1917,#7f1d1d_58%,#0c0a09)] text-stone-50",
    accent: "bg-red-300 text-stone-950 hover:bg-red-200",
    accentText: "text-red-950",
    border: "border-stone-50/15",
    chip: "bg-red-300 text-stone-950",
    metric: "bg-white/10 text-stone-50",
  },
  previewMode: "editorial",
  activity: ["Visual contrast reduced", "Poster variant selected", "Invite tone cleaned"],
}

export default function VisualTaste() {
  return <MuseShowcase spec={spec} />
}
