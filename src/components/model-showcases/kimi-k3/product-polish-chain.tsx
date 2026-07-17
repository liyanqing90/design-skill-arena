"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  chain: "frontend-app-builder + shadcn-best-practices + web-interface-guidelines + impeccable",
  brief:
    "Launch a compliance-ready e-signature plan for finance teams, with a campaign console that behaves like the product itself.",
  controls: {
    audiences: ["Finance ops", "Legal teams", "Procurement leads"],
    channels: ["Product newsletter", "Sales enablement", "Webinar series"],
    tones: ["Assured", "Exact", "Service-minded"],
    styles: ["Console neutral", "Ledger lines", "Trust blue"],
  },
  concepts: [
    {
      id: "A",
      name: "Signed in Minutes",
      headline: "Close the quarter without the paper chase.",
      sub: "Speed-led story with audit-trail proof points.",
      reach: 648,
      ctr: 4.4,
      conv: 4.8,
    },
    {
      id: "B",
      name: "Audit Ready",
      headline: "Every signature comes with its own evidence.",
      sub: "Compliance angle for regulated finance teams.",
      reach: 592,
      ctr: 4.8,
      conv: 5.2,
    },
    {
      id: "C",
      name: "One Workflow",
      headline: "From draft to signed, without leaving the tab.",
      sub: "Workflow-integration story for operations buyers.",
      reach: 704,
      ctr: 4.1,
      conv: 4.5,
    },
  ],
  activity: ["Console mounted", "Guidelines checked", "Concept A published"],
}

export default function ProductPolishChain() {
  const state = useStudio(spec)

  return (
    <main className="min-h-screen bg-muted/40 text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ModelBadge modelName={spec.modelName} />
            <ChainBadge chain={spec.chain} />
          </div>
          <StatusPill status={state.status} />
        </header>

        <Tabs
          value={state.conceptId}
          onValueChange={(value) => state.selectConcept(value as "A" | "B" | "C")}
          className="mt-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList>
              {spec.concepts.map((concept) => (
                <TabsTrigger key={concept.id} value={concept.id}>
                  {concept.id} · {concept.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={state.generate}
                disabled={state.status === "loading"}
              >
                {state.status === "loading" ? "Generating…" : "Generate"}
              </Button>
              <Button size="sm" variant="outline" onClick={state.save}>
                {state.saved ? "Saved" : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={state.exportCampaign}>
                {state.exported ? "Exported" : "Export"}
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {spec.concepts.map((concept) => (
                <TabsContent key={concept.id} value={concept.id} className="mt-0">
                  <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base">{concept.headline}</CardTitle>
                      <Badge variant="secondary">{state.channel}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {concept.sub} Aimed at {state.audience.toLowerCase()} in a{" "}
                        {state.tone.toLowerCase()} voice with a {state.style.toLowerCase()} system.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {(
                          [
                            ["Reach", `${state.metrics.reach}K`],
                            ["CTR", `${state.metrics.ctr.toFixed(1)}%`],
                            ["Conversion", `${state.metrics.conv.toFixed(1)}%`],
                          ] as const
                        ).map(([label, value]) => (
                          <div key={label} className="rounded-lg border bg-background p-4">
                            <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                              {label}
                            </div>
                            <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
                          </div>
                        ))}
                      </div>
                      <StatusNotice status={state.status} />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Campaign brief</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={state.brief}
                    onChange={(event) => state.setBrief(event.target.value)}
                    rows={4}
                    aria-label="Campaign brief"
                  />
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-4">
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
                      <li
                        key={`${item}-${index}`}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
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
                  <Separator className="my-3" />
                  <p className="text-[11px] text-muted-foreground">
                    Local mock session · no backend connected
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
