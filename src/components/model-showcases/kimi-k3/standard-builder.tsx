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
  PreviewShell,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "frontend-app-builder",
  brief:
    "Launch Muse as the campaign studio creative directors use to ship a premium modular speaker release across paid social and retail.",
  controls: {
    audiences: ["Urban creators", "Design-led families", "Early adopters"],
    channels: ["Paid social", "Launch email", "Retail display"],
    tones: ["Confident", "Warm", "Precise"],
    styles: ["Clean product", "Soft studio", "Bold contrast"],
  },
  concepts: [
    {
      id: "A",
      name: "First Listen",
      headline: "The room becomes the speaker.",
      sub: "Product-first story anchored in one clear demo moment.",
      reach: 842,
      ctr: 4.2,
      conv: 2.9,
    },
    {
      id: "B",
      name: "Shared Volume",
      headline: "Built for every ear in the room.",
      sub: "Social proof angle around group listening rituals.",
      reach: 768,
      ctr: 4.6,
      conv: 3.2,
    },
    {
      id: "C",
      name: "Spec Sheet",
      headline: "Numbers that sound like music.",
      sub: "Proof-led campaign with measurable audio claims.",
      reach: 905,
      ctr: 3.8,
      conv: 2.6,
    },
  ],
  activity: ["Brief loaded", "Audience set to Urban creators", "Forecast baseline ready"],
}

export default function StandardBuilder() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={state.status} />
            <h1 className="text-sm font-bold tracking-tight">Muse Campaign Studio</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
        <aside className="space-y-4 lg:row-span-2">
          <section className="rounded-2xl border border-neutral-200 bg-white p-4">
            <BriefEditor value={state.brief} onChange={state.setBrief} />
          </section>
          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <FieldSelect
              label="Target audience"
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
          </section>
        </aside>

        <section className="space-y-4">
          <PreviewShell className="border border-neutral-200 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e7e5e4,transparent_55%),radial-gradient(circle_at_75%_80%,#d6d3d1,transparent_50%)]" />
            <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                <span>{state.channel}</span>
                <span>{state.style}</span>
              </div>
              <div className="max-w-xl">
                <div className="mb-3 inline-flex rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
                  Concept {state.concept.id} · {state.concept.name}
                </div>
                <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
                  {state.concept.headline}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {state.concept.sub} Aimed at {state.audience.toLowerCase()} with a{" "}
                  {state.tone.toLowerCase()} voice.
                </p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((bar) => (
                    <span
                      key={bar}
                      className="w-2 rounded-full bg-neutral-900/80"
                      style={{ height: `${18 + ((bar * 13 + state.metrics.reach) % 42)}px` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-neutral-400">
                  Muse preview · {state.audience}
                </span>
              </div>
            </div>
          </PreviewShell>
          <StatusNotice status={state.status} />
          <div className="grid grid-cols-3 gap-3">
            <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
            <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
            <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
          </div>
        </section>

        <aside className="space-y-4">
          <section className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="mb-1 text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Creative concepts
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
          <section className="rounded-2xl border border-neutral-200 bg-white p-4">
            <ActivityList items={state.activity} />
          </section>
          <section className="rounded-2xl border border-neutral-200 bg-white p-4">
            <ActionButtons state={state} layout="column" />
          </section>
        </aside>
      </div>
    </main>
  )
}
