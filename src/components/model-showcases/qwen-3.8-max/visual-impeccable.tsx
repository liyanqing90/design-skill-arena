"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Zap,
  Wand2,
  Save,
  Download,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Activity as ActivityIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_LABEL = "Qwen 3.8 Max";
const SKILLS_LABEL = "frontend-skill + impeccable";

const NEON = "#22d3ee";

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Creators"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Bold", "Playful", "Premium", "Minimal"];
const STYLES = ["Cyber", "Plasma", "Neon", "Vapor"];

const STYLE_GRADIENTS: Record<string, string> = {
  Cyber:
    "radial-gradient(130% 130% at 15% 10%, #22d3ee 0%, #6366f1 42%, #1e1b4b 80%, #060913 100%)",
  Plasma:
    "radial-gradient(130% 130% at 85% 15%, #f0abfc 0%, #22d3ee 45%, #152238 82%, #060913 100%)",
  Neon: "radial-gradient(130% 130% at 20% 85%, #4ade80 0%, #22d3ee 45%, #0f2a3a 82%, #060913 100%)",
  Vapor:
    "radial-gradient(130% 130% at 75% 80%, #818cf8 0%, #38bdf8 45%, #1a1740 82%, #060913 100%)",
};

const TONE_HEADLINES: Record<string, string> = {
  Bold: "Launch at the speed of light.",
  Playful: "Plug in. Power up. Play on.",
  Premium: "Precision, rendered beautiful.",
  Minimal: "Pure signal. Zero noise.",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { tag: string; reach: number; ctr: number; conv: number }
> = {
  A: { tag: "Kinetic", reach: 132500, ctr: 4.7, conv: 3.2 },
  B: { tag: "Ambient", reach: 98700, ctr: 6.1, conv: 2.5 },
  C: { tag: "Immersive", reach: 158300, ctr: 4.0, conv: 4.4 },
};

const glass = "border border-white/10 bg-white/[0.04] backdrop-blur-xl";

function formatReach(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

type Activity = { id: number; text: string; time: string };
type Deltas = { reach: number; ctr: number; conv: number };

export default function VisualImpeccable() {
  const [brief, setBrief] = useState(
    "Launch the new product with a high-energy, premium tech feel that glows on every screen."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[1]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activity, setActivity] = useState<Activity[]>([
    { id: 1, text: "Studio initialized", time: timeNow() },
  ]);
  const [deltas, setDeltas] = useState<Deltas>({ reach: 0, ctr: 0, conv: 0 });
  const [flash, setFlash] = useState(false);

  const idRef = useRef(2);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMetrics = useRef(VARIANTS.A);

  useEffect(() => {
    return () => {
      if (genTimer.current) clearTimeout(genTimer.current);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  const pushActivity = (text: string) =>
    setActivity((prev) => [{ id: idRef.current++, text, time: timeNow() }, ...prev].slice(0, 6));

  const active = VARIANTS[variant];
  const artStyle = useMemo(() => ({ background: STYLE_GRADIENTS[style] }), [style]);
  const headline = TONE_HEADLINES[tone];

  const handleGenerate = () => {
    if (status === "loading") return;
    if (!brief.trim()) {
      setStatus("error");
      pushActivity("Generate blocked — empty brief");
      return;
    }
    setStatus("loading");
    pushActivity(`Rendering ${active.tag} variant`);
    genTimer.current = setTimeout(() => {
      setStatus("success");
      pushActivity(`${active.tag} variant rendered`);
    }, 1200);
  };

  const handleSave = () => pushActivity("Project snapshot saved");
  const handleExport = () => pushActivity("Creative pack exported");

  const selectVariant = (key: VariantKey) => {
    if (key === variant) return;
    const next = VARIANTS[key];
    const prev = prevMetrics.current;
    setDeltas({
      reach: next.reach - prev.reach,
      ctr: next.ctr - prev.ctr,
      conv: next.conv - prev.conv,
    });
    prevMetrics.current = next;
    setVariant(key);
    setFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(false), 950);
    pushActivity(`Variant ${key} · ${next.tag}`);
  };

  const pillGroup = (
    label: string,
    options: string[],
    value: string,
    onSelect: (v: string) => void
  ) => (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelect(opt);
                pushActivity(`${label} → ${opt}`);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 active:scale-95",
                selected
                  ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  const deltaChip = (value: number, suffix: string, isReach = false) => {
    if (!flash || value === 0) return null;
    const positive = value > 0;
    const text = isReach
      ? `${positive ? "+" : "-"}${formatReach(Math.abs(value))}`
      : `${positive ? "+" : "-"}${Math.abs(value).toFixed(1)}${suffix}`;
    return (
      <span
        key={`${value}-${flash}`}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
          positive ? "bg-cyan-400/15 text-cyan-300" : "bg-rose-400/15 text-rose-300"
        )}
        style={{ animation: "vi-flash 900ms ease-out" }}
      >
        {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
        {text}
      </span>
    );
  };

  const metricChips = [
    { key: "reach", label: "Reach", value: formatReach(active.reach), delta: deltaChip(deltas.reach, "", true) },
    { key: "ctr", label: "CTR", value: `${active.ctr.toFixed(1)}%`, delta: deltaChip(deltas.ctr, "%") },
    { key: "conv", label: "Conversion", value: `${active.conv.toFixed(1)}%`, delta: deltaChip(deltas.conv, "%") },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
      {/* ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(34,211,238,0.12) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(99,102,241,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <header className={cn("mb-6 flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5", glass)}>
          <div className="flex items-center gap-3">
            <div
              className="flex size-11 items-center justify-center rounded-xl text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.4)]"
              style={{ backgroundColor: NEON }}
            >
              <Zap className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">AI Campaign Studio</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-950"
                  style={{ backgroundColor: NEON }}
                >
                  {MODEL_LABEL}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-cyan-200">
                  {SKILLS_LABEL}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className={cn(
                "size-2 rounded-full transition-all duration-300",
                status === "loading" && "animate-pulse bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]",
                status === "success" && "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]",
                status === "error" && "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.7)]",
                status === "idle" && "bg-slate-600"
              )}
            />
            {status === "loading" ? "Rendering" : status === "success" ? "Ready" : status === "error" ? "Blocked" : "Idle"}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls glass panel */}
          <section className="lg:col-span-4">
            <div className={cn("rounded-2xl p-5", glass)}>
              <h2 className="mb-3 text-sm font-semibold text-slate-100">Campaign Brief</h2>
              <textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                rows={4}
                placeholder="Describe the launch…"
                className={cn(
                  "w-full resize-none rounded-xl border bg-white/[0.03] p-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2",
                  status === "error"
                    ? "border-rose-400/50 focus:ring-rose-400/40"
                    : "border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/30"
                )}
              />
              {status === "error" && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-xs text-rose-200">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                  Brief is empty — add a line so the studio can render your creative.
                </div>
              )}

              <div className="mt-5 space-y-5">
                {pillGroup("Target Audience", AUDIENCES, audience, setAudience)}
                {pillGroup("Channel", CHANNELS, channel, setChannel)}
                {pillGroup("Tone", TONES, tone, setTone)}
                {pillGroup("Visual Style", STYLES, style, setStyle)}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={status === "loading"}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: NEON, boxShadow: "0 0 24px rgba(34,211,238,0.35)" }}
                >
                  {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
                  {status === "loading" ? "Rendering" : "Generate"}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-[0.97]"
                >
                  <Save className="size-4" /> Save
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-[0.97]"
                >
                  <Download className="size-4" /> Export
                </button>
              </div>
            </div>
          </section>

          {/* Preview + variants */}
          <section className="space-y-6 lg:col-span-8">
            <div
              className={cn(
                "overflow-hidden rounded-2xl p-2 transition-all duration-500",
                glass,
                status === "success" && "shadow-[0_0_40px_rgba(34,211,238,0.18)]",
                status === "error" && "shadow-[0_0_40px_rgba(251,113,133,0.18)]"
              )}
            >
              <div
                className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-xl transition-all duration-500 sm:aspect-[16/9]"
                style={artStyle}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 5px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="relative flex items-center justify-between p-5 sm:p-7">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    Variant {variant} · {active.tag}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {channel}
                  </span>
                </div>

                <div className="relative p-5 sm:p-8">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                    {audience} · {tone} · {style}
                  </p>
                  <h2
                    className={cn(
                      "max-w-xl text-3xl leading-tight text-white drop-shadow transition-all duration-500 sm:text-5xl",
                      tone === "Bold" && "font-extrabold",
                      tone === "Minimal" && "font-light tracking-tight",
                      (tone === "Playful" || tone === "Premium") && "font-semibold"
                    )}
                  >
                    {headline}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-white/80">
                    A {tone.toLowerCase()} {active.tag.toLowerCase()} concept for {audience}, tuned for {channel}.
                  </p>
                </div>

                {/* sleek loading bar */}
                {status === "loading" && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                    <div
                      className="h-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                      style={{ animation: "vi-load 1.2s ease-in-out" }}
                    />
                  </div>
                )}
                {status === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 backdrop-blur-[1px]">
                    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-slate-950/50 px-4 py-2 text-sm text-cyan-100 backdrop-blur-md">
                      <Loader2 className="size-4 animate-spin text-cyan-300" /> Rendering creative…
                    </div>
                  </div>
                )}
                {status === "success" && (
                  <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold text-emerald-200 backdrop-blur-sm sm:right-7 sm:top-7">
                    <CheckCircle2 className="size-3.5" /> Rendered
                  </div>
                )}
              </div>
            </div>

            {/* Metrics glass chips */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {metricChips.map((m) => (
                <div
                  key={m.key}
                  className={cn("rounded-2xl p-4 transition-all duration-300", glass)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {m.label}
                    </span>
                    {m.delta}
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-50">{m.value}</p>
                </div>
              ))}
            </div>

            {/* A/B/C glass thumbnail cards */}
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(VARIANTS) as VariantKey[]).map((key) => {
                const v = VARIANTS[key];
                const selected = variant === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectVariant(key)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.98]",
                      selected
                        ? "border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.35)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                    )}
                  >
                    <div
                      className="mb-3 h-12 w-full rounded-lg opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ background: STYLE_GRADIENTS[style] }}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          selected ? "text-cyan-200" : "text-slate-200"
                        )}
                      >
                        {key}
                      </span>
                      <span className="text-[11px] text-slate-400">{v.tag}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Activity */}
            <div className={cn("rounded-2xl p-5", glass)}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
                <ActivityIcon className="size-4 text-cyan-300" /> Activity
              </h3>
              <ul className="space-y-2">
                {activity.map((a, i) => (
                  <li key={a.id} className="flex items-center gap-3 text-xs">
                    <span
                      className={cn(
                        "size-1.5 shrink-0 rounded-full transition-colors",
                        i === 0 ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-600"
                      )}
                    />
                    <span className="flex-1 text-slate-300">{a.text}</span>
                    <span className="tabular-nums text-slate-500">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes vi-load {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes vi-flash {
          0% {
            opacity: 0;
            transform: translateY(4px) scale(0.9);
          }
          25% {
            opacity: 1;
            transform: translateY(0) scale(1.08);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
