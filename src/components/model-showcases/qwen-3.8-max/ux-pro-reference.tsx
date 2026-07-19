"use client";

import { useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Save,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Eye,
  Layers,
  BarChart3,
  Activity as ActivityIcon,
  SwatchBook,
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
  { id: "Aurora", gradient: "linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f59e0b 100%)", swatch: "#db2777" },
  { id: "Editorial", gradient: "linear-gradient(135deg,#1c1917 0%,#44403c 60%,#a8a29e 100%)", swatch: "#44403c" },
  { id: "Pastel", gradient: "linear-gradient(135deg,#fecdd3 0%,#bae6fd 55%,#ddd6fe 100%)", swatch: "#bae6fd" },
  { id: "Neon", gradient: "linear-gradient(135deg,#0f172a 0%,#0891b2 55%,#84cc16 100%)", swatch: "#0891b2" },
] as const;

type Variant = "A" | "B" | "C";

const VARIANTS: Record<
  Variant,
  { label: string; accent: string; reach: number; ctr: number; conv: number }
> = {
  A: { label: "Centered hero", accent: "#6d28d9", reach: 128400, ctr: 3.2, conv: 2.1 },
  B: { label: "Split editorial", accent: "#0891b2", reach: 96200, ctr: 4.1, conv: 2.8 },
  C: { label: "Full-bleed impact", accent: "#db2777", reach: 154800, ctr: 2.7, conv: 1.9 },
};

const CTA_BY_CHANNEL: Record<(typeof CHANNELS)[number], string> = {
  Instagram: "Shop the drop",
  TikTok: "Join the trend",
  YouTube: "Watch & shop",
  Email: "Open your offer",
};

const DEFAULT_BRIEF =
  "Launch Aurora One — a self-cleaning smart water bottle for people on the move. 24h cold / 12h hot, limited first-drop colorway.";

const TABS = [
  { id: "preview", label: "Preview", icon: Eye },
  { id: "variants", label: "Variants", icon: Layers },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "activity", label: "Activity", icon: ActivityIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

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
    label: base.label,
  };
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function TokenRow({
  token,
  value,
  swatch,
}: {
  token: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-neutral-100 py-2 last:border-0">
      <code className="font-mono text-[11px] text-neutral-500">{token}</code>
      <span className="flex min-w-0 items-center gap-1.5">
        {swatch && (
          <span
            className="h-3 w-3 shrink-0 rounded-sm border border-black/10"
            style={{ background: swatch }}
          />
        )}
        <span className="truncate text-xs font-medium text-neutral-800">{value}</span>
      </span>
    </div>
  );
}

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
        "rounded-md border px-3 py-1.5 text-xs transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
      )}
    >
      {children}
    </button>
  );
}

function Callout({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "absolute z-10 rounded border border-indigo-300 bg-white/95 px-1.5 py-0.5 font-mono text-[9px] font-medium text-indigo-600 shadow-sm",
        className
      )}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Spec preview                                                        */
/* ------------------------------------------------------------------ */

