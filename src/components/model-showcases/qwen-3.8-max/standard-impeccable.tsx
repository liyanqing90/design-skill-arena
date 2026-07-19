"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Save,
  Download,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Users,
  Radio,
  MessageSquare,
  Palette,
  MousePointerClick,
  TrendingUp,
  Eye,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_LABEL = "Qwen 3.8 Max";
const SKILLS_LABEL = "frontend-app-builder + impeccable";

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Creators"];
const CHANNELS = ["Instagram", "TikTok", "YouTube", "Email"];
const TONES = ["Bold", "Playful", "Premium", "Minimal"];
const STYLES = ["Aurora", "Sunset", "Ocean", "Graphite"];

const STYLE_GRADIENTS: Record<string, string> = {
  Aurora: "linear-gradient(135deg,#a78bfa 0%,#22d3ee 55%,#34d399 100%)",
  Sunset: "linear-gradient(135deg,#fb7185 0%,#f59e0b 60%,#fbbf24 100%)",
  Ocean: "linear-gradient(135deg,#38bdf8 0%,#6366f1 60%,#8b5cf6 100%)",
  Graphite: "linear-gradient(135deg,#e5e7eb 0%,#9ca3af 55%,#4b5563 100%)",
};

const TONE_HEADLINES: Record<string, string> = {
  Bold: "Make the launch impossible to ignore.",
  Playful: "Say hello to your new favorite thing.",
  Premium: "Crafted for those who expect more.",
  Minimal: "Less noise. More product.",
};

type VariantKey = "A" | "B" | "C";

const VARIANTS: Record<
  VariantKey,
  { label: string; kicker: string; reach: number; ctr: number; conv: number }
> = {
  A: { label: "Hero Statement", kicker: "Variant A", reach: 128400, ctr: 4.6, conv: 3.1 },
  B: { label: "Story First", kicker: "Variant B", reach: 96200, ctr: 5.8, conv: 2.4 },
  C: { label: "Social Proof", kicker: "Variant C", reach: 154800, ctr: 3.9, conv: 4.2 },
};

const REACH_MAX = 200000;
const CTR_MAX = 8;
const CONV_MAX = 6;

function formatReach(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;
}

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

type Activity = { id: number; text: string; time: string };
type Toast = { id: number; text: string; tone: "success" | "error" } | null;

