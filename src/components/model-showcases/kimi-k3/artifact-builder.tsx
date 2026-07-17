"use client"

import {
  ActivityList,
  ActionButtons,
  BriefEditor,
  ChainBadge,
  FieldSelect,
  MetricBlock,
  ModelBadge,
  SegmentedControl,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"
import { cn } from "@/lib/utils"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "web-artifacts-builder / artifacts-builder",
  brief:
    "Launch a foldable e-ink writing tablet with a campaign microsite assembled from modular artifact blocks.",
  controls: {
    audiences: ["Field journalists", "PhD researchers", "Minimal tech fans"],
    channels: ["Product Hunt", "Tech press kit", "Newsletter drop"],
    tones: ["Inventive", "Precise", "Playful"],
    styles: ["Blueprint paper", "Terminal mono", "Graph grid"],
  },
  concepts: [
    {
      id: "A",
      name: "Paper OS",
      headline: "A computer that reads like paper.",
      sub: "Interactive spec sheet built as a living document.",
      reach: 734,
      ctr: 5.2,
      conv: 3.3,
    },
    {
      id: "B",
      name: "Draft One",
      headline: "Every great draft starts here.",
      sub: "Writer-testimonial artifact with annotated margins.",
      reach: 689,
      ctr: 4.9,
      conv: 3.7,
    },
    {
      id: "C",
      name: "Fold Study",
      headline: "Engineering, unfolded in public.",
      sub: "Exploded-view microsite with step-through modules.",
      reach: 801,
      ctr: 4.4,
      conv: 3.0,
    },
  ],
  activity: ["Artifact scaffolded", "Blocks registered", "Preview composed"],
}

const blocks = ["Hero", "Spec table", "Quote rail", "Compare", "Footer CTA"] as const

export default function ArtifactBuilder() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#eef2f6] font-mono text-[#16202e]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border border-[#16202e]/15 bg-white px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="hidden text-[#16202e]/50 sm:block">artifact://muse/campaign</span>
            <StatusPill status={state.status} />
          </div>
        </header>

        <div className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <section className="border border-[#16202e]/15 bg-white p-4">
              <div className="mb-3 text-[11px] font-bold tracking-[0.18em] text-[#16202e]/50 uppercase">
                Blocks
              </div>
              <ul className="space-y-1.5">
                {blocks.map((block, index) => (
                  <li
                    key={block}
                    className="flex items-center justify-between border border-[#16202e]/10 bg-[#eef2f6] px-3 py-2 text-xs"
                  >
                    <span>{block}</span>
                    <span className="text-[#16202e]/40">0{index + 1}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="border border-[#16202e]/15 bg-white p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} label="Brief input" />
            </section>
            <section className="space-y-4 border border-[#16202e]/15 bg-white p-4">
              <FieldSelect
                label="Audience"
                value={state.audience}
                options={spec.controls.audiences}
                onChange={state.setAudience}
              />
              <FieldSelect
                label="Channel"
                value={state.channel}
                options={spec.controls.channels}
                onChange={state.setChannel}
              />
              <SegmentedControl
                label="Tone"
                value={state.tone}
                options={spec.controls.tones}
                onChange={state.setTone}
              />
              <SegmentedControl
                label="Style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
              />
            </section>
          </aside>

          <section className="space-y-4">
            <div className="border border-[#16202e]/15 bg-white">
              <div className="flex items-center justify-between border-b border-[#16202e]/10 px-4 py-2 text-[11px] tracking-[0.16em] text-[#16202e]/50 uppercase">
                <span>Composed preview</span>
                <span>
                  {state.channel} · {state.style}
                </span>
              </div>
              <div className="relative min-h-[340px] p-6 sm:min-h-[420px] sm:p-10">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#16202e12_1px,transparent_1px),linear-gradient(90deg,#16202e12_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative">
                  <div className="inline-flex border border-[#16202e] bg-[#16202e] px-2 py-1 text-[11px] font-bold text-white">
                    {state.concept.id} / {state.concept.name}
                  </div>
                  <h1 className="mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
                    {state.concept.headline}
                  </h1>
                  <p className="mt-3 max-w-md text-xs leading-relaxed text-[#16202e]/70 sm:text-sm">
                    {state.concept.sub} Targeting {state.audience.toLowerCase()} with a{" "}
                    {state.tone.toLowerCase()} voice.
                  </p>
                  <div className="mt-8 grid max-w-md grid-cols-3 gap-2">
                    <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
                    <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
                    <MetricBlock label="Conv" value={state.metrics.conv.toFixed(1)} suffix="%" />
                  </div>
                </div>
              </div>
            </div>

            <StatusNotice status={state.status} />

            <div className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className={cn(
                      "border px-3 py-3 text-left text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#16202e]/40",
                      selected
                        ? "border-[#16202e] bg-[#16202e] text-white"
                        : "border-[#16202e]/15 bg-white hover:border-[#16202e]/50"
                    )}
                  >
                    <span className="block font-bold">
                      [{concept.id}] {concept.name}
                    </span>
                    <span
                      className={cn("mt-1 block", selected ? "text-white/70" : "text-[#16202e]/60")}
                    >
                      {concept.sub}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_260px]">
              <div className="border border-[#16202e]/15 bg-white p-4">
                <ActionButtons state={state} />
              </div>
              <div className="border border-[#16202e]/15 bg-white p-4">
                <ActivityList items={state.activity} title="Build log" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