function SpecPreview({
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
    <div className="relative">
      {/* annotation callouts */}
      <Callout label="badge.channel" className="top-2 left-2" />
      <Callout label="text.headline" className="top-1/3 right-2" />
      <Callout label="cta.primary" className="bottom-3 left-2" />
      <Callout label={`variant.${variant}`} className="right-2 bottom-3" />

      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/5"
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
            {brief.trim() ? brief.trim().slice(0, 90) : "Brief informs the subhead…"}
          </p>
          <span
            className="mt-1 w-fit rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow"
            style={{ backgroundColor: accent }}
          >
            {CTA_BY_CHANNEL[channel as keyof typeof CTA_BY_CHANNEL]}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type Status = "idle" | "loading" | "success" | "error";

export default function UxProReference() {
  const [tab, setTab] = useState<TabId>("preview");
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>(AUDIENCES[0]);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>(CHANNELS[0]);
  const [tone, setTone] = useState<(typeof TONES)[number]>(TONES[2]);
  const [styleId, setStyleId] = useState<string>(STYLES[0].id);
  const [variant, setVariant] = useState<Variant>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [selectOpen, setSelectOpen] = useState(false);
  const [activity, setActivity] = useState<{ id: number; text: string }[]>([
    { id: 0, text: "Reference doc loaded" },
  ]);
  const selectRef = useRef<HTMLDivElement>(null);

  const metrics = useMemo(
    () => computeMetrics(variant, CHANNELS.indexOf(channel), AUDIENCES.indexOf(audience)),
    [variant, channel, audience]
  );

  const log = (text: string) =>
    setActivity((prev) =>
      [{ id: Date.now() + Math.random(), text }, ...prev].slice(0, 10)
    );

  const handleGenerate = () => {
    if (!brief.trim()) {
      setStatus("error");
      log("Generate failed — empty brief");
      return;
    }
    setStatus("loading");
    log("Generating component…");
    setTimeout(() => {
      setStatus("success");
      log(`Generated spec · variant ${variant}`);
    }, 1200);
  };

  const handleSave = () => log("Tokens saved to library");
  const handleExport = () => log(`Exported ${channel} spec (${variant})`);

  const activeStyle = STYLES.find((s) => s.id === styleId) ?? STYLES[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header bar */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Qwen 3.8 Max</span>
              <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-indigo-600">
                ui-ux-pro-max
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">Design-system reference</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-all outline-none hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating
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
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Tabs row (horizontally scrollable on mobile) */}
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 border-t border-neutral-100 py-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  tab === t.id
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <t.icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Tokens panel — above preview on mobile, left on desktop */}
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="min-w-0">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <SwatchBook className="h-3.5 w-3.5 text-neutral-400" />
                <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  Tokens
                </p>
              </div>
              <TokenRow token="color.audience" value={audience} swatch={metrics.accent} />
              <TokenRow token="channel.target" value={channel} />
              <TokenRow token="type.tone" value={tone} />
              <TokenRow token="color.surface" value={styleId} swatch={activeStyle.swatch} />
              <TokenRow token="layout.variant" value={`${variant} · ${metrics.label}`} />
              <TokenRow token="space.density" value={variant === "C" ? "compact" : "comfortable"} />
              <TokenRow token="metric.reach" value={metrics.reach.toLocaleString()} />
              <TokenRow token="metric.ctr" value={`${metrics.ctr}%`} />
              <TokenRow token="metric.conv" value={`${metrics.conv}%`} />
            </div>
          </aside>

          {/* Panel content */}
          <div className="min-w-0">
            {/* PREVIEW */}
            {tab === "preview" && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-serif text-xl">Component spec</h2>
                  <span className="font-mono text-[11px] text-neutral-400">
                    &lt;CampaignCreative /&gt;
                  </span>
                </div>

                {/* Brief editor */}
                <div className="mb-4 rounded-xl border border-neutral-200 p-4">
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                    Brief
                  </p>
                  <textarea
                    value={brief}
                    onChange={(e) => {
                      setBrief(e.target.value);
                      if (status === "error" && e.target.value.trim()) setStatus("idle");
                    }}
                    rows={2}
                    className="w-full resize-y rounded-md border border-neutral-200 bg-white p-2.5 text-sm leading-relaxed outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                  />
                </div>

                {/* Framed spec */}
                <div className="rounded-xl border border-dashed border-neutral-300 bg-[linear-gradient(#f8fafc,#f8fafc)] p-4 sm:p-6">
                  <SpecPreview
                    brief={brief}
                    audience={audience}
                    channel={channel}
                    tone={tone}
                    styleId={styleId}
                    variant={variant}
                  />
                </div>

                {/* quick controls under preview */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium text-neutral-500">Tone</p>
                    <div className="flex flex-wrap gap-1.5">
                      {TONES.map((t) => (
                        <Chip
                          key={t}
                          active={tone === t}
                          onClick={() => {
                            setTone(t);
                            log(`type.tone → ${t}`);
                          }}
                        >
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium text-neutral-500">Channel</p>
                    <div className="flex flex-wrap gap-1.5">
                      {CHANNELS.map((c) => (
                        <Chip
                          key={c}
                          active={channel === c}
                          onClick={() => {
                            setChannel(c);
                            log(`channel.target → ${c}`);
                          }}
                        >
                          {c}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                {status === "success" && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Spec generated successfully.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                    <AlertCircle className="h-4 w-4" /> Add a brief before generating.
                  </p>
                )}
              </section>
            )}

            {/* VARIANTS */}
            {tab === "variants" && (
              <section>
                <h2 className="mb-1 font-serif text-xl">Variants</h2>
                <p className="mb-5 text-sm text-neutral-500">
                  Choose a layout variant — the spec and metrics update together.
                </p>

                {/* Select-like control */}
                <div className="mb-5 max-w-xs" ref={selectRef}>
                  <p className="mb-2 text-xs font-medium text-neutral-500">Layout variant</p>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSelectOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={selectOpen}
                      className="flex w-full items-center justify-between gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm transition-all outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-sm"
                          style={{ backgroundColor: VARIANTS[variant].accent }}
                        />
                        {variant} — {VARIANTS[variant].label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-neutral-400 transition-transform",
                          selectOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {selectOpen && (
                      <ul
                        role="listbox"
                        className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg"
                      >
                        {(Object.keys(VARIANTS) as Variant[]).map((v) => (
                          <li key={v}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={variant === v}
                              onClick={() => {
                                setVariant(v);
                                setSelectOpen(false);
                                log(`layout.variant → ${v}`);
                              }}
                              className={cn(
                                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors outline-none hover:bg-neutral-50 focus-visible:bg-neutral-100",
                                variant === v && "bg-indigo-50 text-indigo-700"
                              )}
                            >
                              <span
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: VARIANTS[v].accent }}
                              />
                              {v} — {VARIANTS[v].label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Swatch chips */}
                <p className="mb-2 text-xs font-medium text-neutral-500">Variant swatches</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {(Object.keys(VARIANTS) as Variant[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setVariant(v);
                        log(`layout.variant → ${v}`);
                      }}
                      aria-pressed={variant === v}
                      className={cn(
                        "flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
                        variant === v
                          ? "border-neutral-900 text-neutral-900"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                      )}
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                        style={{ backgroundColor: VARIANTS[v].accent }}
                      >
                        {v}
                      </span>
                      {VARIANTS[v].label}
                    </button>
                  ))}
                </div>

                {/* Visual style + audience to keep controls present */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium text-neutral-500">Visual style</p>
                    <div className="flex flex-wrap gap-1.5">
                      {STYLES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setStyleId(s.id);
                            log(`color.surface → ${s.id}`);
                          }}
                          aria-pressed={styleId === s.id}
                          className={cn(
                            "flex items-center gap-1.5 rounded-md border py-1 pr-2.5 pl-1 text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            styleId === s.id
                              ? "border-indigo-500 text-indigo-700"
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
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium text-neutral-500">Audience</p>
                    <div className="flex flex-wrap gap-1.5">
                      {AUDIENCES.map((a) => (
                        <Chip
                          key={a}
                          active={audience === a}
                          onClick={() => {
                            setAudience(a);
                            log(`color.audience → ${a}`);
                          }}
                        >
                          {a}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-neutral-200 p-4">
                  <SpecPreview
                    brief={brief}
                    audience={audience}
                    channel={channel}
                    tone={tone}
                    styleId={styleId}
                    variant={variant}
                  />
                </div>
              </section>
            )}

            {/* METRICS */}
            {tab === "metrics" && (
              <section>
                <h2 className="mb-1 font-serif text-xl">Predicted metrics</h2>
                <p className="mb-5 text-sm text-neutral-500">
                  Estimates for variant {variant} · {metrics.label}.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Reach", value: metrics.reach.toLocaleString(), pct: Math.min(100, (metrics.reach / 180000) * 100) },
                    { label: "CTR", value: `${metrics.ctr}%`, pct: Math.min(100, (metrics.ctr / 5) * 100) },
                    { label: "Conversion", value: `${metrics.conv}%`, pct: Math.min(100, (metrics.conv / 4) * 100) },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-neutral-200 p-4"
                    >
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm font-medium text-neutral-600">
                          {m.label}
                        </span>
                        <span className="font-serif text-2xl">{m.value}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${m.pct}%`, backgroundColor: metrics.accent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACTIVITY */}
            {tab === "activity" && (
              <section>
                <h2 className="mb-1 font-serif text-xl">Activity</h2>
                <p className="mb-5 text-sm text-neutral-500">Recent actions in this session.</p>
                <ul className="space-y-2">
                  {activity.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50/60 px-3 py-2 text-sm text-neutral-700"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <span className="truncate">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
