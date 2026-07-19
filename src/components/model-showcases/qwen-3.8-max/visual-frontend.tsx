"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Gen Z", "Millennials", "Professionals", "Parents"] as const;
const CHANNELS = ["Instagram", "TikTok", "LinkedIn", "Email"] as const;
const TONES = ["Bold", "Playful", "Premium", "Friendly"] as const;
const STYLES = ["Aurora", "Ember", "Noir", "Neon"] as const;

type Audience = (typeof AUDIENCES)[number];
type Channel = (typeof CHANNELS)[number];
type Tone = (typeof TONES)[number];
type Style = (typeof STYLES)[number];
type VariantKey = "A" | "B" | "C";

const STYLE_ART: Record<Style, string> = {
  Aurora:
    "radial-gradient(60% 80% at 20% 20%, #22d3ee55 0%, transparent 60%), radial-gradient(70% 90% at 80% 30%, #a855f755 0%, transparent 55%), linear-gradient(160deg,#0b1120 0%,#1e1b4b 60%,#0f172a 100%)",
  Ember:
    "radial-gradient(70% 80% at 75% 25%, #f9731655 0%, transparent 55%), radial-gradient(60% 70% at 20% 70%, #ef444455 0%, transparent 60%), linear-gradient(160deg,#1c0a05 0%,#451a03 55%,#0c0a09 100%)",
  Noir:
    "radial-gradient(80% 90% at 50% 0%, #64748b44 0%, transparent 60%), linear-gradient(160deg,#020617 0%,#111827 60%,#000000 100%)",
  Neon:
    "radial-gradient(60% 80% at 25% 30%, #ec489955 0%, transparent 55%), radial-gradient(70% 90% at 80% 70%, #06b6d455 0%, transparent 55%), linear-gradient(160deg,#0a0a0a 0%,#1e1b4b 60%,#020617 100%)",
};

const TONE_HEADLINE: Record<Tone, string> = {
  Bold: "OWN THE MOMENT",
  Playful: "PLAY LOUDER",
  Premium: "QUIET LUXURY",
  Friendly: "MADE FOR YOU",
};

const VARIANTS: Record<
  VariantKey,
  { tag: string; reach: string; ctr: string; conversion: string }
> = {
  A: { tag: "TEASER", reach: "210K", ctr: "3.1%", conversion: "1.9%" },
  B: { tag: "STORY", reach: "164K", ctr: "5.2%", conversion: "3.8%" },
  C: { tag: "DROP", reach: "288K", ctr: "2.6%", conversion: "1.5%" },
};

type Status = "idle" | "loading" | "success" | "error";
type FeedItem = { id: number; text: string; time: string };

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                active
                  ? "border-white bg-white text-black"
                  : "border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
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

