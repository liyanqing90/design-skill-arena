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
  chain: "frontend-design + impeccable",
  brief:
    "Launch a limited architecture monograph with a campaign composed like a book: cover, spread, and colophon.",
  controls: {
    audiences: ["Architecture readers", "Design students", "Book collectors"],
    channels: ["Bookshop window", "Design fair", "Subscriber post"],
    tones: ["Literary", "Composed", "Exact"],
    styles: ["Clothbound", "Letterpress", "Folio grid"],
  },
  concepts: [
    {
      id: "A",
      name: "The Cover",
      headline: "A building you can hold.",
      sub: "Cover-led reveal with embossed title and cloth texture.",
      reach: 388,
      ctr: 4.2,
      conv: 5.8,
    },
    {
      id: "B",
      name: "The Spread",
      headline: "Two pages, one perfect section drawing.",
      sub: "Spread-by-spread serial released weekly.",
      reach: 342,
      ctr: 4.6,
      conv: 5.4,
    },
    {
      id: "C",
      name: "The Colophon",
      headline: "Even the credits are worth framing.",
      sub: "Craft-story campaign about paper, ink, and binding.",
      reach: 415,
      ctr: 3.9,
      conv: 6.1,
    },
  ],
  activity: ["Folio composed", "Margins approved", "Concept A bound"],
}

export default function DesignImpeccable() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#efece5] text-[#26241f]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-[#26241f]/20 bg-[#26241f]/20 sm:grid-cols-2">
              <div className="flex min-h-[300px] flex-col justify-between bg-[#26241f] p-6 text-[#efece5] sm:min-h-[420px] sm:p-8">
                <div className="text-[10px] font-semibold tracking-[0.3em] text-[#efece5]/50 uppercase">
                  {state.channel}
                </div>
                <div>
                  <div className="font-serif text-5xl font-bold">{state.concept.id}</div>
                  <h1 className="mt-2 font-serif text-3xl leading-tight font-bold text-balance sm:text-4xl">
                    {state.concept.headline}
                  </h1>
                </div>
                <div className="text-[10px] tracking-[0.24em] text-[#efece5]/50 uppercase">
                  {state.style} edition
                </div>
              </div>
              <div className="flex min-h-[300px] flex-col justify-between bg-white p-6 sm:min-h-[420px] sm:p-8">
                <div className="text-[10px] font-semibold tracking-[0.3em] text-[#26241f]/45 uppercase">
                  {state.concept.name}
                </div>
                <p className="max-w-xs font-serif text-lg leading-relaxed text-[#26241f]/80">
                  {state.concept.sub} Set for {state.audience.toLowerCase()} in a{" "}
                  {state.tone.toLowerCase()} register.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
                  <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
                  <MetricBlock label="Conv" value={state.metrics.conv.toFixed(1)} suffix="%" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <StatusNotice status={state.status} />
            </div>

            <div className="mt-6 divide-y divide-[#26241f]/15 border-y border-[#26241f]/15">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full items-baseline justify-between gap-4 px-2 py-3 text-left transition-colors outline-none focus-visible:bg-[#26241f]/5",
                      selected ? "bg-[#26241f]/8" : "hover:bg-[#26241f]/4"
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-serif text-lg font-bold">{concept.id}</span>
                      <span className="text-sm font-semibold">{concept.name}</span>
                    </span>
                    <span className="text-xs text-[#26241f]/55 tabular-nums">
                      {concept.reach}K reach
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6">
              <ActionButtons state={state} />
            </div>
          </div>

          <aside className="space-y-6">
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
                label="Style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
              />
            </div>
            <ActivityList items={state.activity} title="Press notes" />
          </aside>
        </section>
      </div>
    </main>
  )
}
