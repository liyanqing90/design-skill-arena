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
  SegmentedControl,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "ui-ux-pro-max",
  brief:
    "Launch a sleep-tracking ring to wellness subscribers with a research-backed campaign dashboard and persona-driven creative.",
  controls: {
    audiences: ["Wellness subscribers", "Endurance athletes", "New parents"],
    channels: ["CRM email", "Podcast host read", "In-app upsell"],
    tones: ["Evidence-led", "Reassuring", "Clinical"],
    styles: ["Data calm", "Soft clinical", "Recovery dusk"],
  },
  concepts: [
    {
      id: "A",
      name: "Recovery Score",
      headline: "Wake up to a number that matters.",
      sub: "Metric-led story anchored in the morning score reveal.",
      reach: 692,
      ctr: 4.9,
      conv: 4.4,
    },
    {
      id: "B",
      name: "Seven Nights",
      headline: "A week of sleep, made visible.",
      sub: "Journey campaign following one user across seven nights.",
      reach: 638,
      ctr: 5.3,
      conv: 4.0,
    },
    {
      id: "C",
      name: "Coach Whisper",
      headline: "Guidance, not guilt.",
      sub: "Empathy-first angle tested against churn-risk cohorts.",
      reach: 721,
      ctr: 4.5,
      conv: 4.8,
    },
  ],
  activity: ["Personas loaded", "Journey map attached", "Heuristics checked"],
}

const heuristics = [
  { label: "Message clarity", score: 92 },
  { label: "Persona fit", score: 88 },
  { label: "CTA visibility", score: 84 },
  { label: "Cognitive load", score: 79 },
] as const

export default function UxProReference() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-[#f3f6f9] text-[#17222e]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#17222e]/10 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] text-[#17222e]/45 uppercase">
                    Lead concept · {state.concept.id}
                  </div>
                  <h1 className="mt-2 max-w-xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                    {state.concept.headline}
                  </h1>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#17222e]/65">
                    {state.concept.sub} For {state.audience.toLowerCase()} on{" "}
                    {state.channel.toLowerCase()}.
                  </p>
                </div>
                <div className="rounded-xl bg-[#17222e] px-4 py-3 text-white">
                  <div className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Persona</div>
                  <div className="mt-0.5 text-sm font-semibold">{state.audience}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3 rounded-xl border border-[#17222e]/10 bg-[#f3f6f9] p-4">
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-[#17222e]/50 uppercase">
                    Heuristic pass
                  </div>
                  {heuristics.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#17222e]/70">{item.label}</span>
                        <span className="font-semibold tabular-nums">{item.score}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#17222e]/10">
                        <div
                          className="h-full rounded-full bg-[#2f6f6a] transition-all"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <MetricBlock label="Predicted reach" value={`${state.metrics.reach}K`} />
                  <MetricBlock label="CTR" value={state.metrics.ctr.toFixed(1)} suffix="%" />
                  <MetricBlock
                    label="Conversion"
                    value={state.metrics.conv.toFixed(1)}
                    suffix="%"
                  />
                </div>
              </div>
              <div className="mt-4">
                <StatusNotice status={state.status} />
              </div>
            </section>

            <section className="grid gap-2 sm:grid-cols-3">
              {spec.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  selected={state.conceptId === concept.id}
                  onSelect={() => state.selectConcept(concept.id)}
                />
              ))}
            </section>

            <section className="rounded-2xl border border-[#17222e]/10 bg-white p-4">
              <ActionButtons state={state} />
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[#17222e]/10 bg-white p-4">
              <BriefEditor value={state.brief} onChange={state.setBrief} />
            </section>
            <section className="space-y-4 rounded-2xl border border-[#17222e]/10 bg-white p-4">
              <FieldSelect
                label="Persona"
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
            <section className="rounded-2xl border border-[#17222e]/10 bg-white p-4">
              <ActivityList items={state.activity} title="Research log" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
