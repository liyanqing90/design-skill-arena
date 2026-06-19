import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "motion-bits",
  title: "Motion Bits",
  modelName: "GPT 5.5",
  chain: "react-bits",
  product: "Muse",
  defaultBrief:
    "Create a motion-aware Muse launch campaign for a personal fitness ring with clear micro-interactions.",
  controlLabels: {
    audience: "Movement group",
    channel: "Motion channel",
    tone: "Energy",
    style: "Animation cue",
  },
  controls: {
    audiences: ["Daily runners", "Recovery focused", "Performance coaches"],
    channels: ["Interactive ad", "App interstitial", "Launch microsite"],
    tones: ["Kinetic", "Focused", "Encouraging"],
    styles: ["Pulse trail", "Progress loops", "Split timing"],
  },
  concepts: [
    {
      id: "A",
      name: "Pulse Loop",
      headline: "Use motion to show progress without slowing the task.",
      angle: "A looped proof point for daily streaks.",
      line: "Feel the pattern before reading the chart.",
      motif: "Pulse rings",
      reach: 940,
      ctr: 5.0,
      conversion: 3.5,
    },
    {
      id: "B",
      name: "Recovery Arc",
      headline: "Make stillness feel like an active product benefit.",
      angle: "Recovery timeline and rest cues.",
      line: "The quiet metric that keeps training moving.",
      motif: "Arc timeline",
      reach: 880,
      ctr: 4.6,
      conversion: 3.8,
    },
    {
      id: "C",
      name: "Coach Signal",
      headline: "Show coaches the signal they can act on today.",
      angle: "Team dashboard and athlete readiness.",
      line: "A signal ready before the session starts.",
      motif: "Signal trail",
      reach: 790,
      ctr: 4.9,
      conversion: 4.0,
    },
  ],
  theme: {
    page: "bg-emerald-950 text-emerald-50",
    panel: "bg-emerald-900 text-emerald-50",
    mutedPanel: "bg-teal-900 text-emerald-50",
    preview: "bg-[radial-gradient(circle_at_70%_20%,#34d399,#064e3b_36%,#022c22)] text-emerald-50",
    accent: "bg-emerald-300 text-emerald-950 hover:bg-emerald-200",
    accentText: "text-emerald-950",
    border: "border-emerald-200/15",
    chip: "bg-emerald-300 text-emerald-950",
    metric: "bg-white/10 text-emerald-50",
  },
  previewMode: "motion",
  activity: ["Motion state ready", "Hover transitions available", "Loading behavior staged"],
}

export default function MotionBits() {
  return <MuseShowcase spec={spec} />
}
