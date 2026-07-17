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
  chain: "frontend-skill + taste-skill",
  brief:
    "Launch a hand-thrown ceramic tableware line with a gallery-grade campaign presented as a curated wall.",
  controls: {
    audiences: ["Gallery shoppers", "Slow-living readers", "Boutique buyers"],
    channels: ["Gallery preview", "Print catalogue", "Studio open day"],
    tones: ["Hushed", "Tactile", "Assured"],
    styles: ["Gallery white", "Kiln ash", "Glaze pool"],
  },
  concepts: [
    {
      id: "A",
      name: "First Firing",
      headline: "Out of the kiln, onto the table.",
      sub: "Process-led story from clay to first service.",
      reach: 428,
      ctr: 4.6,
      conv: 5.4,
    },
    {
      id: "B",
      name: "Glaze Study",
      headline: "No two surfaces agree. That is the point.",
      sub: "Macro texture campaign celebrating variation.",
      reach: 396,
      ctr: 5.0,
      conv: 5.0,
    },
    {
      id: "C",
      name: "Set for Four",
      headline: "A table set slowly, on purpose.",
      sub: "Hosting ritual angle shot in natural light.",
      reach: 462,
      ctr: 4.3,
      conv: 5.7,
    },
  ],
  activity: ["Wall hung", "Lighting checked", "Concept A centered"],
}

export default function VisualTaste() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-white text-[#232323]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="border-b border-[#232323]/10 pb-10">
              <div className="text-[11px] font-semibold tracking-[0.28em] text-[#232323]/45 uppercase">
                Exhibition {state.concept.id} · {state.concept.name}
              </div>
              <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] font-normal text-balance sm:text-6xl">
                {state.concept.headline}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#232323]/60">
                {state.concept.sub} Presented for {state.audience.toLowerCase()} through{" "}
                {state.channel.toLowerCase()}.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className="group text-left outline-none"
                  >
                    <span
                      className={cn(
                        "block aspect-[4/5] w-full border transition-all group-focus-visible:ring-2 group-focus-visible:ring-[#232323]/40",
                        selected
                          ? "border-[#232323] bg-[#f4f2ee] shadow-[0_18px_40px_-24px_rgba(35,35,35,0.5)]"
                          : "border-[#232323]/15 bg-[#faf9f6] group-hover:border-[#232323]/45"
                      )}
                    >
                      <span className="flex h-full items-center justify-center font-serif text-5xl text-[#232323]/25 transition-colors group-hover:text-[#232323]/50">
                        {concept.id}
                      </span>
                    </span>
                    <span className="mt-2 block text-xs font-semibold">{concept.name}</span>
                    <span className="block text-[11px] leading-relaxed text-[#232323]/55">
                      {concept.sub}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-8">
              <StatusNotice status={state.status} />
            </div>

            <div className="mt-6 border-t border-[#232323]/10 pt-6">
              <ActionButtons state={state} />
            </div>
          </div>

          <aside className="space-y-6 lg:border-l lg:border-[#232323]/10 lg:pl-8">
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
              <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
            </div>
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
            <ActivityList items={state.activity} title="Gallery notes" />
          </aside>
        </section>
      </div>
    </main>
  )
}
