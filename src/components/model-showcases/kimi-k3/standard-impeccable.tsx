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
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "frontend-app-builder + impeccable",
  brief:
    "Launch a carbon-neutral delivery service for local grocers with a campaign planned in a calm two-pane workspace.",
  controls: {
    audiences: ["Local grocers", "Co-op managers", "Eco households"],
    channels: ["Local radio", "Crate inserts", "Neighborhood app"],
    tones: ["Dependable", "Plain-spoken", "Optimistic"],
    styles: ["Route map", "Paper receipt", "Depot stencil"],
  },
  concepts: [
    {
      id: "A",
      name: "Last Mile, First Light",
      headline: "Groceries that arrive before the city wakes.",
      sub: "Route-story campaign following one morning delivery.",
      reach: 604,
      ctr: 4.3,
      conv: 4.1,
    },
    {
      id: "B",
      name: "Zero on the Label",
      headline: "Every receipt shows the carbon you saved.",
      sub: "Receipt-as-media idea with per-order impact lines.",
      reach: 558,
      ctr: 4.7,
      conv: 4.5,
    },
    {
      id: "C",
      name: "Corner Store Pact",
      headline: "Your corner store, now on quiet wheels.",
      sub: "Partnership angle celebrating independent grocers.",
      reach: 662,
      ctr: 4.0,
      conv: 3.8,
    },
  ],
  activity: ["Workspace opened", "Routes synced", "Concept A pinned"],
}

export default function StandardImpeccable() {
  const state = useStudio(spec)

  return (
    <main className="flex min-h-screen flex-col bg-[#f2f4f1] text-[#22301f] lg:h-screen lg:overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22301f]/10 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <ModelBadge modelName={spec.modelName} />
          <ChainBadge chain={spec.chain} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#22301f]/50">Muse · Delivery launch</span>
          <StatusPill status={state.status} />
        </div>
      </header>

      <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-4 overflow-y-auto border-b border-[#22301f]/10 bg-white p-4 lg:border-r lg:border-b-0">
          <BriefEditor value={state.brief} onChange={state.setBrief} />
          <div className="space-y-4">
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
            <FieldSelect
              label="Tone"
              value={state.tone}
              options={spec.controls.tones}
              onChange={state.setTone}
            />
            <FieldSelect
              label="Visual style"
              value={state.style}
              options={spec.controls.styles}
              onChange={state.setStyle}
            />
          </div>
          <div className="rounded-xl bg-[#f2f4f1] p-4">
            <ActivityList items={state.activity} />
          </div>
        </aside>

        <section className="space-y-4 overflow-y-auto p-4 sm:p-6">
          <div className="rounded-2xl border border-[#22301f]/10 bg-white p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#22301f]/50 uppercase">
              <span>
                {state.channel} · {state.style}
              </span>
              <span>
                Concept {state.concept.id} · {state.concept.name}
              </span>
            </div>
            <h1 className="mt-4 max-w-2xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
              {state.concept.headline}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#22301f]/65">
              {state.concept.sub} Built for {state.audience.toLowerCase()} in a{" "}
              {state.tone.toLowerCase()} voice.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
              <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
            </div>
            <div className="mt-4">
              <StatusNotice status={state.status} />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {spec.concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                selected={state.conceptId === concept.id}
                onSelect={() => state.selectConcept(concept.id)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-[#22301f]/10 bg-white p-4">
            <ActionButtons state={state} />
          </div>
        </section>
      </div>
    </main>
  )
}
