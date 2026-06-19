import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "visual-premium-chain",
  title: "Visual Premium Chain",
  modelName: "GPT 5.5",
  chain: "frontend-skill + taste-skill + impeccable",
  product: "Muse",
  defaultBrief:
    "Create a premium visual Muse campaign for a boutique hotel membership launch.",
  controlLabels: {
    audience: "Guest type",
    channel: "Premium channel",
    tone: "Hospitality voice",
    style: "Scene direction",
  },
  controls: {
    audiences: ["Frequent guests", "Design travelers", "Local members"],
    channels: ["Private invite", "Editorial feature", "Lobby display"],
    tones: ["Considered", "Personal", "Reserved"],
    styles: ["Room detail", "Night lobby", "Membership card"],
  },
  concepts: [
    {
      id: "A",
      name: "Second Key",
      headline: "Make membership feel like access, not a discount.",
      angle: "Private entry, room preference, and return ritual.",
      line: "A key for the stay you keep choosing.",
      motif: "Key card",
      reach: 640,
      ctr: 5.4,
      conversion: 4.3,
    },
    {
      id: "B",
      name: "Lobby Hour",
      headline: "Use one recurring hour as the campaign memory.",
      angle: "Local membership and evening rituals.",
      line: "The hour that makes the city feel booked for you.",
      motif: "Lobby glow",
      reach: 610,
      ctr: 5.7,
      conversion: 4.0,
    },
    {
      id: "C",
      name: "Return Note",
      headline: "A quieter campaign built around recognition.",
      angle: "Preference memory and human service.",
      line: "The room remembers what you asked for.",
      motif: "Guest note",
      reach: 580,
      ctr: 5.1,
      conversion: 4.6,
    },
  ],
  theme: {
    page: "bg-zinc-950 text-white",
    panel: "bg-zinc-900 text-white",
    mutedPanel: "bg-violet-950/50 text-white",
    preview: "bg-[radial-gradient(circle_at_30%_10%,#c4b5fd,#18181b_34%,#020617)] text-white",
    accent: "bg-violet-300 text-zinc-950 hover:bg-violet-200",
    accentText: "text-violet-950",
    border: "border-white/15",
    chip: "bg-violet-300 text-zinc-950",
    metric: "bg-white/10 text-white",
  },
  previewMode: "stage",
  activity: ["Premium direction set", "Polish pass complete", "Invite copy saved"],
}

export default function VisualPremiumChain() {
  return <MuseShowcase spec={spec} />
}
