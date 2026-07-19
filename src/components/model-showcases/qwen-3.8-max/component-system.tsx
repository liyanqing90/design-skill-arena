"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Save,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  Radio,
  MessageSquare,
  Palette,
  Eye,
  MousePointerClick,
  TrendingUp,
  Activity as ActivityIcon,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const AUDIENCES = [
  "Gen Z Trendsetters",
  "Urban Professionals",
  "Outdoor Enthusiasts",
  "New Parents",
];

const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email Newsletter"];

const TONES = ["Bold & Playful", "Calm & Premium", "Witty", "Inspirational"];

const STYLES = ["Vivid Gradient", "Minimal Mono", "Editorial Cream", "Neon Pop"];

const STYLE_MAP: Record<string, { bg: string; fg: string; chip: string }> = {
  "Vivid Gradient": {
    bg: "linear-gradient(135deg,#6366f1 0%,#ec4899 55%,#f59e0b 100%)",
    fg: "#ffffff",
    chip: "rgba(255,255,255,0.18)",
  },
  "Minimal Mono": {
    bg: "linear-gradient(135deg,#18181b 0%,#3f3f46 100%)",
    fg: "#fafafa",
    chip: "rgba(255,255,255,0.12)",
  },
  "Editorial Cream": {
    bg: "linear-gradient(135deg,#fafaf9 0%,#e7e5e4 100%)",
    fg: "#1c1917",
    chip: "rgba(28,25,23,0.08)",
  },
  "Neon Pop": {
    bg: "linear-gradient(135deg,#22d3ee 0%,#a3e635 100%)",
    fg: "#052e16",
    chip: "rgba(5,46,22,0.12)",
  },
};

