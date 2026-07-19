"use client";

import { useMemo, useRef, useState } from "react";
import {
  Activity as ActivityIcon,
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  Save,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Parents"] as const;
const CHANNELS = ["Instagram", "TikTok", "LinkedIn", "Email"] as const;
const TONES = ["Bold", "Playful", "Premium", "Friendly"] as const;
const STYLES = ["Minimal", "Vibrant", "Editorial", "Retro"] as const;

type Audience = (typeof AUDIENCES)[number];
type Channel = (typeof CHANNELS)[number];
type Tone = (typeof TONES)[number];
type Style = (typeof STYLES)[number];
type VariantKey = "A" | "B" | "C";

const STYLE_THEME: Record<
  Style,
  { bg: string; accent: string; ink: string; soft: string }
> = {
  Minimal: {
    bg: "linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)",
    accent: "#2563eb",
    ink: "#0f172a",
    soft: "#e2e8f0",
  },
  Vibrant: {
    bg: "linear-gradient(135deg,#2563eb 0%,#7c3aed 55%,#db2777 100%)",
    accent: "#ffffff",
    ink: "#ffffff",
    soft: "rgba(255,255,255,0.18)",
  },
  Editorial: {
    bg: "linear-gradient(160deg,#111827 0%,#1f2937 100%)",
    accent: "#f59e0b",
    ink: "#f9fafb",
    soft: "rgba(255,255,255,0.12)",
  },
  Retro: {
    bg: "linear-gradient(135deg,#fde68a 0%,#fb923c 60%,#ef4444 100%)",
    accent: "#7c2d12",
    ink: "#431407",
    soft: "rgba(124,42,18,0.15)",
  },
};

const TONE_HEADLINE: Record<Tone, string> = {
  Bold: "Make the launch impossible to ignore.",
  Playful: "Say hello to your new favorite thing.",
  Premium: "Engineered for those who expect more.",
  Friendly: "A simpler way to get more done.",
};

const VARIANT_HEADLINE: Record<VariantKey, string> = {
  A: "The reveal",
  B: "The everyday",
  C: "The momentum",
};

const VARIANTS: Record<
  VariantKey,
  { label: string; reach: string; ctr: string; conversion: string }
> = {
  A: { label: "Variant A", reach: "128K", ctr: "3.4%", conversion: "2.1%" },
  B: { label: "Variant B", reach: "96K", ctr: "4.8%", conversion: "3.6%" },
  C: { label: "Variant C", reach: "154K", ctr: "2.9%", conversion: "1.8%" },
};

type Status = "idle" | "loading" | "success" | "error";

type FeedItem = { id: number; text: string; time: string };

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function OptionGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="border-t border-slate-200 pt-3">
      <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function StandardBuilder() {
  const [brief, setBrief] = useState(
    "Launch the Atlas One smart bottle: 24h cold, self-cleaning, built for commuters."
  );
  const [audience, setAudience] = useState<Audience>("Millennials");
  const [channel, setChannel] = useState<Channel>("Instagram");
  const [tone, setTone] = useState<Tone>("Bold");
  const [style, setStyle] = useState<Style>("Vibrant");
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 1, text: "Workspace initialized", time: now() },
  ]);
  const idRef = useRef(2);

  const theme = STYLE_THEME[style];
  const metrics = VARIANTS[variant];

  const kicker = useMemo(() => {
    const words = brief.trim().split(/\s+/).slice(0, 4).join(" ");
    return words ? words.toUpperCase() : "NEW PRODUCT LAUNCH";
  }, [brief]);

  function log(text: string) {
    setFeed((prev) =>
      [{ id: idRef.current++, text, time: now() }, ...prev].slice(0, 8)
    );
  }

  function handleGenerate() {
    if (!brief.trim()) {
      setStatus("error");
      log("Generate failed — brief is empty");
      return;
    }
    setStatus("loading");
    log(`Generating ${metrics.label} for ${channel}`);
    window.setTimeout(() => {
      setStatus("success");
      log(`Generated ${metrics.label} creative`);
    }, 1200);
  }

  function handleSave() {
    log(`Saved ${metrics.label} draft`);
  }

  function handleExport() {
    log(`Exported ${channel} asset pack`);
  }

  function selectVariant(v: VariantKey) {
    setVariant(v);
    log(`Switched preview to ${VARIANTS[v].label}`);
  }

  const statusBanner =
    status === "success" ? (
      <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="size-4" /> Creative generated successfully.
      </div>
    ) : status === "error" ? (
      <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
        <AlertTriangle className="size-4" /> Add a campaign brief before
        generating.
      </div>
    ) : null;

  const controlPanel = (
    <div className="flex flex-col gap-3">
      <div>
        <label
          htmlFor="brief"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500"
        >
          Campaign Brief
        </label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={5}
          placeholder="Describe the product, goal, and key message…"
          className={cn(
            "w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800",
            "placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            status === "error" && "border-red-400"
          )}
        />
      </div>
      <OptionGroup
        legend="Target audience"
        options={AUDIENCES}
        value={audience}
        onChange={setAudience}
      />
      <OptionGroup
        legend="Channel"
        options={CHANNELS}
        value={channel}
        onChange={setChannel}
      />
      <OptionGroup
        legend="Tone"
        options={TONES}
        value={tone}
        onChange={setTone}
      />
      <OptionGroup
        legend="Visual style"
        options={STYLES}
        value={style}
        onChange={setStyle}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* App bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-blue-600 text-white">
              <Wand2 className="size-4" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Muse Campaign Studio</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-medium text-slate-700">Qwen 3.8 Max</span>
                <Badge
                  variant="secondary"
                  className="font-mono text-[10px] tracking-tight"
                >
                  frontend-app-builder
                </Badge>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Save className="size-3.5" /> Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Download className="size-3.5" /> Export
            </Button>
            <Button
              size="sm"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" /> Generating
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" /> Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4">
        {statusBanner && <div className="mb-4">{statusBanner}</div>}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)_260px]">
          {/* LEFT: controls */}
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Controls
            </h2>
            {/* Mobile collapse */}
            <details className="lg:hidden" open>
              <summary className="mb-3 cursor-pointer list-none rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Toggle control panel
              </summary>
              {controlPanel}
            </details>
            <div className="hidden lg:block">{controlPanel}</div>
          </section>

          {/* CENTER: preview */}
          <section className="flex flex-col gap-3">
            <div
              className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 p-6 shadow-sm transition-[background] duration-300 sm:min-h-[420px]"
              style={{ background: theme.bg, color: theme.ink }}
            >
              {status === "loading" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow">
                    <Loader2 className="size-4 animate-spin text-blue-600" />
                    Rendering creative…
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span
                  className="rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ background: theme.soft, color: theme.ink }}
                >
                  {channel}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: theme.ink, opacity: 0.7 }}
                >
                  {metrics.label}
                </span>
              </div>
              <div className="max-w-lg">
                <div
                  className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: theme.accent }}
                >
                  {kicker}
                </div>
                <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
                  {TONE_HEADLINE[tone]}
                </h3>
                <p
                  className="mt-3 text-sm font-medium"
                  style={{ opacity: 0.85 }}
                >
                  {VARIANT_HEADLINE[variant]} · for {audience}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="rounded-md px-3 py-1.5 text-xs font-semibold"
                  style={{ background: theme.accent, color: theme.bg.includes("#fff") || style === "Vibrant" ? "#0f172a" : "#ffffff" }}
                >
                  {tone} tone
                </span>
                <span
                  className="text-[11px] font-medium uppercase tracking-wider"
                  style={{ opacity: 0.7 }}
                >
                  {style} style
                </span>
              </div>
            </div>

            {/* A/B/C segmented tabs */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Variants
              </span>
              <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
                {(Object.keys(VARIANTS) as VariantKey[]).map((v) => {
                  const active = v === variant;
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectVariant(v)}
                      className={cn(
                        "rounded px-4 py-1.5 text-xs font-semibold transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        active
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT: metrics + activity */}
          <section className="flex flex-col gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Predicted metrics
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Reach", value: metrics.reach },
                  { label: "CTR", value: metrics.ctr },
                  { label: "Conversion", value: metrics.conversion },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <span className="text-xs font-medium text-slate-500">
                      {m.label}
                    </span>
                    <span className="text-lg font-semibold tabular-nums text-slate-900">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <ActivityIcon className="size-3.5" /> Activity
              </h2>
              <ul className="flex flex-col gap-2">
                {feed.map((item) => (
                  <li key={item.id} className="flex gap-2 text-xs">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-500" />
                    <div className="min-w-0">
                      <p className="truncate text-slate-700">{item.text}</p>
                      <p className="text-[10px] tabular-nums text-slate-400">
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
