import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "design-ux-pro",
  title: "Design + UX Pro",
  modelName: "GPT 5.5",
  chain: "frontend-design + ui-ux-pro-max",
  product: "Muse",
  defaultBrief:
    "Use Muse to create a structured campaign for a privacy-first family location device.",
  controlLabels: {
    audience: "Trust audience",
    channel: "Education channel",
    tone: "Safety tone",
    style: "UX structure",
  },
  controls: {
    audiences: ["Parents", "Caregivers", "School groups"],
    channels: ["FAQ hub", "Retail explainer", "Community webinar"],
    tones: ["Respectful", "Clear", "Protective"],
    styles: ["Permission map", "Privacy table", "Scenario cards"],
  },
  concepts: [
    {
      id: "A",
      name: "Consent First",
      headline: "Start the campaign with what the device will not do.",
      angle: "Privacy boundaries before features.",
      line: "Location sharing with a clear off switch.",
      motif: "Consent matrix",
      reach: 560,
      ctr: 3.7,
      conversion: 4.6,
    },
    {
      id: "B",
      name: "Safe Route",
      headline: "Explain the everyday scenario before the technology.",
      angle: "School pickup and late bus stories.",
      line: "Know the route, not every moment.",
      motif: "Route ladder",
      reach: 620,
      ctr: 4.0,
      conversion: 4.4,
    },
    {
      id: "C",
      name: "Care Circle",
      headline: "Show permission, role, and alert flow in one view.",
      angle: "Family coordination without surveillance language.",
      line: "The right person sees the right alert.",
      motif: "Role rings",
      reach: 590,
      ctr: 4.2,
      conversion: 4.8,
    },
  ],
  theme: {
    page: "bg-indigo-50 text-slate-950",
    panel: "bg-white text-slate-950",
    mutedPanel: "bg-indigo-100 text-slate-950",
    preview: "bg-[linear-gradient(135deg,#e0e7ff,#ffffff_48%,#c7d2fe)] text-slate-950",
    accent: "bg-indigo-700 text-white hover:bg-indigo-600",
    accentText: "text-indigo-950",
    border: "border-indigo-200",
    chip: "bg-indigo-700 text-white",
    metric: "bg-white text-slate-950",
  },
  previewMode: "matrix",
  activity: ["Privacy matrix loaded", "Scenario state selected", "Error path available"],
}

export default function DesignUxPro() {
  return <MuseShowcase spec={spec} />
}
