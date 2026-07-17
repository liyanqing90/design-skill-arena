"use client"

import {
  ActivityList,
  ActionButtons,
  BriefEditor,
  ChainBadge,
  FieldSelect,
  MetricBlock,
  ModelBadge,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"
import { cn } from "@/lib/utils"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "frontend-skill + taste-skill + impeccable",
  brief:
    "Launch a haute horlogerie limited edition with a premium campaign staged like a private viewing.",
  controls: {
    audiences: ["Watch collectors", "Auction clients", "Design press"],
    channels: ["Private viewing", "Collector letter", "Auction preview"],
    tones: ["Hushed", "Exacting", "Sovereign"],
    styles: ["Noir velvet", "Champagne light", "Obsidian glass"],
  },
  concepts: [
    {
      id: "A",
      name: "Piece Unique",
      headline: "One of twelve. Yours, if you are quiet enough.",
      sub: "Scarcity-led reveal staged as a private appointment.",
      reach: 296,
      ctr: 5.4,
      conv: 6.8,
    },
    {
      id: "B",
      name: "Movement Study",
      headline: "Four hundred parts. Zero decoration wasted.",
      sub: "Calibre macro series for the mechanically obsessed.",
      reach: 342,
      ctr: 5.9,
      conv: 6.2,
    },
    {
      id: "C",
      name: "Midnight Register",
      headline: "Time, kept in the dark.",
      sub: "Noir still-life campaign shot in a single beam of light.",
      reach: 268,
      ctr: 5.1,
      conv: 7.3,
    },
  ],
  activity: ["Salon prepared", "Lighting dimmed", "Concept A unveiled"],
}

export default function VisualPremiumChain() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#0c0a08] text-[#e8e0d2]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} dark />
            <ChainBadge chain={spec.chain} dark />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="relative mt-10 overflow-hidden rounded-sm border border-[#e8e0d2]/15">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,224,210,0.12),transparent_55%)]" />
          <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="text-[11px] font-semibold tracking-[0.4em] text-[#e8e0d2]/45 uppercase">
              {state.channel} · {state.style}
            </div>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] font-normal text-balance sm:text-6xl">
              {state.concept.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#e8e0d2]/65">
              {state.concept.sub} For {state.audience.toLowerCase()}, in a{" "}
              {state.tone.toLowerCase()} register.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border border-[#e8e0d2]/25 px-5 py-2 text-[11px] font-semibold tracking-[0.3em] uppercase">
              No. {state.concept.id} — {state.concept.name}
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} tone="dark" />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" tone="dark" />
              <MetricBlock
                label="Conversion"
                value={state.metrics.conv.toFixed(1)}
                suffix="%"
                tone="dark"
              />
            </div>
            <StatusNotice status={state.status} />
            <div className="grid gap-px overflow-hidden border border-[#e8e0d2]/15 bg-[#e8e0d2]/15 sm:grid-cols-3">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className={cn(
                      "p-5 text-left transition-colors outline-none focus-visible:bg-[#e8e0d2]/10",
                      selected ? "bg-[#1c1812]" : "bg-[#0c0a08] hover:bg-[#14110d]"
                    )}
                  >
                    <span className="font-serif text-2xl">{concept.id}</span>
                    <span className="mt-1 block text-sm font-semibold">{concept.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#e8e0d2]/55">
                      {concept.sub}
                    </span>
                    {selected ? (
                      <span className="mt-3 inline-block border-b border-[#e8e0d2]/60 pb-0.5 text-[10px] tracking-[0.24em] uppercase">
                        In view
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
            <div className="border border-[#e8e0d2]/15 p-4">
              <ActionButtons state={state} tone="dark" />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border border-[#e8e0d2]/15 p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} tone="dark" />
            </div>
            <div className="space-y-4 border border-[#e8e0d2]/15 p-4">
              <FieldSelect
                label="Audience"
                value={state.audience}
                options={spec.controls.audiences}
                onChange={state.setAudience}
                tone="dark"
              />
              <FieldSelect
                label="Channel"
                value={state.channel}
                options={spec.controls.channels}
                onChange={state.setChannel}
                tone="dark"
              />
              <FieldSelect
                label="Tone"
                value={state.tone}
                options={spec.controls.tones}
                onChange={state.setTone}
                tone="dark"
              />
              <FieldSelect
                label="Style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
                tone="dark"
              />
            </div>
            <div className="border border-[#e8e0d2]/15 p-4">
              <ActivityList items={state.activity} tone="dark" title="Salon notes" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
