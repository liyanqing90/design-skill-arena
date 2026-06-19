import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "artifact-builder",
  title: "Artifact Builder",
  modelName: "GPT 5.5",
  chain: "web-artifacts-builder / artifacts-builder",
  product: "Muse",
  defaultBrief:
    "Generate a self-contained Muse campaign artifact for a compact espresso machine preorder.",
  controlLabels: {
    audience: "Buyer",
    channel: "Artifact surface",
    tone: "Pitch",
    style: "Canvas",
  },
  controls: {
    audiences: ["Apartment hosts", "Coffee hobbyists", "Gift buyers"],
    channels: ["Interactive one-pager", "Retail kiosk", "Email module"],
    tones: ["Tactile", "Efficient", "Inviting"],
    styles: ["Product tiles", "Recipe cards", "Countertop scene"],
  },
  concepts: [
    {
      id: "A",
      name: "Counter Kit",
      headline: "Package the preorder pitch as one useful artifact.",
      angle: "Everything a buyer needs in one page.",
      line: "A better cup without adding another appliance.",
      motif: "Module board",
      reach: 870,
      ctr: 4.5,
      conversion: 3.7,
    },
    {
      id: "B",
      name: "Morning Stack",
      headline: "Turn the campaign into a compact routine builder.",
      angle: "Recipes, time saved, and accessory pairing.",
      line: "Three minutes from counter to crema.",
      motif: "Recipe stack",
      reach: 820,
      ctr: 4.8,
      conversion: 3.9,
    },
    {
      id: "C",
      name: "Gift Mode",
      headline: "Make gifting feel precise instead of generic.",
      angle: "Recipient profiles and guided bundles.",
      line: "A gift that knows their first cup.",
      motif: "Bundle cards",
      reach: 900,
      ctr: 4.2,
      conversion: 4.1,
    },
  ],
  theme: {
    page: "bg-zinc-100 text-zinc-950",
    panel: "bg-white text-zinc-950",
    mutedPanel: "bg-amber-100/70 text-zinc-950",
    preview: "bg-[linear-gradient(135deg,#451a03,#92400e_55%,#fef3c7)] text-amber-50",
    accent: "bg-amber-300 text-zinc-950 hover:bg-amber-200",
    accentText: "text-zinc-950",
    border: "border-amber-900/20",
    chip: "bg-amber-300 text-zinc-950",
    metric: "bg-white/70 text-zinc-950",
  },
  previewMode: "artifact",
  activity: ["Artifact canvas created", "Module order set", "Export slots available"],
}

export default function ArtifactBuilder() {
  return <MuseShowcase spec={spec} />
}
