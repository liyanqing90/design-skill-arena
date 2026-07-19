"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
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
const SKILLS_LABEL = "frontend-app-builder + taste-skill + impeccable";

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

const STYLE_MAP: Record<string, { gradient: string; ink: string }> = {
  Aurora: { gradient: "linear-gradient(135deg,#6366f1,#14b8a6)", ink: "#042f2e" },
  Sunset: { gradient: "linear-gradient(135deg,#f97316,#ec4899)", ink: "#431407" },
  Mono: { gradient: "linear-gradient(135deg,#1f2937,#9ca3af)", ink: "#0f172a" },
  Neon: { gradient: "linear-gradient(135deg,#d946ef,#06b6d4)", ink: "#4a044e" },
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
function fmtReach(n: number) {
  return `${(n / 1000).toFixed(1)}K`;
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
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
        "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        active
          ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
          : "border-stone-200 bg-white text-stone-600 hover:border-indigo-300 hover:text-indigo-700"
      )}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-3 text-center transition-all duration-200 hover:border-indigo-200 hover:shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-stone-800">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BalancedChain() {
  const [brief, setBrief] = useState(
    "Launch the new modular backpack to people who care about craft, calm, and everyday utility."
  );
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [variant, setVariant] = useState<Variant>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [feed, setFeed] = useState<FeedItem[]>([{ id: uid(), msg: "Studio opened", time: now() }]);

  const log = (msg: string) => setFeed((prev) => [{ id: uid(), msg, time: now() }, ...prev].slice(0, 6));

  const data = VARIANT_DATA[variant];
  const palette = STYLE_MAP[style];

  const briefHeadline = brief.trim() ? brief.trim().split(/\s+/).slice(0, 6).join(" ") : "";
  const headline = briefHeadline || data.headline;

  const handleGenerate = () => {
    if (status === "loading") return;
    setStatus("loading");
    setNote("Generating creative…");
    log(`Generate · ${data.label}`);
    window.setTimeout(() => {
      if (!brief.trim()) {
        setStatus("error");
        setNote("Please add a campaign brief before generating.");
        log("Generate failed · empty brief");
      } else {
        setStatus("success");
        setNote(`${data.label} generated for ${channel}.`);
        log(`Generate complete · ${data.label}`);
      }
    }, 1200);
  };

  const handleSave = () => {
    setStatus("success");
    setNote("Campaign saved.");
    log("Saved campaign");
  };
  const handleExport = () => {
    setStatus("success");
    setNote("Creative exported.");
    log("Exported creative");
  };

  const selectVariant = (v: Variant) => {
    setVariant(v);
    log(`Selected ${VARIANT_DATA[v].label}`);
  };

  return (
    <div className="min-h-screen w-full bg-stone-100 text-stone-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Centered header */}
        <header className="mb-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
              <Sparkles className="size-3.5" />
              {MODEL_LABEL}
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-500">
              {SKILLS_LABEL}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">AI Campaign Studio</h1>
          <p className="mt-1 text-sm text-stone-500">A calm, balanced workspace for your product launch.</p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-200 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <Save className="size-4" />
              Save
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition-all duration-200 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <Download className="size-4" />
              Export
            </button>
          </div>

          {/* inline status note */}
          <div className="mt-4 flex min-h-[24px] items-center justify-center">
            {status === "loading" && (
              <p className="inline-flex items-center gap-2 text-sm text-stone-500">
                <Loader2 className="size-4 animate-spin text-indigo-500" /> {note}
              </p>
            )}
            {status === "success" && (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="size-4" /> {note}
              </p>
            )}
            {status === "error" && (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-red-500">
                <AlertCircle className="size-4" /> {note}
              </p>
            )}
          </div>
        </header>

        {/* Balanced three columns */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {/* LEFT — controls */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-stone-900">Campaign controls</h2>

            <div className="mb-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">Brief</p>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={4}
                placeholder="Describe your campaign…"
                aria-invalid={status === "error"}
                className={cn(
                  "w-full resize-y rounded-xl border bg-white px-3 py-2 text-sm transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40",
                  status === "error" ? "border-red-300" : "border-stone-200 focus-visible:border-indigo-300"
                )}
              />
            </div>

            <div className="space-y-5">
              <Group label="Audience">
                {AUDIENCES.map((a) => (
                  <Pill
                    key={a}
                    active={audience === a}
                    onClick={() => {
                      setAudience(a);
                      log(`Audience → ${a}`);
                    }}
                  >
                    {a}
                  </Pill>
                ))}
              </Group>
              <Group label="Channel">
                {CHANNELS.map((c) => (
                  <Pill
                    key={c}
                    active={channel === c}
                    onClick={() => {
                      setChannel(c);
                      log(`Channel → ${c}`);
                    }}
                  >
                    {c}
                  </Pill>
                ))}
              </Group>
              <Group label="Tone">
                {TONES.map((t) => (
                  <Pill
                    key={t}
                    active={tone === t}
                    onClick={() => {
                      setTone(t);
                      log(`Tone → ${t}`);
                    }}
                  >
                    {t}
                  </Pill>
                ))}
              </Group>
              <Group label="Visual style">
                {STYLES.map((s) => (
                  <Pill
                    key={s}
                    active={style === s}
                    onClick={() => {
                      setStyle(s);
                      log(`Style → ${s}`);
                    }}
                  >
                    {s}
                  </Pill>
                ))}
              </Group>
            </div>
          </section>

          {/* CENTER — preview + variant cards */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl shadow-sm">
                <div className="absolute inset-0 transition-all duration-300" style={{ background: palette.gradient }} />
                <div className="relative flex h-full flex-col justify-between p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm">{audience}</span>
                    <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-medium">{channel}</span>
                  </div>
                  <div className="min-w-0">
                    <p className={cn("break-words text-2xl leading-tight drop-shadow-sm", TONE_CLASS[tone])}>{headline}</p>
                    <p className="mt-2 text-sm text-white/85">{data.sub}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold" style={{ color: palette.ink }}>
                      Explore →
                    </span>
                    <span className="text-[11px] font-medium text-white/80">{tone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* A/B/C as three equal cards */}
            <div className="grid grid-cols-3 gap-3">
              {VARIANTS.map((v) => {
                const active = variant === v;
                const d = VARIANT_DATA[v];
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => selectVariant(v)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-1",
                      "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.98]",
                      active ? "border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-500/30" : "border-stone-200 bg-white hover:border-indigo-300"
                    )}
                  >
                    <p className={cn("text-sm font-semibold", active ? "text-indigo-700" : "text-stone-700")}>{d.label}</p>
                    <p className="mt-1 font-mono text-xs tabular-nums text-stone-500">{fmtReach(d.reach)} · {d.ctr.toFixed(1)}%</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT — metrics + activity */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-stone-900">Predicted metrics</h2>
              <div className="flex gap-3">
                <Stat label="Reach" value={fmtReach(data.reach)} />
                <Stat label="CTR" value={`${data.ctr.toFixed(1)}%`} />
                <Stat label="Conv." value={`${data.conv.toFixed(1)}%`} />
              </div>
              <p className="mt-2 text-xs text-stone-400">Reflecting {data.label}.</p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="size-4 text-indigo-500" />
                <h2 className="text-sm font-semibold text-stone-900">Activity</h2>
              </div>
              <ul className="space-y-2.5">
                {feed.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5 last:border-0 last:pb-0">
                    <span className="min-w-0 break-words text-sm text-stone-600">{item.msg}</span>
                    <span className="shrink-0 font-mono text-[10px] text-stone-400">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
