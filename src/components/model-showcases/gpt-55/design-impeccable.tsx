import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "design-impeccable",
  title: "Design + Impeccable",
  modelName: "GPT 5.5",
  chain: "frontend-design + impeccable",
  product: "Muse",
  defaultBrief:
    "Plan a refined Muse launch campaign for a premium language learning notebook and companion app.",
  controlLabels: {
    audience: "Learner",
    channel: "Learning channel",
    tone: "Instruction style",
    style: "Layout system",
  },
  controls: {
    audiences: ["Self-study learners", "Tutors", "Study abroad planners"],
    channels: ["Course landing", "Tutor email", "Campus poster"],
    tones: ["Patient", "Structured", "Encouraging"],
    styles: ["Lesson spread", "Progress margin", "Practice cards"],
  },
  concepts: [
    {
      id: "A",
      name: "First Phrase",
      headline: "Make the first usable sentence the center of the campaign.",
      angle: "Immediate practice and visible progress.",
      line: "Write the phrase you can use today.",
      motif: "Lesson spread",
      reach: 780,
      ctr: 4.8,
      conversion: 4.0,
    },
    {
      id: "B",
      name: "Tutor Margin",
      headline: "Show how tutor feedback and self-study meet cleanly.",
      angle: "Notes, corrections, and habit loops.",
      line: "Keep the correction next to the attempt.",
      motif: "Margin notes",
      reach: 700,
      ctr: 4.6,
      conversion: 4.3,
    },
    {
      id: "C",
      name: "Trip Ready",
      headline: "A launch built around the moment learning becomes useful.",
      angle: "Travel scenarios and saved phrases.",
      line: "Practice for the sentence you will actually say.",
      motif: "Scenario deck",
      reach: 820,
      ctr: 4.5,
      conversion: 4.1,
    },
  ],
  theme: {
    page: "bg-slate-50 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-rose-50 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#fff1f2,#ffffff_52%,#ffe4e6)] text-slate-950",
    accent: "bg-rose-700 text-white hover:bg-rose-600",
    accentText: "text-rose-950",
    border: "border-rose-200",
    chip: "bg-rose-700 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "atelier",
  activity: ["Information hierarchy checked", "Selected concept refined", "Export copy aligned"],
}

export default function DesignImpeccable() {
  return <MuseShowcase spec={spec} />
}
