"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Save,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Braces,
  Eye,
  SlidersHorizontal,
  Terminal,
  Activity as ActivityIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

const AUDIENCES = [
  "Gen Z Trendsetters",
  "Urban Professionals",
  "Fitness Enthusiasts",
  "Eco Conscious",
] as const;

const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"] as const;
const TONES = ["Bold", "Playful", "Premium", "Minimal"] as const;

const STYLES = [
  { id: "Aurora", gradient: "linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f59e0b 100%)" },
  { id: "Editorial", gradient: "linear-gradient(135deg,#1c1917 0%,#44403c 60%,#a8a29e 100%)" },
  { id: "Pastel", gradient: "linear-gradient(135deg,#fecdd3 0%,#bae6fd 55%,#ddd6fe 100%)" },
  { id: "Neon", gradient: "linear-gradient(135deg,#0f172a 0%,#0891b2 55%,#84cc16 100%)" },
] as const;

type Variant = "A" | "B" | "C";

const VARIANTS: Record<
  Variant,
  { label: string; accent: string; reach: number; ctr: number; conv: number }
> = {
  A: { label: "centered", accent: "#6d28d9", reach: 128400, ctr: 3.2, conv: 2.1 },
  B: { label: "split", accent: "#0891b2", reach: 96200, ctr: 4.1, conv: 2.8 },
  C: { label: "full-bleed", accent: "#db2777", reach: 154800, ctr: 2.7, conv: 1.9 },
};

const CTA_BY_CHANNEL: Record<(typeof CHANNELS)[number], string> = {
  Instagram: "Shop the drop",
  TikTok: "Join the trend",
  YouTube: "Watch & shop",
  Email: "Open your offer",
};

const DEFAULT_BRIEF =
  "Launch Aurora One — the self-cleaning smart water bottle. 24h cold, 12h hot, limited first-drop colorway.";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function computeMetrics(variant: Variant, channelIdx: number, audienceIdx: number) {
  const base = VARIANTS[variant];
  return {
    reach: base.reach + channelIdx * 4200 + audienceIdx * 2600,
    ctr: +(base.ctr + audienceIdx * 0.12).toFixed(2),
    conv: +(base.conv + channelIdx * 0.14).toFixed(2),
    accent: base.accent,
  };
}

/* ------------------------------------------------------------------ */
/* Reusable controls                                                   */
/* ------------------------------------------------------------------ */

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-2.5 py-1.5 text-xs transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1",
        active
          ? "border-sky-500 bg-sky-50 text-sky-700"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
      )}
    >
      {children}
    </button>
  );
}

function InspectorBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-neutral-100 px-4 py-4">
      <p className="mb-2.5 text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Artifact preview                                                    */
/* ------------------------------------------------------------------ */

