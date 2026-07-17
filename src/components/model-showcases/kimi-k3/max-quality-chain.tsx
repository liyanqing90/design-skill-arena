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
  chain: "frontend-design + ui-ux-pro-max + web-interface-guidelines + impeccable",
  brief:
    "Launch a national museum's immersive night exhibition with a campaign orchestrated from a single command deck.",
  controls: {
    audiences: ["Culture members", "Night-city explorers", "School programs"],
    channels: ["City lightboxes", "Member preview", "School network"],
    tones: ["Evocative", "Scholarly", "Inviting"],
    styles: ["Nocturne gallery", "Lantern guide", "Archive gold"],
  },
  concepts: [
    {
      id: "A",
      name: "After Hours",
      headline: "The museum keeps its best light for last.",
      sub: "Night-opening story told through the building itself.",
      reach: 812,
      ctr: 5.1,
      conv: 4.9,
    },
    {
      id: "B",
      name: "One Object",
      headline: "One artifact. One hour. One unforgettable room.",
      sub: "Single-object focus format with timed entry.",
      reach: 748,
      ctr: 5.6,
      conv: 5.4,
    },
    {
      id: "C",
      name: "Lantern Route",
      headline: "Follow the lanterns through five centuries.",
      sub: "Wayfinding campaign turning the visit into a route.",
      reach: 886,
      ctr: 4.7,
      conv: 4.5,
    },
  ],
  activity: ["Deck assembled", "Routes plotted", "Concept A on stage"],
}

export default function MaxQualityChain() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#101014] text-[#ece7dc]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ece7dc]/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} dark />
            <ChainBadge chain={spec.chain} dark />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] tracking-[0.24em] text-[#ece7dc]/40 uppercase sm:block">
              Muse command deck
            </span>
            <StatusPill status={state.status} />
          </div>
        </header>

        <div className="mt-6 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <aside className="order-2 space-y-4 xl:order-1">
            <section className="rounded-xl border border-[#ece7dc]/10 bg-[#17171c] p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} tone="dark" />
            </section>
            <section className="space-y-4 rounded-xl border border-[#ece7dc]/10 bg-[#17171c] p-4">
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
              <SegmentedControl
                label="Tone"
                value={state.tone}
                options={spec.controls.tones}
                onChange={state.setTone}
                tone="dark"
              />
              <SegmentedControl
                label="Style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
                tone="dark"
              />
            </section>
            <section className="rounded-xl border border-[#ece7dc]/10 bg-[#17171c] p-4">
              <ActivityList items={state.activity} tone="dark" title="Operations" />
            </section>
          </aside>

          <section className="order-1 space-y-4 xl:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-[#ece7dc]/10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(212,175,55,0.18),transparent_60%),radial-gradient(ellipse_at_80%_0%,rgba(90,90,140,0.25),transparent_50%)]" />
              <div className="relative flex min-h-[360px] flex-col justify-end p-6 sm:min-h-[440px] sm:p-10">
                <div className="text-[11px] font-semibold tracking-[0.3em] text-[#ece7dc]/50 uppercase">
                  {state.channel} · {state.style}
                </div>
                <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.05] font-medium text-balance sm:text-6xl">
                  {state.concept.headline}
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#ece7dc]/70">
                  {state.concept.sub} Staged for {state.audience.toLowerCase()} in a{" "}
                  {state.tone.toLowerCase()} voice.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="border border-[#d4af37]/60 bg-[#d4af37]/10 px-3 py-1 text-[11px] font-bold tracking-[0.24em] text-[#d4af37] uppercase">
                    Exhibit {state.concept.id}
                  </span>
                  <span className="text-xs text-[#ece7dc]/55">{state.concept.name}</span>
                </div>
              </div>
            </div>

            <StatusNotice status={state.status} />

            <div className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50",
                      selected
                        ? "border-[#d4af37]/70 bg-[#d4af37]/10"
                        : "border-[#ece7dc]/10 bg-[#17171c] hover:border-[#ece7dc]/30"
                    )}
                  >
                    <span className="font-serif text-xl">{concept.id}</span>
                    <span className="mt-1 block text-sm font-semibold">{concept.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#ece7dc]/55">
                      {concept.sub}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="rounded-xl border border-[#ece7dc]/10 bg-[#17171c] p-4">
              <ActionButtons state={state} tone="dark" />
            </div>
          </section>

          <aside className="order-3 space-y-4">
            <section className="grid grid-cols-3 gap-2 xl:grid-cols-1">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} tone="dark" />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" tone="dark" />
              <MetricBlock
                label="Conversion"
                value={state.metrics.conv.toFixed(1)}
                suffix="%"
                tone="dark"
              />
            </section>
            <section className="rounded-xl border border-[#ece7dc]/10 bg-[#17171c] p-4">
              <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-[#ece7dc]/50 uppercase">
                Run of show
              </div>
              <ol className="space-y-2 text-xs text-[#ece7dc]/70">
                {["Doors 19:00", "First gallery 19:20", "Object talk 20:00", "Lantern route 21:00"].map(
                  (item, index) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded-full border border-[#ece7dc]/20 text-[10px] font-bold">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ol>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