export default function StandardImpeccable() {
  const [brief, setBrief] = useState(
    "Launch the new product with a confident, modern campaign that highlights its design and everyday usefulness."
  );
  const [audience, setAudience] = useState(AUDIENCES[1]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<VariantKey>("A");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<Toast>(null);
  const [activity, setActivity] = useState<Activity[]>([
    { id: 1, text: "Studio session started", time: timeNow() },
  ]);

  const idRef = useRef(2);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (genTimer.current) clearTimeout(genTimer.current);
    };
  }, []);

  const pushActivity = (text: string) => {
    setActivity((prev) => [{ id: idRef.current++, text, time: timeNow() }, ...prev].slice(0, 7));
  };

  const showToast = (text: string, tone: "success" | "error" = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: idRef.current++, text, tone });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const active = VARIANTS[variant];

  const previewStyle = useMemo(
    () => ({ background: STYLE_GRADIENTS[style] }),
    [style]
  );

  const headline = TONE_HEADLINES[tone];

  const handleGenerate = () => {
    if (status === "loading") return;
    if (!brief.trim()) {
      setStatus("error");
      pushActivity("Generate failed — brief is empty");
      return;
    }
    setStatus("loading");
    pushActivity(`Generating ${active.kicker} for ${channel}`);
    genTimer.current = setTimeout(() => {
      setStatus("success");
      pushActivity(`Generated ${active.kicker} creative`);
    }, 1200);
  };

  const handleSave = () => {
    pushActivity(`Saved ${active.kicker} draft`);
    showToast("Campaign draft saved");
  };

  const handleExport = () => {
    pushActivity(`Exported ${active.kicker} assets`);
    showToast("Assets exported");
  };

  const selectVariant = (key: VariantKey) => {
    setVariant(key);
    pushActivity(`Switched to ${VARIANTS[key].kicker}`);
  };

  const metrics = [
    {
      key: "reach",
      label: "Reach",
      icon: Eye,
      value: formatReach(active.reach),
      pct: Math.round((active.reach / REACH_MAX) * 100),
      bar: "bg-indigo-500",
    },
    {
      key: "ctr",
      label: "CTR",
      icon: MousePointerClick,
      value: `${active.ctr.toFixed(1)}%`,
      pct: Math.round((active.ctr / CTR_MAX) * 100),
      bar: "bg-cyan-500",
    },
    {
      key: "conv",
      label: "Conversion",
      icon: TrendingUp,
      value: `${active.conv.toFixed(1)}%`,
      pct: Math.round((active.conv / CONV_MAX) * 100),
      bar: "bg-emerald-500",
    },
  ];

  const actionButtons = (compact: boolean) => (
    <>
      <button
        type="button"
        onClick={handleGenerate}
        disabled={status === "loading"}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",
          compact ? "h-10 flex-1 px-3 text-sm" : "h-9 px-3.5 text-sm"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Wand2 className="size-4" />
        )}
        {status === "loading" ? "Generating" : "Generate"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2 active:scale-[0.97]",
          compact ? "h-10 flex-1 px-3 text-sm" : "h-9 px-3.5 text-sm"
        )}
      >
        <Save className="size-4" />
        Save
      </button>
      <button
        type="button"
        onClick={handleExport}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2 active:scale-[0.97]",
          compact ? "h-10 flex-1 px-3 text-sm" : "h-9 px-3.5 text-sm"
        )}
      >
        <Download className="size-4" />
        Export
      </button>
    </>
  );

  const pillGroup = (
    options: string[],
    value: string,
    onSelect: (v: string) => void,
    onPick: (v: string) => void
  ) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => {
              onSelect(opt);
              onPick(opt);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 focus-visible:ring-offset-1 active:scale-95",
              selected
                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
        {/* Header bar */}
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-sm">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight tracking-tight">
                AI Campaign Studio
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {MODEL_LABEL}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {SKILLS_LABEL}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">{actionButtons(false)}</div>
        </header>

        {/* Error banner */}
        {status === "error" && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Generation failed</p>
              <p className="text-red-600/90">
                Your campaign brief is empty. Add a few details so the studio has something to work with.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-md p-1 text-red-500 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
              aria-label="Dismiss error"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: controls */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">Campaign Brief</h2>
              <textarea
                value={brief}
                onChange={(e) => {
                  setBrief(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                rows={5}
                placeholder="Describe the product, the goal, and the feeling you want the campaign to carry..."
                className={cn(
                  "w-full resize-none rounded-xl border bg-slate-50/60 p-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2",
                  status === "error"
                    ? "border-red-300 focus:border-red-400 focus:ring-red-300/50"
                    : "border-slate-200 focus:border-slate-400 focus:ring-slate-300/50"
                )}
              />

              <div className="mt-5 space-y-5">
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <Users className="size-3.5" /> Target Audience
                  </p>
                  {pillGroup(AUDIENCES, audience, setAudience, (v) =>
                    pushActivity(`Audience set to ${v}`)
                  )}
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <Radio className="size-3.5" /> Channel
                  </p>
                  {pillGroup(CHANNELS, channel, setChannel, (v) =>
                    pushActivity(`Channel set to ${v}`)
                  )}
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <MessageSquare className="size-3.5" /> Tone
                  </p>
                  {pillGroup(TONES, tone, setTone, (v) => pushActivity(`Tone set to ${v}`))}
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <Palette className="size-3.5" /> Visual Style
                  </p>
                  {pillGroup(STYLES, style, setStyle, (v) =>
                    pushActivity(`Visual style set to ${v}`)
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Center: preview */}
          <section className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Creative Preview</h2>
                <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                  {(Object.keys(VARIANTS) as VariantKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectVariant(key)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 active:scale-95",
                        variant === key
                          ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-xl p-6 text-white shadow-inner transition-all duration-300 sm:p-8"
                style={previewStyle}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                    {active.kicker} · {active.label}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
                    {channel}
                  </span>
                </div>
                <div className="relative">
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/80">
                    For {audience} · {tone}
                  </p>
                  <h3
                    className={cn(
                      "max-w-md text-2xl font-semibold leading-tight drop-shadow-sm transition-all duration-300 sm:text-4xl",
                      tone === "Minimal" && "font-normal tracking-tight",
                      tone === "Bold" && "font-extrabold"
                    )}
                  >
                    {headline}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/85">
                    A {tone.toLowerCase()} launch concept tuned for {audience} on {channel}.
                  </p>
                </div>

                {status === "loading" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/40 backdrop-blur-sm">
                    <Loader2 className="size-8 animate-spin text-white" />
                    <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/30">
                      <div className="h-full w-1/2 animate-pulse rounded-full bg-white" />
                    </div>
                    <p className="text-xs font-medium text-white/90">Rendering creative…</p>
                  </div>
                )}
                {status === "success" && (
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    <CheckCircle2 className="size-3.5" /> Ready
                  </div>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Preview updates live with tone, visual style, channel, audience and the selected variant.
              </p>
            </div>
          </section>

          {/* Right: metrics + activity */}
          <section className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">Predicted Metrics</h2>
              <div className="space-y-4">
                {metrics.map((m) => (
                  <div
                    key={m.key}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-all duration-200 hover:border-slate-200"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <m.icon className="size-3.5" /> {m.label}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-slate-900">
                        {m.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500 ease-out", m.bar)}
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">Activity</h2>
              <ol className="relative space-y-4 border-l border-slate-200 pl-4">
                {activity.map((a, i) => (
                  <li key={a.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[21px] top-1 size-2.5 rounded-full ring-4 ring-white transition-colors",
                        i === 0 ? "bg-indigo-500" : "bg-slate-300"
                      )}
                    />
                    <p className="text-xs font-medium leading-snug text-slate-700">{a.text}</p>
                    <p className="text-[10px] tabular-nums text-slate-400">{a.time}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] backdrop-blur sm:hidden">
        <div className="flex items-center gap-2">{actionButtons(true)}</div>
      </div>

      {/* Toast */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        {toast && (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-lg transition-all duration-200",
              toast.tone === "success"
                ? "border-emerald-200 bg-white text-emerald-700"
                : "border-red-200 bg-white text-red-700"
            )}
            style={{ animation: "si-toast-in 200ms ease-out" }}
          >
            {toast.tone === "success" ? (
              <CheckCircle2 className="size-4 text-emerald-500" />
            ) : (
              <AlertTriangle className="size-4 text-red-500" />
            )}
            {toast.text}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes si-toast-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