function Artifact({
  brief,
  audience,
  channel,
  tone,
  styleId,
  variant,
}: {
  brief: string;
  audience: string;
  channel: string;
  tone: string;
  styleId: string;
  variant: Variant;
}) {
  const style = STYLES.find((s) => s.id === styleId) ?? STYLES[0];
  const accent = VARIANTS[variant].accent;
  const light = styleId === "Pastel";

  const headline =
    tone === "Bold"
      ? "STAY COLD. STAY MOVING."
      : tone === "Playful"
        ? "Sip happens — keep it cool."
        : tone === "Premium"
          ? "Aurora One"
          : "Pure hydration.";

  const headlineClass =
    tone === "Bold"
      ? "font-black uppercase tracking-tight"
      : tone === "Playful"
        ? "font-semibold italic"
        : tone === "Premium"
          ? "font-serif tracking-[0.08em]"
          : "font-light tracking-wide";

  const layout =
    variant === "A"
      ? "items-center justify-center text-center"
      : variant === "B"
        ? "items-start justify-start text-left"
        : "items-end justify-center text-center";

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-lg"
      style={{ background: style.gradient }}
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      <div
        className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className={cn("relative flex h-full flex-col gap-3 p-6", layout)}>
        <span
          className={cn(
            "w-fit rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase backdrop-blur",
            light ? "bg-black/10 text-neutral-800" : "bg-white/20 text-white"
          )}
        >
          {channel} · {audience}
        </span>
        <h3
          className={cn(
            "max-w-xs leading-tight break-words text-2xl sm:text-3xl",
            headlineClass,
            light ? "text-neutral-900" : "text-white"
          )}
        >
          {headline}
        </h3>
        <p
          className={cn(
            "max-w-xs text-xs leading-relaxed break-words",
            light ? "text-neutral-700" : "text-white/80"
          )}
        >
          {brief.trim() ? brief.trim().slice(0, 90) : "Brief drives the copy…"}
        </p>
        <span
          className="mt-1 w-fit rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow"
          style={{ backgroundColor: accent }}
        >
          {CTA_BY_CHANNEL[channel as keyof typeof CTA_BY_CHANNEL]}
        </span>
      </div>
      <span
        className="absolute right-3 bottom-3 font-mono text-xs opacity-60"
        style={{ color: light ? "#111" : "#fff" }}
      >
        variant:{variant}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type Status = "idle" | "loading" | "success" | "error";
type MobilePane = "preview" | "inspector";

export default function ArtifactBuilder() {
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>(AUDIENCES[0]);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>(CHANNELS[0]);
  const [tone, setTone] = useState<(typeof TONES)[number]>(TONES[0]);
  const [styleId, setStyleId] = useState<string>(STYLES[0].id);
  const [variant, setVariant] = useState<Variant>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [mobilePane, setMobilePane] = useState<MobilePane>("preview");
  const [activity, setActivity] = useState<string[]>(["artifact initialized"]);

  const metrics = useMemo(
    () => computeMetrics(variant, CHANNELS.indexOf(channel), AUDIENCES.indexOf(audience)),
    [variant, channel, audience]
  );

  const log = (text: string) =>
    setActivity((prev) => [text, ...prev].slice(0, 6));

  const configJson = useMemo(
    () =>
      JSON.stringify(
        {
          artifact: "campaign-creative",
          brief: brief.trim() || null,
          targeting: { audience, channel },
          creative: { tone, style: styleId, variant },
          metrics: {
            reach: metrics.reach,
            ctr: metrics.ctr,
            conversion: metrics.conv,
          },
        },
        null,
        2
      ),
    [brief, audience, channel, tone, styleId, variant, metrics]
  );

  const handleGenerate = () => {
    if (!brief.trim()) {
      setStatus("error");
      log("error: brief is empty");
      return;
    }
    setStatus("loading");
    log("build started…");
    setTimeout(() => {
      setStatus("success");
      log(`build ok → variant ${variant}`);
    }, 1200);
  };

  const handleSave = () => log("artifact saved");
  const handleExport = () => log(`exported ${channel}/${variant}.json`);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      {/* Top toolbar */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 text-white">
              <Braces className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Qwen 3.8 Max</p>
              <p className="font-mono text-[10px] text-neutral-400">
                web-artifacts-builder / artifacts-builder
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-all outline-none hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Building
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" /> Generate
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Mobile pane toggle */}
        <div className="flex gap-1 border-t border-neutral-100 px-4 py-2 lg:hidden">
          {(
            [
              { id: "preview", label: "Preview", icon: Eye },
              { id: "inspector", label: "Inspector", icon: SlidersHorizontal },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setMobilePane(p.id)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                mobilePane === p.id
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600"
              )}
            >
              <p.icon className="h-3.5 w-3.5" /> {p.label}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT — artifact preview */}
        <div
          className={cn(
            "min-w-0 flex-col",
            mobilePane === "preview" ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* Artifact header with A/B/C tabs */}
            <div className="flex items-center gap-1 border-b border-neutral-100 bg-neutral-50 px-3 py-2">
              <span className="mr-2 font-mono text-[11px] text-neutral-400">
                artifact.preview
              </span>
              <div className="ml-auto flex gap-1">
                {(Object.keys(VARIANTS) as Variant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setVariant(v);
                      log(`variant → ${v}`);
                    }}
                    aria-pressed={variant === v}
                    className={cn(
                      "h-7 w-8 rounded-md text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      variant === v
                        ? "text-white"
                        : "bg-white text-neutral-500 ring-1 ring-neutral-200 hover:text-neutral-900"
                    )}
                    style={variant === v ? { backgroundColor: VARIANTS[v].accent } : undefined}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              <Artifact
                brief={brief}
                audience={audience}
                channel={channel}
                tone={tone}
                styleId={styleId}
                variant={variant}
              />
              <p className="mt-3 font-mono text-[11px] text-neutral-400">
                {`// ${VARIANTS[variant].label} layout · ${styleId} · ${tone}`}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — inspector */}
        <div
          className={cn(
            "min-w-0 flex-col gap-4",
            mobilePane === "inspector" ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-2.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-xs font-semibold">Inspector</span>
            </div>

            <InspectorBlock title="Brief">
              <textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value);
                  if (status === "error" && e.target.value.trim()) setStatus("idle");
                }}
                rows={3}
                className="w-full resize-y rounded-md border border-neutral-200 bg-neutral-50 p-2.5 font-mono text-xs leading-relaxed outline-none focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/20"
              />
            </InspectorBlock>

            <InspectorBlock title="Audience">
              <div className="flex flex-wrap gap-1.5">
                {AUDIENCES.map((a) => (
                  <Chip
                    key={a}
                    active={audience === a}
                    onClick={() => {
                      setAudience(a);
                      log(`audience → ${a}`);
                    }}
                  >
                    {a}
                  </Chip>
                ))}
              </div>
            </InspectorBlock>

            <InspectorBlock title="Channel">
              <div className="flex flex-wrap gap-1.5">
                {CHANNELS.map((c) => (
                  <Chip
                    key={c}
                    active={channel === c}
                    onClick={() => {
                      setChannel(c);
                      log(`channel → ${c}`);
                    }}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </InspectorBlock>

            <InspectorBlock title="Tone">
              <div className="flex flex-wrap gap-1.5">
                {TONES.map((t) => (
                  <Chip
                    key={t}
                    active={tone === t}
                    onClick={() => {
                      setTone(t);
                      log(`tone → ${t}`);
                    }}
                  >
                    {t}
                  </Chip>
                ))}
              </div>
            </InspectorBlock>

            <InspectorBlock title="Visual style">
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setStyleId(s.id);
                      log(`style → ${s.id}`);
                    }}
                    aria-pressed={styleId === s.id}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md border py-1 pr-2.5 pl-1 text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      styleId === s.id
                        ? "border-sky-500 text-sky-700"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                    )}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/10"
                      style={{ background: s.gradient }}
                    />
                    {s.id}
                  </button>
                ))}
              </div>
            </InspectorBlock>
          </div>

          {/* Faux code / JSON panel */}
          <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-sm">
            <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] text-neutral-400">
                config.json · read-only
              </span>
              <span className="ml-auto flex gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </span>
            </div>
            <pre className="max-h-64 overflow-auto p-4 font-mono text-[11px] leading-relaxed whitespace-pre text-emerald-300">
              {configJson}
            </pre>
          </div>
        </div>
      </div>

      {/* Status bar footer */}
      <footer className="sticky bottom-0 z-20 border-t border-neutral-200 bg-white/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2 font-mono text-[11px]">
          <span className="text-neutral-400">
            Reach <span className="font-semibold text-neutral-900">{metrics.reach.toLocaleString()}</span>
          </span>
          <span className="text-neutral-400">
            CTR <span className="font-semibold text-neutral-900">{metrics.ctr}%</span>
          </span>
          <span className="text-neutral-400">
            Conv <span className="font-semibold text-neutral-900">{metrics.conv}%</span>
          </span>

          <span className="ml-auto flex min-w-0 items-center gap-1.5 text-neutral-500">
            {status === "loading" && <Loader2 className="h-3 w-3 animate-spin" />}
            {status === "success" && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
            {status === "error" && <AlertCircle className="h-3 w-3 text-red-500" />}
            <ActivityIcon className="h-3 w-3 shrink-0 text-neutral-400" />
            <span className="truncate">{activity[0]}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
