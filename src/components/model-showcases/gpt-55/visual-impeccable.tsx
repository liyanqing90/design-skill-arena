import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "visual-impeccable",
  title: "Visual + Impeccable",
  modelName: "GPT 5.5",
  chain: "frontend-skill + impeccable",
  product: "Muse",
  defaultBrief:
    "Create a visually premium Muse campaign for an electric city bike with complete interaction states.",
  controlLabels: {
    audience: "Rider",
    channel: "Hero channel",
    tone: "Momentum",
    style: "Campaign look",
  },
  controls: {
    audiences: ["City commuters", "Car-free families", "Design-conscious riders"],
    channels: ["Launch film", "Dealer display", "Transit ads"],
    tones: ["Effortless", "Assured", "Fast"],
    styles: ["Motion blur", "Street light", "Product silhouette"],
  },
  concepts: [
    {
      id: "A",
      name: "Green Wave",
      headline: "Show the city opening up around one quiet ride.",
      angle: "Movement, calm speed, and route control.",
      line: "Catch every green light you can plan for.",
      motif: "Signal sweep",
      reach: 1150,
      ctr: 5.4,
      conversion: 3.7,
    },
    {
      id: "B",
      name: "Cargo Hour",
      headline: "Turn the family errand into the product proof.",
      angle: "School runs, groceries, and low effort.",
      line: "The errand bike that still feels like a bike.",
      motif: "Route blocks",
      reach: 990,
      ctr: 5.0,
      conversion: 4.0,
    },
    {
      id: "C",
      name: "Quiet Torque",
      headline: "Sell power through restraint, not noise.",
      angle: "Clean product detail and silent acceleration.",
      line: "Enough power to stop thinking about hills.",
      motif: "Torque line",
      reach: 1040,
      ctr: 5.1,
      conversion: 3.9,
    },
  ],
  theme: {
    page: "bg-slate-950 text-white",
    panel: "bg-slate-900 text-white",
    mutedPanel: "bg-cyan-950/60 text-white",
    preview: "bg-[radial-gradient(circle_at_78%_20%,#67e8f9,#0f172a_36%,#020617)] text-white",
    accent: "bg-cyan-300 text-slate-950 hover:bg-cyan-200",
    accentText: "text-cyan-950",
    border: "border-cyan-100/15",
    chip: "bg-cyan-300 text-slate-950",
    metric: "bg-white/10 text-white",
  },
  previewMode: "broadcast",
  activity: ["Visual QA passed", "Focus state checked", "Export summary ready"],
}

export default function VisualImpeccable() {
  return <MuseShowcase spec={spec} />
}
