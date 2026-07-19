"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Download,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

const MODEL_LABEL = "Qwen 3.8 Max";
const SKILLS_LABEL = "frontend-design + impeccable";

const STEPS = [
  { key: "brief", label: "Brief" },
  { key: "audience", label: "Audience" },
  { key: "channel", label: "Channel" },
  { key: "tone", label: "Tone" },
  { key: "style", label: "Style" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Creators"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Bold", "Playful", "Premium", "Calm"];
const STYLES = ["Aurora", "Sunset", "Mono", "Neon"];
const VARIANTS = ["A", "B", "C"] as const;

type Variant = (typeof VARIANTS)[number];

const VARIANT_DATA: Record<
  Variant,
  { label: string; headline: string; sub: string; reach: number; ctr: number; conv: number }
> = {
  A: { label: "Variant A", headline: "Meet the future of everyday carry", sub: "Designed to move with you.", reach: 48200, ctr: 3.4, conv: 2.1 },
  B: { label: "Variant B", headline: "One product. Endless possibilities.", sub: "Built for the way you work.", reach: 61500, ctr: 2.8, conv: 2.9 },
  C: { label: "Variant C", headline: "Less noise. More signal.", sub: "The launch everyone will talk about.", reach: 39800, ctr: 4.1, conv: 1.7 },
};

const STYLE_MAP: Record<string, { gradient: string; swatches: string[]; ink: string }> = {
  Aurora: { gradient: "linear-gradient(135deg,#6366f1,#14b8a6)", swatches: ["#6366f1", "#14b8a6", "#0f766e"], ink: "#042f2e" },
  Sunset: { gradient: "linear-gradient(135deg,#f97316,#ec4899)", swatches: ["#f97316", "#ec4899", "#9a3412"], ink: "#431407" },
  Mono: { gradient: "linear-gradient(135deg,#111827,#9ca3af)", swatches: ["#111827", "#4b5563", "#9ca3af"], ink: "#0f172a" },
  Neon: { gradient: "linear-gradient(135deg,#d946ef,#06b6d4)", swatches: ["#d946ef", "#06b6d4", "#701a75"], ink: "#4a044e" },
};

const TONE_CLASS: Record<string, string> = {
  Bold: "font-black uppercase tracking-tight",
  Playful: "font-extrabold italic tracking-tight",
  Premium: "font-serif font-medium tracking-wide",
  Calm: "font-light tracking-wide",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type Status = "idle" | "loading" | "success" | "error";
type FeedItem = { id: string; msg: string; time: string };

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* Smooth count transition */
function useAnimatedNumber(target: number, duration = 500) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const valueRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      valueRef.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = valueRef.current;
    };
  }, [target, duration]);
  return value;
}

function OptionTile({
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
        "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-1",
        "hover:-translate-y-px active:translate-y-0",
        active
          ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
          : "border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:text-gray-900"
      )}
    >
      <span className="font-medium">{children}</span>
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full border transition-all duration-200",
          active ? "border-teal-500 bg-teal-500 text-white" : "border-gray-300 text-transparent"
        )}
      >
        <Check className="size-3" />
      </span>
    </button>
  );
}

