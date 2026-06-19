import { MuseShowcase, type ShowcaseSpec } from "./muse-showcase"

const spec: ShowcaseSpec = {
  id: "component-system",
  title: "Component System",
  modelName: "GPT 5.5",
  chain: "shadcn-best-practices / shadcn",
  product: "Muse",
  defaultBrief:
    "Build a component-consistent Muse campaign studio for a B2B desk booking platform launch.",
  controlLabels: {
    audience: "Buying role",
    channel: "Component surface",
    tone: "Message system",
    style: "UI vocabulary",
  },
  controls: {
    audiences: ["Ops leaders", "Office admins", "Hybrid teams"],
    channels: ["Product tour", "Sales follow-up", "Admin webinar"],
    tones: ["Operational", "Concise", "Helpful"],
    styles: ["Component grid", "Admin chrome", "Table-driven"],
  },
  concepts: [
    {
      id: "A",
      name: "Desk Map",
      headline: "A campaign assembled from predictable product components.",
      angle: "Show the map, policy, and booking path.",
      line: "Every desk has a status before anyone asks.",
      motif: "Component rail",
      reach: 540,
      ctr: 3.9,
      conversion: 3.5,
    },
    {
      id: "B",
      name: "Policy Sync",
      headline: "Lead with the admin control buyers actually need.",
      angle: "Rules, limits, and team patterns.",
      line: "A booking policy people can follow.",
      motif: "Rule cards",
      reach: 510,
      ctr: 4.2,
      conversion: 3.8,
    },
    {
      id: "C",
      name: "Team Week",
      headline: "Show the launch through a Monday to Friday team pattern.",
      angle: "Calendar view and capacity clarity.",
      line: "Know the week before the commute.",
      motif: "Week table",
      reach: 610,
      ctr: 4.0,
      conversion: 3.6,
    },
  ],
  theme: {
    page: "bg-neutral-100 text-neutral-950",
    panel: "bg-white text-neutral-950",
    mutedPanel: "bg-neutral-200/80 text-neutral-950",
    preview: "bg-[linear-gradient(135deg,#fafafa,#e5e5e5)] text-neutral-950",
    accent: "bg-neutral-950 text-white hover:bg-neutral-800",
    accentText: "text-neutral-950",
    border: "border-neutral-300",
    chip: "bg-neutral-950 text-white",
    metric: "bg-white text-neutral-950",
  },
  previewMode: "system",
  activity: ["Component states loaded", "Selected variant synchronized", "Export buttons ready"],
}

export default function ComponentSystem() {
  return <MuseShowcase spec={spec} />
}
