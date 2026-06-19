import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "visual-frontend",
  title: "Visual Frontend",
  modelName: "GPT 5.5",
  chain: "frontend-skill",
  product: "Muse",
  defaultBrief:
    "Create a bold campaign for Muse promoting a limited edition travel camera to style-led explorers.",
  controlLabels: {
    audience: "Audience lens",
    channel: "Launch surface",
    tone: "Voice",
    style: "Art direction",
  },
  controls: {
    audiences: ["Style-led explorers", "Weekend filmmakers", "Travel editors"],
    channels: ["Short video", "Out-of-home", "Creator kit"],
    tones: ["Cinematic", "Electric", "Editorial"],
    styles: ["High color", "Night chrome", "Flash editorial"],
  },
  concepts: [
    {
      id: "A",
      name: "Afterlight",
      headline: "Turn the city after dark into the product demo.",
      angle: "A striking night campaign with saturated street moments.",
      line: "Pocket the shot before the light disappears.",
      motif: "Night frame",
      reach: 1050,
      ctr: 5.1,
      conversion: 3.4,
    },
    {
      id: "B",
      name: "Fast Passport",
      headline: "A fast-moving launch built for the carry-on creator.",
      angle: "Trip fragments, location cards, and quick edits.",
      line: "Every transfer has a frame worth keeping.",
      motif: "Transit strip",
      reach: 1180,
      ctr: 4.7,
      conversion: 3.2,
    },
    {
      id: "C",
      name: "Local Color",
      headline: "Make the campaign feel collected, not staged.",
      angle: "Texture-led scenes and local finds.",
      line: "Keep the color the map cannot name.",
      motif: "Color swatches",
      reach: 980,
      ctr: 5.3,
      conversion: 3.6,
    },
  ],
  theme: {
    page: "bg-zinc-950 text-white",
    panel: "bg-zinc-900 text-white",
    mutedPanel: "bg-fuchsia-950/40 text-white",
    preview: "bg-[radial-gradient(circle_at_25%_20%,#fb7185,#111827_36%,#020617)] text-white",
    accent: "bg-fuchsia-400 text-zinc-950 hover:bg-fuchsia-300",
    accentText: "text-fuchsia-950",
    border: "border-white/15",
    chip: "bg-fuchsia-300 text-zinc-950",
    metric: "bg-white/10 text-white",
  },
  previewMode: "cinema",
  activity: ["Visual direction opened", "Short video channel selected", "Preview lighting synced"],
}

export default function VisualFrontend() {
  return <MuseShowcase spec={spec} />
}
