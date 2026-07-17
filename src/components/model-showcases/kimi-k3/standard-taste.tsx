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
  chain: "frontend-app-builder + taste-skill",
  brief:
    "Launch a small-batch natural wine club with a campaign that feels curated, warm, and quietly confident.",
  controls: {
    audiences: ["Curious palates", "Dinner hosts", "Natural wine fans"],
    channels: ["Sommelier letter", "Natural wine bars", "Weekend market"],
    tones: ["Curated", "Warm", "Knowing"],
    styles: ["Cellar craft", "Sunlit table", "Hand-labeled"],
  },
  concepts: [
    {
      id: "A",
      name: "First Case",
      headline: "Six bottles, chosen like a friend would.",
      sub: "Subscription story told through the first delivery.",
      reach: 486,
      ctr: 4.4,
      conv: 4.9,
    },
    {
      id: "B",
      name: "Table Season",
      headline: "The season tastes better shared.",
      sub: "Gathering-led campaign around long-table dinners.",
      reach: 452,
      ctr: 4.8,
      conv: 4.5,
    },
    {
      id: "C",
      name: "Maker Notes",
      headline: "Read the vineyard before you taste it.",
      sub: "Producer-story series with hand-set tasting notes.",
      reach: 528,
      ctr: 4.1,
      conv: 5.2,
    },
  ],
  activity: ["Palette curated", "Type pairing set", "Concept A poured"],
}

export default function StandardTaste() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#faf6ef] text-[#3d2b1f]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="flex flex-col justify-center rounded-3xl bg-[#3d2b1f] p-8 text-[#faf6ef] sm:p-12">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-[#faf6ef]/60 uppercase">
              {state.channel} · {state.style}
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] font-medium text-balance sm:text-6xl">
              {state.concept.headline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#faf6ef]/75 sm:text-base">
              {state.concept.sub} Poured for {state.audience.toLowerCase()} in a{" "}
              {state.tone.toLowerCase()} voice.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="rounded-full border border-[#faf6ef]/30 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
                Concept {state.concept.id}
              </span>
              <span className="text-xs text-[#faf6ef]/60">{state.concept.name}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
              <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
            </div>
            <StatusNotice status={state.status} />
            <div className="space-y-2">
              {spec.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={state.conceptId === concept.id}
                  onSelect={() => state.selectConcept(concept.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 rounded-3xl border border-[#3d2b1f]/10 bg-white/70 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-5">
            <BriefEditor value={state.brief} onChange={state.setBrief} />
            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>
            <ActionButtons state={state} />
          </div>
          <div className="rounded-2xl bg-[#faf6ef] p-4">
            <ActivityList items={state.activity} title="Cellar log" />
          </div>
        </section>
      </div>
    </main>
  )
}
