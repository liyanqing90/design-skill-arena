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
  chain: "frontend-skill + impeccable",
  brief:
    "Launch a flagship mirrorless camera with a full-bleed cinematic campaign and a disciplined review rail.",
  controls: {
    audiences: ["Street photographers", "Travel filmmakers", "Studio pros"],
    channels: ["Launch film", "City lightboxes", "Creator masterclass"],
    tones: ["Epic", "Exacting", "Quiet"],
    styles: ["Anamorphic night", "Silver halide", "Rain chrome"],
  },
  concepts: [
    {
      id: "A",
      name: "Night Latitude",
      headline: "Shoot the dark like it owes you light.",
      sub: "Low-light film proving the sensor in real streets.",
      reach: 948,
      ctr: 5.2,
      conv: 3.4,
    },
    {
      id: "B",
      name: "One Lens Week",
      headline: "Seven days. One lens. No excuses.",
      sub: "Creator challenge format with daily drops.",
      reach: 872,
      ctr: 5.7,
      conv: 3.1,
    },
    {
      id: "C",
      name: "Silver Rain",
      headline: "Weather-sealed for the shots others skip.",
      sub: "Storm-chasing stills series for city lightboxes.",
      reach: 1014,
      ctr: 4.8,
      conv: 3.7,
    },
  ],
  activity: ["Grade locked", "Frame 01 approved", "Concept A screened"],
}

export default function VisualImpeccable() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,89,199,0.35),transparent_55%),linear-gradient(to_top,black_20%,transparent_70%),radial-gradient(ellipse_at_20%_80%,rgba(140,140,160,0.25),transparent_50%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)]" />
        <div className="relative px-4 pt-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <ModelBadge modelName={spec.modelName} dark />
              <ChainBadge chain={spec.chain} dark />
            </div>
            <StatusPill status={state.status} />
          </div>
        </div>
        <div className="relative px-4 pb-10 sm:px-8">
          <div className="text-[11px] font-semibold tracking-[0.3em] text-white/50 uppercase">
            {state.channel} · {state.style} · {state.tone}
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl leading-[1.0] font-black tracking-tight text-balance sm:text-7xl">
            {state.concept.headline}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            {state.concept.sub} Framed for {state.audience.toLowerCase()}.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-sm bg-white px-3 py-1 text-xs font-black tracking-widest text-black uppercase">
              {state.concept.id}
            </span>
            <span className="text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
              {state.concept.name}
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0c] px-4 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
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
            <div className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={state.conceptId === concept.id}
                  onSelect={() => state.selectConcept(concept.id)}
                  tone="dark"
                />
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <ActionButtons state={state} tone="dark" />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} tone="dark" />
            </div>
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
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
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <ActivityList items={state.activity} tone="dark" title="Review rail" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