const TONE_HEADLINE: Record<string, string> = {
  "Bold & Playful": "Make Some Noise.",
  "Calm & Premium": "Quietly Extraordinary.",
  Witty: "Yes, It's That Good.",
  Inspirational: "Begin Something Big.",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { kicker: string; tagline: string; reach: number; ctr: number; conversion: number }
> = {
  A: {
    kicker: "The Teaser",
    tagline: "Something new is loading. Be first in line.",
    reach: 48200,
    ctr: 3.4,
    conversion: 2.1,
  },
  B: {
    kicker: "The Reveal",
    tagline: "Meet the product everyone will be talking about.",
    reach: 61500,
    ctr: 4.1,
    conversion: 1.7,
  },
  C: {
    kicker: "The Proof",
    tagline: "Real results, from the very first day.",
    reach: 39800,
    ctr: 2.8,
    conversion: 3.2,
  },
};

type Status = "idle" | "loading" | "success" | "error";

type FeedItem = { id: number; text: string; time: string; tone: "info" | "ok" | "err" };

let feedId = 0;
const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function ControlSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(String(v))}>
      <SelectTrigger className="w-full" aria-label="select option">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function ComponentSystemShowcase() {
  const [brief, setBrief] = useState(
    "Launch our new portable espresso maker to coffee lovers who travel often. Emphasize speed, design, and freedom."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: feedId++, text: "Studio session started", time: now(), tone: "info" },
  ]);

  const pushFeed = (text: string, tone: FeedItem["tone"] = "info") =>
    setFeed((f) => [{ id: feedId++, text, time: now(), tone }, ...f].slice(0, 8));

  const active = VARIANTS[variant];
  const palette = STYLE_MAP[style];

  const metrics = useMemo(
    () => [
      {
        key: "reach",
        label: "Reach",
        icon: Eye,
        display: active.reach.toLocaleString(),
        pct: Math.min(100, Math.round((active.reach / 70000) * 100)),
      },
      {
        key: "ctr",
        label: "CTR",
        icon: MousePointerClick,
        display: `${active.ctr.toFixed(1)}%`,
        pct: Math.min(100, Math.round(active.ctr * 20)),
      },
      {
        key: "conversion",
        label: "Conversion",
        icon: TrendingUp,
        display: `${active.conversion.toFixed(1)}%`,
        pct: Math.min(100, Math.round(active.conversion * 25)),
      },
    ],
    [active]
  );

  const handleGenerate = () => {
    if (status === "loading") return;
    if (brief.trim().length === 0) {
      setStatus("error");
      pushFeed("Generate failed — campaign brief is empty", "err");
      return;
    }
    setStatus("loading");
    pushFeed(`Generating variant ${variant} concepts…`, "info");
    setTimeout(() => {
      setStatus("success");
      pushFeed(`Generated 3 creatives for ${channel}`, "ok");
    }, 1200);
  };

  const handleSave = () => pushFeed(`Saved campaign draft (variant ${variant})`, "ok");
  const handleExport = () => pushFeed(`Exported ${channel} assets as PNG + MP4`, "ok");

  const pickVariant = (v: VariantKey) => {
    setVariant(v);
    pushFeed(`Switched to variant ${v}`, "info");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 text-zinc-50">
              <Wand2 className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Muse — AI Campaign Studio</h1>
              <p className="text-sm text-zinc-500">Single-page creative director workspace</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-zinc-900 text-zinc-50">Qwen 3.8 Max</Badge>
            <Badge variant="outline">shadcn-best-practices / shadcn</Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left column: brief + controls */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Brief</CardTitle>
                <CardDescription>Describe the product and the goal.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value);
                    if (status === "error" && e.target.value.trim().length > 0) setStatus("idle");
                  }}
                  placeholder="Write your campaign brief…"
                  className={cn(
                    "min-h-28 resize-none",
                    status === "error" && "border-destructive focus-visible:ring-destructive/20"
                  )}
                  aria-invalid={status === "error"}
                />
                {status === "error" && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
                    <AlertCircle className="size-3.5" /> Brief cannot be empty.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Controls</CardTitle>
                <CardDescription>Tune the targeting and creative direction.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Users className="size-3.5" /> Target audience
                  </label>
                  <ControlSelect
                    value={audience}
                    onChange={(v) => {
                      setAudience(v);
                      pushFeed(`Audience set to ${v}`, "info");
                    }}
                    options={AUDIENCES}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Radio className="size-3.5" /> Channel
                  </label>
                  <ControlSelect
                    value={channel}
                    onChange={(v) => {
                      setChannel(v);
                      pushFeed(`Channel set to ${v}`, "info");
                    }}
                    options={CHANNELS}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <MessageSquare className="size-3.5" /> Tone
                  </label>
                  <ControlSelect
                    value={tone}
                    onChange={(v) => {
                      setTone(v);
                      pushFeed(`Tone set to ${v}`, "info");
                    }}
                    options={TONES}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                    <Palette className="size-3.5" /> Visual style
                  </label>
                  <ControlSelect
                    value={style}
                    onChange={(v) => {
                      setStyle(v);
                      pushFeed(`Visual style set to ${v}`, "info");
                    }}
                    options={STYLES}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-wrap gap-2">
                <Button onClick={handleGenerate} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  {status === "loading" ? "Generating…" : "Generate"}
                </Button>
                <Button variant="outline" onClick={handleSave}>
                  <Save className="size-4" /> Save
                </Button>
                <Button variant="secondary" onClick={handleExport}>
                  <Download className="size-4" /> Export
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right column: preview + tabs */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Creative Preview</CardTitle>
                <CardDescription>
                  {channel} · {audience}
                </CardDescription>
                <CardAction>
                  <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
                    {(["A", "B", "C"] as VariantKey[]).map((v) => (
                      <Button
                        key={v}
                        size="xs"
                        variant={variant === v ? "default" : "ghost"}
                        onClick={() => pickVariant(v)}
                        aria-pressed={variant === v}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </CardAction>
              </CardHeader>
              <CardContent>
                {status === "loading" ? (
                  <div className="flex h-72 flex-col justify-between rounded-xl border border-zinc-200 p-6">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex flex-col gap-3">
                      <Skeleton className="h-9 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex h-72 flex-col justify-between overflow-hidden rounded-xl p-6 transition-all duration-500"
                    style={{ background: palette.bg, color: palette.fg }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest"
                        style={{ background: palette.chip }}
                      >
                        {active.kicker}
                      </span>
                      <span className="text-6xl font-black opacity-20">{variant}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        {TONE_HEADLINE[tone]}
                      </h2>
                      <p className="max-w-md text-sm opacity-90">{active.tagline}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className="rounded-full px-3 py-1 font-medium"
                        style={{ background: palette.chip }}
                      >
                        {channel}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 font-medium"
                        style={{ background: palette.chip }}
                      >
                        {audience}
                      </span>
                      <span
                        className="rounded-full px-3 py-1 font-medium"
                        style={{ background: palette.chip }}
                      >
                        {tone}
                      </span>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
                    <CheckCircle2 className="size-3.5" /> 3 creatives generated for variant {variant}.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Tabs defaultValue="metrics">
                  <TabsList>
                    <TabsTrigger value="preview">
                      <Eye className="size-4" /> Preview
                    </TabsTrigger>
                    <TabsTrigger value="metrics">
                      <TrendingUp className="size-4" /> Metrics
                    </TabsTrigger>
                    <TabsTrigger value="activity">
                      <ActivityIcon className="size-4" /> Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="pt-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-lg border border-zinc-200 p-3">
                        <p className="text-xs text-zinc-500">Channel</p>
                        <p className="mt-1 text-sm font-medium">{channel}</p>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-3">
                        <p className="text-xs text-zinc-500">Audience</p>
                        <p className="mt-1 text-sm font-medium">{audience}</p>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-3">
                        <p className="text-xs text-zinc-500">Tone</p>
                        <p className="mt-1 text-sm font-medium">{tone}</p>
                      </div>
                      <div className="rounded-lg border border-zinc-200 p-3">
                        <p className="text-xs text-zinc-500">Style</p>
                        <p className="mt-1 text-sm font-medium">{style}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <p className="text-sm text-zinc-500">
                      Variant <span className="font-semibold text-zinc-900">{variant}</span> —{" "}
                      {active.kicker}. {active.tagline}
                    </p>
                  </TabsContent>

                  <TabsContent value="metrics" className="pt-4">
                    <div className="flex flex-col gap-5">
                      {metrics.map((m) => (
                        <div key={m.key} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-sm font-medium">
                              <m.icon className="size-4 text-zinc-400" /> {m.label}
                            </span>
                            <span className="text-sm font-semibold tabular-nums">{m.display}</span>
                          </div>
                          <Progress value={m.pct} />
                        </div>
                      ))}
                      <Separator />
                      <p className="text-xs text-zinc-500">
                        Predicted metrics for variant {variant}. Switch variants to compare.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="pt-4">
                    <ul className="flex flex-col">
                      {feed.map((item, i) => (
                        <li
                          key={item.id}
                          className={cn(
                            "flex items-start gap-3 py-2.5",
                            i !== 0 && "border-t border-zinc-100"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-1.5 size-2 shrink-0 rounded-full",
                              item.tone === "ok" && "bg-emerald-500",
                              item.tone === "err" && "bg-destructive",
                              item.tone === "info" && "bg-zinc-400"
                            )}
                          />
                          <span className="flex-1 text-sm text-zinc-700">{item.text}</span>
                          <span className="text-xs tabular-nums text-zinc-400">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
