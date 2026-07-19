"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Save,
  Download,
  FileText,
  Target,
  Palette,
  ClipboardList,
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

const STEPS = [
  { id: 0, title: "Brief", icon: ClipboardList, hint: "Define the campaign" },
  { id: 1, title: "Targeting", icon: Target, hint: "Audience & channel" },
  { id: 2, title: "Creative", icon: Palette, hint: "Tone, style & variant" },
  { id: 3, title: "Review", icon: FileText, hint: "Metrics & export" },
];

const DEFAULT_BRIEF =
  "Launch the new Aurora One smart water bottle — a self-cleaning, temperature-aware bottle for people who live on the move. Highlight the 24h cold / 12h hot performance and the limited first-drop colorway.";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function useMetrics(
  variant: Variant,
  channelIdx: number,
  audienceIdx: number
) {
  return useMemo(() => {
    const base = VARIANTS[variant];
    const reach = base.reach + channelIdx * 4200 + audienceIdx * 2600;
    const ctr = +(base.ctr + audienceIdx * 0.12).toFixed(2);
    const conv = +(base.conv + channelIdx * 0.14).toFixed(2);
    return { reach, ctr, conv, accent: base.accent, label: base.label };
  }, [variant, channelIdx, audienceIdx]);
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function OptionPill({
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
        "rounded-full border px-4 py-2 text-sm transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        active
          ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
      )}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-medium tracking-[0.18em] text-neutral-400 uppercase">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Creative preview                                                    */
/* ------------------------------------------------------------------ */

function CreativePreview({
  brief,
  audience,
  channel,
  tone,
  styleId,
  variant,
  compact = false,
}: {
  brief: string;
  audience: string;
  channel: string;
  tone: string;
  styleId: string;
  variant: Variant;
  compact?: boolean;
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
        ? "font-semibold italic tracking-tight"
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
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-black/5 shadow-lg",
        compact ? "aspect-[16/10]" : "aspect-[16/11] sm:aspect-[16/9]"
      )}
      style={{ background: style.gradient }}
    >
      {/* variant accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: accent }}
      />
      {/* soft orb */}
      <div
        className="absolute -right-10 -bottom-12 h-48 w-48 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: accent }}
      />

      <div className={cn("relative flex h-full flex-col gap-3 p-6 sm:p-8", layout)}>
        <span
          className={cn(
            "w-fit rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur",
            light ? "bg-black/10 text-neutral-800" : "bg-white/20 text-white"
          )}
        >
          {channel} · {audience}
        </span>

        <h3
          className={cn(
            "max-w-md leading-[1.05] break-words",
            headlineClass,
            compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl",
            light ? "text-neutral-900" : "text-white"
          )}
        >
          {headline}
        </h3>

        {!compact && (
          <p
            className={cn(
              "max-w-sm text-sm leading-relaxed break-words",
              light ? "text-neutral-700" : "text-white/80"
            )}
          >
            {brief.trim() ? brief.trim().slice(0, 110) : "Your brief shapes this story…"}
            {brief.trim().length > 110 ? "…" : ""}
          </p>
        )}

        <button
          type="button"
          className="mt-1 w-fit rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-transform outline-none hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
          style={{ backgroundColor: accent, color: "#fff" }}
        >
          {CTA_BY_CHANNEL[channel as keyof typeof CTA_BY_CHANNEL]}
        </button>
      </div>

      <span
        className="absolute right-4 bottom-4 font-serif text-4xl opacity-30"
        style={{ color: light ? "#111" : "#fff" }}
      >
        {variant}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type Status = "idle" | "loading" | "success" | "error";

export default function ImpeccableFullFlow() {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>(AUDIENCES[0]);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>(CHANNELS[0]);
  const [tone, setTone] = useState<(typeof TONES)[number]>(TONES[2]);
  const [styleId, setStyleId] = useState<string>(STYLES[0].id);
  const [variant, setVariant] = useState<Variant>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [activity, setActivity] = useState<{ id: number; text: string }[]>([
    { id: 0, text: "Studio session started" },
  ]);

  const metrics = useMetrics(
    variant,
    CHANNELS.indexOf(channel),
    AUDIENCES.indexOf(audience)
  );

  const log = (text: string) =>
    setActivity((prev) => [{ id: Date.now() + Math.random(), text }, ...prev].slice(0, 8));

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleGenerate = () => {
    if (!brief.trim()) {
      setStatus("error");
      log("Generate failed — brief is empty");
      return;
    }
    setStatus("loading");
    log("Generating creative…");
    setTimeout(() => {
      setStatus("success");
      log(`Generated variant ${variant} for ${channel}`);
    }, 1200);
  };

  const handleSave = () => log("Draft saved to workspace");
  const handleExport = () => log(`Exported ${channel} asset (${variant})`);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3 border-b border-neutral-200 pb-6 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Qwen 3.8 Max
            </span>
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
              impeccable
            </span>
          </div>
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Campaign Studio
          </h1>
          <p className="max-w-xl text-sm text-neutral-500">
            A guided flow from brief to launch-ready creative. Move through each step —
            the preview and metrics assemble themselves as you decide.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Desktop rail */}
          <nav className="hidden lg:block" aria-label="Progress">
            <ol className="space-y-1">
              {STEPS.map((s) => {
                const state =
                  s.id < step ? "done" : s.id === step ? "active" : "upcoming";
                const Icon = s.icon;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setStep(s.id)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all outline-none",
                        "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                        state === "active"
                          ? "bg-white shadow-sm ring-1 ring-neutral-200"
                          : "hover:bg-white/70"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                          state === "done" &&
                            "border-neutral-900 bg-neutral-900 text-white",
                          state === "active" &&
                            "border-neutral-900 bg-white text-neutral-900",
                          state === "upcoming" &&
                            "border-neutral-300 bg-white text-neutral-400"
                        )}
                      >
                        {state === "done" ? <Check className="h-4 w-4" /> : s.id + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "flex items-center gap-1.5 text-sm font-medium",
                            state === "upcoming" ? "text-neutral-400" : "text-neutral-900"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {s.title}
                        </span>
                        <span className="block truncate text-xs text-neutral-400">
                          {s.hint}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Mobile progress bar */}
          <div className="lg:hidden">
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
              <span className="font-medium text-neutral-900">
                Step {step + 1} · {STEPS[step].title}
              </span>
              <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  aria-label={s.title}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                    s.id < step
                      ? "bg-neutral-900"
                      : s.id === step
                        ? "scale-125 bg-neutral-900"
                        : "bg-neutral-300"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="min-w-0">
            {/* STEP 0 — Brief */}
            {step === 0 && (
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <FieldLabel>Campaign brief</FieldLabel>
                <h2 className="mb-1 font-serif text-2xl">What are we launching?</h2>
                <p className="mb-5 text-sm text-neutral-500">
                  Write the raw idea. An empty brief will block generation later.
                </p>
                <textarea
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value);
                    if (status === "error" && e.target.value.trim()) setStatus("idle");
                  }}
                  rows={7}
                  placeholder="Describe the product, the promise, the moment…"
                  className="w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed outline-none focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                />
                <p className="mt-2 text-xs text-neutral-400">
                  {brief.trim().length} characters
                </p>
              </section>
            )}

            {/* STEP 1 — Targeting */}
            {step === 1 && (
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <FieldLabel>Targeting</FieldLabel>
                <h2 className="mb-6 font-serif text-2xl">Who, and where?</h2>

                <div className="mb-8">
                  <p className="mb-3 text-sm font-medium text-neutral-700">
                    Target audience
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AUDIENCES.map((a) => (
                      <OptionPill
                        key={a}
                        active={audience === a}
                        onClick={() => {
                          setAudience(a);
                          log(`Audience set to ${a}`);
                        }}
                      >
                        {a}
                      </OptionPill>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-neutral-700">Channel</p>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((c) => (
                      <OptionPill
                        key={c}
                        active={channel === c}
                        onClick={() => {
                          setChannel(c);
                          log(`Channel set to ${c}`);
                        }}
                      >
                        {c}
                      </OptionPill>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2 — Creative */}
            {step === 2 && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                  <FieldLabel>Creative direction</FieldLabel>
                  <h2 className="mb-6 font-serif text-2xl">Set the tone & look</h2>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-neutral-700">Tone</p>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map((t) => (
                        <OptionPill
                          key={t}
                          active={tone === t}
                          onClick={() => {
                            setTone(t);
                            log(`Tone set to ${t}`);
                          }}
                        >
                          {t}
                        </OptionPill>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-neutral-700">
                      Visual style
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {STYLES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setStyleId(s.id);
                            log(`Visual style set to ${s.id}`);
                          }}
                          aria-pressed={styleId === s.id}
                          className={cn(
                            "flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm transition-all outline-none",
                            "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                            styleId === s.id
                              ? "border-neutral-900 text-neutral-900"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                          )}
                        >
                          <span
                            className="h-6 w-6 rounded-full border border-black/10"
                            style={{ background: s.gradient }}
                          />
                          {s.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-medium text-neutral-700">
                      Creative variant
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(VARIANTS) as Variant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setVariant(v);
                            log(`Variant ${v} selected`);
                          }}
                          aria-pressed={variant === v}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-all outline-none",
                            "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                            variant === v
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-200 bg-white hover:border-neutral-400"
                          )}
                        >
                          <span className="font-serif text-lg">{v}</span>
                          <span
                            className={cn(
                              "block text-xs",
                              variant === v ? "text-white/70" : "text-neutral-400"
                            )}
                          >
                            {VARIANTS[v].label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <FieldLabel>Live preview</FieldLabel>
                  <CreativePreview
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

            {/* STEP 3 — Review */}
            {step === 3 && (
              <section className="space-y-6">
                <CreativePreview
                  brief={brief}
                  audience={audience}
                  channel={channel}
                  tone={tone}
                  styleId={styleId}
                  variant={variant}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Reach", value: metrics.reach.toLocaleString() },
                    { label: "CTR", value: `${metrics.ctr}%` },
                    { label: "Conversion", value: `${metrics.conv}%` },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                      <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase">
                        {m.label}
                      </p>
                      <p className="mt-2 font-serif text-3xl">{m.value}</p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Variant {variant} · {metrics.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <FieldLabel>Summary</FieldLabel>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                    {[
                      ["Audience", audience],
                      ["Channel", channel],
                      ["Tone", tone],
                      ["Style", styleId],
                      ["Variant", `${variant} — ${VARIANTS[variant].label}`],
                    ].map(([k, v]) => (
                      <div key={k} className="min-w-0">
                        <dt className="text-xs text-neutral-400">{k}</dt>
                        <dd className="truncate font-medium text-neutral-800">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Actions + status */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={status === "loading"}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-all outline-none hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" /> Generate
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    >
                      <Save className="h-4 w-4" /> Save
                    </button>
                    <button
                      type="button"
                      onClick={handleExport}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium transition-all outline-none hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    >
                      <Download className="h-4 w-4" /> Export
                    </button>
                  </div>

                  {status === "loading" && (
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div className="h-full w-1/2 animate-pulse rounded-full bg-neutral-900" />
                    </div>
                  )}
                  {status === "success" && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Creative generated successfully.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                      <AlertCircle className="h-4 w-4" /> Add a brief before generating.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Continue / Back */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-all outline-none hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-all outline-none hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Activity feed */}
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
              <FieldLabel>Recent activity</FieldLabel>
              <ul className="space-y-2">
                {activity.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-2 text-sm text-neutral-600"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                    <span className="truncate">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