export default function VisualFrontend() {
  const [brief, setBrief] = useState(
    "Nova wireless earbuds — spatial audio, all-day battery, midnight launch."
  );
  const [audience, setAudience] = useState<Audience>("Gen Z");
  const [channel, setChannel] = useState<Channel>("TikTok");
  const [tone, setTone] = useState<Tone>("Bold");
  const [style, setStyle] = useState<Style>("Aurora");
  const [variant, setVariant] = useState<VariantKey>("A");
  const [status, setStatus] = useState<Status>("idle");
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 1, text: "Studio ready", time: now() },
  ]);
  const idRef = useRef(2);

  const metrics = VARIANTS[variant];

  const subhead = useMemo(() => {
    const words = brief.trim().split(/\s+/).slice(0, 6).join(" ");
    return words || "A new product, revealed.";
  }, [brief]);

  function log(text: string) {
    setFeed((prev) =>
      [{ id: idRef.current++, text, time: now() }, ...prev].slice(0, 6)
    );
  }

  function handleGenerate() {
    if (!brief.trim()) {
      setStatus("error");
      log("Generate failed — empty brief");
      return;
    }
    setStatus("loading");
    log(`Rendering ${metrics.tag} frame`);
    window.setTimeout(() => {
      setStatus("success");
      log(`Rendered ${metrics.tag} frame`);
    }, 1200);
  }

  function selectVariant(v: VariantKey) {
    setVariant(v);
    log(`Preview set to ${VARIANTS[v].tag}`);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top minimal chrome */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
        <div className="pointer-events-auto">
          <div className="text-sm font-semibold tracking-tight">
            Muse <span className="text-white/50">/ Campaign Studio</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px]">
            <span className="font-medium text-white/80">Qwen 3.8 Max</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60">
              frontend-skill
            </span>
          </div>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => log("Saved frame")}
            className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Save"
          >
            <Save className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => log("Exported frame")}
            className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Export"
          >
            <Download className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={status === "loading"}
            className="flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Rendering
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" /> Generate
              </>
            )}
          </button>
        </div>
      </header>

      {/* HERO preview ~60% */}
      <section
        className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden transition-[background] duration-500 sm:min-h-[68vh]"
        style={{ background: STYLE_ART[style] }}
      >
        {status === "loading" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs font-medium">
              <Loader2 className="size-4 animate-spin" /> Rendering frame…
            </div>
          </div>
        )}

        {/* metric overlay chips */}
        <div className="absolute right-4 top-20 z-10 flex flex-col items-end gap-1.5 sm:right-6 sm:top-24">
          {[
            { label: "Reach", value: metrics.reach },
            { label: "CTR", value: metrics.ctr },
            { label: "Conv", value: metrics.conversion },
          ].map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] backdrop-blur"
            >
              <span className="text-white/50">{m.label}</span>
              <span className="font-semibold tabular-nums">{m.value}</span>
            </div>
          ))}
        </div>

        {status === "success" && (
          <div className="absolute left-4 top-20 z-10 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur sm:left-6 sm:top-24">
            <CheckCircle2 className="size-3.5" /> Frame rendered
          </div>
        )}
        {status === "error" && (
          <div className="absolute left-4 top-20 z-10 flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-[11px] font-medium text-red-200 backdrop-blur sm:left-6 sm:top-24">
            <AlertTriangle className="size-3.5" /> Brief required
          </div>
        )}

        {/* headline block */}
        <div className="relative z-10 p-6 pb-40 sm:p-10 sm:pb-44">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
            <span>{channel}</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>{metrics.tag}</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>{audience}</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            {TONE_HEADLINE[tone]}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base">
            {subhead}
          </p>
        </div>

        {/* filmstrip A/B/C */}
        <div className="absolute bottom-24 left-0 z-10 w-full px-4 sm:bottom-28 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(Object.keys(VARIANTS) as VariantKey[]).map((v) => {
              const active = v === variant;
              return (
                <button
                  key={v}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectVariant(v)}
                  className={cn(
                    "group relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border text-left transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    active
                      ? "border-white ring-1 ring-white"
                      : "border-white/20 opacity-70 hover:opacity-100"
                  )}
                  style={{ background: STYLE_ART[style] }}
                >
                  <span className="absolute left-1.5 top-1.5 text-[10px] font-bold">
                    {v}
                  </span>
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] uppercase tracking-wider text-white/70">
                    {VARIANTS[v].tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating glass dock */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
          <div className="mb-3">
            <label
              htmlFor="brief-dock"
              className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40"
            >
              Campaign Brief
            </label>
            <textarea
              id="brief-dock"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              placeholder="Describe the launch…"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <PillGroup
              label="Audience"
              options={AUDIENCES}
              value={audience}
              onChange={setAudience}
            />
            <PillGroup
              label="Channel"
              options={CHANNELS}
              value={channel}
              onChange={setChannel}
            />
            <PillGroup
              label="Tone"
              options={TONES}
              value={tone}
              onChange={setTone}
            />
            <PillGroup
              label="Style"
              options={STYLES}
              value={style}
              onChange={setStyle}
            />
          </div>
          <div className="mt-3 flex items-center gap-2 overflow-x-auto text-[10px] text-white/40">
            <span className="shrink-0 uppercase tracking-wider">Recent</span>
            {feed.slice(0, 4).map((f) => (
              <span key={f.id} className="shrink-0 whitespace-nowrap">
                · {f.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* spacer so content isn't hidden behind fixed dock */}
      <div className="h-56 sm:h-48" />
    </div>
  );
}
