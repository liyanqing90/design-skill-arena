"use client"

import {
  ActivityList,
  ActionButtons,
  BriefEditor,
  ChainBadge,
  ConceptCard,
  FieldSelect,
  MetricBlock,
  ModelBadge,
  SegmentedControl,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "frontend-app-builder + taste-skill + impeccable",
  brief:
    "Launch a direct-trade coffee subscription with a balanced campaign system: structured workspace, warm palate, disciplined flow.",
  controls: {
    audiences: ["Home brewers", "Office managers", "Cafe regulars"],
    channels: ["Roaster letter", "Brew guide insert", "Cafe counter"],
    tones: ["Grounded", "Inviting", "Assured"],
    styles: ["Roast journal", "Burlap + ink", "Morning light"],
  },
  concepts: [
    {
      id: "A",
      name: "First Roast",
      headline: "Roasted Tuesday. At your door Friday.",
      sub: "Freshness-led story built on the weekly roast cycle.",
      reach: 566,
      ctr: 4.5,
      conv: 4.7,
    },
    {
      id: "B",
      name: "Farm Ledger",
      headline: "Every bag names the farm it came from.",
      sub: "Transparency angle with per-lot traceability cards.",
      reach: 512,
      ctr: 4.9,
      conv: 5.1,
    },
    {
      id: "C",
      name: "Brew Better",
      headline: "Your morning cup, upgraded one variable at a time.",
      sub: "Education series paired with each delivery.",
      reach: 623,
      ctr: 4.2,
      conv: 4.4,
    },
  ],
  activity: ["Workspace balanced", "Palate warmed", "Concept A brewed"],
}

export default function BalancedChain() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#33261c]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)]">
          <aside className="order-2 space-y-4 lg:order-1">
            <section className="rounded-2xl border border-[#33261c]/10 bg-white/80 p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} />
            </section>
            <section className="space-y-4 rounded-2xl border border-[#33261c]/10 bg-white/80 p-4">
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

          <section className="order-1 space-y-4 lg:order-2">
            <div className="rounded-3xl bg-[#33261c] p-6 text-[#f5f1ea] sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#f5f1ea]/55 uppercase">
                <span>{state.channel}</span>
                <span>{state.style}</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl leading-[1.08] font-medium text-balance sm:text-5xl">
                {state.concept.headline}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f5f1ea]/75">
                {state.concept.sub} Brewed for {state.audience.toLowerCase()} in a{" "}
                {state.tone.toLowerCase()} voice.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#f5f1ea]/25 px-3 py-1 text-xs">
                Concept {state.concept.id} · {state.concept.name}
              </div>
            </div>
            <StatusNotice status={state.status} />
            <div className="grid grid-cols-3 gap-3">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
              <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
            </div>
            <div className="rounded-2xl border border-[#33261c]/10 bg-white/80 p-4">
              <ActionButtons state={state} />
            </div>
          </section>

          <aside className="order-3 space-y-4">
            <section className="space-y-2 rounded-2xl border border-[#33261c]/10 bg-white/80 p-4">
              <div className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-[#33261c]/50 uppercase">
                Concepts
              </div>
              {spec.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={state.conceptId === concept.id}
                  onSelect={() => state.selectConcept(concept.id)}
                />
              ))}
            </section>
            <section className="rounded-2xl border border-[#33261c]/10 bg-white/80 p-4">
              <ActivityList items={state.activity} title="Roast log" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
