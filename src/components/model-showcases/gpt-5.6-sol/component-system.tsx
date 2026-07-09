"use client"

import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  GripVertical,
  LayoutGrid,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type ConceptId = "A" | "B" | "C"
type GenerationState = "idle" | "loading" | "success" | "error"

const concepts = {
  A: {
    name: "Signal Stack",
    headline: "Carry the launch further",
    copy: "A modular story built from a bold promise, proof moments, and a clear product reveal.",
    reach: "1.8M",
    ctr: "4.7%",
    conversion: "3.2%",
    accent: "bg-sky-600",
    soft: "bg-sky-100",
  },
  B: {
    name: "Human Proof",
    headline: "Made for the pace you keep",
    copy: "A people-first sequence that turns everyday friction into a memorable launch story.",
    reach: "1.5M",
    ctr: "5.4%",
    conversion: "3.8%",
    accent: "bg-emerald-600",
    soft: "bg-emerald-100",
  },
  C: {
    name: "Product Pulse",
    headline: "Meet the moment in motion",
    copy: "A high-contrast product narrative with fast cuts, tactile details, and direct response copy.",
    reach: "2.1M",
    ctr: "4.2%",
    conversion: "2.9%",
    accent: "bg-violet-600",
    soft: "bg-violet-100",
  },
} as const

