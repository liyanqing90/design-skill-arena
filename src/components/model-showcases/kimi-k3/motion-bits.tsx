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
  chain: "react-bits",
  brief:
    "Launch a kinetic sneaker drop with a motion-first campaign where every creative is a looping animated bit.",
  controls: {
    audiences: ["Sneaker resellers", "Streetwear fans", "Run club crews"],
    channels: ["TikTok loop", "Stories sticker", "Store screen"],
    tones: ["Kinetic", "Hyped", "Slick"],
    styles: ["Motion poster", "Glitch type", "Bounce grid"],
  },
  concepts: [
    {
      id: "A",
      name: "Sole Pulse",
      headline: "Feel the drop before it lands.",
      sub: "Heartbeat-synced sole animation across all placements.",
      reach: 884,
      ctr: 5.6,
      conv: 3.2,
    },
    {
      id: "B",
      name: "Lace Storm",
      headline: "Laces in the wind, city in the frame.",
      sub: "Particle-driven teaser built for vertical loops.",
      reach: 812,
      ctr: 5.9,
      conv: 2.9,
    },
    {
      id: "C",
      name: "Midnight Restock",
      headline: "Blink and it is gone.",
      sub: "Countdown motion system with strobe typography.",
      reach: 936,
      ctr: 5.1,
      conv: 3.6,
    },
  ],
  activity: ["Motion rig armed", "Loop duration set", "Concept A animating"],
}

export default function MotionBits() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} dark />
            <ChainBadge chain={spec.chain} dark />
          </div>
          <StatusPill status={state.status} />
        </header>

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#141414]">
          <div className="relative flex min-h-[380px] flex-col justify-between p-6 sm:min-h-[460px] sm:p-10">
            <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
              <span>{state.channel}</span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 animate-ping rounded-full bg-lime-400" />
                Live loop
              </span>
            </div>

            <div className="relative">
              <h1 className="max-w-3xl text-4xl leading-[1.02] font-black tracking-tight text-balance sm:text-7xl">
                {state.concept.headline.split(" ").map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="mr-3 inline-block animate-bounce"
                    style={{ animationDelay: `${index * 120}ms`, animationDuration: "2.4s" }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                {state.concept.sub} Tuned for {state.audience.toLowerCase()} with a{" "}
                {state.tone.toLowerCase()} energy.
              </p>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-1" aria-hidden>
                {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                  <span
                    key={bar}
                    className="w-2.5 animate-pulse rounded-full bg-lime-400/80"
                    style={{
                      height: `${16 + ((bar * 17 + state.metrics.reach) % 48)}px`,
                      animationDelay: `${bar * 90}ms`,
                    }}
                  />
                ))}
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
                {state.concept.id} · {state.concept.name}
              </span>
            </div>
          </div>
        </section>

        <div className="mt-4">
          <StatusNotice status={state.status} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <section className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => state.selectConcept(concept.id)}
                    aria-pressed={selected}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60",
                      selected
                        ? "border-lime-400 bg-lime-400/10 shadow-[0_0_30px_-8px_rgba(163,230,53,0.5)]"
                        : "border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-white/30"
                    )}
                  >
                    <span className="text-lg font-black">{concept.id}</span>
                    <span className="mt-1 block text-sm font-bold">{concept.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/55">
                      {concept.sub}
                    </span>
                  </button>
                )
              })}
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
              <SegmentedControl
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
              <FieldSelect
                label="Style"
                value={state.style}
                options={spec.controls.styles}
                onChange={state.setStyle}
                tone="dark"
              />
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ActivityList items={state.activity} tone="dark" title="Motion log" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
