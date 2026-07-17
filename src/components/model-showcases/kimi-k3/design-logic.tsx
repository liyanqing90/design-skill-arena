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
  chain: "frontend-design",
  brief:
    "Launch a museum-grade turntable for design collectors, with a campaign system built on editorial hierarchy and typographic rhythm.",
  controls: {
    audiences: ["Design collectors", "Gallery members", "Hi-fi purists"],
    channels: ["Print + OOH", "Editorial newsletter", "Gallery opening"],
    tones: ["Measured", "Scholarly", "Assured"],
    styles: ["Swiss grid", "Editorial serif", "Archive minimal"],
  },
  concepts: [
    {
      id: "A",
      name: "The Grid Issue",
      headline: "Precision you can hear.",
      sub: "A numbered-edition campaign laid out like a design annual.",
      reach: 654,
      ctr: 3.9,
      conv: 3.8,
    },
    {
      id: "B",
      name: "Margin Notes",
      headline: "Every rotation, annotated.",
      sub: "Long-form storytelling with footnoted engineering proof.",
      reach: 588,
      ctr: 4.4,
      conv: 4.1,
    },
    {
      id: "C",
      name: "Plate Series",
      headline: "Twelve plates. One machine.",
      sub: "A collectible print series, one plate per component.",
      reach: 712,
      ctr: 3.6,
      conv: 3.5,
    },
  ],
  activity: ["Hierarchy mapped", "Baseline grid locked", "Concept A set as lead"],
}

export default function DesignLogic() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1c1a17]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1c1a17] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ModelBadge modelName={spec.modelName} />
              <ChainBadge chain={spec.chain} />
            </div>
            <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              Muse Campaign Studio
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] tracking-[0.2em] text-[#1c1a17]/50 uppercase sm:block">
              Issue 01 · Launch system
            </span>
            <StatusPill status={state.status} />
          </div>
        </header>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <section className="border-b border-[#1c1a17]/20 pb-8">
              <div className="grid gap-6 sm:grid-cols-12">
                <div className="sm:col-span-8">
                  <div className="text-[11px] font-semibold tracking-[0.24em] text-[#1c1a17]/50 uppercase">
                    Lead concept · {state.concept.id} — {state.concept.name}
                  </div>
                  <h2 className="mt-3 font-serif text-4xl leading-[1.05] font-bold text-balance sm:text-6xl">
                    {state.concept.headline}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#1c1a17]/70">
                    {state.concept.sub} Set for {state.audience.toLowerCase()} through{" "}
                    {state.channel.toLowerCase()}, in a {state.tone.toLowerCase()} register with a{" "}
                    {state.style.toLowerCase()} system.
                  </p>
                </div>
                <div className="flex flex-col justify-between border-l border-[#1c1a17]/20 pl-6 sm:col-span-4">
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold tracking-[0.2em] text-[#1c1a17]/50 uppercase">
                      Forecast
                    </div>
                    <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
                    <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
                    <MetricBlock
                      label="Conversion"
                      value={state.metrics.conv.toFixed(1)}
                      suffix="%"
                    />
                  </div>
                </div>
              </div>
            </section>

            <StatusNotice status={state.status} />

            <section>
              <div className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#1c1a17]/50 uppercase">
                Three concepts
              </div>
              <div className="divide-y divide-[#1c1a17]/15 border-y border-[#1c1a17]/15">
                {spec.concepts.map((concept) => {
                  const selected = state.conceptId === concept.id
                  return (
                    <button
                      key={concept.id}
                      type="button"
                      onClick={() => state.selectConcept(concept.id)}
                      aria-pressed={selected}
                      className={cn(
                        "grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 px-2 py-4 text-left transition-colors outline-none focus-visible:bg-[#1c1a17]/5",
                        selected ? "bg-[#1c1a17] text-[#f4f1ea]" : "hover:bg-[#1c1a17]/5"
                      )}
                    >
                      <span className="font-serif text-2xl font-bold">{concept.id}</span>
                      <span>
                        <span className="block text-base font-semibold">{concept.name}</span>
                        <span
                          className={cn(
                            "block text-xs",
                            selected ? "text-[#f4f1ea]/70" : "text-[#1c1a17]/60"
                          )}
                        >
                          {concept.sub}
                        </span>
                      </span>
                      <span className="text-xs font-medium tabular-nums">
                        {concept.reach}K · {concept.ctr}%
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="border border-[#1c1a17]/20 bg-white/60 p-4">
              <ActionButtons state={state} />
            </section>
          </div>

          <aside className="space-y-6">
            <section className="border border-[#1c1a17]/20 bg-white/60 p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} />
            </section>
            <section className="space-y-4 border border-[#1c1a17]/20 bg-white/60 p-4">
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
                label="Visual style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
              />
            </section>
            <section className="border border-[#1c1a17]/20 bg-white/60 p-4">
              <ActivityList items={state.activity} title="Recent operations" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
