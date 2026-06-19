"use client"

import { useMemo, useState } from "react"
import { Sparkles, Play, Save, Download, Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MODEL = "Claude Opus 4.8"
const CHAIN = "shadcn-best-practices / shadcn"

const AUDIENCES = ["Urban creators", "Remote teams", "Early adopters"]
const CHANNELS = ["Paid social", "Launch email", "Retail display"]
const TONES = ["Confident", "Useful", "Direct"]
const STYLES = ["Clean", "Soft", "Sharp"]

const CONCEPTS = [
  { id: "A", name: "Daily Signal", line: "Hear the work before the room gets loud.", reach: 820, ctr: 4.2, conv: 2.8 },
  { id: "B", name: "Desk Ritual", line: "Start focused, stay reachable.", reach: 760, ctr: 4.6, conv: 3.1 },
  { id: "C", name: "Launch Proof", line: "Fewer pauses between idea and edit.", reach: 910, ctr: 3.9, conv: 2.6 },
]

type Gen = "idle" | "loading" | "success" | "error"

export default function ComponentSystem() {
  const [brief, setBrief] = useState("A systematic, component-driven launch for a premium wearable audio product.")
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [channel, setChannel] = useState(CHANNELS[0])
  const [tone, setTone] = useState(TONES[0])
  const [style, setStyle] = useState(STYLES[0])
  const [active, setActive] = useState("A")
  const [gen, setGen] = useState<Gen>("idle")
  const [log, setLog] = useState<string[]>(["Tokens loaded"])

  const c = CONCEPTS.find((x) => x.id === active) ?? CONCEPTS[0]
  const note = (msg: string) => setLog((p) => [msg, ...p].slice(0, 4))
  const m = useMemo(() => {
    const k = (AUDIENCES.indexOf(audience) + CHANNELS.indexOf(channel)) * 0.05
    return { reach: Math.round(c.reach * (1 + k)), ctr: +(c.ctr * (1 + k * 0.5)).toFixed(1), conv: +(c.conv * (1 + k * 0.3)).toFixed(1) }
  }, [audience, channel, c])

  const generate = () => {
    if (gen === "loading") return
    setGen("loading"); note("Composing components…")
    setTimeout(() => {
      if (brief.trim().length < 16) { setGen("error"); note("Validation failed") }
      else { setGen("success"); note("Variant set generated") }
    }, 1000)
  }

  const group = (label: string, val: string, set: (v: string) => void, opts: string[]) => (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {opts.map((o) => (
          <Button key={o} size="sm" variant={o === val ? "default" : "outline"} onClick={() => set(o)}>{o}</Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 py-4">
          <span className="flex items-center gap-2 font-semibold"><Sparkles className="size-5 text-primary" />Muse</span>
          <Badge>{MODEL}</Badge>
          <Badge variant="secondary">{CHAIN}</Badge>
          <Badge variant="outline" className="ml-auto">{gen === "loading" ? "building" : gen === "error" ? "invalid" : "stable"}</Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-5 py-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader><CardTitle>Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Campaign brief</p>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} className="input-control h-auto w-full resize-none py-2" />
            </div>
            {group("Audience", audience, setAudience, AUDIENCES)}
            {group("Channel", channel, setChannel, CHANNELS)}
            {group("Tone", tone, setTone, TONES)}
            {group("Style", style, setStyle, STYLES)}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <Tabs value={active} onValueChange={(v) => { setActive(v as string); note(`Concept ${v}`) }}>
                <TabsList>{CONCEPTS.map((x) => <TabsTrigger key={x.id} value={x.id}>{x.id}</TabsTrigger>)}</TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="secondary">{tone} · {style}</Badge>
              <h1 className="text-2xl font-semibold tracking-tight">{c.name}</h1>
              <p className="text-muted-foreground">{c.line}</p>
              <p className="text-xs text-muted-foreground">{channel} → {audience}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            {[["Reach", m.reach, `${m.reach}K`, 1200], ["CTR", m.ctr, `${m.ctr}%`, 6], ["Conversion", m.conv, `${m.conv}%`, 5]].map(([l, raw, disp, max]) => (
              <Card key={l as string} size="sm">
                <CardContent className="space-y-2 pt-1">
                  <p className="text-xs text-muted-foreground">{l}</p>
                  <p className="text-xl font-semibold tabular-nums">{disp}</p>
                  <Progress value={Math.min(100, ((raw as number) / (max as number)) * 100)} />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="flex flex-wrap items-center gap-2 pt-1">
              <Button onClick={generate} disabled={gen === "loading"}>
                {gen === "loading" ? <Loader2 className="animate-spin" /> : <Play />}{gen === "loading" ? "Generating" : "Generate"}
              </Button>
              <Button variant="secondary" onClick={() => note("Saved")}><Save />Save</Button>
              <Button variant="outline" onClick={() => note("Exported")}><Download />Export</Button>
              {gen === "error" && <Badge variant="destructive">Brief too short</Badge>}
              {gen === "success" && <Badge variant="secondary">Generated</Badge>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">{log.map((l, i) => <li key={i}>· {l}</li>)}</ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