const options = {
  audience: ["Urban creators", "Early adopters", "Active families"],
  channel: ["Social launch", "Retail screens", "Email and web"],
  tone: ["Confident", "Warm", "Provocative"],
  visual: ["Modular editorial", "Product macro", "Human documentary"],
} as const

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ComponentSystemShowcase() {
  const [brief, setBrief] = useState(
    "Launch a lightweight everyday camera that helps creators capture spontaneous stories without slowing down.",
  )
  const [audience, setAudience] = useState<string>(options.audience[0])
  const [channel, setChannel] = useState<string>(options.channel[0])
  const [tone, setTone] = useState<string>(options.tone[0])
  const [visual, setVisual] = useState<string>(options.visual[0])
  const [concept, setConcept] = useState<ConceptId>("A")
  const [generation, setGeneration] = useState<GenerationState>("idle")
  const [attempt, setAttempt] = useState(0)
  const [storyFirst, setStoryFirst] = useState(true)
  const [savedRevision, setSavedRevision] = useState(0)
  const [exportCount, setExportCount] = useState(0)
  const [activity, setActivity] = useState([
    "09:42  Campaign workspace opened",
    "09:44  Signal Stack selected",
  ])

  const selected = concepts[concept]
  const briefValid = brief.trim().length >= 20

  function addActivity(message: string) {
    setActivity((items) => [`${timestamp()}  ${message}`, ...items].slice(0, 6))
  }

  function updateControl(label: string, value: string, update: (next: string) => void) {
    update(value)
    addActivity(`${label} changed to ${value}`)
  }

  function chooseConcept(value: string) {
    const next = value as ConceptId
    setConcept(next)
    addActivity(`${concepts[next].name} selected`)
  }

  function generateCampaign() {
    if (!briefValid || generation === "loading") return

    const nextAttempt = attempt + 1
    setAttempt(nextAttempt)
    setGeneration("loading")
    addActivity("Generation started")

    window.setTimeout(() => {
      const nextState: GenerationState = nextAttempt % 2 === 0 ? "error" : "success"
      setGeneration(nextState)
      addActivity(
        nextState === "success"
          ? `${selected.name} modules refreshed`
          : "Generation stopped, source copy needs review",
      )
    }, 760)
  }

  function saveCampaign() {
    setSavedRevision((value) => value + 1)
    addActivity(`Draft revision ${savedRevision + 1} saved`)
  }

  function exportCampaign() {
    setExportCount((value) => value + 1)
    addActivity(`Export ${exportCount + 1} prepared`)
  }

  return (
    <main className="min-h-[100dvh] min-w-0 overflow-x-hidden bg-[#f4f7fb] text-slate-950 [--card:oklch(0.995_0.003_250)] [--muted:oklch(0.95_0.012_250)] [--primary:oklch(0.5_0.18_252)] [--primary-foreground:oklch(0.99_0_0)] [--ring:oklch(0.58_0.18_252)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex flex-col gap-4 rounded-xl bg-white px-4 py-4 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-white">
                <LayoutGrid aria-hidden="true" className="size-4" />
              </span>
              <span className="text-lg">Muse</span>
            </div>
            <Badge variant="secondary">GPT 5.6 Sol</Badge>
            <Badge variant="outline">shadcn-best-practices / shadcn</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" className="min-h-11" onClick={saveCampaign}>
              <Save data-icon="inline-start" aria-hidden="true" />
              Save{savedRevision > 0 ? ` ${savedRevision}` : ""}
            </Button>
            <Button type="button" variant="outline" className="min-h-11" onClick={exportCampaign}>
              <Download data-icon="inline-start" aria-hidden="true" />
              Export{exportCount > 0 ? ` ${exportCount}` : ""}
            </Button>
            <Button
              type="button"
              className="min-h-11"
              onClick={generateCampaign}
              disabled={generation === "loading" || !briefValid}
            >
              {generation === "loading" ? (
                <Loader2 data-icon="inline-start" aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
              ) : (
                <Sparkles data-icon="inline-start" aria-hidden="true" />
              )}
              {generation === "loading" ? "Generating" : "Generate"}
            </Button>
          </div>
        </header>

        <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]" aria-label="Campaign brief and generation state">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Brief</CardTitle>
              <CardDescription>Describe the launch outcome and the product truth to preserve.</CardDescription>
              <CardAction>
                <Badge variant={briefValid ? "secondary" : "destructive"}>
                  {brief.length} chars
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <label htmlFor="component-system-brief" className="sr-only">
                Campaign Brief
              </label>
              <Textarea
                id="component-system-brief"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                onBlur={() => addActivity("Campaign brief updated")}
                aria-invalid={!briefValid}
                aria-describedby="component-system-brief-help"
                className="min-h-24 resize-y"
              />
              <p
                id="component-system-brief-help"
                className={briefValid ? "mt-2 text-xs text-muted-foreground" : "mt-2 text-xs text-destructive"}
              >
                {briefValid ? "The preview updates as you edit." : "Add at least 20 characters before generating."}
              </p>
            </CardContent>
          </Card>

          <Card aria-live="polite">
            <CardHeader>
              <CardTitle>Generation status</CardTitle>
              <CardDescription>Local mock workflow, no campaign data leaves this page.</CardDescription>
            </CardHeader>
            <CardContent>
              {generation === "loading" ? (
                <div className="flex flex-col gap-3" role="status">
                  <Skeleton className="h-4 w-4/5 motion-reduce:animate-none" />
                  <Skeleton className="h-4 w-3/5 motion-reduce:animate-none" />
                  <Skeleton className="h-8 w-full motion-reduce:animate-none" />
                </div>
              ) : (
                <div
                  role={generation === "error" ? "alert" : "status"}
                  className={`flex items-start gap-3 rounded-lg p-3 ${
                    generation === "error"
                      ? "bg-destructive/10 text-destructive"
                      : generation === "success"
                        ? "bg-emerald-50 text-emerald-900"
                        : "bg-muted text-foreground"
                  }`}
                >
                  {generation === "error" ? (
                    <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {generation === "error"
                        ? "Generation needs attention"
                        : generation === "success"
                          ? "Campaign modules are ready"
                          : "Ready to generate"}
                    </p>
                    <p className="mt-1 text-xs leading-5 opacity-80">
                      {generation === "error"
                        ? "Review the brief, then generate again. Your current modules are unchanged."
                        : "The next run alternates success and error so both states can be reviewed."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid min-w-0 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]" aria-label="Campaign workspace">
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Control library</CardTitle>
              <CardDescription>Audience, placement, voice, and art direction.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ControlSelect
                id="component-audience"
                label="Target audience"
                value={audience}
                values={options.audience}
                onChange={(value) => updateControl("Audience", value, setAudience)}
              />
              <ControlSelect
                id="component-channel"
                label="Channel"
                value={channel}
                values={options.channel}
                onChange={(value) => updateControl("Channel", value, setChannel)}
              />
              <ControlSelect
                id="component-tone"
                label="Tone"
                value={tone}
                values={options.tone}
                onChange={(value) => updateControl("Tone", value, setTone)}
              />
              <ControlSelect
                id="component-visual"
                label="Visual style"
                value={visual}
                values={options.visual}
                onChange={(value) => updateControl("Visual style", value, setVisual)}
              />
              <Separator />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Creative direction</span>
                <Tabs value={concept} onValueChange={chooseConcept}>
                  <TabsList className="w-full" aria-label="Creative concepts">
                    {(Object.keys(concepts) as ConceptId[]).map((id) => (
                      <TabsTrigger key={id} value={id} className="min-h-11 min-w-0">
                        {id}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <p className="text-xs text-muted-foreground">{selected.name}: {selected.copy}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <div>
                <p className="font-medium">Module order</p>
                <p className="text-xs text-muted-foreground">{storyFirst ? "Story first" : "Product first"}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-11"
                onClick={() => {
                  setStoryFirst((value) => !value)
                  addActivity("Preview modules reordered")
                }}
              >
                <GripVertical data-icon="inline-start" aria-hidden="true" />
                Reorder
              </Button>
            </CardFooter>
          </Card>

          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Campaign canvas</CardTitle>
              <CardDescription>{audience} on {channel}, with a {tone.toLowerCase()} voice.</CardDescription>
              <CardAction>
                <Badge variant="outline">Concept {concept}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid min-h-[520px] min-w-0 grid-cols-1 gap-3 rounded-xl bg-slate-950 p-3 sm:grid-cols-12 sm:grid-rows-6 sm:p-4">
                {generation === "loading" ? (
                  <>
                    <Skeleton className="min-h-56 bg-white/15 motion-reduce:animate-none sm:col-span-8 sm:row-span-4" />
                    <Skeleton className="min-h-36 bg-white/15 motion-reduce:animate-none sm:col-span-4 sm:row-span-3" />
                    <Skeleton className="min-h-28 bg-white/15 motion-reduce:animate-none sm:col-span-4 sm:row-span-3" />
                    <Skeleton className="min-h-24 bg-white/15 motion-reduce:animate-none sm:col-span-8 sm:row-span-2" />
                  </>
                ) : (
                  <>
                    <article
                      className={`relative flex min-h-64 min-w-0 flex-col justify-between overflow-hidden rounded-lg p-6 text-white transition-colors duration-300 motion-reduce:transition-none sm:col-span-8 sm:row-span-4 ${selected.accent} ${storyFirst ? "sm:order-1" : "sm:order-2"}`}
                    >
                      <GripVertical aria-hidden="true" className="absolute right-4 top-4 size-5 opacity-60" />
                      <p className="max-w-[28ch] text-sm font-medium opacity-90">{visual} for {audience}</p>
                      <div className="max-w-2xl">
                        <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                          {selected.headline}
                        </h1>
                        <p className="mt-4 max-w-[58ch] text-pretty text-sm leading-6 text-white/85">
                          {brief}
                        </p>
                      </div>
                    </article>

                    <article className={`flex min-h-44 flex-col justify-between rounded-lg p-5 text-slate-950 sm:col-span-4 sm:row-span-3 ${selected.soft} ${storyFirst ? "sm:order-2" : "sm:order-1"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">Product proof</span>
                        <GripVertical aria-hidden="true" className="size-4 opacity-50" />
                      </div>
                      <div>
                        <p className="text-3xl font-semibold tracking-tight">{tone}</p>
                        <p className="mt-2 text-sm leading-5 opacity-75">One clear benefit, adapted for {channel.toLowerCase()}.</p>
                      </div>
                    </article>

                    <article className="flex min-h-36 flex-col justify-between rounded-lg bg-white p-5 text-slate-950 sm:col-span-4 sm:row-span-3 sm:order-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">Call to action</span>
                        <GripVertical aria-hidden="true" className="size-4 opacity-50" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">See it in motion</p>
                        <p className="mt-2 text-sm text-slate-600">Built for {audience.toLowerCase()}.</p>
                      </div>
                    </article>

                    <dl className="grid min-h-24 grid-cols-3 gap-3 rounded-lg bg-slate-900 p-4 text-white sm:col-span-8 sm:row-span-2 sm:order-4">
                      <Metric label="Reach" value={selected.reach} />
                      <Metric label="CTR" value={selected.ctr} />
                      <Metric label="Conversion" value={selected.conversion} />
                    </dl>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent operations in this local campaign session.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3" aria-label="Recent activity">
              {activity.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-lg bg-muted px-3 py-2 text-xs leading-5 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function ControlSelect({
  id,
  label,
  value,
  values,
  onChange,
}: {
  id: string
  label: string
  value: string
  values: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Select
        value={value}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next)
        }}
      >
        <SelectTrigger id={id} className="min-h-11 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {values.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-slate-400">{label}</dt>
      <dd className="mt-1 truncate text-xl font-semibold sm:text-2xl">{value}</dd>
    </div>
  )
}
