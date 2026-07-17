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
import { cn } from "@/lib/utils"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "impeccable",
  brief:
    "Launch a smart fragrance diffuser for boutique hotels, moving from brief to forecast in one calm, guided flow.",
  controls: {
    audiences: ["Boutique hoteliers", "Spa directors", "Design travelers"],
    channels: ["Hospitality trade", "Partner email", "In-room cards"],
    tones: ["Serene", "Considered", "Discreet"],
    styles: ["Spa minimal", "Warm stone", "Botanical line"],
  },
  concepts: [
    {
      id: "A",
      name: "Arrival Ritual",
      headline: "The first breath of the stay.",
      sub: "Check-in moment story told in three quiet frames.",
      reach: 512,
      ctr: 4.1,
      conv: 4.6,
    },
    {
      id: "B",
      name: "House Signature",
      headline: "A scent the property owns.",
      sub: "Co-branding angle for hotel identity programs.",
      reach: 468,
      ctr: 4.7,
      conv: 5.1,
    },
    {
      id: "C",
      name: "Quiet Corridor",
      headline: "Luxury that never announces itself.",
      sub: "Understated print series for trade publications.",
      reach: 545,
      ctr: 3.8,
      conv: 4.2,
    },
  ],
  activity: ["Flow opened", "Brief reviewed", "Concept A shortlisted"],
}

const steps = ["Brief", "Direction", "Concepts", "Forecast"] as const

export default function ImpeccableFullFlow() {
  const state = useStudio(spec)
  const activeStep =
    state.status === "success"
      ? 3
      : state.status === "loading"
        ? 2
        : state.brief.trim().length > 0
          ? 1
          : 0

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#2c2a26]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <nav aria-label="Flow progress" className="mt-8">
          <ol className="flex items-center gap-2">
            {steps.map((step, index) => (
              <li key={step} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    index <= activeStep
                      ? "bg-[#2c2a26] text-[#f6f4ef]"
                      : "border border-[#2c2a26]/25 text-[#2c2a26]/50"
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    index <= activeStep ? "text-[#2c2a26]" : "text-[#2c2a26]/45"
                  )}
                >
                  {step}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    className={cn(
                      "h-px flex-1",
                      index < activeStep ? "bg-[#2c2a26]" : "bg-[#2c2a26]/20"
                    )}
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <section className="mt-8 rounded-3xl border border-[#2c2a26]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(44,42,38,0.4)] sm:p-10">
          <div className="text-[11px] font-semibold tracking-[0.22em] text-[#2c2a26]/50 uppercase">
            Concept {state.concept.id} · {state.concept.name}
          </div>
          <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            {state.concept.headline}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#2c2a26]/65 sm:text-base">
            {state.concept.sub} Speaking to {state.audience.toLowerCase()} via{" "}
            {state.channel.toLowerCase()} in a {state.tone.toLowerCase()} tone.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
            <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
            <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
          </div>
          <div className="mt-6">
            <StatusNotice status={state.status} />
          </div>
        </section>

        <section className="mt-6 grid gap-2 sm:grid-cols-3">
          {spec.concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              selected={state.conceptId === concept.id}
              onSelect={() => state.selectConcept(concept.id)}
            />
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-[#2c2a26]/10 bg-white p-5">
          <BriefEditor value={state.brief} onChange={state.setBrief} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
          <div className="mt-5">
            <ActionButtons state={state} />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#2c2a26]/10 bg-white p-5">
          <ActivityList items={state.activity} />
        </section>
      </div>
    </main>
  )
}
