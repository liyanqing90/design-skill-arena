"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  ChainBadge,
  ModelBadge,
  StatusNotice,
  StatusPill,
  useStudio,
  type StudioSpec,
} from "./studio"

const spec: StudioSpec = {
  modelName: "Kimi K3",
  chain: "shadcn-best-practices / shadcn",
  brief:
    "Launch a team analytics add-on with a campaign kit assembled entirely from the product design system.",
  controls: {
    audiences: ["RevOps leads", "Product managers", "Data teams"],
    channels: ["In-app banner", "Sales deck", "Webinar invite"],
    tones: ["Systematic", "Helpful", "Executive"],
    styles: ["Design system", "Dashboard neutral", "Docs clean"],
  },
  concepts: [
    {
      id: "A",
      name: "One Dashboard",
      headline: "Every metric your launch needs, in one place.",
      sub: "Feature-led story told through the analytics surface.",
      reach: 586,
      ctr: 4.1,
      conv: 3.9,
    },
    {
      id: "B",
      name: "Weekly Ritual",
      headline: "The Monday report your team actually opens.",
      sub: "Habit angle built around the recurring digest.",
      reach: 542,
      ctr: 4.6,
      conv: 4.3,
    },
    {
      id: "C",
      name: "Proof Pack",
      headline: "Numbers your CFO will forward.",
      sub: "ROI-led campaign with exportable evidence cards.",
      reach: 631,
      ctr: 3.8,
      conv: 4.6,
    },
  ],
  activity: ["Tokens loaded", "Components composed", "States verified"],
}

export default function ComponentSystem() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Campaign brief</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={state.brief}
                  onChange={(event) => state.setBrief(event.target.value)}
                  rows={5}
                  aria-label="Campaign brief"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Direction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(
                  [
                    ["Audience", state.audience, spec.controls.audiences, state.setAudience],
                    ["Channel", state.channel, spec.controls.channels, state.setChannel],
                    ["Tone", state.tone, spec.controls.tones, state.setTone],
                    ["Style", state.style, spec.controls.styles, state.setStyle],
                  ] as const
                ).map(([label, value, options, onChange]) => (
                  <div key={label} className="space-y-1.5">
                    <div className="text-xs font-medium text-muted-foreground">{label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {options.map((option) => (
                        <Badge
                          key={option}
                          variant={option === value ? "default" : "outline"}
                          className="cursor-pointer transition-colors hover:bg-accent"
                          onClick={() => onChange(option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {state.activity.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span
                        className={cn(
                          "mt-1 size-1.5 shrink-0 rounded-full",
                          index === 0 ? "bg-foreground" : "bg-muted-foreground/40"
                        )}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm">Main preview</CardTitle>
                <Badge variant="secondary">
                  Concept {state.concept.id} · {state.concept.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/40 p-6 sm:p-10">
                  <h1 className="max-w-2xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
                    {state.concept.headline}
                  </h1>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {state.concept.sub} Aimed at {state.audience.toLowerCase()} via{" "}
                    {state.channel.toLowerCase()} in a {state.tone.toLowerCase()} voice.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {(
                      [
                        ["Reach", state.metrics.reach, 1000, `${state.metrics.reach}K`],
                        ["CTR", state.metrics.ctr * 10, 60, `${state.metrics.ctr.toFixed(1)}%`],
                        [
                          "Conversion",
                          state.metrics.conv * 10,
                          60,
                          `${state.metrics.conv.toFixed(1)}%`,
                        ],
                      ] as const
                    ).map(([label, raw, max, display]) => (
                      <div key={label} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-semibold tabular-nums">{display}</span>
                        </div>
                        <Progress value={Math.min(100, (raw / max) * 100)} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <StatusNotice status={state.status} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {spec.concepts.map((concept) => {
                const selected = state.conceptId === concept.id
                return (
                  <Card
                    key={concept.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => state.selectConcept(concept.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        state.selectConcept(concept.id)
                      }
                    }}
                    className={cn(
                      "cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected ? "border-foreground shadow-md" : "hover:border-foreground/40"
                    )}
                  >
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">
                        {concept.id} · {concept.name}
                      </CardTitle>
                      {selected ? <Badge>Selected</Badge> : null}
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs leading-relaxed text-muted-foreground">{concept.sub}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardContent className="flex flex-wrap items-center gap-2 pt-6">
                <Button onClick={state.generate} disabled={state.status === "loading"}>
                  {state.status === "loading" ? "Generating…" : "Generate"}
                </Button>
                <Button variant="outline" onClick={state.save}>
                  {state.saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={state.exportCampaign}>
                  {state.exported ? "Exported" : "Export"}
                </Button>
                <Separator orientation="vertical" className="hidden h-6 sm:block" />
                <span className="text-xs text-muted-foreground">
                  {state.channel} · {state.style}
                </span>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}
