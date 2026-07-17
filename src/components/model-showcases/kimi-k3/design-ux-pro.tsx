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
  chain: "frontend-design + ui-ux-pro-max",
  brief:
    "Launch a family banking app for first-time savers, with a campaign mapped to each step of the onboarding journey.",
  controls: {
    audiences: ["First-time savers", "New parents", "Students"],
    channels: ["Onboarding email", "In-app coach", "Community workshop"],
    tones: ["Encouraging", "Plain", "Patient"],
    styles: ["Journey map", "Friendly ledger", "Step cards"],
  },
  concepts: [
    {
      id: "A",
      name: "First Fifty",
      headline: "Your first fifty saved, step by step.",
      sub: "Milestone journey with a visible progress path.",
      reach: 574,
      ctr: 4.8,
      conv: 5.3,
    },
    {
      id: "B",
      name: "Money Words",
      headline: "Banking, translated into plain language.",
      sub: "Glossary-led campaign removing jargon at each step.",
      reach: 521,
      ctr: 5.2,
      conv: 4.9,
    },
    {
      id: "C",
      name: "Family Pot",
      headline: "One goal the whole family can see.",
      sub: "Shared-goal story told across three household roles.",
      reach: 618,
      ctr: 4.5,
      conv: 5.6,
    },
  ],
  activity: ["Journey drafted", "Pain points tagged", "Concept A mapped"],
}

const journeySteps = ["Discover", "Sign up", "First deposit", "First goal"] as const

export default function DesignUxPro() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#243024]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
          <aside className="space-y-4 lg:order-1">
            <section className="rounded-2xl border border-[#243024]/10 bg-white p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} />
            </section>
            <section className="space-y-4 rounded-2xl border border-[#243024]/10 bg-white p-4">
              <FieldSelect
                label="Audience"
                value={state.audience}
                options={spec.controls.audiences}
                onChange={state.setAudience}
              />
              <FieldSelect
                label="Touchpoint"
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
            </section>
          </aside>

          <section className="space-y-4 lg:order-2">
            <div className="rounded-2xl border border-[#243024]/10 bg-white p-6 sm:p-8">
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#243024]/45 uppercase">
                Journey campaign · {state.concept.name}
              </div>
              <h1 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                {state.concept.headline}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#243024]/65">
                {state.concept.sub}
              </p>

              <ol className="mt-6 grid gap-2 sm:grid-cols-4">
                {journeySteps.map((step, index) => (
                  <li
                    key={step}
                    className={cn(
                      "rounded-xl border p-3",
                      index === 1
                        ? "border-[#243024] bg-[#243024] text-white"
                        : "border-[#243024]/15 bg-[#f7f8f4]"
                    )}
                  >
                    <div
                      className={cn(
                        "text-[10px] font-bold tracking-[0.16em] uppercase",
                        index === 1 ? "text-white/60" : "text-[#243024]/45"
                      )}
                    >
                      Step {index + 1}
                    </div>
                    <div className="mt-1 text-xs font-semibold">{step}</div>
                    <div
                      className={cn(
                        "mt-1 text-[11px] leading-snug",
                        index === 1 ? "text-white/70" : "text-[#243024]/55"
                      )}
                    >
                      {state.concept.name} message live here
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <StatusNotice status={state.status} />
              </div>
            </div>

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
                      "rounded-xl border p-3 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#243024]/40",
                      selected
                        ? "border-[#243024] bg-white shadow-md"
                        : "border-[#243024]/15 bg-white/70 hover:border-[#243024]/40"
                    )}
                  >
                    <span className="text-xs font-bold text-[#243024]/50">
                      Concept {concept.id}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold">{concept.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#243024]/60">
                      {concept.sub}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="rounded-2xl border border-[#243024]/10 bg-white p-4">
              <ActionButtons state={state} />
            </div>
          </section>

          <aside className="space-y-4 lg:order-3">
            <section className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              <MetricBlock label="Reach" value={`${state.metrics.reach}K`} />
              <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
              <MetricBlock label="Conversion" value={state.metrics.conv.toFixed(1)} suffix="%" />
            </section>
            <section className="rounded-2xl border border-[#243024]/10 bg-white p-4">
              <ActivityList items={state.activity} title="Research notes" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