function StatTile({ label, value, suffix, decimals }: { label: string; value: number; suffix: string; decimals: number }) {
  const animated = useAnimatedNumber(value);
  const display =
    suffix === "K" ? `${(animated / 1000).toFixed(1)}K` : `${animated.toFixed(decimals)}${suffix}`;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-teal-300 hover:shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-gray-900">{display}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DesignImpeccable() {
  const [activeStep, setActiveStep] = useState(0);
  const [brief, setBrief] = useState(
    "Introduce the new modular backpack to design-minded urban commuters."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<Variant>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [feed, setFeed] = useState<FeedItem[]>([{ id: uid(), msg: "Studio ready", time: now() }]);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const log = (msg: string) => setFeed((prev) => [{ id: uid(), msg, time: now() }, ...prev].slice(0, 6));

  const data = VARIANT_DATA[variant];
  const palette = STYLE_MAP[style];
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  const briefHeadline = brief.trim() ? brief.trim().split(/\s+/).slice(0, 6).join(" ") : "";
  const headline = briefHeadline || data.headline;

  const gotoStep = (i: number) => {
    setActiveStep(i);
    const key = STEPS[i].key;
    cardRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "center" });
    log(`Stepper → ${STEPS[i].label}`);
  };

  const handleGenerate = () => {
    if (status === "loading") return;
    setStatus("loading");
    setNote("Composing modular creative…");
    log(`Generate · ${data.label}`);
    window.setTimeout(() => {
      if (!brief.trim()) {
        setStatus("error");
        setNote("Brief is empty — add a direction first.");
        log("Generate failed · empty brief");
      } else {
        setStatus("success");
        setNote(`${data.label} composed for ${channel}.`);
        log(`Generate complete · ${data.label}`);
      }
    }, 1200);
  };

  const handleSave = () => {
    setStatus("success");
    setNote("Saved to library.");
    log("Saved creative");
  };
  const handleExport = () => {
    setStatus("success");
    setNote("Exported package.");
    log("Exported package");
  };

  const selectVariant = (v: Variant) => {
    setVariant(v);
    log(`Preview → ${VARIANT_DATA[v].label}`);
  };

  const cardBase =
    "rounded-xl border bg-white p-4 transition-all duration-200";

  const renderCard = (key: StepKey, title: string, body: React.ReactNode) => {
    const active = STEPS[activeStep].key === key;
    return (
      <div
        key={key}
        ref={(el) => {
          cardRefs.current[key] = el;
        }}
        className={cn(
          cardBase,
          active ? "border-teal-500 shadow-sm ring-1 ring-teal-500/30" : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {active && (
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              Active
            </span>
          )}
        </div>
        {body}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="size-3.5" />
                {MODEL_LABEL}
              </span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                {SKILLS_LABEL}
              </span>
            </div>
            <h1 className="mt-3 text-xl font-semibold tracking-tight">AI Campaign Studio</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-teal-300 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 active:translate-y-px"
            >
              <Save className="size-4" />
              Save
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-teal-300 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 active:translate-y-px"
            >
              <Download className="size-4" />
              Export
            </button>
          </div>
        </header>

        {/* Stepper */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {STEPS.map((s, i) => {
              const done = i < activeStep;
              const active = i === activeStep;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => gotoStep(i)}
                  className={cn(
                    "group flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-1",
                    active
                      ? "border-teal-500 bg-teal-600 text-white"
                      : done
                        ? "border-teal-200 bg-teal-50 text-teal-700 hover:border-teal-300"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-800"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-200",
                      active ? "bg-white/20 text-white" : done ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {done ? <Check className="size-3" /> : i + 1}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-teal-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Status note */}
        <div className="mb-6 min-h-[24px]">
          {status === "loading" && (
            <p className="inline-flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="size-4 animate-spin text-teal-600" /> {note}
            </p>
          )}
          {status === "success" && (
            <p className="inline-flex items-center gap-2 text-sm font-medium text-teal-700">
              <CheckCircle2 className="size-4" /> {note}
            </p>
          )}
          {status === "error" && (
            <p className="inline-flex items-center gap-2 text-sm font-medium text-red-600">
              <AlertCircle className="size-4" /> {note}
            </p>
          )}
        </div>

        {/* Preview + metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Poster preview */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">Poster preview</h2>
                {/* segmented A/B/C */}
                <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                  {VARIANTS.map((v) => {
                    const active = variant === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => selectVariant(v)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-md px-3.5 py-1 text-sm font-semibold transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50",
                          active ? "bg-white text-teal-700 shadow-sm ring-1 ring-teal-500/40" : "text-gray-500 hover:text-gray-800"
                        )}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* modular poster */}
              <div
                className="relative overflow-hidden rounded-xl border border-gray-200"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
                  backgroundSize: "8.333% 12.5%",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  {/* headline block */}
                  <div className="sm:col-span-2 border-b border-gray-200 p-6 sm:border-b-0 sm:border-r">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Headline</p>
                    <p className={cn("mt-3 break-words text-2xl leading-tight text-gray-900 sm:text-3xl", TONE_CLASS[tone])}>
                      {headline}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">{data.sub}</p>
                  </div>

                  {/* meta + color blocks */}
                  <div className="flex flex-col">
                    <div className="flex-1 border-b border-gray-200 p-6">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">Meta</p>
                      <dl className="mt-3 space-y-1.5 text-sm">
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-400">Audience</dt>
                          <dd className="font-medium text-gray-800">{audience}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-400">Channel</dt>
                          <dd className="font-medium text-gray-800">{channel}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-400">Tone</dt>
                          <dd className="font-medium text-gray-800">{tone}</dd>
                        </div>
                      </dl>
                    </div>
                    {/* color block reacts to style */}
                    <div className="p-6 transition-all duration-200" style={{ background: palette.gradient }}>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">Color · {style}</p>
                      <div className="mt-3 flex gap-2">
                        {palette.swatches.map((c) => (
                          <span key={c} className="size-6 rounded-md border border-white/40 shadow-sm" style={{ background: c }} />
                        ))}
                      </div>
                      <span className="mt-4 inline-block rounded-md bg-white px-2.5 py-1 text-xs font-semibold" style={{ color: palette.ink }}>
                        {data.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics tiles */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">Predicted metrics</h2>
            <StatTile label="Reach" value={data.reach} suffix="K" decimals={1} />
            <StatTile label="CTR" value={data.ctr} suffix="%" decimals={1} />
            <StatTile label="Conversion" value={data.conv} suffix="%" decimals={1} />
            <p className="text-xs text-gray-400">Figures reflect {data.label}.</p>
          </section>
        </div>

        {/* Modular control cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {renderCard(
            "brief",
            "Campaign brief",
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              placeholder="Describe the campaign…"
              aria-invalid={status === "error"}
              className={cn(
                "w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40",
                status === "error" ? "border-red-400" : "border-gray-200 focus-visible:border-teal-400"
              )}
            />
          )}
          {renderCard(
            "audience",
            "Target audience",
            <div className="grid grid-cols-1 gap-2">
              {AUDIENCES.map((a) => (
                <OptionTile
                  key={a}
                  active={audience === a}
                  onClick={() => {
                    setAudience(a);
                    log(`Audience → ${a}`);
                  }}
                >
                  {a}
                </OptionTile>
              ))}
            </div>
          )}
          {renderCard(
            "channel",
            "Channel",
            <div className="grid grid-cols-1 gap-2">
              {CHANNELS.map((c) => (
                <OptionTile
                  key={c}
                  active={channel === c}
                  onClick={() => {
                    setChannel(c);
                    log(`Channel → ${c}`);
                  }}
                >
                  {c}
                </OptionTile>
              ))}
            </div>
          )}
          {renderCard(
            "tone",
            "Tone",
            <div className="grid grid-cols-1 gap-2">
              {TONES.map((t) => (
                <OptionTile
                  key={t}
                  active={tone === t}
                  onClick={() => {
                    setTone(t);
                    log(`Tone → ${t}`);
                  }}
                >
                  {t}
                </OptionTile>
              ))}
            </div>
          )}
          {renderCard(
            "style",
            "Visual style",
            <div className="grid grid-cols-1 gap-2">
              {STYLES.map((s) => (
                <OptionTile
                  key={s}
                  active={style === s}
                  onClick={() => {
                    setStyle(s);
                    log(`Style → ${s}`);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3.5 rounded-full" style={{ background: STYLE_MAP[s].gradient }} />
                    {s}
                  </span>
                </OptionTile>
              ))}
            </div>
          )}

          {/* Activity card to complete the modular grid */}
          <div className={cn(cardBase, "border-gray-200")}>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Recent actions</h3>
            <ul className="space-y-2">
              {feed.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="min-w-0 break-words text-sm text-gray-600">{item.msg}</span>
                  <span className="shrink-0 font-mono text-[10px] text-gray-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
