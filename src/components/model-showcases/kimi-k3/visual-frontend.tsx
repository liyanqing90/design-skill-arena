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
  chain: "frontend-skill",
  brief:
    "Launch a limited-edition over-ear headphone drop with a cinematic visual system that feels like a midnight listening session.",
  controls: {
    audiences: ["Night-city creatives", "Vinyl collectors", "Studio producers"],
    channels: ["Creator film", "Instagram reels", "Subway takeover"],
    tones: ["Cinematic", "Intimate", "Electric"],
    styles: ["Neon noir", "Chrome haze", "Deep velvet"],
  },
  concepts: [
    {
      id: "A",
      name: "Midnight Frequency",
      headline: "Hear the city breathe after dark.",
      sub: "A slow-burn film following one listener through neon streets.",
      reach: 918,
      ctr: 4.8,
      conv: 3.1,
    },
    {
      id: "B",
      name: "Chrome Bloom",
      headline: "Sound, rendered in liquid metal.",
      sub: "Macro product art with reflective type and motion stills.",
      reach: 834,
      ctr: 5.1,
      conv: 2.8,
    },
    {
      id: "C",
      name: "Velvet Static",
      headline: "Turn the noise down. Turn the night up.",
      sub: "High-contrast print series for late-night commuters.",
      reach: 782,
      ctr: 4.3,
      conv: 3.4,
    },
  ],
  activity: ["Visual system seeded", "Tone set to Cinematic", "Hero render staged"],
}

export default function VisualFrontend() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#0b0b10] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,159,0.16),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} dark />
            <ChainBadge chain={spec.chain} dark />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-white/10">
          <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_60%_40%,#312e81,#0b0b10_40%,#4c1d95_70%,#0b0b10)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="relative grid min-h-[420px] gap-8 p-6 sm:min-h-[520px] sm:p-12 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col justify-end">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase">
                <span>{state.channel}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{state.style}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{state.tone}</span>
              </div>
              <h1 className="max-w-3xl text-4xl leading-[1.02] font-black tracking-tight text-balance sm:text-7xl">
                {state.concept.headline}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                {state.concept.sub} Cut for {state.audience.toLowerCase()}.
              </p>
              <div className="mt-6 inline-flex items-center gap-3">
                <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-neutral-900">
                  Concept {state.concept.id}
                </span>
                <span className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
                  {state.concept.name}
                </span>
              </div>
            </div>
            <div className="hidden items-end lg:flex">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
                  <div
                    key={cell}
                    className="size-14 rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm"
                    style={{ opacity: 0.35 + ((cell * 7 + state.metrics.reach) % 10) / 16 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <StatusNotice status={state.status} />

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <section className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={state.conceptId === concept.id}
                  onSelect={() => state.selectConcept(concept.id)}
                  tone="dark"
                />
              ))}
            </section>
            <section className="grid grid-cols-3 gap-3">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} tone="dark" />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" tone="dark" />
              <MetricBlock
                label="Conversion"
                value={state.metrics.conv.toFixed(1)}
                suffix="%"
                tone="dark"
              />
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ActionButtons state={state} tone="dark" />
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} tone="dark" />
            </section>
            <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
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
                label="Visual style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
                tone="dark"
              />
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ActivityList items={state.activity} tone="dark" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
