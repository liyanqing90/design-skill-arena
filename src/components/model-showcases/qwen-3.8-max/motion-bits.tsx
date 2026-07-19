"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Save,
  Download,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Eye,
  MousePointerClick,
  TrendingUp,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z", "Professionals", "Adventurers", "Parents"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Playful", "Premium", "Witty", "Uplifting"];
const STYLES = ["Sunset", "Ocean", "Candy", "Midnight"];

const STYLE_GRADIENT: Record<string, string> = {
  Sunset: "linear-gradient(120deg,#ff6a00,#ee0979,#ff6a00)",
  Ocean: "linear-gradient(120deg,#00c6ff,#0072ff,#00c6ff)",
  Candy: "linear-gradient(120deg,#f857a6,#ff5858,#f857a6)",
  Midnight: "linear-gradient(120deg,#42275a,#734b6d,#42275a)",
};

const TONE_HEADLINE: Record<string, string> = {
  Playful: "Turn It Up to Eleven",
  Premium: "Effortlessly Iconic",
  Witty: "Smarter Than Your Feed",
  Uplifting: "Your Moment Starts Now",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { label: string; tagline: string; reach: number; ctr: number; conversion: number }
> = {
  A: { label: "Teaser", tagline: "Something big is brewing. Stay tuned.", reach: 52400, ctr: 3.6, conversion: 2.2 },
  B: { label: "Launch", tagline: "It's here. Grab yours before it's gone.", reach: 68900, ctr: 4.4, conversion: 1.8 },
  C: { label: "Social", tagline: "Loved by thousands. Join the movement.", reach: 41200, ctr: 2.9, conversion: 3.4 },
};

type Status = "idle" | "loading" | "success" | "error";
type FeedItem = { id: number; text: string };

let fid = 0;

function useCountUp(target: number, duration = 750) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    fromRef.current = target;
    if (from === to) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Pills({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                "hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                active
                  ? "bg-white text-fuchsia-700 shadow-lg shadow-fuchsia-500/30"
                  : "bg-white/15 text-white hover:bg-white/25"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function MotionBitsShowcase() {
  const [brief, setBrief] = useState(
    "Launch a smart water bottle that tracks hydration. Target busy people who want to feel healthier."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([{ id: fid++, text: "Studio ready — let's make it move" }]);

  const push = (text: string) => setFeed((f) => [{ id: fid++, text }, ...f].slice(0, 7));

  const active = VARIANTS[variant];
  const reach = useCountUp(active.reach);
  const ctr = useCountUp(active.ctr);
  const conversion = useCountUp(active.conversion);

  const animKey = `${variant}-${style}-${tone}-${channel}-${audience}`;

  const handleGenerate = () => {
    if (status === "loading") return;
    if (brief.trim().length === 0) {
      setStatus("error");
      push("⚠ Generate blocked — brief is empty");
      return;
    }
    setStatus("loading");
    push("Generating animated concepts…");
    setTimeout(() => {
      setStatus("success");
      push(`✨ Generated motion creatives for ${channel}`);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <style>{`
        @keyframes mb-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes mb-float { 0%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-30px) translateX(20px)} 100%{transform:translateY(0) translateX(0)} }
        @keyframes mb-pop { 0%{opacity:0; transform:scale(0.94) translateY(12px)} 100%{opacity:1; transform:scale(1) translateY(0)} }
        .mb-bg { background:linear-gradient(120deg,#7b2ff7,#f107a3,#ff8a00,#7b2ff7); background-size:300% 300%; animation:mb-gradient 14s ease infinite; }
        .mb-pop { animation:mb-pop 0.5s cubic-bezier(0.22,1,0.36,1); }
        .mb-blob { animation:mb-float 12s ease-in-out infinite; }
      `}</style>

      {/* Animated background */}
      <div className="mb-bg absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="mb-blob absolute -left-20 top-10 size-72 rounded-full bg-fuchsia-400/40 blur-3xl" />
        <div
          className="mb-blob absolute right-0 top-40 size-80 rounded-full bg-cyan-300/40 blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="mb-blob absolute bottom-0 left-1/3 size-72 rounded-full bg-amber-300/40 blur-3xl"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md transition-transform duration-200 hover:scale-110">
              <Rocket className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight drop-shadow-sm">Muse — AI Campaign Studio</h1>
              <p className="text-sm text-white/80">Motion-first creative playground</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-fuchsia-700 shadow-lg">
              Qwen 3.8 Max
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-md">
              react-bits
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Controls */}
          <div className="flex flex-col gap-5 rounded-3xl bg-white/10 p-5 backdrop-blur-md lg:col-span-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Campaign Brief
              </span>
              <textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value);
                  if (status === "error" && e.target.value.trim().length > 0) setStatus("idle");
                }}
                placeholder="Describe your launch…"
                className={cn(
                  "min-h-24 w-full resize-none rounded-2xl border-2 border-white/20 bg-white/10 p-3 text-sm text-white placeholder:text-white/50 transition-all",
                  "focus:border-white/70 focus:bg-white/20 focus:outline-none",
                  status === "error" && "border-red-300"
                )}
              />
              {status === "error" && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-100">
                  <AlertTriangle className="size-4" /> Brief can&apos;t be empty!
                </span>
              )}
            </div>

            <Pills label="Audience" options={AUDIENCES} value={audience} onChange={(v) => { setAudience(v); push(`Audience → ${v}`); }} />
            <Pills label="Channel" options={CHANNELS} value={channel} onChange={(v) => { setChannel(v); push(`Channel → ${v}`); }} />
            <Pills label="Tone" options={TONES} value={tone} onChange={(v) => { setTone(v); push(`Tone → ${v}`); }} />
            <Pills label="Visual style" options={STYLES} value={style} onChange={(v) => { setStyle(v); push(`Style → ${v}`); }} />

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={status === "loading"}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-fuchsia-700 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                {status === "loading" ? "Generating…" : "Generate"}
              </button>
              <button
                type="button"
                onClick={() => push("💾 Draft saved")}
                className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Save className="size-4" /> Save
              </button>
              <button
                type="button"
                onClick={() => push("📦 Exported motion assets")}
                className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/30 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Download className="size-4" /> Export
              </button>
            </div>
          </div>

          {/* Preview + metrics */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            {/* Variant switcher */}
            <div className="flex items-center gap-3">
              {(["A", "B", "C"] as VariantKey[]).map((v) => {
                const on = v === variant;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setVariant(v); push(`Variant → ${v} (${VARIANTS[v].label})`); }}
                    aria-pressed={on}
                    className={cn(
                      "flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl text-lg font-black transition-all duration-300",
                      "hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      on ? "bg-white text-fuchsia-700 shadow-2xl" : "bg-white/15 text-white hover:bg-white/25"
                    )}
                  >
                    {v}
                    <span className="text-xs font-semibold opacity-70">{VARIANTS[v].label}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated preview */}
            <div className="relative overflow-hidden rounded-3xl p-1 shadow-2xl">
              <div
                className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-[22px] p-7 transition-[background] duration-700"
                style={{ background: STYLE_GRADIENT[style], backgroundSize: "200% 200%" }}
              >
                <div key={animKey} className="mb-pop flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      {active.label} · {channel}
                    </span>
                    <Zap className="size-6 opacity-80" />
                  </div>
                  <div className="flex flex-col gap-3 py-6">
                    <h2 className="text-4xl font-black leading-none tracking-tight drop-shadow-md sm:text-5xl">
                      {TONE_HEADLINE[tone]}
                    </h2>
                    <p className="max-w-md text-base font-medium text-white/90">{active.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-black/25 px-3 py-1 backdrop-blur-sm">{audience}</span>
                    <span className="rounded-full bg-black/25 px-3 py-1 backdrop-blur-sm">{tone}</span>
                    <span className="rounded-full bg-black/25 px-3 py-1 backdrop-blur-sm">{style}</span>
                  </div>
                </div>
              </div>
              {status === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[22px] bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-fuchsia-700">
                    <Loader2 className="size-4 animate-spin" /> Rendering motion…
                  </div>
                </div>
              )}
            </div>

            {status === "success" && (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-100">
                <CheckCircle2 className="size-4" /> Motion creatives ready for variant {variant}.
              </p>
            )}

            {/* Metrics with count-up */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Reach", icon: Eye, value: Math.round(reach).toLocaleString() },
                { label: "CTR", icon: MousePointerClick, value: `${ctr.toFixed(1)}%` },
                { label: "Conversion", icon: TrendingUp, value: `${conversion.toFixed(1)}%` },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 rounded-3xl bg-white/10 p-5 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03]"
                >
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
                    <m.icon className="size-4" /> {m.label}
                  </span>
                  <span className="text-3xl font-black tabular-nums">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Recent actions
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {feed.map((item) => (
                  <li
                    key={item.id}
                    className="mb-pop rounded-xl bg-white/10 px-3 py-2 text-sm font-medium"
                  >
                    {item.text}
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
